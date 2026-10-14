"use client";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Link from "next/link";

type Props = {
  slug: string;
};

type ArticleHeading = {
  id: string;
  text: string;
};

const DRIVER_JS_HEADINGS: ArticleHeading[] = [
  { id: "what-driver-js-does", text: "What driver.js actually does" },
  { id: "why-onboarding", text: "Why onboarding is the thing you postpone" },
  { id: "how-it-works", text: "How it works under the hood" },
  { id: "size-argument", text: "The size argument that matters" },
  { id: "more-than-tours", text: "More than tours" },
  { id: "wiring-into-ai-app", text: "Wiring it into an AI-built app" },
  { id: "why-it-belongs", text: "Why it belongs in your stack" },
];

const M3E_CANVAS_HEADINGS: ArticleHeading[] = [
  { id: "what-m3e-canvas-does", text: "What M3E Canvas actually does" },
  { id: "material-3-expressive", text: "Why Material 3 Expressive matters" },
  { id: "how-prompt-works", text: "How the prompt export works" },
  { id: "vibe-coding", text: "Fitting it into vibe coding" },
  { id: "what-you-build", text: "What you can build with it" },
  { id: "open-source", text: "Free, open source, no lock-in" },
  { id: "why-it-belongs-m3e", text: "Why it belongs in your workflow" },
];

const PDFCN_HEADINGS: ArticleHeading[] = [
  { id: "what-pdfcn-does", text: "What pdfcn actually does" },
  { id: "why-pdf-in-react", text: "Why PDF in React is harder than it looks" },
  { id: "shadcn-stack", text: "Built on the shadcn stack" },
  { id: "how-pdfcn-works", text: "How it works under the hood" },
  { id: "wiring-into-ai-app-pdfcn", text: "Wiring it into an AI-built app" },
  { id: "open-source-pdfcn", text: "Free, open source, no lock-in" },
  { id: "why-it-belongs-pdfcn", text: "Why it belongs in your stack" },
];

const AMICRO_HEADINGS: ArticleHeading[] = [
  { id: "what-amicro-does", text: "What Amicro actually does" },
  { id: "why-micro-interactions-matter", text: "Why micro-interactions decide how a page feels" },
  { id: "what-ships-in-the-box", text: "What ships in the box" },
  { id: "how-to-add-one", text: "How to add one in five minutes" },
  { id: "motion-without-bloat", text: "Motion without the performance tax" },
  { id: "accessible-by-default", text: "Accessible by default" },
  { id: "faq-amicro", text: "Frequently asked questions" },
  { id: "why-it-belongs-amicro", text: "Why it belongs in your build" },
];

const RUNEICONS_HEADINGS: ArticleHeading[] = [
  { id: "what-runeicons-does", text: "What RuneIcons actually does" },
  { id: "why-icon-consistency", text: "Why icon consistency decides the whole interface" },
  { id: "what-is-inside", text: "What is inside the set" },
  { id: "how-to-use-icons", text: "How to get the icons into your project" },
  { id: "icons-in-figma-and-code", text: "One set across Figma and code" },
  { id: "licensing-and-customization", text: "Licensing and customization" },
  { id: "faq-runeicons", text: "Frequently asked questions" },
  { id: "why-it-belongs-runeicons", text: "Why it belongs in your stack" },
];

const SFINTERFACE_NUMBERS_HEADINGS: ArticleHeading[] = [
  { id: "what-sfinterface-numbers-does", text: "What @sfinterface/numbers does" },
  { id: "why-static-numbers-feel-dead", text: "Why a number that jumps feels broken" },
  { id: "how-the-columns-work", text: "How the columns work" },
  { id: "formatting-with-intl", text: "Formatting comes from Intl" },
  { id: "five-transitions", text: "Five transitions, one prop" },
  { id: "theming-and-inheritance", text: "Theming and inherited type" },
  { id: "accessible-by-default", text: "Accessible by default" },
  { id: "faq-sfinterface-numbers", text: "Frequently asked questions" },
  { id: "why-it-belongs-numbers", text: "Why it belongs in your stack" },
];

const FSEARCH_HEADINGS: ArticleHeading[] = [
  { id: "what-fsearch-does", text: "What fsearch actually does" },
  { id: "why-spotlight-falls-short", text: "Why Spotlight leaves gaps on a full disk" },
  { id: "how-the-index-works", text: "How the index stays fast" },
  { id: "the-query-language", text: "The query language worth learning" },
  { id: "full-disk-access", text: "The one permission it needs" },
  { id: "cli-crate-and-socket", text: "Three ways into the same index" },
  { id: "faq-fsearch", text: "Frequently asked questions" },
  { id: "why-it-belongs-fsearch", text: "Why it belongs in your toolkit" },
];

const REA_HEADINGS: ArticleHeading[] = [
  { id: "what-rea-does", text: "What REA actually does" },
  { id: "why-building-blind", text: "Why building a feature blind is expensive" },
  { id: "how-mcp-bridge-works", text: "How the MCP bridge works" },
  { id: "what-you-can-analyze", text: "What you can point it at" },
  { id: "evidence-with-limits", text: "Evidence, not raw output" },
  { id: "choosing-a-provider", text: "Choosing a deep analysis provider" },
  { id: "local-by-default", text: "Local by default" },
  { id: "faq-rea", text: "Frequently asked questions" },
  { id: "why-it-belongs-rea", text: "Why it belongs in your stack" },
];

const LIQUID_GLASS_HEADINGS: ArticleHeading[] = [
  { id: "what-liquid-glass-does", text: "What Liquid Glass actually does" },
  { id: "why-real-refraction", text: "Why live refraction beats a CSS blur" },
  { id: "how-it-renders", text: "How it renders glass on the web" },
  { id: "materials-and-motion", text: "How materials and motion work" },
  { id: "components-in-the-box", text: "What ships in the box" },
  { id: "requirements", text: "What it needs to run" },
  { id: "faq-liquid-glass", text: "Frequently asked questions" },
  { id: "why-it-belongs-liquid-glass", text: "Why it belongs in your stack" },
];

const MAILCHEAP_HEADINGS: ArticleHeading[] = [
  { id: "what-mailcheap-does", text: "What Mailcheap actually does" },
  { id: "why-subscriber-pricing-hurts", text: "Why subscriber pricing hurts as your list grows" },
  { id: "how-sending-works", text: "How sending works under the hood" },
  { id: "what-ships-in-the-box", text: "What ships in the box" },
  { id: "health-checks", text: "The health checks that keep you out of the spam folder" },
  { id: "setup", text: "Setting it up in an afternoon" },
  { id: "faq-mailcheap", text: "Frequently asked questions" },
  { id: "why-it-belongs-mailcheap", text: "Why it belongs in your stack" },
];

const COMPOSITOR_HEADINGS: ArticleHeading[] = [
  { id: "comp-what-it-does", text: "What Compositor actually does" },
  { id: "comp-photoshop-habit", text: "Why the Photoshop habit is hard to break" },
  { id: "comp-psd-and-shortcuts", text: "Photoshop files and shortcuts still work" },
  { id: "comp-agent-format", text: "A project format AI agents can write" },
  { id: "comp-what-ships", text: "What ships in the box" },
  { id: "comp-limits", text: "Limits to weigh before you install" },
  { id: "comp-faq", text: "Frequently asked questions" },
  { id: "comp-why-it-belongs", text: "Why it belongs on your Mac" },
];

const SPECTRUM_UI_HEADINGS: ArticleHeading[] = [
  { id: "what-spectrum-ui-does", text: "What Spectrum UI actually does" },
  { id: "why-copy-paste-components", text: "Why copy-paste components change the workflow" },
  { id: "what-ships-spectrum-ui", text: "What ships in the box" },
  { id: "how-the-cli-adds-a-component", text: "How the CLI adds a component" },
  { id: "motion-on-top-of-tailwind", text: "Motion on top of Tailwind" },
  { id: "faq-spectrum-ui", text: "Frequently asked questions" },
  { id: "why-it-belongs-spectrum-ui", text: "Why it belongs in your stack" },
];

const ARTICLE_HEADINGS: Record<string, ArticleHeading[]> = {
  "driver-js": DRIVER_JS_HEADINGS,
  "m3e-canvas": M3E_CANVAS_HEADINGS,
  pdfcn: PDFCN_HEADINGS,
  amicro: AMICRO_HEADINGS,
  runeicons: RUNEICONS_HEADINGS,
  "sfinterface-numbers": SFINTERFACE_NUMBERS_HEADINGS,
  fsearch: FSEARCH_HEADINGS,
  rea: REA_HEADINGS,
  "liquid-glass": LIQUID_GLASS_HEADINGS,
  mailcheap: MAILCHEAP_HEADINGS,
  compositor: COMPOSITOR_HEADINGS,
  "spectrum-ui": SPECTRUM_UI_HEADINGS,
};

/**
 * Long-form body content for specific freebie detail pages.
 * Rendered between the breadcrumbs and the "More Figma freebies" showcase.
 * Reuses the blog two-column layout: sticky navigation on the left,
 * rich-text body on the right. Add a new branch per slug when a freebie
 * needs an editorial article.
 */
