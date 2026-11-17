"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContactModal } from "../modals/ContactModalContext";
// Temporarily disabled — kept for potential future use.
// import LaunchAppCallout from "./LaunchAppCallout";
import type { InspirationItem } from "../../types/data";
import type { NavBlogPost, NavData, NavFreebie } from "../../lib/nav/types";
import { getPublishLinkProps } from "../../lib/publish";
import { trackNav } from "../../lib/nav/analytics";
import {
  KIT_PREVIEWS,
  NAV_BLOG_CATEGORIES,
  NAV_BLOG_LATEST,
  NAV_DESIGN_KITS_ROW,
  NAV_GUIDE_CATEGORIES,
  NAV_RESOURCE_ROWS,
  getBlogPreviews,
  getGuidePreviews,
  getInspirationPreviews,
  shuffle,
  withUtm,
} from "./nav/navConfig";
import type { KitPreview } from "./nav/navConfig";
import { useMegaMenuState } from "./nav/useMegaMenuState";
import { useNavAnalytics } from "./nav/useNavAnalytics";
import { MegaMenuPanel } from "./nav/MegaMenuPanel";
import type { MegaMenuCategory } from "./nav/MegaMenuPanel";
import { MegaMenuCard, MegaMenuCardMedia } from "./nav/MegaMenuCard";
import { InspirationThumb } from "./nav/InspirationThumb";
import { AdvertisePanel } from "./nav/AdvertisePanel";
import { UI_GUIDES } from "../../data/ui-guides";
import { NavSearch } from "./nav/NavSearch";
import { NavLink } from "./nav/NavLink";
import { preloadNextImage, preloadPlainImage } from "./nav/preloadImages";
import { CloseIcon, MenuIcon, SearchIcon } from "../icons/DecorativeIcons";

/** `sizes` of the next/image thumbs in the Resources cards. */
const CARD_IMAGE_SIZES = "158px";

type SiteHeaderProps = {
  /** Compact menu data from getNavData() in the page's getStaticProps. */
  navData?: NavData;
  /**
   * Full post list for pages that already ship it (home, /blog). Used for the
   * Magazine panel when navData was built with `{ blog: false }`.
   */
  blogPosts?: NavBlogPost[];
};

type NavCatalogue = typeof import("./nav/navPreviews");

const EMPTY_NAV_DATA: NavData = {
  blog: [],
  freebies: [],
  guides: [],
  inspiration: [],
  inspirationCategories: [],
  showcase: [],
};

const INSPIRATION_HOME = "https://app.setproduct.com/";
const INSPIRATION_ARIA_LABEL = "Inspiration, AI UI library (opens in a new tab)";

