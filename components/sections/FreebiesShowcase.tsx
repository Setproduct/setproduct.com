import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FREEBIE_PRODUCTS } from "../../data/freebies-listing";
import FreebieTemplateCard from "./FreebieTemplateCard";
import ArrowIcon from "./ArrowIcon";
import SliderPagination from "./SliderPagination";

const ITEMS_PER_PAGE = 3;

type Props = {
  excludeSlug?: string;
};

export default function FreebiesShowcase({ excludeSlug }: Props) {
  const [activePage, setActivePage] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useMemo(
    () => FREEBIE_PRODUCTS.filter((item) => item.slug !== excludeSlug),
    [excludeSlug],
  );
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const scrollToPage = useCallback((page: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = el.children[page * ITEMS_PER_PAGE] as HTMLElement | undefined;
    if (child) {
      isProgrammaticScrollRef.current = true;
      el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: "smooth" });
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 800);
    }
    setActivePage(page);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
      scrollEndTimerRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 120);

      if (isProgrammaticScrollRef.current) return;

      const scrollLeft = el.scrollLeft;
      const childWidth = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
      const gap = 24;
      const page = Math.round(scrollLeft / ((childWidth + gap) * ITEMS_PER_PAGE));
      setActivePage(Math.min(Math.max(page, 0), totalPages - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current);
      }
    };
  }, [totalPages]);

  return (
    <div className="section">
      <div className="section-padding top-80 bottom-80">
        <div className="container">
          <div className="main_template-list-section">
            <div className="heading-left-wr">
              <div className="heading-left-text-wr max-width-700">
                <h2 className="heading-style-h2">More Figma freebies</h2>
              </div>
              <div className="heading-left-text-btn-wr">
                <Link className="button secondary w-inline-block" href="/freebies">
                  <div className="text-size-large text-weight-bold">See All</div>
                  <div className="button-icon w-embed"><ArrowIcon /></div>
                </Link>
              </div>
            </div>
            <div className="spacer-32" />
            <div
              ref={trackRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none]"
            >
              {items.map((item) => (
                <div
                  key={item.slug}
                  style={{ flex: "0 0 calc(33.333% - 16px)", scrollSnapAlign: "start", minWidth: "340px" }}
                >
                  <FreebieTemplateCard item={item} />
                </div>
              ))}
            </div>
            <SliderPagination
              activePage={activePage}
              totalPages={totalPages}
              onGoTo={scrollToPage}
              keyPrefix="freebies"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