export default function FreebieArticle({ slug }: Props) {
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [stickyStyle, setStickyStyle] = useState<CSSProperties>({});
  const [activeId, setActiveId] = useState<string>("");

  const headings = ARTICLE_HEADINGS[slug] ?? [];
  const hasArticle = headings.length > 0;

  useEffect(() => {
    if (!hasArticle) return;
    const checkMobile = () => {
      const mobile = window.innerWidth < 991;
      setIsMobile(mobile);
      if (mobile) setStickyStyle({});
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [hasArticle]);

  useEffect(() => {
    if (!hasArticle || isMobile) {
      setStickyStyle({});
      return;
    }

    const inner = innerRef.current;
    const container = contentSectionRef.current;
    const wrapper = inner?.parentElement;
    if (!inner || !container || !wrapper) return;

    const topOffset = 80;

    const calculate = () => {
      if (!inner || !container || !wrapper) return;
      const wrapperRect = wrapper.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const innerHeight = inner.scrollHeight;
      const containerTop = containerRect.top;
      const containerBottom = containerRect.bottom;
      const stickyBottom = topOffset + innerHeight;

      if (containerTop >= topOffset) {
        setStickyStyle({});
      } else if (containerBottom <= stickyBottom) {
        setStickyStyle({
          position: "fixed",
          top: containerBottom - innerHeight,
          left: wrapperRect.left,
          width: wrapperRect.width,
        });
      } else {
        setStickyStyle({
          position: "fixed",
          top: topOffset,
          left: wrapperRect.left,
          width: wrapperRect.width,
        });
      }
    };

    const handleScroll = () => requestAnimationFrame(calculate);
    const handleResize = () => calculate();

    calculate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [hasArticle, isMobile]);

  useEffect(() => {
    if (!hasArticle) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [hasArticle, headings]);

  if (!hasArticle) return null;

  return (
    <div className="section">
      <div className="section-padding top-64 bottom-64">
        <div className="container">
          <div className="blogpost_content-section" ref={contentSectionRef}>
            <div className="blogpost_content-column1">
              <div ref={innerRef} style={{ ...stickyStyle, transition: "none" }}>
                <div className="hide-on-mobile">
                  <p className="text-size-medium text-weight-bold">Navigation</p>
                </div>
                <div className="spacer-16 hide-on-mobile" />
                <div className="blogpost_navigation-wr">
                  {headings.map((h) => (
                    <div key={h.id} className="blogpost_navigation-link-wr">
                      <a
                        href={`#${h.id}`}
                        className={`blogpost_navigation-link w-inline-block${
                          activeId === h.id ? " fs-cmsfilter_active" : ""
                        }`}
                      >
                        <p>{h.text}</p>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="blogpost_content-column2">
              <article className="rich-text-18 w-richtext">
                {slug === "liquid-glass" && (
                  <>
                <p className="blog_big-paragraph">
                  You want the interface to feel like glass, where the surface
                  bends what sits behind it and the controls stay legible on
                  top. Most web glass stops at a translucent panel and a
                  backdrop blur. Liquid Glass goes a step further and refracts
                  the content behind every surface in real time, so a button
                  over a photo bends the photo the way materials do on Apple
                  platforms.
                </p>

                <h2 id="what-liquid-glass-does">
                  What Liquid Glass actually does
                </h2>
                <p>
                  Liquid Glass is an open source library that renders glass
                  surfaces and controls for React on the web and in Electron.
                  Each surface reads the live DOM behind it, displaces that
                  content through a refraction value, and keeps text and icons
                  crisp on top. Two materials cover the range: Clear for a
                  light, transparent look, Regular for a denser frost. Both
                  support light and dark appearances, and the{" "}
                  <code>tint</code> prop colors the glass without changing the
                  label.
                </p>
                <p>
                  The set is not a folder of static images. Buttons, toolbars,
                  and tabs all respond to pointer and keyboard input. Standard
                  props and refs stay available, along with accessible names and
                  state callbacks, so the components drop into an existing app
                  without a rewrite.
                </p>

                <h2 id="why-real-refraction">
                  Why live refraction beats a CSS blur
                </h2>
                <p>
                  Glassmorphism on the web usually means{" "}
                  <code>backdrop-filter: blur()</code> over a semi-transparent
                  fill. That reads as glass until the layout moves. The blur is
                  uniform, so it ignores the shape of the light and the depth of
                  the content behind it. A card over an image looks the same
                  whether that image is bright or dark.
                </p>
                <p>
                  Liquid Glass samples the content behind a surface and bends
                  it. That displacement is what gives the material its
                  thickness. Edges pick up a soft highlight, nested surfaces
                  limit their refraction to the parent inset, and the content
                  under the glass stays live instead of turning into a flat
                  panel.
                </p>

                <h2 id="how-it-renders">How it renders glass on the web</h2>
                <p>
                  The library splits the work between the GPU and SVG filters.
                  WGSL shaders render material maps, and SVG filters apply those
                  maps to live DOM content. Maps are cached and reused as
                  surfaces move, and a geometry change prepares a new map. The
                  library never captures a screenshot, so a video or a chart
                  keeps animating underneath a glass surface, and so does a
                  canvas.
                </p>
                <p>
                  The same scene model works in React and outside it. In React
                  you wrap content in <code>GlassScene</code> and{" "}
                  <code>GlassContent</code>, then place surfaces on top. Outside
                  React, <code>createGlassScene</code> from the{" "}
                  <code>/dom</code> export builds the same structure by hand, so
                  a plain page or a small Electron shell can use it too.
                </p>

                <h2 id="materials-and-motion">
                  How materials and motion work
                </h2>
                <p>
                  Defaults live on <code>GlassScene</code>, and any surface can
                  override them. The props that shape the look are small in
                  number:
                </p>
                <ul>
                  <li>
                    <code>material</code> → <code>"clear"</code> or{" "}
                    <code>"regular"</code>
                  </li>
                  <li>
                    <code>appearance</code> → <code>"light"</code> or{" "}
                    <code>"dark"</code>
                  </li>
                  <li>
                    <code>radius</code> → corner radius in pixels, or{" "}
                    <code>"capsule"</code> and <code>"circle"</code>
                  </li>
                  <li>
                    <code>refraction</code> → displacement in pixels, default{" "}
                    <code>60</code>
                  </li>
                  <li>
                    <code>tint</code> → a six-digit hex color for the glass
                    alone
                  </li>
                </ul>
                <p>
                  The <code>motion</code> prop accepts <code>"full"</code> or{" "}
                  <code>"reduced"</code>, and <code>"none"</code> for a hard
                  stop. System reduced-motion preferences always apply. The{" "}
                  <code>fluid</code> prop animates the outline when a layout
                  dimension changes, and <code>morphFrom</code> lets a surface
                  open from the shape of another element. Override styles with{" "}
                  <code>className</code> or the <code>--lg-foreground</code>{" "}
                  variable when text and icons need to shift.
                </p>

                <h2 id="components-in-the-box">What ships in the box</h2>
                <p>
                  The package covers the controls most interfaces need, all on
                  the same material system:
                </p>
                <ul>
                  <li>
                    <code>GlassScene</code> and <code>GlassContent</code> for the
                    scene and its live background layer
                  </li>
                  <li>
                    <code>GlassSurface</code> and <code>GlassButton</code> for
                    containers and buttons
                  </li>
                  <li>
                    <code>GlassToolbar</code> with buttons and links, plus groups
                    and a spacer
                  </li>
                  <li>
                    <code>GlassTabs</code> with a moving selection indicator,
                    plus a composable root and panel set
                  </li>
                  <li>
                    <code>GlassMenu</code> with submenus, plus focus restoration
                    and positioning
                  </li>
                  <li>
                    <code>GlassSlider</code> and <code>GlassSwitch</code> for
                    input
                  </li>
                  <li>
                    <code>GlassProgressiveBlur</code> and{" "}
                    <code>GlassScrollEdges</code> for scroll context
                  </li>
                </ul>
                <p>
                  Foreground content that should refract under a higher surface
                  uses <code>GlassForeground</code> or the{" "}
                  <code>useGlassForeground</code> hook. Geometry helpers like{" "}
                  <code>GlassShape</code> and <code>GlassCorner</code> keep
                  nested corners concentric without a scene.
                </p>

                <h2 id="requirements">What it needs to run</h2>
                <p>
                  The React components require React 19 or newer. Rendering the
                  material maps needs HTTPS or localhost and an available WebGPU
                  adapter, while progressive blur works without WebGPU. The
                  project tests against Chromium and Firefox, with Safari and
                  Electron on the same list, and performance differs between
                  them. Safari can take longer to filter large content layers, so
                  test animated menus on the devices you support.
                </p>
                <p>
                  A scene holds up to <code>maxSurfaces</code>, which defaults
                  to <code>16</code>. NodeNext TypeScript consumers need{" "}
                  <code>skipLibCheck: true</code> for the upstream vgpu
                  declarations. For clean refraction in Safari, give{" "}
                  <code>GlassContent</code> an opaque background. The project is
                  MIT licensed.
                </p>

                <h2 id="faq-liquid-glass">Frequently asked questions</h2>
                <h3>Do I need WebGPU to use it?</h3>
                <p>
                  Only for the glass material maps. Progressive blur renders
                  without WebGPU, so a scene that leans on blur alone runs on
                  more machines. When a material map cannot be prepared, the
                  content stays readable and <code>onDiagnostic</code> reports
                  the error.
                </p>
                <h3>Does it work outside React?</h3>
                <p>
                  Yes. The <code>/dom</code> export exposes{" "}
                  <code>createGlassScene</code>, and the lower-level exports
                  give you geometry and rendering APIs for custom integrations.
                  React is the shortest path, not the only one.
                </p>
                <h3>Will it look the same in every browser?</h3>
                <p>
                  Close, but the engines differ. Firefox draws each surface as
                  its own filtered layer, and Safari can spend more time
                  filtering large layers than Chromium. The materials and motion
                  settings stay the same across browsers, so the look holds
                  while the performance varies.
                </p>
                <h3>Is it free for commercial work?</h3>
                <p>
                  Yes. Liquid Glass is MIT licensed, so you use it in personal
                  and commercial projects without paying anyone or asking
                  permission.
                </p>

                <h2 id="why-it-belongs-liquid-glass">
                  Why it belongs in your stack
                </h2>
                <p>
                  If you already want glass in your interface, this saves the
                  weeks you would spend writing shaders and SVG filter graphs
                  from scratch. You install one package, import one stylesheet,
                  then wrap a scene. The controls arrive accessible through Base
                  UI, the motion respects user preferences, and the material
                  reads the live page instead of a frozen copy.
                </p>
                <p>
                  It pairs with the reading on this site. The{" "}
                  <Link href="/blog/liquid-glass-design-explained-a-practical-guide">
                    practical guide to liquid glass
                  </Link>{" "}
                  covers the visual language, and the{" "}
                  <Link href="/blog/liquid-glass-vs-glassmorphism">
                    liquid glass vs glassmorphism
                  </Link>{" "}
                  comparison explains where the plain blur falls short. When you
                  want the rest of the interface to match, the other{" "}
                  <Link href="/freebies">free code resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for
                  the same fast, solo workflow.
                </p>
                  </>
                )}

                {slug === "driver-js" && (
                  <>
                <p className="blog_big-paragraph">
                  You shipped the app. The AI wrote half the code. The feature
                  works. Then the first real user opens it, stares at the screen,
                  and leaves before they find the one button that mattered.
                  Driver.js closes that gap with a single small file and a list
                  of steps.
                </p>

                <h2 id="what-driver-js-does">What driver.js actually does</h2>
                <p>
                  Driver.js highlights any element on a page, dims everything
                  else, and walks the user through your interface one step at a
                  time. You point it at a button, a menu, or a form field. It
                  draws a spotlight around that element, shows a small popover
                  with your text, and waits. The user clicks next, the spotlight
                  moves, and the next idea lands. That is the whole mechanic, and
                  it covers most of what onboarding needs.
                </p>
                <p>
                  The library ships as vanilla TypeScript with zero
                  dependencies. It weighs around 5kb gzipped. It runs in every
                  major browser, responds to the keyboard, and carries an MIT
                  license, so you use it in personal and commercial work without
                  paying anyone or asking permission. The numbers back the
                  adoption: roughly 4.3 million downloads a month and 287 million
                  jsDelivr hits a month.
                </p>

                <h2 id="why-onboarding">
                  Why onboarding is the thing you postpone
                </h2>
                <p>
                  Onboarding is the distance between &ldquo;it works&rdquo; and
                  &ldquo;people use it.&rdquo; Most solo founders skip it because
                  the usual options feel heavy. A full product-tour SaaS wants a
                  monthly fee and a script tag that loads a chunk of someone
                  else&rsquo;s framework. A hand-built tour eats a weekend you do
                  not have. So the tour never ships, and new users keep churning
                  on day one.
                </p>
                <p>
                  Driver.js removes that excuse. You add one file. You write a
                  list of steps. You point each step at a CSS selector. The first
                  session now ends with a user who understands the product
                  instead of one who guessed and gave up.
                </p>

                <h2 id="how-it-works">How it works under the hood</h2>
                <p>
                  A tour in driver.js is an array of steps. Each step names an
                  element on the page and the text you want beside it:
                </p>
                <ul>
                  <li>
                    <code>element</code> → the CSS selector you want to highlight
                  </li>
                  <li>
                    <code>popover</code> → the title and description shown next
                    to it
                  </li>
                  <li>
                    <code>side</code> and <code>align</code> → where the popover
                    sits relative to the element
                  </li>
                </ul>
                <p>
                  You pass that array to a <code>driver()</code> call and run{" "}
                  <code>drive()</code>. The library handles the overlay, the
                  focus trap, the keyboard arrows, and the next and previous
                  buttons. You write copy and selectors. It handles the rest.
                </p>
                <p>
                  The part that makes it flexible is the hooks. Driver.js gives
                  you callbacks for the moment an element is about to be
                  highlighted, the moment it gets highlighted, and the moment it
                  is deselected. You use those hooks to change the page as the
                  tour moves. Open a dropdown right before you point at an item
                  inside it. Load chart data before you highlight the chart.
                  Scroll a hidden panel into view. The tour and your app stay in
                  step instead of fighting each other.
                </p>

                <h2 id="size-argument">The size argument that matters</h2>
                <p>
                  Five kilobytes sounds like a detail. It is not. Every script
                  you add to onboarding loads before the user has done anything
                  useful. A 12kb-plus tour library competes with your own app for
                  that first second. Driver.js is roughly half the weight of the
                  common alternatives, and it pulls in nothing else. No React
                  requirement, no framework lock-in.
                </p>
                <p>
                  It drops into a Next.js app, a plain HTML page, or whatever the
                  model generated for you, and it behaves the same way in each.
                  That consistency is worth more than it looks: you write the
                  tour once and trust it across browsers rather than chasing edge
                  cases one device at a time.
                </p>

                <h2 id="more-than-tours">More than tours</h2>
                <p>
                  Calling it a tour library undersells it. A tour is one use
                  case. The same spotlight mechanic covers a lot of ground:
                </p>
                <ul>
                  <li>
                    ❶ Point at a single new feature and explain it in one popover
                  </li>
                  <li>
                    ❷ Open contextual help with the rest of the page dimmed
                  </li>
                  <li>
                    ❸ Shift focus to one form field so the user finishes signup
                  </li>
                  <li>
                    ❹ Build a &ldquo;turn off the lights&rdquo; widget that
                    frames any section
                  </li>
                  <li>❺ Drive a simple modal without writing modal code</li>
                </ul>
                <p>
                  You learn one API and reuse it for half a dozen jobs you would
                  otherwise solve with separate libraries and separate bugs.
                </p>

                <h2 id="wiring-into-ai-app">Wiring it into an AI-built app</h2>
                <p>
                  If you built your product by prompting an AI, this fits your
                  workflow. You do not need to master a framework. You need three
                  things: the file, a list of selectors, and your copy.
                </p>
                <p>
                  Ask your assistant to install driver.js, then describe the path
                  in plain language. &ldquo;Highlight the new-project button
                  first, then the share menu, then the export icon.&rdquo; Paste
                  the selectors it returns. Write the popover text yourself,
                  because that text is your product voice and the model does not
                  know it yet. Trigger the tour the first time someone logs in,
                  store a flag in local storage so it runs once, and you have
                  onboarding that plenty of funded startups still skip.
                </p>

                <h2 id="why-it-belongs">Why it belongs in your stack</h2>
                <p>
                  You care about activation. You want the first session to end
                  with a user who gets the product. Driver.js gives you that for
                  the price of one small file and an afternoon of writing steps.
                  It is free, it is light, it is written in TypeScript, and it
                  works the same in every browser.
                </p>
                <p>
                  For a solo founder shipping fast with AI, that combination is
                  rare. Grab the code, point it at your three most important
                  buttons, and watch how many more users make it past the first
                  screen. When you want the interface those tours point at to
                  look sharp, the rest of our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for
                  the same fast, solo-founder workflow.
                </p>
                  </>
                )}

                {slug === "mailcheap" && (
                  <>
                <p className="blog_big-paragraph">
                  You write an issue. You hit send. Somewhere between the draft
                  and the reader, a newsletter platform bills you for every
                  subscriber on your list, whether or not that subscriber opens
                  anything. Mailcheap moves the whole newsletter onto your own
                  Amazon SES account, so you pay for the emails you send and keep
                  the list in your own database.
                </p>

                <h2 id="what-mailcheap-does">What Mailcheap actually does</h2>
                <p>
                  Mailcheap is a self-hosted newsletter app you deploy once. It
                  holds an editor, a contact list, signup forms, unsubscribe
                  handling and a public archive. You write a campaign, send it to
                  your contacts through SES, and publish the same issue as a web
                  page. One admin runs the whole thing. No teams, no seat
                  upgrades, no plans that scale with your subscriber count.
                </p>
                <p>
                  It is a one-time open source release by Marc Lou, MIT licensed.
                  The README is direct about the trade: issues are closed and
                  setup questions go unanswered. You fork it and deploy it, then
                  make it yours. That fits a builder who prefers to own the stack
                  and read the code instead of filing a ticket.
                </p>

                <h2 id="why-subscriber-pricing-hurts">
                  Why subscriber pricing hurts as your list grows
                </h2>
                <p>
                  Managed platforms price on how many subscribers you keep. A
                  10,000-name list costs the same on the first of the month
                  whether you sent one issue or four. Your bill grows with your
                  audience, and your audience is the whole point of the work.
                </p>
                <p>
                  Amazon SES prices on what you send. The README runs the numbers
                  plainly: 10,000 readers and four issues a month is 40,000
                  emails, which lands near $4 at about $0.10 per 1,000 emails.
                  The rest of the stack has free tiers for a newsletter that size,
                  MongoDB Atlas for storage and Upstash QStash for scheduling.
                  The saving is not because the software is worse, it is because
                  the pricing follows usage instead of headcount.
                </p>
                <p>
                  ☞ The saving comes from the billing model. You pay for the
                  emails you send, so a quiet month costs less than a busy one.
                </p>

                <h2 id="how-sending-works">How sending works under the hood</h2>
                <p>
                  A send picks the audience first. Active contacts go out,
                  suppressions stay in, and the most engaged readers are ordered
                  to the front so a fresh domain warms up on people who actually
                  open. The app turns that list into one message per reader and
                  queues a QStash job for each batch of 50.
                </p>
                <p>
                  Each job hands the batch to the SES v2 API at the rate you set,
                  between 1 and 14 emails a second, and 10 by default. If bounces
                  pass 2% or complaints pass 0.08%, the job pauses the campaign on
                  its own before the next batch goes out. SES publishes its events
                  to an SNS topic, which posts them to the app. The app checks the
                  SNS signature, updates the message and the campaign stats, plus
                  the contact, then adds bounced and complaining addresses to a
                  suppression list shared by every newsletter on the install.
                </p>

                <h2 id="what-ships-in-the-box">What ships in the box</h2>
                <p>
                  The package covers the jobs a newsletter actually needs:
                </p>
                <ul>
                  <li>
                    ❶ An editor with a live email preview and slash commands, plus
                    image uploads, with Markdown and raw HTML when you want them
                  </li>
                  <li>
                    ❷ Checks before every send: subject, preview text, unsubscribe
                    link, size under Gmail&rsquo;s 100 KB clip, postal address and
                    a verified domain
                  </li>
                  <li>
                    ❸ Test emails and scheduling, plus sending in steps that start
                    with your most engaged readers
                  </li>
                  <li>
                    ❹ Several newsletters in one install, each with its own from
                    address, reply-to and postal address
                  </li>
                  <li>
                    ❺ A signup form on each archive, plus a signup API with API
                    keys
                  </li>
                  <li>
                    ❻ Confirmed opt-in per newsletter, a welcome email, and rate
                    limits on signups and the API
                  </li>
                  <li>
                    ❼ A public archive per newsletter with issue pages and a
                    sitemap, plus an author page and share images
                  </li>
                  <li>
                    ❽ A contacts view with search and status filters, plus CSV
                    import from any platform
                  </li>
                  <li>
                    ❾ A domains page that shows each SES identity&rsquo;s DKIM and
                    MAIL FROM status with the DNS records to add
                  </li>
                </ul>
                <p>
                  One Next.js app wired to MongoDB and SES runs all of it. The
                  dashboard has a single login, and the contact list never leaves
                  your database.
                </p>

                <h2 id="health-checks">
                  The health checks that keep you out of the spam folder
                </h2>
                <p>
                  Deliverability is where most self-hosted senders get burned, so
                  Mailcheap builds the guardrails in. SES publishes deliveries and
                  complaints to an SNS topic; Mailcheap verifies the SNS signature
                  before it trusts any of it.
                </p>
                <p>The guardrails worth knowing about:</p>
                <p>
                  → Suppression is shared across every newsletter, so one bad
                  address cannot be emailed twice
                </p>
                <p>
                  → A send pauses itself once complaints pass 0.08% or bounces
                  pass 2%
                </p>
                <p>
                  → Every email carries one-click unsubscribe headers per RFC 8058
                  with signed links, which Gmail and Yahoo expect from bulk
                  senders
                </p>
                <p>
                  → List cleanup is off by default and can ask readers who ignored
                  several issues whether they still want the list, then stop
                </p>
                <p>
                  Open and click tracking runs on your own domain. Clicks within
                  30 seconds of the send, or from known link scanners, do not
                  count.
                </p>

                <h2 id="setup">Setting it up in an afternoon</h2>
                <p>
                  Setup takes about an hour, and most of that hour is waiting for
                  DNS and for AWS to approve production access. Four moving parts:
                </p>
                <ul>
                  <li>❶ A MongoDB cluster holding your contacts and campaigns</li>
                  <li>
                    ❷ An SES sending domain with DKIM and a custom MAIL FROM
                    domain
                  </li>
                  <li>❸ A QStash token for background sending</li>
                  <li>❹ A host, on Vercel or any Node.js server</li>
                </ul>
                <p>
                  From there it is four values in Vercel, a verified domain in SES
                  and a QStash token. The README walks through the DNS records
                  line by line. Sending stays off until you flip{" "}
                  <code>SENDING_ENABLED</code> to <code>true</code>, so nothing
                  can leak out during setup. If you would rather not manage any of
                  it, the{" "}
                  <Link href="/blog/solo-founder-tech-stack-2026">
                    solo founder tech stack
                  </Link>{" "}
                  is a good place to see which pieces a small team runs on
                  purpose.
                </p>

                <h2 id="faq-mailcheap">Frequently asked questions</h2>
                <h3>Do I need to code to run it?</h3>
                <p>
                  No. You need to paste four values into Vercel and copy some DNS
                  records, and the README labels each one. If you can follow a
                  hosting tutorial, you can ship this. Reading code only helps
                  when you want to change how it works.
                </p>
                <h3>What does it actually cost to run?</h3>
                <p>
                  SES charges about $0.10 per 1,000 emails. MongoDB and QStash
                  have free tiers that cover a list of a few thousand readers,
                  and Vercel&rsquo;s free tier does too. The costs grow with how
                  much you send, not with how
                  many people are on your list.
                </p>
                <h3>Is my subscriber list safe?</h3>
                <p>
                  The list lives in your own MongoDB database, not on a
                  newsletter platform you do not control. Sessions and email links
                  are signed with a secret you generate, and the app ships its own
                  security document. Export the whole list to CSV whenever you
                  want.
                </p>
                <h3>Can I use Mailcheap for commercial newsletters?</h3>
                <p>
                  Yes. It is MIT licensed, so you use it for personal and
                  commercial work without paying anyone or asking permission. You
                  supply your own SES account and domain.
                </p>

                <h2 id="why-it-belongs-mailcheap">
                  Why it belongs in your stack
                </h2>
                <p>
                  When your list is the asset, owning the list matters. Mailcheap
                  gives you a newsletter that keeps contacts in your database,
                  sends on a price that tracks usage, and publishes an archive you
                  control. You trade a managed platform for a little setup and a
                  clear bill.
                </p>
                <p>
                  ☛ Everything runs as a single Next.js app. There is no per-seat
                  bill to watch, and the contact list exports to CSV on any day
                  you decide to leave.
                </p>
                <p>
                  It pairs with the reading on this site. The guide on{" "}
                  <Link href="/blog/how-to-enhance-email-security">
                    enhancing email security
                  </Link>{" "}
                  covers the authentication side, and{" "}
                  <Link href="/blog/visual-elements-in-email-marketing">
                    visual elements in email marketing
                  </Link>{" "}
                  covers the design side of the issues you will send. When you
                  have a list and no signups yet, the note on{" "}
                  <Link href="/blog/getting-your-first-startup-users">
                    getting your first startup users
                  </Link>{" "}
                  rounds out the funnel. When you want the rest of the interface
                  to match the app you send from, the other{" "}
                  <Link href="/freebies">free code resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for the
                  same fast, solo workflow.
                </p>
                  </>
                )}

                {slug === "pdfcn" && (
                  <>
                <p className="blog_big-paragraph">
                  You shipped the SaaS. The dashboard works. Then a user clicks
                  an invoice, the browser opens a new tab, and your app loses
                  them. pdfcn closes that gap. It renders the PDF inside your
                  React app, styled like the rest of your interface, with zoom,
                  search, and page navigation already wired.
                </p>

                <h2 id="what-pdfcn-does">What pdfcn actually does</h2>
                <p>
                  pdfcn is a PDF viewer component for React. You give it a file
                  URL, and it renders the document on the page: pages scale to
                  the container, a toolbar carries zoom in and out, a search
                  field jumps to matches, and arrow keys move between pages.
                  The whole thing runs in your app instead of the browser&rsquo;s
                  default PDF tab, so the user never leaves the flow you
                  designed.
                </p>
                <p>
                  The component ships as open source under an MIT license and
                  lives on{" "}
                  <a
                    href="https://github.com/shadcn-labs/pdfcn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  . You read the code, fork it, or file an issue. The demo at{" "}
                  <a
                    href="https://www.pdfcn.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pdfcn.dev
                  </a>{" "}
                  shows the viewer running live, so you can test the interaction
                  before you install anything.
                </p>

                <h2 id="why-pdf-in-react">
                  Why PDF in React is harder than it looks
                </h2>
                <p>
                  Every React app eventually meets a PDF. An invoice, a contract,
                  a report, a terms-of-service the lawyer insists you show
                  inline. The default answer is an iframe pointed at the file,
                  and that answer breaks the experience. The browser takes over
                  rendering, your dark mode stops applying, your design tokens
                  mean nothing, and the user gets a UI that looks bolted on
                  because it is.
                </p>
                <p>
                  The serious alternative used to be pulling in Mozilla&rsquo;s
                  PDF.js and building the viewer yourself. That path costs days.
                  You wire the canvas rendering, then the toolbar, then search,
                  then keyboard support, then mobile pinch zoom. Most solo
                  founders skip the whole thing and let the new-tab version
                  ship, and every invoice view quietly leaks session time.
                </p>

                <h2 id="shadcn-stack">Built on the shadcn stack</h2>
                <p>
                  pdfcn is assembled from shadcn/ui components, so it inherits
                  the look of the stack you probably already use. The buttons,
                  the input, the tooltip, and the dropdown are the same
                  primitives as the rest of your app. Tailwind classes control
                  the styling, which means the viewer picks up your theme
                  instead of fighting it.
                </p>
                <p>
                  That choice matters more than it sounds. A PDF viewer built on
                  its own design system forces you to override a stranger&rsquo;s
                  CSS. A viewer built on shadcn slots into the tokens you
                  already set. Dark mode works because your dark mode works. The
                  focus ring matches because the focus ring is the same
                  component. You style the viewer the way you style everything
                  else, not as a special case.
                </p>

                <h2 id="how-pdfcn-works">How it works under the hood</h2>
                <p>
                  The rendering layer is PDF.js, the same engine Firefox uses.
                  pdfcn wraps it in React components so you touch props instead
                  of canvas APIs:
                </p>
                <ul>
                  <li>❶ A document component that loads and parses the file</li>
                  <li>❷ Page components that render each sheet to canvas</li>
                  <li>❸ A toolbar with zoom, page count, and search built in</li>
                  <li>
                    ❹ Keyboard navigation, so arrows and escape behave as users
                    expect
                  </li>
                </ul>
                <p>
                  You install the package, import the viewer, and pass a source.
                  The library handles the parsing workers, the render loop, and
                  the resize observer that keeps pages sharp when the container
                  changes size. You write one line of JSX. It handles the rest.
                </p>

                <h2 id="wiring-into-ai-app-pdfcn">
                  Wiring it into an AI-built app
                </h2>
                <p>
                  If your product came out of an AI assistant, pdfcn fits the
                  workflow. The component is plain React with TypeScript types,
                  so the model reads the API surface cleanly and generates
                  working integration code on the first pass.
                </p>
                <p>
                  Ask your assistant to add pdfcn, point it at the invoice route
                  or the contract modal, and describe the chrome you want around
                  the viewer. The model writes the wrapper. You review the
                  spacing. The PDF stops being the screen that breaks your
                  design system, and you did not spend a weekend on canvas
                  rendering to get there.
                </p>

                <h2 id="open-source-pdfcn">Free, open source, no lock-in</h2>
                <p>
                  pdfcn is free and MIT-licensed. The code is on GitHub, the
                  issues are public, and the rendering happens in your own app.
                  There is no vendor account, no API key, no usage quota, and no
                  hosted viewer that could change its pricing next quarter.
                </p>
                <p>
                  That independence matters for documents. An invoice viewer
                  that phones home to a third party is a privacy problem waiting
                  for a lawyer to notice. A viewer that renders locally, from
                  code you can read, is one less question in the security
                  review.
                </p>

                <h2 id="why-it-belongs-pdfcn">Why it belongs in your stack</h2>
                <p>
                  You care about session time. Every new tab is a chance the
                  user does not come back. pdfcn keeps the document inside your
                  app, styled like your app, for the price of one install and a
                  few lines of JSX.
                </p>
                <p>
                  For a solo founder shipping with AI, that is a rare trade: a
                  real PDF viewer without the weekend of PDF.js plumbing. Grab
                  the code, point it at your invoice route, and keep the user in
                  the flow. When you want the screens around that viewer to
                  look sharp, our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> cover the same
                  fast, ship-it-yourself workflow.
                </p>
                  </>
                )}

                {slug === "m3e-canvas" && (
                  <>
                <p className="blog_big-paragraph">
                  You prompt an AI to build an Android screen. It hands you back
                  generic Material components that look nothing like the app in
                  your head. M3E Canvas fixes the gap. You lay out the interface
                  visually, then hand the model a prompt that already knows what
                  you want.
                </p>

                <h2 id="what-m3e-canvas-does">What M3E Canvas actually does</h2>
                <p>
                  M3E Canvas is a web tool for assembling Material 3 Expressive
                  interfaces. You drag real components onto a canvas: buttons,
                  FABs, navigation bars, cards, list items. You arrange them the
                  way you want the screen to look. The tool reads that layout and
                  writes a structured prompt you can paste straight into an AI
                  coding assistant.
                </p>
                <p>
                  It runs in the browser. Nothing to install, no account, no
                  build step. Open the{" "}
                  <a
                    href="https://lnkiai.github.io/m3e-canvas/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    live M3E Canvas tool
                  </a>
                  , assemble a screen, copy the prompt. The code lives on{" "}
                  <a
                    href="https://github.com/lnkiai/m3e-canvas"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>{" "}
                  under an open source license, so you can read it, fork it, or
                  file an issue.
                </p>

                <h2 id="material-3-expressive">
                  Why Material 3 Expressive matters
                </h2>
                <p>
                  Material 3 Expressive is Google&rsquo;s latest evolution of
                  Material Design. It leans into bigger shapes, bolder color, and
                  motion that reacts to touch. The{" "}
                  <a
                    href="https://m3.material.io"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Material 3 guidelines
                  </a>{" "}
                  cover the rules, and they run long. Reading them is one thing.
                  Getting an AI to honor them in generated code is another.
                </p>
                <p>
                  Here is the problem M3E Canvas solves. When you ask a model for
                  a Material screen in plain words, it averages out. You get the
                  safe defaults: a stock app bar, a flat button, spacing that
                  ignores the spec. The expressive part, the reason M3 looks
                  current, goes missing. By building the layout in the tool first,
                  you pin down the exact components and states, and the prompt
                  carries that intent instead of leaving it to chance.
                </p>

                <h2 id="how-prompt-works">How the prompt export works</h2>
                <p>
                  The canvas keeps a live model of your screen. Every component
                  you place has a type, a role, and a position. When you hit
                  export, the tool serializes all of that into text a language
                  model reads well:
                </p>
                <ul>
                  <li>
                    ❶ The components on screen and their Material 3 names
                  </li>
                  <li>
                    ❷ How they stack, so the AI knows the layout order
                  </li>
                  <li>
                    ❸ Enough structure for the model to write real Compose code
                  </li>
                </ul>
                <p>
                  You copy that block and paste it into your assistant. The prompt
                  does the describing for you, so you skip the part where you try
                  to explain a visual layout in a paragraph of English and hope
                  the model guesses right.
                </p>

                <h2 id="vibe-coding">Fitting it into vibe coding</h2>
                <p>
                  Vibe coding is building software by prompting instead of typing
                  every line. It works until the interface gets specific. Layout
                  is the exact thing plain language handles badly. &ldquo;Put the
                  favorite button next to share, then a list of three items with
                  icons&rdquo; turns into a guessing game the moment the screen
                  has more than two elements.
                </p>
                <p>
                  M3E Canvas gives that workflow a visual front end. You do the
                  layout by eye, where eyes are good, and let the tool translate
                  it into words, where words are precise. The AI still writes the
                  code. You just stop fighting it over where things go.
                </p>

                <h2 id="what-you-build">What you can build with it</h2>
                <p>
                  The tool targets Android app screens, and the component set
                  reflects that:
                </p>
                <ul>
                  <li>❶ Home screens with a navigation bar and FAB</li>
                  <li>❷ List and detail views built from Material cards</li>
                  <li>❸ Settings pages with switches and list items</li>
                  <li>❹ Onboarding flows that string several screens together</li>
                </ul>
                <p>
                  If you are prototyping an Android app and want it to look like
                  it belongs on a 2026 phone rather than a 2019 one, this is a
                  fast way to get there without memorizing the spec.
                </p>

                <h2 id="open-source">Free, open source, no lock-in</h2>
                <p>
                  M3E Canvas is free and open source. The prompt it produces is
                  plain text you own. There is no paid tier gating the export, no
                  runtime you have to keep installed, and no vendor sitting
                  between you and your code. If the project ever stalls, the
                  source is on GitHub and you can carry it forward yourself.
                </p>
                <p>
                  That independence is the point. A tool that hands you portable
                  output and then gets out of the way earns a spot in your
                  workflow. One that traps your work behind a login does not.
                </p>

                <h2 id="why-it-belongs-m3e">Why it belongs in your workflow</h2>
                <p>
                  You want Android screens that look current, and you want them
                  fast. M3E Canvas gives you a visual way to lay out Material 3
                  Expressive components and a prompt that carries your intent into
                  the AI. Build the screen, copy the prompt, let the model write
                  the code.
                </p>
                <p>
                  For a solo builder shipping with AI, that saves the slow part:
                  explaining a layout in words. When you want reference designs
                  for the screens you assemble, our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> cover the same
                  mobile-first, ship-fast workflow.
                </p>
                  </>
                )}

                {slug === "amicro" && (
                  <>
                <p className="blog_big-paragraph">
                  A page can be correct and still feel dead. The layout works,
                  the copy is fine, the buttons are where they should be. It
                  still reads as a template because nothing responds when you
                  touch it. Amicro is a set of ready-made micro-interactions
                  that fixes that feeling in an afternoon.
                </p>

                <h2 id="what-amicro-does">What Amicro actually does</h2>
                <p>
                  Amicro is an open source collection of micro-interactions for
                  the web. Each one is a small, self-contained piece of motion:
                  a button that glows under the cursor, a card that lifts on
                  hover, a heading that slides into place when you scroll to it,
                  a cursor that stays glued to a magnetic element. You pick the
                  effect you want, copy the snippet, and drop it into the page
                  you already have.
                </p>
                <p>
                  There is no framework to adopt and no build step to add. The
                  effects run on CSS and a little vanilla JavaScript, so they
                  work inside a Next.js app, a plain HTML file, a Webflow
                  export, or whatever your AI assistant generated last week.
                  The code lives on{" "}
                  <a
                    href="https://github.com/Subhan-code/Amicro--Micro-transitions-"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>{" "}
                  and every effect has a live preview at{" "}
                  <a
                    href="https://amicro.vercel.app/mono-charts"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    amicro.vercel.app
                  </a>
                  , so you can test the motion before you commit to it.
                </p>

                <h2 id="why-micro-interactions-matter">
                  Why micro-interactions decide how a page feels
                </h2>
                <p>
                  Micro-interactions are the small responses a page gives back
                  when someone acts on it. A button darkens as the cursor
                  reaches it. A form field glows when it takes focus. A section
                  fades up as it enters the viewport. None of them change what
                  the product does. All of them change whether it feels alive or
                  inert.
                </p>
                <p>
                  The difference shows up in how much people trust the page.
                  Motion signals that the interface heard the click, that the
                  state changed, that the thing under the cursor is the thing
                  you meant to press. A page with none of that feels broken in a
                  way users cannot name. They do not file a bug. They just leave.
                </p>
                <p>
                  Most designers know this. The reason micro-interactions still
                  get skipped is cost. Writing them by hand means touching
                  requestAnimationFrame, transition timing, and reduced-motion
                  fallbacks for every small effect. Amicro removes that cost by
                  handing you the effects already written.
                </p>

                <h2 id="what-ships-in-the-box">What ships in the box</h2>
                <p>
                  The collection covers the effects landing pages reach for
                  most:
                </p>
                <ul>
                  <li>
                    ❶ Hover states that glow, lift, or tilt a card as the cursor
                    passes over it
                  </li>
                  <li>
                    ❷ Magnetic buttons that pull toward the pointer and snap
                    back when it leaves
                  </li>
                  <li>
                    ❸ Scroll reveals that fade and slide content into view as it
                    enters the viewport
                  </li>
                  <li>
                    ❹ Text effects that animate a headline on load or on hover
                  </li>
                  <li>
                    ❺ Cursor effects that add a soft trail or a blending dot on
                    desktop
                  </li>
                </ul>
                <p>
                  Each effect is isolated. You take the one you need and leave
                  the rest. Nothing pulls in a shared runtime, and removing an
                  effect is as easy as deleting the snippet you pasted.
                </p>

                <h2 id="how-to-add-one">How to add one in five minutes</h2>
                <p>
                  The workflow is short enough to do between two other tasks:
                </p>
                <ul>
                  <li>
                    ❶ Open the live demo and find the effect that fits the
                    section you have in mind
                  </li>
                  <li>❷ Copy the HTML, the CSS, and the small script for that effect</li>
                  <li>
                    ❸ Paste them into your component and point the class names at
                    your own elements
                  </li>
                  <li>
                    ❹ Adjust the timing values until the motion matches the pace
                    of the rest of the page
                  </li>
                </ul>
                <p>
                  If you build with an AI assistant, the snippet is also the
                  prompt. Paste the effect into the chat, describe which element
                  it should wrap, and let the model do the wiring. The effect is
                  plain <code>CSS</code> and <code>JS</code>, so the assistant
                  reads it cleanly and generates working code on the first pass.
                </p>

                <h2 id="motion-without-bloat">Motion without the performance tax</h2>
                <p>
                  The usual objection to adding motion is weight. Animation
                  libraries can drag in hundreds of kilobytes and a render loop
                  that runs on every frame. Amicro avoids that by staying close
                  to the platform.
                </p>
                <p>
                  The effects lean on CSS transitions and transforms, which the
                  browser can hand to the GPU. The JavaScript is limited to the
                  few cases where a pointer position or a scroll threshold has to
                  be read. When a section is off screen, nothing runs. On a
                  mid-range phone the page keeps its scroll speed, and the motion
                  still reads as smooth.
                </p>

                <h2 id="accessible-by-default">Accessible by default</h2>
                <p>
                  Motion is not welcome for everyone. Some people get dizzy from
                  parallax and large movement, and their operating system already
                  tells your page to tone it down. A good micro-interaction
                  respects that signal.
                </p>
                <p>
                  Amicro checks the <code>prefers-reduced-motion</code> setting
                  before it animates. When a visitor has that preference on, the
                  effects fall back to a static state instead of playing. The
                  page still looks finished. It just stops moving. That check is
                  built into the snippets, so you do not have to remember it for
                  each one you paste.
                </p>

                <h2 id="faq-amicro">Frequently asked questions</h2>
                <h3>Do I need React to use Amicro?</h3>
                <p>
                  No. The effects are plain CSS and vanilla JavaScript. React,
                  Vue, and Next.js projects can use them, and so can a static
                  HTML page. You paste the snippet wherever the element lives.
                </p>
                <h3>Will the effects slow my page down?</h3>
                <p>
                  They use CSS transitions and transforms, so the browser can
                  offload the work to the GPU. Most effects only run while the
                  element is on screen and interacting. The heavier cursor
                  effects are desktop-only by design.
                </p>
                <h3>Can I mix several effects on one page?</h3>
                <p>
                  Yes. Each effect is independent and scoped to the element you
                  apply it to. Add as many as the page can carry without
                  competing. A good rule is one motion idea per section.
                </p>
                <h3>Is it really free?</h3>
                <p>
                  Yes. The code is open source on GitHub. You read it, fork it,
                  and ship it in personal or commercial work without a license
                  fee.
                </p>

                <h2 id="why-it-belongs-amicro">Why it belongs in your build</h2>
                <p>
                  You want the page to feel designed, not generated. Amicro gets
                  you there by giving the interface a set of small, believable
                  responses that cost almost nothing to add. Grab the effect that
                  fits, paste it, tune the timing, and watch the page stop
                  feeling flat.
                </p>
                <p>
                  For a solo builder shipping fast with AI, that is the useful
                  part: real motion without writing animation code from scratch.
                  When you want the static design underneath that motion to hold
                  up, our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for
                  the same ship-it-yourself workflow.
                </p>
                  </>
                )}

                {slug === "runeicons" && (
                  <>
                <p className="blog_big-paragraph">
                  Icons are the smallest elements on the screen and the fastest
                  way to make a product look unfinished. Pull a set from three
                  different sources and the mismatch shows before anyone reads a
                  word. RuneIcons gives you one open source set to draw from, so
                  the whole interface keeps the same line weight and the same
                  rhythm.
                </p>

                <h2 id="what-runeicons-does">What RuneIcons actually does</h2>
                <p>
                  RuneIcons is an open source icon library built for modern
                  interfaces. It ships a large collection of clean SVG icons you
                  can browse, search, and copy straight into your project. Every
                  icon is drawn to a shared grid with a consistent stroke and
                  corner radius, so picking any two of them side by side still
                  looks like one family.
                </p>
                <p>
                  The set lives at{" "}
                  <a
                    href="https://www.runeicons.com/icons"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    runeicons.com
                  </a>
                  , where you can filter the collection and preview each icon at
                  the size you plan to use. The source is on{" "}
                  <a
                    href="https://github.com/Nexvyn/runeicons"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  , so you can read how the icons are built, open an issue, or
                  fork the set and grow it for your own product.
                </p>

                <h2 id="why-icon-consistency">
                  Why icon consistency decides the whole interface
                </h2>
                <p>
                  Icons carry more visual weight than people expect. They sit
                  next to your labels, inside your buttons, and along your
                  navigation, and they repeat on almost every screen. When those
                  icons come from different sets, the eye catches the small
                  differences: a stroke that is slightly heavier, a corner that
                  is sharper, a shape that leans the other way. The screen reads
                  as assembled rather than designed.
                </p>
                <p>
                  Fixing that by hand is slow. You open each icon, adjust the
                  grid, redraw the paths that do not match, then repeat for every
                  size you support. Most teams skip the cleanup and live with the
                  mismatch. A single consistent set removes that chore at the
                  source, because the icons already agree with each other.
                </p>

                <h2 id="what-is-inside">What is inside the set</h2>
                <p>
                  The collection covers the categories a product interface
                  actually needs:
                </p>
                <ul>
                  <li>❶ Navigation and directional arrows</li>
                  <li>❷ Interface actions like edit, copy, delete, and share</li>
                  <li>❸ Media controls for play, pause, and volume</li>
                  <li>❹ Communication icons for mail, chat, and notifications</li>
                  <li>❺ File, folder, and document symbols</li>
                  <li>❻ Commerce and finance marks for carts, cards, and pricing</li>
                </ul>
                <p>
                  Each icon comes as an SVG, which means you can scale it to any
                  size without losing sharpness, recolor it with a single CSS
                  property, and drop it into any stack that renders markup.
                </p>

                <h2 id="how-to-use-icons">
                  How to get the icons into your project
                </h2>
                <p>
                  The path from the site to your code is short:
                </p>
                <ul>
                  <li>
                    ❶ Open the gallery and search for the concept you need, such
                    as &ldquo;settings&rdquo; or &ldquo;upload&rdquo;
                  </li>
                  <li>❷ Copy the SVG or grab the file from the repository</li>
                  <li>
                    ❸ Paste it into your component and set the color and size
                    with your own classes
                  </li>
                </ul>
                <p>
                  The icons are plain <code>SVG</code>, so they work as inline
                  markup, as the source of an image tag, or as a sprite
                  you reference by id. If you build with an AI assistant, paste
                  the SVG into the chat and describe where it belongs. The model
                  reads the path data cleanly and places it without extra setup.
                </p>

                <h2 id="icons-in-figma-and-code">
                  One set across Figma and code
                </h2>
                <p>
                  The gap between design and build shows up worst in icons. A
                  designer places one set in Figma, an engineer pulls a different
                  set from a package, and the shipped screen quietly differs from
                  the file. Nobody notices until the review.
                </p>
                <p>
                  Because RuneIcons ships raw SVG, the same file can sit in your
                  design file and your codebase. The designer drags the icon onto
                  the artboard. The engineer pastes the same path into the
                  component. What you approved is what ships, which removes a
                  whole class of review comments.
                </p>

                <h2 id="licensing-and-customization">
                  Licensing and customization
                </h2>
                <p>
                  The set is open source and free to use. You can ship it in
                  personal and commercial work, modify the icons to fit your
                  brand, and keep the changes you make. There is no account to
                  create and no attribution requirement forced onto your UI.
                </p>
                <p>
                  Customization stays simple because the icons are plain vector
                  files. Change the stroke width, soften a corner, or adjust the
                  color to match your tokens. Nothing is locked behind a
                  proprietary editor, and the source stays readable if you want
                  to understand how an icon was drawn.
                </p>

                <h2 id="faq-runeicons">Frequently asked questions</h2>
                <h3>Can I use RuneIcons in commercial projects?</h3>
                <p>
                  Yes. The set is open source, so you can use it in client work
                  and paid products. The license file in the repository spells out
                  the exact terms.
                </p>
                <h3>Do the icons work outside Figma?</h3>
                <p>
                  They do. Every icon is an SVG file, so it renders in any
                  browser, in React and Vue components, and in static HTML. Figma
                  is just one place you can use them.
                </p>
                <h3>Can I change the color and size?</h3>
                <p>
                  Yes. Set the size with width and height, and the color with the
                  fill or stroke property. Inline SVGs also inherit the text color
                  of their parent, which keeps them in step with your theme.
                </p>
                <h3>Is the collection still growing?</h3>
                <p>
                  It is open source, so the set grows as contributors add icons.
                  You can follow the repository to see new additions, or open an
                  issue to request a specific symbol.
                </p>

                <h2 id="why-it-belongs-runeicons">Why it belongs in your stack</h2>
                <p>
                  You want the interface to look deliberate, and icons are where
                  that impression is won or lost. RuneIcons hands you a single
                  consistent set in a format that fits both the design file and
                  the codebase, with no license fee and no account.
                </p>
                <p>
                  For a solo builder shipping fast with AI, that saves the slow
                  part: hunting for icons and fixing the mismatches after the
                  fact. Grab the set, keep one source of truth, and let the small
                  elements finally match. When you want the screens around those
                  icons to look sharp, our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for the
                  same ship-it-yourself workflow.
                </p>
                  </>
                )}

                {slug === "sfinterface-numbers" && (
                  <>
                <p className="blog_big-paragraph">
                  Your dashboard polls an API every ten seconds. Revenue ticks
                  from 1,204 to 1,251. Or rather, it blinks. The old figure
                  vanishes, the new one appears, and the change slides past your
                  eye. @sfinterface/numbers turns that swap into motion, so the
                  column you were watching rolls to its next value while you
                  watch it happen.
                </p>

                <h2 id="what-sfinterface-numbers-does">
                  What @sfinterface/numbers does
                </h2>
                <p>
                  @sfinterface/numbers is a React component that renders numbers
                  the way a mechanical counter does. Each digit sits in its own
                  column, and each column is a strip of digits behind a window.
                  When the value changes, only the columns whose digit actually
                  moved turn. Add one to 1,204 and a single wheel goes round. Add
                  forty-seven and three do, each by a different distance, on the
                  same clock.
                </p>
                <p>
                  The install is two imports and a value:
                </p>
                <ul>
                  <li>
                    <code>npm i @sfinterface/numbers</code>
                  </li>
                  <li>
                    <code>
                      import &#123; Numbers &#125; from
                      "@sfinterface/numbers"
                    </code>
                  </li>
                  <li>
                    <code>import "@sfinterface/numbers/styles.css"</code>
                  </li>
                  <li>
                    <code>{"<Numbers value={count} />"}</code>
                  </li>
                </ul>
                <p>
                  It comes from The San Francisco Interface and ships on its own,
                  apart from the rest of that library. The source lives on{" "}
                  <a
                    href="https://github.com/wherescz/sfinterface-numbers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  , and the full prop reference with a playground sits at{" "}
                  <a
                    href="https://numbers.sfinterface.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    numbers.sfinterface.com
                  </a>
                  . Both are open, so you can read the code, test the motion, or
                  file an issue before you commit to anything.
                </p>

                <h2 id="why-static-numbers-feel-dead">
                  Why a number that jumps feels broken
                </h2>
                <p>
                  Counters are everywhere in a product: revenue, users, stock,
                  cart totals, likes, progress. They update on almost every screen
                  that shows live data. Most of them update by replacing the old
                  figure with the new one in a single frame, and that hard cut
                  hides the one thing the reader wants to know. Did it go up or
                  down, and by how much?
                </p>
                <p>
                  Motion answers that question without a label. A wheel that
                  turns forward reads as an increase. A wheel that turns back
                  reads as a loss. The direction of the movement carries the
                  meaning, which is why a rolling figure feels alive and a blinking
                  one feels like a glitch.
                </p>
                <p>
                  The usual fix is an animated counter written by hand. You
                  lerp a number from the old value to the new one and re-render
                  sixty times a second. It works until the figure has a currency
                  symbol, a thousands separator, or a locale that puts the decimal
                  comma in a different place. Then you are writing number
                  formatting on top of animation, and both are now your problem.
                  If you have fought that before, the notes in our{" "}
                  <Link href="/blog/dashboard-ui-design">
                    dashboard UI design guide
                  </Link>{" "}
                  cover where live figures tend to break layouts.
                </p>

                <h2 id="how-the-columns-work">How the columns work</h2>
                <p>
                  The geometry is worth understanding because it explains why the
                  component stays light. A column is a strip of thirty digits
                  behind a window one cell tall. That is each digit 0 to 9,
                  repeated three times, so the strip can roll in either direction
                  without hitting an end. Turning a column means moving the strip
                  three cells. The window does not move. It is where it always was.
                </p>
                <p>
                  The window is slightly taller than the glyph, and the extra
                  space at each end is the bleed. The veil lives in that overhang,
                  and two props shape it. <code>fade</code> sets how far into the
                  overhang a digit dissolves. <code>softness</code> sets the shape
                  of that dissolve, from a crisp edge that lets go quickly to an
                  even ramp with no knee in it. While a column turns, the fade
                  deepens, so the passing digits go ghostly and settle back when
                  the roll stops.
                </p>
                <p>
                  The turning direction follows the number. Counting up out of 9
                  goes forward to 0, the way an odometer does, rather than
                  rewinding through eight digits. Set <code>trend</code> to{" "}
                  <code>up</code> or <code>down</code> when you want to force the
                  reading, and leave it on <code>auto</code> when you want the
                  component to decide from the values.
                </p>

                <h2 id="formatting-with-intl">
                  Formatting comes from Intl
                </h2>
                <p>
                  The component does not format numbers itself. It hands the value
                  to{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Intl.NumberFormat
                  </a>
                  , the browser API that already knows about currencies,
                  percentages, compact notation, numbering systems, and every
                  locale. You pass the standard options and the platform does the
                  work:
                </p>
                <ul>
                  <li>
                    Currency:{" "}
                    <code>
                      {'<Numbers value={1125.64} format={{ style: "currency", currency: "USD" }} />'}
                    </code>
                  </li>
                  <li>
                    Percent:{" "}
                    <code>
                      {'<Numbers value={0.0241} format={{ style: "percent", maximumFractionDigits: 2 }} />'}
                    </code>
                  </li>
                  <li>
                    Compact:{" "}
                    <code>
                      {'<Numbers value={48200} format={{ notation: "compact" }} locale="en-GB" />'}
                    </code>
                  </li>
                </ul>
                <p>
                  That choice removes a whole class of bugs. The separators, the
                  symbol placement, and the rounding rules come from the platform
                  instead of from a formatter you have to maintain. Change the{" "}
                  <code>locale</code> prop and the readout follows the reader
                  rather than the developer.
                </p>

                <h2 id="five-transitions">Five transitions, one prop</h2>
                <p>
                  The motion is a single prop with five values, so you can match
                  the feel of the number to the product:
                </p>
                <ul>
                  <li>
                    ❶ <code>roll</code> turns the strip through every digit on
                    the way, the classic counter
                  </li>
                  <li>
                    ❷ <code>tick</code> slides the old digit out and the new one
                    in, quieter and more medical
                  </li>
                  <li>
                    ❸ <code>blur</code> dissolves the digit in place, defocused,
                    good for live data that should feel soft
                  </li>
                  <li>
                    ❹ <code>flip</code> turns the digit over like a split-flap
                    board, which reads as arrivals and departures
                  </li>
                  <li>
                    ❺ <code>scale</code> shrinks the old digit away and grows the
                    new one, the lightest of the five
                  </li>
                </ul>
                <p>
                  <code>duration</code> controls the clock in milliseconds and
                  defaults to 520. <code>blur</code> is a boolean you can switch
                  off when the smear feels like too much. <code>prefix</code> and{" "}
                  <code>suffix</code> take any node, so a currency symbol, a
                  percent sign, or an icon sits beside the digits. Because the box
                  is one inline box, the affix travels with the number as it gains
                  a column or loses one instead of staying put while the digits
                  shift underneath it.
                </p>

                <h2 id="theming-and-inheritance">
                  Theming and inherited type
                </h2>
                <p>
                  The stylesheet describes motion and geometry and nothing else.
                  It does not set a font, a size, a weight, a colour, or letter
                  spacing. All of that is inherited from wherever you drop the
                  component, so a readout inside a heading is the heading&rsquo;s
                  type, and the same component in a table cell takes the
                  table&rsquo;s type. You do not restyle a widget to make it fit.
                </p>
                <p>
                  When you do want to change the motion, every value is a CSS
                  custom property. Set one on <code>:root</code>, on a wrapper, or
                  inline. The tokens include{" "}
                  <code>--sfi-numbers-roll</code> for how long a column takes to
                  turn, <code>--sfi-numbers-exit</code> for how long a leaving
                  column takes to go, <code>--sfi-numbers-cell</code> for the
                  pitch the digits stack at, and{" "}
                  <code>--sfi-numbers-ease</code> for the curve a column turns on.
                  The stylesheet ships in one <code>@layer arc</code>, below your
                  own rules, so a class of yours wins over the component without{" "}
                  <code>!important</code>.
                </p>

                <h2 id="accessible-by-default">Accessible by default</h2>
                <p>
                  A rolling digit is a visual trick, and visual tricks need a
                  fallback. The digits in @sfinterface/numbers are marked{" "}
                  <code>aria-hidden</code>, and one formatted string sits behind
                  them. A screen reader announces one thousand two hundred and
                  four, the number as a person would say it, instead of reading
                  twelve glyphs one at a time. The animation is decoration. The
                  value is the content.
                </p>
                <p>
                  Motion follows{" "}
                  <a
                    href="https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    the accessibility guidance on animation from interaction
                  </a>
                  . When the operating system reports{" "}
                  <code>prefers-reduced-motion: reduce</code>, the columns do not
                  turn, blur, or fade. The number changes and nothing moves, which
                  is the behavior a reader who asked for less motion expects.
                </p>
                <p>
                  Server rendering is handled too. The component renders the
                  formatted value into the markup on the server, so the first
                  paint shows the real figure. There is no empty box, no
                  placeholder width to reserve, and no hydration guard to write.
                  The package requires React 18 or 19, carries no dependencies,
                  and ships its own types.
                </p>

                <h2 id="faq-sfinterface-numbers">
                  Frequently asked questions
                </h2>
                <h3>How do I animate a number in React without a chart library?</h3>
                <p>
                  You install the package, import the stylesheet, and pass your
                  value as a prop. The component handles the columns, the timing,
                  and the formatting. You do not write a timer, a requestAnimationFrame
                  loop, or a formatter. If you only need one figure to count up,
                  this is less code than a custom hook.
                </p>
                <h3>Does it support currency, percentages, and compact notation?</h3>
                <p>
                  Yes. Formatting runs through Intl.NumberFormat, so you pass the
                  standard options for style, currency, and notation, plus a locale.
                  That covers currency symbols, percent signs, compact values like
                  48K, and the separators each locale uses.
                </p>
                <h3>Will it work in a Next.js app with server rendering?</h3>
                <p>
                  It will. The component is SSR ready and renders the formatted
                  value into the markup, so the number shows on first paint. It
                  supports React 18 and 19, and it has no runtime dependencies to
                  fight over.
                </p>
                <h3>What happens for users who prefer reduced motion?</h3>
                <p>
                  The component reads the reduced-motion preference and stops the
                  animation. The value still updates, it just arrives without the
                  roll, blur, or fade. The digits also stay hidden from screen
                  readers, which read the number as a single formatted string.
                </p>
                <h3>How large is the package and is it free?</h3>
                <p>
                  It weighs about 13 kB and pulls in nothing else. It is MIT
                  licensed, so you can use it in personal and commercial work.
                  Version 0.3.4 is current, and the changelog notes that the props
                  and motion are still being settled, so pin an exact version if
                  you need the behavior to hold still.
                </p>

                <h2 id="why-it-belongs-numbers">
                  Why it belongs in your stack
                </h2>
                <p>
                  You care about the moment a figure changes, because that is the
                  moment the reader looks. A number that rolls tells them the
                  direction and the size of the change in one gesture. A number
                  that blinks makes them check the previous screen to be sure.
                  That difference repeats on every live screen you ship.
                </p>
                <p>
                  For a solo builder shipping fast, the trade is clean: one small
                  component, no dependencies, formatting from the platform, and
                  motion that already respects the accessibility settings. Grab
                  the package, point it at your revenue or user count, and let the
                  figure move the way the data did. When you want the dashboard
                  around that figure to look deliberate, our{" "}
                  <Link href="/templates/orion">Orion charts UI kit</Link> and the
                  rest of the <Link href="/code">design and code kits</Link> are
                  built for the same workflow. If you are still wiring the screen
                  the number lives on, the guide on{" "}
                  <Link href="/blog/how-to-study-saas-dashboard-in-the-ai-era">
                    studying a SaaS dashboard in the AI era
                  </Link>{" "}
                  is a useful starting point.
                </p>
                  </>
                )}

                {slug === "fsearch" && (
                  <>
                <p className="blog_big-paragraph">
                  Spotlight finds the app. It rarely finds the file you half
                  remember from six months ago, and it does not search inside
                  anything unless the indexer already decided you cared. fsearch
                  is a small Rust tool that indexes the whole disk once and then
                  answers name and content queries in about a millisecond.
                </p>

                <h2 id="what-fsearch-does">What fsearch actually does</h2>
                <p>
                  fsearch indexes every file and folder on your Mac, then answers
                  queries against that index. It matches names with fuzziness, so
                  a typo does not kill the search, and it searches inside text
                  files through a trigram index. You drive it from the terminal
                  as a CLI, and the same engine ships as a Rust crate you can link
                  into your own project.
                </p>
                <p>
                  The author built it for one machine and reported the numbers
                  honestly. On an M4 Max with 7.7 million files on disk, a
                  whole-disk name search lands at p50 1.3 ms, content search at
                  p50 9 ms, and a new or renamed file shows up in about 0.1 s. The
                  first crawl takes around 20 s, once. The daemon holds between 30
                  and 135 MB of memory. Those are the author&rsquo;s figures from
                  the README, measured on one disk, so treat them as a strong
                  signal and not a promise for every Mac.
                </p>

                <h2 id="why-spotlight-falls-short">
                  Why Spotlight leaves gaps on a full disk
                </h2>
                <p>
                  Spotlight is built for launching apps and surfacing a few
                  document types. It respects the folders Apple marks private, and
                  it leaves plenty of developer directories out of reach. The
                  result is a search that works until you need it most, when the
                  file is inside a node_modules tree or a build folder you named
                  badly last spring.
                </p>
                <p>
                  fsearch takes the opposite stance. With Full Disk Access it
                  indexes everything it can reach. The README is upfront about the
                  trade: it skips some file types and the build and vendor
                  folders, which is why its competitor scans roughly 9% more file
                  contents. You trade a little coverage for speed and a small
                  memory footprint.
                </p>
                <ul>
                  <li>
                    ❶ Name search across the whole disk, past the apps and
                    documents other indexers watch
                  </li>
                  <li>
                    ❷ Fuzzy matching that still finds the file when you misspell
                    it
                  </li>
                  <li>
                    ❸ Content search inside text files, kept fresh from disk
                  </li>
                </ul>

                <h2 id="how-the-index-works">How the index stays fast</h2>
                <p>
                  The first pass crawls the disk with a bulk directory read, then
                  fsearch keeps up with changes through the filesystem event
                  stream. A restart replays only what changed instead of crawling
                  again, so the 20 s cost is paid once and not on every boot.
                </p>
                <p>
                  Names live in a single memory-mapped file laid out folder by
                  folder, so a folder filter is a range read, and each distinct
                  name is scored once. Content search runs on a trigram index of
                  your text files, and the matches themselves are read fresh from
                  disk. That last detail matters: an index that caches file
                  bodies goes stale the moment you save, and fsearch sidesteps it
                  by storing positions and reading the bytes live.
                </p>
                <div className="blog-fit-table">
                  <table>
                    <thead>
                      <tr>
                        <th>What is measured</th>
                        <th>Result (author&rsquo;s M4 Max, 7.7M files)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Find a file by name, whole disk</td>
                        <td>p50 1.3 ms</td>
                      </tr>
                      <tr>
                        <td>Search inside files</td>
                        <td>p50 9 ms</td>
                      </tr>
                      <tr>
                        <td>A new or deleted file appears</td>
                        <td>about 0.1 s</td>
                      </tr>
                      <tr>
                        <td>First crawl of the disk</td>
                        <td>about 20 s, once</td>
                      </tr>
                      <tr>
                        <td>Daemon memory</td>
                        <td>30 to 135 MB</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h2 id="the-query-language">The query language worth learning</h2>
                <p>
                  You type a few words and add filters when you need them. The
                  syntax is small enough to hold in your head:
                </p>
                <ul>
                  <li>
                    <code>{'fsearch "readme in:~/Developer"'}</code> searches
                    inside one folder
                  </li>
                  <li>
                    <code>{'fsearch "type:image size:>5mb mtime:<7d"'}</code>{" "}
                    narrows by kind, size, and age
                  </li>
                  <li>
                    <code>{'fsearch "ext:rs regex:fn\\s+\\w+_dir"'}</code> runs a
                    regular expression inside file contents
                  </li>
                  <li>
                    <code>{'fsearch "sym:apply_dir"'}</code> jumps to where a
                    symbol is defined
                  </li>
                </ul>
                <p>
                  Words are fuzzy by default, and a word of five letters or more
                  forgives a single typo, so <code>mian.rs</code> still finds{" "}
                  <code>main.rs</code>. You can force exact matching or pin the
                  start and end of a name with <code>'</code>, <code>^</code>, and{" "}
                  <code>$</code>, and exclude with <code>!</code>. The filter set
                  covers extension, type, kind, folder, size, modification time,
                  path, and the content search modes. Content search is smart-case,
                  which is the behavior you want and rarely have to think about.
                </p>

                <h2 id="full-disk-access">The one permission it needs</h2>
                <p>
                  fsearch can only be as good as the access you grant it. Started
                  from a terminal that already has Full Disk Access, it indexes
                  everything. Set up as a login item, you give the binary its own
                  grant in System Settings, under Privacy and Security, and you
                  grant it again after each rebuild, because the signature changes.
                </p>
                <p>
                  When access is missing, fsearch skips the protected folders
                  instead of hanging on a permission prompt mid-search. That
                  restraint matters: a search tool that stalls on a dialog is
                  worse than one that quietly returns what it can see.
                </p>

                <h2 id="cli-crate-and-socket">
                  Three ways into the same index
                </h2>
                <p>
                  There are three ways in. The CLI is the daily driver. The crate
                  lets you embed the engine in a Rust program with a couple of
                  calls. The socket lets any process talk to the running index over
                  JSON lines, so a script, an editor plugin, or a small app can
                  query the same data the CLI uses.
                </p>
                <p>
                  Linking the crate is short:
                </p>
                <ul>
                  <li>
                    <code>Engine::start</code> opens the index for your home
                    directory
                  </li>
                  <li>
                    <code>Query::parse</code> turns a query string into a
                    structured query
                  </li>
                  <li>
                    <code>engine.search</code> returns the hits
                  </li>
                </ul>
                <p>
                  One index serves every caller. The first process to start owns
                  it, and the rest follow along, so an app and the CLI never fight
                  over two copies of the same data. If you also live in a terminal
                  all day, the notes on{" "}
                  <Link href="/blog/command-palette-ui-design-guide">
                    designing a command palette
                  </Link>{" "}
                  cover the keyboard-first habits that pair well with a fast query
                  engine.
                </p>

                <h2 id="faq-fsearch">Frequently asked questions</h2>
                <h3>Is fsearch a replacement for Spotlight?</h3>
                <p>
                  It covers the file-search job better than Spotlight in most
                  cases, because it indexes the whole disk and searches inside
                  files. App launching and document previews stay with the system.
                  Many people keep Spotlight for launching and use fsearch for
                  finding.
                </p>
                <h3>Does it work only on macOS?</h3>
                <p>
                  Yes. fsearch is built for macOS and leans on Apple filesystem
                  APIs for the crawl and the change stream. The README compares it
                  against a competitor on a Linux kernel folder, but the tool
                  itself targets the Mac.
                </p>
                <h3>Will it index my node_modules and build folders?</h3>
                <p>
                  It deliberately skips some file types and the build and vendor
                  folders to keep memory small and searches fast. The README states
                  this openly as the reason a competitor covers about 9% more file
                  contents.
                </p>
                <h3>How much memory does the daemon use?</h3>
                <p>
                  Between 30 and 135 MB, depending on how much the index holds,
                  according to the README. That is the footprint for watching a
                  whole disk, which is small next to the alternative of a heavy
                  background indexer.
                </p>
                <h3>Can I embed it in my own program?</h3>
                <p>
                  Yes. The same engine ships as a Rust crate, and there is a JSON
                  lines socket for callers that are not Rust. An app and the CLI
                  share a single index, so you can build on top of the running
                  search without starting a second crawler.
                </p>

                <h2 id="why-it-belongs-fsearch">
                  Why it belongs in your toolkit
                </h2>
                <p>
                  The cost of a slow search is attention. Every time you cannot
                  find a file, you leave the task to open a terminal or a Finder
                  window and hunt through folders. A query that returns in about a
                  millisecond removes that detour, and the detour is where the
                  afternoon goes.
                </p>
                <p>
                  fsearch is a small MIT-licensed Rust tool, and it is honest
                  about what it skips. You get one install and a query language
                  that scales from a single word to a filtered content search.
                  Grab the repository, run the install once, and give it Full Disk
                  Access. When you want the files it surfaces to sit in a tidy
                  project, the rest of our{" "}
                  <Link href="/freebies">free resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for the
                  same fast, solo workflow.
                </p>
                  </>
                )}

                {slug === "rea" && (
                  <>
                <p className="blog_big-paragraph">
                  You see a feature in an app and want the same behavior in your
                  own product. You cannot read the source. Asking an AI agent to
                  reimplement it from a screenshot gives you a guess, and a guess
                  ships bugs. REA gives your agent the missing half: local tools
                  to take the app apart, follow the code path, and hand back the
                  evidence behind each conclusion.
                </p>

                <h2 id="what-rea-does">What REA actually does</h2>
                <p>
                  REA is an open-source MCP server for reverse engineering. It
                  connects an AI agent to a set of inspection tools, so the agent
                  can look inside a target without its source code, explain how a
                  feature works, and then write a version for your project. MCP is
                  the protocol agents already use to call outside tools, so
                  installation is one command and no new interface to learn.
                </p>
                <p>
                  Setup registers the server with your agent and installs matching
                  workflow instructions. Supported clients include Claude Code and
                  Cursor. Other agents that speak MCP can register the server by
                  hand. Everything runs on your machine,
                  and the project carries an MIT license, so you use it in
                  personal and commercial work without paying anyone.
                </p>

                <h2 id="why-building-blind">
                  Why building a feature blind is expensive
                </h2>
                <p>
                  Copying behavior from a screenshot looks fast until the edge
                  cases arrive. The state machine behind a toggle, the order two
                  requests fire in, the fallback when a field is empty: none of
                  that is visible in a picture, and each missing detail becomes a
                  bug report later. You end up guessing at the one part of the
                  feature that made it worth copying.
                </p>
                <p>
                  Reading the actual code path removes the guessing. You learn how
                  the original handles the case you have not thought of, and you
                  build the same behavior on purpose instead of by accident. That
                  is the difference between a feature that works in the demo and a
                  feature that survives first contact with real users.
                </p>

                <h2 id="how-mcp-bridge-works">
                  How the MCP bridge works
                </h2>
                <p>
                  You point your agent at a local target and ask a question in
                  plain language. The agent calls REA through MCP, REA inspects the
                  files or the running process, and the findings come back with the
                  evidence attached. The agent uses those findings to answer you,
                  to ask follow-up questions, or to write and test an
                  implementation. The terminal uses the same workflows, so you can
                  run a single inspect command yourself when you want the raw view.
                </p>
                <p>
                  Static inspection reads the files without running the
                  application. Runtime capture runs or interacts with the target
                  under your own user permissions, and each runtime guide describes
                  what that touches. You choose the mode, which matters when the
                  target is something you cannot safely launch on a whim.
                </p>

                <h2 id="what-you-can-analyze">
                  What you can point it at
                </h2>
                <p>
                  The tool covers more than one kind of target. The same interface
                  handles all of these:
                </p>
                <ul>
                  <li>
                    ❶ Native binaries: pseudocode and assembly through a deep
                    analysis engine
                  </li>
                  <li>
                    ❷ JavaScript and Electron apps: recovered modules, imports, and
                    the boundaries between renderer and main process
                  </li>
                  <li>❸ .NET assemblies, inspected without running them</li>
                  <li>
                    ❹ Android APKs: manifest declarations and decompiled methods
                  </li>
                  <li>❺ Firmware images and extraction handoffs</li>
                  <li>
                    ❻ Packages and resources: file inventories and Apple bundle
                    anatomy
                  </li>
                  <li>
                    ❼ Process behavior: terminal output, interactions, exit codes,
                    and run comparisons
                  </li>
                </ul>
                <p>
                  A designer rebuilding an app usually starts with the JavaScript
                  and Electron path, because it needs no native analysis engine and
                  returns the module map that explains how the interface is wired.
                  Native analysis is there for the deeper question underneath it.
                </p>

                <h2 id="evidence-with-limits">
                  Evidence, not raw output
                </h2>
                <p>
                  A decompiler that dumps thousands of lines leaves you where you
                  started, just with more text. REA frames each result with the
                  evidence behind it and the limitations of the method, so you can
                  judge how much to trust a conclusion before you build on it. That
                  framing is what makes the output usable by an agent: the agent can
                  cite what it saw and flag what it inferred.
                </p>
                <p>
                  The project is honest about the trade. Static analysis and native
                  formats depend on the provider and the host operating system, and
                  some features land after the current npm release. The{" "}
                  <a
                    href="https://rea.tools/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    REA website
                  </a>{" "}
                  carries illustrated guides and worked case studies, including a
                  sound-pan reconstruction and an Electron clipboard trace, so you
                  can read an investigation end to end before you run your own.
                </p>

                <h2 id="choosing-a-provider">
                  Choosing a deep analysis provider
                </h2>
                <p>
                  Deep native analysis leans on an engine you already own. REA
                  works with Hopper, Ghidra, or IDA, and setup can install Hopper
                  with your approval while Ghidra and IDA use existing
                  installations. Static JavaScript and .NET inspection need none of
                  them, which is the fast lane if you are only chasing interface
                  behavior.
                </p>
                <p>
                  Host support varies by provider, and the documentation is
                  specific about which combinations are tested. Start with the
                  JavaScript path, add a native provider only when a question
                  reaches below the app layer, and let the guides tell you which
                  engine fits the target in front of you.
                </p>

                <h2 id="local-by-default">Local by default</h2>
                <p>
                  REA analyzes targets on your machine. Your agent receives the
                  tool results, and then your model provider applies its own data
                  policy, which is worth checking before you point the tool at
                  anything sensitive. The analysis itself does not upload the app to
                  a third-party service, and runtime capture stays within the
                  permissions your user account already has.
                </p>
                <p>
                  For a solo builder this keeps the workflow private and the
                  setup small. One command registers the server, the agent keeps
                  its normal interface, and the reverse engineering happens next
                  to the codebase you are about to change.
                </p>

                <h2 id="faq-rea">Frequently asked questions</h2>
                <h3>Do I need to know reverse engineering to use it?</h3>
                <p>
                  No. You describe the feature you want to understand, and the
                  agent drives the tools. You read the evidence and the plain
                  language summary. Deeper native work rewards some familiarity
                  with assembly, but the JavaScript and Electron path stays close
                  to ordinary front-end code.
                </p>
                <h3>Do I need a native analysis engine installed?</h3>
                <p>
                  Only for native binaries. Static JavaScript and .NET inspection
                  run without a native engine, so a web or Electron target needs
                  nothing extra. Setup can install Hopper with your approval, and
                  Ghidra and IDA use the copies you already have.
                </p>
                <h3>Which agents can call REA?</h3>
                <p>
                  Any agent that supports local MCP servers. Setup configures
                  Claude Code and Cursor, and other clients can register the server
                  manually. If your agent speaks MCP, it can use REA.
                </p>
                <h3>Is it free and can I use it commercially?</h3>
                <p>
                  Yes on both. The project is MIT licensed, the source lives on{" "}
                  <a
                    href="https://github.com/morluto/rea"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  , and the code is open for commercial work. You are responsible
                  for having the authorization to analyze whatever you point it at.
                </p>
                <h3>Does it upload my app anywhere?</h3>
                <p>
                  REA analyzes targets locally and returns results to your agent.
                  The analysis does not ship your app to a third party. Your model
                  provider still sees the tool results, so check its data policy
                  before you inspect anything sensitive.
                </p>

                <h2 id="why-it-belongs-rea">
                  Why it belongs in your stack
                </h2>
                <p>
                  If you build by prompting an agent, the bottleneck is no longer
                  writing code. It is knowing what to build. REA closes that gap:
                  one setup command, your existing agent, and a local investigation
                  that ends with evidence instead of a confident guess.
                </p>
                <p>
                  It is free and open source, and it is honest about the limits of
                  each method. Point it at the feature you keep circling, read how
                  the original works, and ship the version your own product needs.
                  When
                  you want the interface you are rebuilding to hold up against the
                  original, the rest of our{" "}
                  <Link href="/freebies">free code resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for the
                  same fast, solo workflow.
                </p>
                  </>
                )}

                {slug === "compositor" && (
                  <>
                <p className="blog_big-paragraph">
                  Photoshop costs more than a side project deserves, and GIMP
                  never quite feels like home once your hands learned Photoshop
                  first. Robbie Tilton built Compositor to close that gap for
                  himself, then opened the source. It is a full image editor for
                  macOS, built around the compositing and retouching work a
                  designer actually does, and the license costs nothing.
                </p>

                <h2 id="comp-what-it-does">What Compositor actually does</h2>
                <p>
                  Compositor is a native macOS app, not a web wrapper and not an
                  Electron shell. It needs macOS 26 or later on an Apple silicon
                  Mac, and it ships as a signed, notarized build that updates
                  itself. Inside is the editor you would expect from a
                  Photoshop replacement: layers and folders, masks, adjustment
                  layers, layer effects, a full selection toolset, retouching
                  brushes, a Camera Raw panel, and a filter stack.
                </p>
                <p>
                  The README is blunt about why it exists. The author used
                  Photoshop for compositing and post-processing, wanted to keep
                  that workflow, and did not want to keep paying for it.
                  Compositor answers that specific complaint. Keep the muscle
                  memory, drop the subscription, and let anyone who wants more
                  open the Xcode project and change it.
                </p>

                <h2 id="comp-photoshop-habit">
                  Why the Photoshop habit is hard to break
                </h2>
                <p>
                  Free editors rarely fail on features. They fail on feel. The
                  blend mode list sits in a different order, the shortcuts live
                  somewhere else, and every small difference pulls you out of
                  flow. That friction is why so many designers keep the paid app
                  and complain about it instead of switching.
                </p>
                <p>
                  Compositor leans into the habit instead of fighting it. Blend
                  modes follow Photoshop&rsquo;s order, so a folder&rsquo;s
                  opacity dims everything inside it the way you remember.
                  Keyboard shortcuts match Photoshop across the board, and the
                  Keyboard Shortcuts panel in the Edit menu remaps any of them.
                  Even the small things carry over. You can drag a
                  number&rsquo;s label to scrub its value, exactly as in
                  Photoshop.
                </p>
                <p>
                  ☞ The switch is cheap because the interface follows the
                  conventions your hands already know.
                </p>

                <h2 id="comp-psd-and-shortcuts">
                  Photoshop files and shortcuts still work
                </h2>
                <p>
                  Compositor opens Photoshop PSD and PSB files at 8-bit RGB.
                  Layers and folders stay editable, along with masks and blend
                  modes. Fill shapes hold up too, along with simple horizontal
                  text. Other vectors and vertical text come in as pixels. The
                  app shows a conversion report before anything applies, so you
                  see what will flatten before you commit to it.
                </p>
                <p>
                  CMYK is not supported, which rules Compositor out for print
                  production. For screen work and image composites, the import
                  path covers the files you get handed.
                </p>

                <h2 id="comp-agent-format">A project format AI agents can write</h2>
                <p>
                  This is the part that matters most to anyone building with AI
                  right now. A Compositor project, a <code>.comp</code>, is not a
                  binary blob. It is a folder with a <code>manifest.json</code>{" "}
                  and an <code>images</code> directory of PNG layer files plus
                  optional mask PNGs. Anything that can write a file can build or
                  edit that project, with no plugin layer standing between the
                  agent and your layers.
                </p>
                <p>
                  Point an agent at the open project and it writes layers while
                  you watch. Compositor reloads the canvas as the files change,
                  usually within half a second. What comes back is a set of
                  ordinary layers you can blend and mask, then paint on, not a
                  frozen render. The README names Claude Code and Codex as the
                  tools to try first, which tells you who it was built for.
                </p>
                <p>
                  That design turns an image editor into a target for an AI
                  workflow. You generate a moody scene, a product composite, or a
                  batch of variations without opening a dialog, then finish the
                  details by hand. The interface that surrounds those images is
                  its own job, and these{" "}
                  <Link href="/blog/ai-agent-ui-design-patterns">
                    AI agent UI design patterns
                  </Link>{" "}
                  cover that side.
                </p>

                <h2 id="comp-what-ships">What ships in the box</h2>
                <p>The feature list is long, so here is the short version:</p>
                <ul>
                  <li>
                    ❶ Layers and folders with the full set of Photoshop blend
                    modes, masks included on both
                  </li>
                  <li>
                    ❷ Adjustment layers for curves and levels, along with
                    exposure and color balance, all editable at any time
                  </li>
                  <li>
                    ❸ GPU-rendered layer effects for strokes and drop shadows,
                    color overlays and glows, all editable later
                  </li>
                  <li>
                    ❹ Non-destructive transform for moving, scaling, rotating or
                    flipping a layer, with snapping to edges and centers
                  </li>
                  <li>
                    ❺ Selections from marquee, lasso, a Magic Wand that samples
                    color, and an Object tool that traces what you click
                  </li>
                  <li>
                    ❻ Select Subject, plus Content-Aware Fill that can extend an
                    image past its own edges
                  </li>
                  <li>
                    ❼ Retouching brushes (Brush, Spot Healing, Clone Stamp) and
                    shape tools (Gradient, Rectangle, Ellipse, Type), with text
                    that stays editable
                  </li>
                  <li>
                    ❽ A Camera Raw panel and a filter stack with live previews
                    limited to the current selection
                  </li>
                  <li>
                    ❾ Multiple projects in tabs, Search Commands on ⌘F, and a
                    fullscreen mode that leaves the canvas alone on black
                  </li>
                </ul>
                <p>
                  Import covers raster formats (JPEG, PNG, HEIC, TIFF, WebP),
                  vector input (SVG), camera RAW and Photoshop files. Export
                  gives you PNG or JPEG, or a one-page PDF at print size.
                  Install takes one Homebrew command, and updates arrive on
                  their own.
                </p>

                <h2 id="comp-limits">Limits to weigh before you install</h2>
                <p>
                  Compositor is one person&rsquo;s project, and the constraints
                  are worth knowing before you move a real workflow onto it. It
                  runs only on macOS 26 and newer, on Apple silicon. Intel Macs
                  and Windows are out, and there is no CMYK path for print.
                </p>
                <p>
                  The app is English only, and the author is not accepting
                  translation pull requests right now. He explains why in the
                  README. One person maintaining it, every new string needing
                  translation forever, and languages he cannot review. It is an
                  honest answer, and it also tells you the scale of the project.
                </p>
                <p>
                  Photoshop and GIMP still have deeper ecosystems. Plugins and
                  brushes, along with tutorials for those apps, run into the
                  millions.
                  Compositor gives you the core editor and the source code, and
                  it expects you to bring your own learning curve.
                </p>

                <h2 id="comp-faq">Frequently asked questions</h2>
                <h3>Is Compositor really free?</h3>
                <p>
                  Yes. It is MIT licensed, so you can read and fork it, then
                  ship it in personal and commercial work without paying a
                  license fee. The source lives on GitHub, and the author takes
                  new features as pull requests rather than as a subscription.
                </p>
                <h3>Can I open Photoshop files in it?</h3>
                <p>
                  Yes, for 8-bit RGB documents. Layers and folders stay
                  editable. So do masks and blend modes, along with fill shapes
                  and simple horizontal text. Vertical text and complex vectors
                  rasterize on import, and CMYK files do not open. A report
                  shows the conversion before it applies.
                </p>
                <h3>Does it run on Intel Macs or Windows?</h3>
                <p>
                  No on both. Compositor targets macOS 26 and later on Apple
                  silicon. That limit buys a native build with direct access to
                  the GPU for layer effects and live previews. If you are on
                  Intel or Windows, this one is not for you yet.
                </p>
                <h3>What is a comp file?</h3>
                <p>
                  A <code>.comp</code> is a project folder, not a single file. It
                  holds a <code>manifest.json</code> describing the document and
                  its layers, and an <code>images</code> folder with one PNG per
                  layer plus optional mask PNGs. Open one in Compositor and the
                  canvas updates live as those files change, which is what makes
                  the format work for scripts and AI agents.
                </p>

                <h2 id="comp-why-it-belongs">Why it belongs on your Mac</h2>
                <p>
                  You want a compositing tool that respects your budget and your
                  habits. Compositor gives you Photoshop-shaped layers and
                  effects, plus the masks and the shortcuts, for free, in a
                  native macOS build that keeps working while it saves. If the
                  monthly bill on creative software has been on your mind, this
                  is the same instinct behind{" "}
                  <Link href="/blog/figma-stop-taking-my-money">
                    dropping paid design tools
                  </Link>
                  .
                </p>
                <p>
                  The agent-readable project format is the piece that makes it
                  more than a cheaper clone. It turns the editor into something
                  an AI workflow can drive directly, which is rare in a category
                  that still treats project files as black boxes. Grab the build
                  from GitHub, point an agent at a <code>.comp</code>, and watch
                  the layers arrive. When you want the interface around those
                  images to match, our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for
                  the same fast, solo workflow.
                </p>
                  </>
                )}

                {slug === "spectrum-ui" && (
                  <>
                <p className="blog_big-paragraph">
                  You find a component you want on the page: a button with a
                  soft glow, a card that lifts on hover, a loader that looks
                  alive while the data arrives. You copy the JSX, paste it into
                  your project, then discover it depends on a package you do not
                  use and a styling system you will never adopt. Spectrum UI
                  takes the opposite path. The component arrives as plain files
                  in your own repo, and you own every line.
                </p>

                <h2 id="what-spectrum-ui-does">
                  What Spectrum UI actually does
                </h2>
                <p>
                  Spectrum UI is an open source component library for React and
                  Next.js, styled with Tailwind CSS. It collects animated
                  interface pieces: buttons, cards, text effects, loaders, and
                  background elements. Instead of installing a runtime package,
                  you add each component with a CLI command, and the source
                  lands in your components folder as a file you can read and
                  edit.
                </p>
                <p>
                  The set is built by Arihant Jain, and the code lives on{" "}
                  <a
                    href="https://github.com/arihantcodes/spectrum-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                  . You can browse the full catalog at{" "}
                  <a
                    href="https://ui.spectrumhq.in/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    ui.spectrumhq.in
                  </a>
                  , where each component has a live preview, its props, and the
                  install command. The license is MIT, so the files you pull are
                  yours to change in personal and commercial work.
                </p>

                <h2 id="why-copy-paste-components">
                  Why copy-paste components change the workflow
                </h2>
                <p>
                  A library that ships as a dependency asks you to trust its
                  future. When the maintainer renames a prop or drops a version,
                  your build breaks and you wait for a fix you did not schedule.
                  A component that ships as source carries no such contract. You
                  add the file, then treat it as your own code.
                </p>
                <p>
                  That difference matters most when you build with an AI
                  assistant. A source file is the format the model reads best.
                  It sees the props and the styles, then writes an integration
                  that matches your project instead of guessing at an API hidden
                  inside a package. You paste the component, describe where it
                  belongs, and the assistant wires it in without a dependency to
                  fight.
                </p>

                <h2 id="what-ships-spectrum-ui">What ships in the box</h2>
                <p>The catalog is grouped by what each piece does on the page:</p>
                <ul>
                  <li>❶ Buttons with animated glow and hover states</li>
                  <li>❷ Cards that lift or tilt when the cursor reaches them</li>
                  <li>❸ Text effects that animate on load or on scroll</li>
                  <li>❹ Loaders and spinners for waiting states</li>
                  <li>
                    ❺ Background elements such as gradients and animated
                    surfaces
                  </li>
                </ul>
                <p>
                  Every component is built on Tailwind utilities, so it picks up
                  the theme you already set. Colour and spacing come from your
                  tokens rather than from a stylesheet you have to override. The
                  pieces are independent, which means you keep the ones you add
                  and ignore the rest of the catalog.
                </p>

                <h2 id="how-the-cli-adds-a-component">
                  How the CLI adds a component
                </h2>
                <p>The path from the catalog to your codebase is short:</p>
                <ul>
                  <li>
                    ❶ Open the catalog and find the component that fits the
                    section you have in mind
                  </li>
                  <li>❷ Copy the install command from the component page</li>
                  <li>
                    ❸ Run it, and the file appears inside your components folder
                  </li>
                  <li>
                    ❹ Import it and render it, then adjust the props to match
                    your layout
                  </li>
                </ul>
                <p>
                  Several animated pieces lean on a small motion library, and
                  the CLI installs it alongside the file, so you do not hunt for
                  the dependency by hand. If you build with an AI assistant, the
                  same flow runs in chat. Paste the component into the
                  conversation, describe the element it should wrap, and let the
                  model handle the import.
                </p>

                <h2 id="motion-on-top-of-tailwind">
                  Motion on top of Tailwind
                </h2>
                <p>
                  Tailwind on its own stops at transitions and keyframes.
                  Complex motion, the kind that reacts to a cursor or springs
                  into place, needs a motion library underneath. Spectrum UI
                  pairs the two, so the utility classes handle the static look
                  and the motion library carries the movement.
                </p>
                <p>
                  Motion is not welcome for everyone. Some people feel dizzy
                  from large movement, and their system already tells your page
                  to tone it down. The components respect{" "}
                  <code>prefers-reduced-motion</code>, so a visitor who asked
                  for less movement gets the static version of each piece. If
                  you want to apply the same rule to your own components, the{" "}
                  <a
                    href="https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MDN reference on prefers-reduced-motion
                  </a>{" "}
                  explains the media query.
                </p>

                <h2 id="faq-spectrum-ui">Frequently asked questions</h2>
                <h3>Is Spectrum UI free to use?</h3>
                <p>
                  Yes. It is MIT licensed, so you can use the components in
                  personal and commercial work without paying a fee. The source
                  lives on GitHub, and once a component is in your repo, the
                  license travels with the file you own.
                </p>
                <h3>Do I need Tailwind to use it?</h3>
                <p>
                  Yes. The components are written with Tailwind classes, so a
                  project already on Tailwind is the shortest path. If you are
                  not on Tailwind yet, the files are still readable, and you can
                  port the classes to your own styling system once the component
                  is in your hands.
                </p>
                <h3>Does it work with Next.js?</h3>
                <p>
                  It does. The components are plain React files with TypeScript
                  types, so they drop into a Next.js app the same way any local
                  component does. Animated pieces carry a small motion library,
                  which the CLI installs for you.
                </p>
                <h3>Can I change a component after I add it?</h3>
                <p>
                  That is the point of the copy-paste model. The file sits in
                  your project, so you edit the styles and the timing directly.
                  Nothing updates behind your back, and nothing breaks when the
                  maintainer ships a new version.
                </p>

                <h2 id="why-it-belongs-spectrum-ui">
                  Why it belongs in your stack
                </h2>
                <p>
                  You want the interface to move without adopting a design
                  system you did not choose. Spectrum UI gives you animated
                  pieces as source, one command each, and the freedom to reshape
                  them once they land. The parts you keep are the parts you
                  changed yourself.
                </p>
                <p>
                  For a solo builder shipping fast with AI, the trade is clean:
                  real motion, no runtime package, and code the assistant can
                  read. Grab the component that fits the section you are
                  building, run the command, and let the page stop feeling
                  static. When you want the screens around that motion to hold
                  up, our{" "}
                  <Link href="/freebies">free Figma resources</Link> and{" "}
                  <Link href="/code">design and code kits</Link> are built for
                  the same ship-it-yourself workflow.
                </p>
                  </>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
