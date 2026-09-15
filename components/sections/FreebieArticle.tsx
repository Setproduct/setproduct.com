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

const ARTICLE_HEADINGS: Record<string, ArticleHeading[]> = {
  "driver-js": DRIVER_JS_HEADINGS,
  "m3e-canvas": M3E_CANVAS_HEADINGS,
  pdfcn: PDFCN_HEADINGS,
  amicro: AMICRO_HEADINGS,
  runeicons: RUNEICONS_HEADINGS,
  "sfinterface-numbers": SFINTERFACE_NUMBERS_HEADINGS,
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
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
