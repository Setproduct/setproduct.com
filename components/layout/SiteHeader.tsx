"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContactModal } from "../modals/ContactModalContext";
// Temporarily disabled — kept for potential future use.
// import LaunchAppCallout from "./LaunchAppCallout";
import type { InspirationItem } from "../../types/data";
import type { NavBlogPost, NavData, NavFreebie } from "../../lib/nav/types";
import { getGumroadLinkProps } from "../../lib/gumroad";
import { trackNav } from "../../lib/nav/analytics";
import {
  DESIGN_KITS,
  INFORMATION_LINKS,
  INSPIRATION_BADGE_STYLE,
  INSPIRATION_LABEL_STYLE,
  KIT_PREVIEWS,
  NAV_BLOG_CATEGORIES,
  NAV_FREEBIE_CATEGORIES,
  getBlogPreviews,
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
import { CompanyPanel } from "./nav/CompanyPanel";
import { NavSearch } from "./nav/NavSearch";

type SiteHeaderProps = {
  /** Compact menu data from getNavData() in the page's getStaticProps. */
  navData?: NavData;
  /**
   * Full post list for pages that already ship it (home, /blog). Used for the
   * Learn panel when navData was built with `{ blog: false }`.
   */
  blogPosts?: NavBlogPost[];
};

type NavCatalogue = typeof import("./nav/navPreviews");

const EMPTY_NAV_DATA: NavData = { blog: [], freebies: [], inspiration: [], inspirationCategories: [] };

const INSPIRATION_HOME = "https://app.setproduct.com/";
const INSPIRATION_ARIA_LABEL = "Inspiration — AI UI library (opens in a new tab)";

const inspirationLabel = (
  <>
    Inspiration
    <span style={INSPIRATION_BADGE_STYLE} aria-hidden="true">New</span>
  </>
);

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
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const { openContactModal } = useContactModal();
  const router = useRouter();
  const currentPath = router.pathname;

  const isPathActive = (href: string) =>
    href === "/" ? currentPath === "/" : currentPath === href || currentPath.startsWith(`${href}/`);

  const isTutorialsActive = currentPath === "/blog" || currentPath.startsWith("/blog/");
  const isDesignKitsActive = DESIGN_KITS.some((k) => isPathActive(k.href)) ||
    currentPath.startsWith("/templates/");
  const isFreebiesActive = currentPath === "/freebies" || currentPath.startsWith("/freebies/");
  const isInformationActive = INFORMATION_LINKS.some(
    (link) => !link.modal && link.href !== "#" && isPathActive(link.href),
  );

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

  const kitPreviews: KitPreview[] = catalogue ? catalogue.getKitPreviews(categories.designKits) : KIT_PREVIEWS;
  const freebiePreviews: NavFreebie[] = catalogue
    ? catalogue.getFreebiePreviews(categories.freebies)
    : navData.freebies;

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
    href: item.category ? `/blog?category=${encodeURIComponent(item.category)}` : "/blog",
    isActive: categories.tutorials === item.category,
  }));

  const freebieCategories: MegaMenuCategory[] = NAV_FREEBIE_CATEGORIES.map((item) => ({
    key: item.label,
    label: item.label,
    value: item.category,
    href: item.category ? `/freebies?category=${encodeURIComponent(item.category)}` : "/freebies",
    isActive: categories.freebies === item.category,
  }));

  // "All" leads to /all, so it is never highlighted as the hovered category.
  const kitCategories: MegaMenuCategory[] = DESIGN_KITS.map((link) => ({
    key: link.href,
    label: link.label,
    value: link.category,
    href: link.href,
    isActive: link.category !== null && categories.designKits === link.category,
  }));

  return (
    <div
      ref={navbarRef}
      className={`navbar w-nav${isMobileNavOpen ? " is-mobile-open" : ""}${menu.isSwitching ? " is-switching" : ""}`}
      data-collapse="medium"
      role="banner"
    >
      <div className="container">
        <div className="nav-wrapper div-block">
          <div className="brand">
            <img alt="" className="nav_logo-image" loading="lazy" src="/images/Vectors-Wrapper.svg" />
            <a className="brand-link w-inline-block" href="/" />
          </div>

          <nav
            className={`nav-menu w-nav-menu${isMobileNavOpen ? " is-mobile-open" : ""}`}
            role="navigation"
            onClickCapture={handleNavClickCapture}
            onPointerEnter={loadCatalogue}
            onFocus={loadCatalogue}
          >
            <div className="nav-menu-inner">
              <div className="nav-menu-links-wr">
                {hasInspiration ? (
                  <MegaMenuPanel
                    menu="inspiration"
                    state={menu}
                    label={inspirationLabel}
                    labelStyle={INSPIRATION_LABEL_STYLE}
                    // Off-site section: "current" is purely the open-menu highlight.
                    isCurrent={false}
                    toggleHref={withUtm(INSPIRATION_HOME)}
                    toggleAriaLabel={INSPIRATION_ARIA_LABEL}
                    external
                    formName="email-form-nav-inspiration"
                    listKeyPrefix="inspiration"
                    categories={inspirationCategories}
                  >
                    {getInspirationPreviews(shuffledInspiration, categories.inspiration).map((item) => (
                      <MegaMenuCard
                        key={item.id}
                        href={withUtm(item.href)}
                        title={item.title}
                        description={item.description}
                        external
                        media={<InspirationThumb href={withUtm(item.href)} image={item.image} />}
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
                    <div className="text-size-regular" style={INSPIRATION_LABEL_STYLE}>
                      {inspirationLabel}
                    </div>
                  </a>
                )}

                <MegaMenuPanel
                  menu="tutorials"
                  state={menu}
                  label="Learn"
                  isCurrent={isTutorialsActive}
                  toggleHref="/blog"
                  toggleAriaLabel="Learn — blog and tutorials"
                  formName="email-form-nav-1"
                  listKeyPrefix="tutorials"
                  categories={blogCategories}
                >
                  {getBlogPreviews(navBlog, categories.tutorials).map((item) => (
                    <MegaMenuCard
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      title={item.title}
                      description={item.description}
                      media={
                        <MegaMenuCardMedia href={`/blog/${item.slug}`}>
                          <img alt="" src={item.thumbImage} loading="lazy" decoding="async" className="image-cover" />
                        </MegaMenuCardMedia>
                      }
                      actions={
                        <a className="button-x-small is-text w-inline-block" href={`/blog/${item.slug}`}>
                          <div className="text-size-regular text-weight-bold">Read more</div>
                        </a>
                      }
                    />
                  ))}
                </MegaMenuPanel>

                <MegaMenuPanel
                  menu="freebies"
                  state={menu}
                  label="Resources"
                  isCurrent={isFreebiesActive}
                  toggleHref="/freebies"
                  toggleAriaLabel="Resources"
                  formName="email-form-nav-3"
                  listKeyPrefix="freebies"
                  categories={freebieCategories}
                >
                  {freebiePreviews.map((item) => (
                    <MegaMenuCard
                      key={item.slug}
                      href={item.previewHref}
                      title={item.title}
                      description={item.description}
                      media={
                        <MegaMenuCardMedia href={item.previewHref}>
                          <Image alt="" src={item.thumb} fill sizes="158px" className="image-cover" />
                        </MegaMenuCardMedia>
                      }
                      actions={
                        <>
                          <a className="button-x-small is-secondary w-inline-block" href={item.duplicateHref} rel="noreferrer" target="_blank">
                            <div className="text-size-regular text-weight-bold">{item.menuCtaLabel ?? item.ctaLabel ?? (item.isFree ? "Duplicate" : "Buy")}</div>
                          </a>
                          <a className="button-x-small is-text w-inline-block" href={item.previewHref}>
                            <div className="text-size-regular text-weight-bold">Preview</div>
                          </a>
                        </>
                      }
                    />
                  ))}
                </MegaMenuPanel>

                <MegaMenuPanel
                  menu="designKits"
                  state={menu}
                  label="UI Kits"
                  isCurrent={isDesignKitsActive}
                  toggleHref="/all"
                  toggleAriaLabel="UI kits"
                  formName="email-form-nav-2"
                  listKeyPrefix="kits"
                  categories={kitCategories}
                >
                  {kitPreviews.map((item) => (
                    <MegaMenuCard
                      key={item.href}
                      href={item.href}
                      title={item.title}
                      description={item.description}
                      media={
                        <MegaMenuCardMedia href={item.href}>
                          <Image alt="" src={item.image} fill sizes="158px" className="image-cover" />
                        </MegaMenuCardMedia>
                      }
                      actions={
                        <>
                          <a href={item.buyHref} {...getGumroadLinkProps(item.buyHref, "button-x-small is-secondary w-inline-block")}>
                            <div className="text-size-regular text-weight-bold">{item.buyLabel}</div>
                          </a>
                          <a className="button-x-small is-text w-inline-block" href={item.href}>
                            <div className="text-size-regular text-weight-bold">Learn more</div>
                          </a>
                        </>
                      }
                    />
                  ))}
                </MegaMenuPanel>

                <CompanyPanel state={menu} isCurrent={isInformationActive} onContact={openContactModal} />
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
                    <img alt="" className="search-icon" loading="lazy" src="/images/search.svg" />
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
              <img alt="" className="menu-button-img is-burger" loading="lazy" src="/images/menu.svg" />
              <img alt="" className="menu-button-img is-close" loading="lazy" src="/images/close.svg" />
            </div>
          </button>

          <div className="nav-button-wr">
            <NavSearch />
            <div className="relative inline-flex items-center">
              <a
                className="button-small outlined w-inline-block"
                href="https://publish.setproduct.com/"
                rel="noreferrer"
                target="_blank"
                aria-label="Write for Us — publish your article on Setproduct"
              >
                <div className="text-size-medium text-weight-bold">Write for Us</div>
              </a>
              {/* Temporarily disabled — kept for potential future use. */}
              {/* <LaunchAppCallout /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