export default function SiteHeader({ navData = EMPTY_NAV_DATA, blogPosts = [] }: SiteHeaderProps) {
  const menu = useMegaMenuState();
  const { categories } = menu;
  const { handleNavClickCapture } = useNavAnalytics(menu, navData.inspirationCategories);
  const navBlog = navData.blog.length > 0 ? navData.blog : blogPosts;
  const hasInspiration = navData.inspiration.length > 0;
  // Server render and first client paint must match, so we start from the
  // build-time sample and reshuffle on mount — giving a fresh six on every
  // refresh without tripping hydration.
  const [shuffledInspiration, setShuffledInspiration] = useState<InspirationItem[]>(navData.inspiration);
  // Full catalogue (kits per category, all resources, the Inspiration pool).
  // Loaded on the first sign of intent so it stays out of the initial JS.
  const [catalogue, setCatalogue] = useState<NavCatalogue | null>(null);
  const catalogueRequestedRef = useRef(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);
  const { openContactModal } = useContactModal();
  const router = useRouter();
  const currentPath = router.pathname;

  // On a post route `pathname` is "/blog/[slug]", so the real slug comes from
  // the query. Guides are blog posts too: the guides panel owns them, and the
  // blog item stays highlighted for every other post.
  const activePostSlug = currentPath === "/blog/[slug]" ? router.query.slug : undefined;
  const isGuidesActive =
    currentPath === "/ui-guides" ||
    (typeof activePostSlug === "string" && UI_GUIDES.some((guide) => guide.slug === activePostSlug));
  const isTutorialsActive =
    currentPath === "/blog" || (currentPath.startsWith("/blog/") && !isGuidesActive);
  const isFreebiesActive = currentPath === "/freebies" || currentPath.startsWith("/freebies/");
  // The Advertise panel's only own page is the paid posts terms.
  const isAdvertiseActive = currentPath === "/legal/terms-of-paid-posts";

  // Lock body scroll while the drawer is open, expose the live navbar height
  // as a CSS var so the drawer can pin itself to the actual bottom of the
  // header (Webflow's vw-based em sizing makes the height fluid), and
  // auto-close on resize to desktop.
  useEffect(() => {
    const navbarEl = navbarRef.current;
    const previousOverflow = document.body.style.overflow;

    const syncNavbarHeight = () => {
      if (!navbarEl) return;
      const height = navbarEl.getBoundingClientRect().height;
      navbarEl.style.setProperty("--mobile-navbar-height", `${height}px`);
    };

    syncNavbarHeight();

    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = previousOverflow || "";
    }

    const handleResize = () => {
      syncNavbarHeight();
      if (window.innerWidth > 991 && isMobileNavOpen) {
        setIsMobileNavOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow || "";
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobileNavOpen]);

  // Client-side navigation (next/link) keeps this header mounted, so the open
  // panel and the drawer would otherwise stay on screen over the new page.
  // The ref keeps the listener stable while always calling the latest closer.
  const closeMenuRef = useRef(menu.closeMenu);
  closeMenuRef.current = menu.closeMenu;
  useEffect(() => {
    const handleRouteChangeStart = () => {
      closeMenuRef.current();
      setIsMobileNavOpen(false);
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    return () => router.events.off("routeChangeStart", handleRouteChangeStart);
  }, [router.events]);

  // Reshuffle the inspiration sample once on mount. Doing it in an effect (not
  // at render) keeps SSR and the first client paint identical — the randomised
  // order swaps in right after hydration, so each refresh shows a fresh six.
  useEffect(() => {
    setShuffledInspiration(shuffle(navData.inspiration));
    // The sample is fixed per build; reshuffling on prop identity is enough.
  }, [navData.inspiration]);

  const loadCatalogue = useCallback(() => {
    if (catalogueRequestedRef.current) return;
    catalogueRequestedRef.current = true;
    import("./nav/navPreviews")
      .then((mod) => {
        setCatalogue(mod);
        // Append the rest of the pool behind the sample, so the "All" six the
        // user may already be looking at stay put and category tabs fill up.
        setShuffledInspiration((current) => {
          const seen = new Set(current.map((item) => item.id));
          return [...current, ...shuffle(mod.INSPIRATION_POOL).filter((item) => !seen.has(item.id))];
        });
      })
      .catch(() => {
        // Offline or a stale deploy: keep the build-time previews, retry later.
        catalogueRequestedRef.current = false;
      });
  }, []);

  // Before the catalogue arrives only the "Latest" set is known. The kit
  // shelf always shows the curated featured six, which ship with the page.
  const getFreebieSet = (category: string | null): NavFreebie[] =>
    catalogue ? catalogue.getFreebiePreviews(category) : navData.freebies;
  const kitPreviews: KitPreview[] = KIT_PREVIEWS;

  const isKitShelf = categories.freebies === NAV_DESIGN_KITS_ROW;
  const freebiePreviews = getFreebieSet(isKitShelf ? null : categories.freebies);

  // Hover-intent preloading: the pointer reaching a trigger, or settling on a
  // category, starts fetching that set's six images, so they are usually
  // decoded by the time the 120 ms open delay (or the short category settle
  // delay after the menu-aim check) runs out.
  const preloadInspiration = (category: string | null) =>
    getInspirationPreviews(shuffledInspiration, category).forEach((item) => preloadPlainImage(item.image));
  const preloadBlog = (category: string | null) =>
    getBlogPreviews(navBlog, category).forEach((item) => preloadPlainImage(item.thumbImage));
  const preloadGuides = (group: string | null) =>
    getGuidePreviews(navData.guides, group).forEach((item) => preloadPlainImage(item.thumbImage));
  const preloadFreebies = (category: string | null) => {
    if (category === NAV_DESIGN_KITS_ROW) {
      kitPreviews.forEach((item) => preloadNextImage(item.image, CARD_IMAGE_SIZES));
      return;
    }
    if (!catalogue && category !== null) return;
    getFreebieSet(category).forEach((item) => preloadNextImage(item.thumb, CARD_IMAGE_SIZES));
  };

  const inspirationCategories: MegaMenuCategory[] = navData.inspirationCategories.map((cat) => ({
    key: cat.slug,
    label: cat.label,
    value: cat.slug,
    href: withUtm(`https://app.setproduct.com/components/${cat.slug}`),
    isActive: categories.inspiration === cat.slug,
  }));

  const blogCategories: MegaMenuCategory[] = NAV_BLOG_CATEGORIES.map((item) => ({
    key: item.label,
    label: item.label,
    value: item.category,
    href:
      item.category && item.category !== NAV_BLOG_LATEST
        ? `/blog?category=${encodeURIComponent(item.category)}`
        : "/blog",
    isActive: categories.tutorials === item.category,
  }));

  // Same layout as Magazine: "Popular" on top, then the groups A to Z.
  const guideCategories: MegaMenuCategory[] = NAV_GUIDE_CATEGORIES.map((item) => ({
    key: item.label,
    label: item.label,
    value: item.group,
    href: item.href,
    isActive: categories.guides === item.group,
  }));

  // The kit shelf row swaps the grid like any category; its link (a click or
  // a second tap on touch) opens the full kit catalogue at /all.
  const resourceRows: MegaMenuCategory[] = NAV_RESOURCE_ROWS.map((row) => ({
    key: row.label,
    label: row.label,
    value: row.category,
    href:
      row.category === NAV_DESIGN_KITS_ROW
        ? "/all"
        : row.category
          ? `/freebies?category=${encodeURIComponent(row.category)}`
          : "/freebies",
    isActive: categories.freebies === row.category,
  }));

  // Kit shelf cards: the same cards as the retired UI kits panel minus the
  // price button. The nav only shows the kits exist; buying happens on the
  // template pages.
  const kitCards = kitPreviews.map((item) => (
    <MegaMenuCard
      key={item.href}
      href={item.href}
      title={item.title}
      description={item.description}
      media={
        <MegaMenuCardMedia href={item.href}>
          <Image
            alt={`${item.title} preview`}
            src={item.image}
            fill
            sizes={CARD_IMAGE_SIZES}
            className="image-cover"
          />
        </MegaMenuCardMedia>
      }
      actions={
        <NavLink className="button-x-small is-text w-inline-block" href={item.href}>
          <div className="text-size-regular text-weight-bold">Learn more</div>
        </NavLink>
      }
    />
  ));

  // Inspiration sits after Resources, without the "New" badge: it is a
  // permanent outbound section now, no longer a launch.
  const inspirationItem = hasInspiration ? (
    <MegaMenuPanel
      menu="inspiration"
      state={menu}
      label="Inspiration"
      // Off-site section: "current" is purely the open-menu highlight.
      isCurrent={false}
      external
      listKeyPrefix="inspiration"
      categories={inspirationCategories}
      onIntent={preloadInspiration}
    >
      {getInspirationPreviews(shuffledInspiration, categories.inspiration).map((item) => (
        <MegaMenuCard
          key={item.id}
          href={withUtm(item.href)}
          title={item.title}
          description={item.description}
          external
          media={<InspirationThumb href={withUtm(item.href)} image={item.image} title={item.title} />}
          actions={
            <a className="button-x-small is-secondary w-inline-block" href={withUtm(item.href)} rel="noreferrer" target="_blank">
              <div className="text-size-regular text-weight-bold">View</div>
            </a>
          }
        />
      ))}
    </MegaMenuPanel>
  ) : (
    <a
      className="nav-link-block w-inline-block"
      data-nav-menu="inspiration"
      href={withUtm(INSPIRATION_HOME)}
      rel="noreferrer"
      target="_blank"
      aria-label={INSPIRATION_ARIA_LABEL}
    >
      <div className="text-size-regular">Inspiration</div>
    </a>
  );

  return (
    // A real <header> element carries the banner landmark on its own, so the
    // explicit role="banner" is both redundant and rejected by validators when
    // combined with a landmark-bearing element.
    <header
      ref={navbarRef}
      className={`navbar w-nav${isMobileNavOpen ? " is-mobile-open" : ""}${menu.isSwitching ? " is-switching" : ""}`}
      data-collapse="medium"
    >
      <div className="container">
        <div className="nav-wrapper div-block">
          <div className="brand">
            <img
              alt="Setproduct"
              className="nav_logo-image"
              height={56}
              loading="lazy"
              src="/images/Vectors-Wrapper.svg"
              width={137}
            />
            <NavLink className="brand-link w-inline-block" href="/" aria-label="Setproduct home" />
          </div>

          <nav
            className={`nav-menu w-nav-menu${isMobileNavOpen ? " is-mobile-open" : ""}`}
            aria-label="Main"
            onClickCapture={handleNavClickCapture}
            onPointerEnter={loadCatalogue}
            onFocus={loadCatalogue}
          >
            <div className="nav-menu-inner">
              <div className="nav-menu-links-wr" onMouseMove={menu.trackPointer}>
                <MegaMenuPanel
                  menu="tutorials"
                  state={menu}
                  label="Magazine"
                  isCurrent={isTutorialsActive}
                  listKeyPrefix="tutorials"
                  categories={blogCategories}
                  onIntent={preloadBlog}
                >
                  {getBlogPreviews(navBlog, categories.tutorials).map((item) => (
                    <MegaMenuCard
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      title={item.title}
                      description={item.description}
                      media={
                        <MegaMenuCardMedia href={`/blog/${item.slug}`}>
                          <img
                            alt={`${item.title} cover`}
                            src={item.thumbImage}
                            loading="lazy"
                            decoding="async"
                            className="image-cover"
                          />
                        </MegaMenuCardMedia>
                      }
                      actions={
                        <NavLink className="button-x-small is-text w-inline-block" href={`/blog/${item.slug}`}>
                          <div className="text-size-regular text-weight-bold">Read more</div>
                        </NavLink>
                      }
                    />
                  ))}
                </MegaMenuPanel>

                <MegaMenuPanel
                  menu="guides"
                  state={menu}
                  label="UI guides"
                  isCurrent={isGuidesActive}
                  listKeyPrefix="guides"
                  categories={guideCategories}
                  onIntent={preloadGuides}
                >
                  {getGuidePreviews(navData.guides, categories.guides).map((item) => (
                    <MegaMenuCard
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      title={item.title}
                      description={item.description}
                      media={
                        <MegaMenuCardMedia href={`/blog/${item.slug}`}>
                          <img
                            alt={`${item.title} cover`}
                            src={item.thumbImage}
                            loading="lazy"
                            decoding="async"
                            className="image-cover"
                          />
                        </MegaMenuCardMedia>
                      }
                      actions={
                        <NavLink className="button-x-small is-text w-inline-block" href={`/blog/${item.slug}`}>
                          <div className="text-size-regular text-weight-bold">Read more</div>
                        </NavLink>
                      }
                    />
                  ))}
                </MegaMenuPanel>

                <MegaMenuPanel
                  menu="freebies"
                  state={menu}
                  label="Resources"
                  isCurrent={isFreebiesActive}
                  listKeyPrefix="freebies"
                  categories={resourceRows}
                  onIntent={preloadFreebies}
                >
                  {isKitShelf
                    ? kitCards
                    : freebiePreviews.map((item) => (
                        <MegaMenuCard
                          key={item.slug}
                          href={item.previewHref}
                          title={item.title}
                          description={item.description}
                          media={
                            <MegaMenuCardMedia href={item.previewHref}>
                              <Image
                                alt={`${item.title} preview`}
                                src={item.thumb}
                                fill
                                sizes={CARD_IMAGE_SIZES}
                                className="image-cover"
                              />
                            </MegaMenuCardMedia>
                          }
                          actions={
                            <>
                              <a className="button-x-small is-secondary w-inline-block" href={item.duplicateHref} rel="noreferrer" target="_blank">
                                <div className="text-size-regular text-weight-bold">{item.menuCtaLabel ?? item.ctaLabel ?? (item.isFree ? "Duplicate" : "Buy")}</div>
                              </a>
                              <NavLink className="button-x-small is-text w-inline-block" href={item.previewHref}>
                                <div className="text-size-regular text-weight-bold">Preview</div>
                              </NavLink>
                            </>
                          }
                        />
                      ))}
                </MegaMenuPanel>

                {inspirationItem}

                <AdvertisePanel
                  state={menu}
                  isCurrent={isAdvertiseActive}
                  showcase={navData.showcase}
                  onContact={openContactModal}
                />
              </div>

              <div className="nav-menu-mob-btn-wr">
                <form action="/search" className="search w-form nav-menu-mob-search" role="search">
                  <input
                    aria-label="Search Setproduct"
                    className="w-input nav-menu-mob-search-input"
                    enterKeyHint="search"
                    maxLength={256}
                    name="query"
                    placeholder="Search Setproduct…"
                    required
                    type="search"
                  />
                  <button aria-label="Search" className="nav-menu-mob-search-btn" type="submit">
                    <SearchIcon className="search-icon" />
                  </button>
                </form>
              </div>
            </div>
          </nav>

          <button
            type="button"
            aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileNavOpen}
            className={`menu-button icon-2 w-nav-button${isMobileNavOpen ? " w--open" : ""}`}
            onClick={() => {
              if (!isMobileNavOpen) {
                trackNav("nav_drawer_open");
                loadCatalogue();
              }
              setIsMobileNavOpen((open) => !open);
            }}
          >
            <div className="menu-button-img-wr">
              <MenuIcon className="menu-button-img is-burger" />
              <CloseIcon className="menu-button-img is-close" />
            </div>
          </button>

          <div className="nav-button-wr">
            <NavSearch />
            <div className="relative inline-flex items-center">
              <a
                className="button-small outlined w-inline-block"
                {...getPublishLinkProps("header")}
                aria-label="Get featured on Setproduct (opens in a new tab)"
              >
                <div className="text-size-medium text-weight-bold">Get featured</div>
              </a>
              {/* Temporarily disabled — kept for potential future use. */}
              {/* <LaunchAppCallout /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
