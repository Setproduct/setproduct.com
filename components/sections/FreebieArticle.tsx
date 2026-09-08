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

const ARTICLE_HEADINGS: Record<string, ArticleHeading[]> = {
  "driver-js": DRIVER_JS_HEADINGS,
  "m3e-canvas": M3E_CANVAS_HEADINGS,
  pdfcn: PDFCN_HEADINGS,
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
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
