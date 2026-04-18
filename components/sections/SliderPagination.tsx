type Props = {
  activePage: number;
  totalPages: number;
  onGoTo: (page: number) => void;
  keyPrefix?: string;
};

const ArrowSvg = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16em" height="14em" viewBox="0 0 16 14" fill="currentColor">
    <path
      clipRule="evenodd"
      d="M8.91699 1.00007C9.46928 0.58586 10.2528 0.697789 10.667 1.25007L14.417 6.25007C14.7503 6.69452 14.7503 7.30563 14.417 7.75007L10.667 12.7501C10.2528 13.3024 9.46928 13.4143 8.91699 13.0001C8.36471 12.5859 8.25278 11.8024 8.66699 11.2501L10.917 8.25007H2.16699C1.47664 8.25007 0.916992 7.69043 0.916992 7.00007C0.916992 6.30972 1.47664 5.75007 2.16699 5.75007H10.917L8.66699 2.75007C8.25278 2.19779 8.36471 1.41429 8.91699 1.00007Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function SliderPagination({ activePage, totalPages, onGoTo, keyPrefix = "slider" }: Props) {
  const canPrev = activePage > 0;
  const canNext = activePage < totalPages - 1;

  return (
    <div className="relative min-h-20 mt-8 flex items-center justify-between gap-8">
      <ul className="splide__pagination static! inset-auto!">
        {Array.from({ length: totalPages }, (_, i) => (
          <li key={`${keyPrefix}-dot-${i}`}>
            <button
              className={`splide__pagination__page${i === activePage ? " is-active" : ""}`}
              onClick={() => onGoTo(i)}
              type="button"
              aria-label={`Go to page ${i + 1}`}
            />
          </li>
        ))}
      </ul>
      <div className="splide__arrows">
        <div
          className="splide__arrow splide__arrow--prev"
          onClick={() => canPrev && onGoTo(activePage - 1)}
          role="button"
          tabIndex={0}
          aria-label="Previous slide"
          style={{ opacity: canPrev ? 1 : 0.35 }}
        >
          <div className="splide__arrow-img rotate w-embed">
            <ArrowSvg />
          </div>
        </div>
        <div
          className="splide__arrow splide__arrow--next"
          onClick={() => canNext && onGoTo(activePage + 1)}
          role="button"
          tabIndex={0}
          aria-label="Next slide"
          style={{ opacity: canNext ? 1 : 0.35 }}
        >
          <div className="splide__arrow-img w-embed">
            <ArrowSvg />
          </div>
        </div>
      </div>
    </div>
  );
}
