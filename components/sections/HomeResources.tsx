import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import type { FreebieItem } from "../../types/data";

type Props = {
  items: Pick<FreebieItem, "slug" | "title" | "description" | "thumb" | "imageAlt" | "category" | "previewHref">[];
};

/** Free resources teaser: the most visited ones and a way to the full list. */
export default function HomeResources({ items }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="section" data-home-section="resources">
      <div className="section-padding top-80 bottom-64">
        <div className="container">
          <div className="home-section-head">
            <div>
              <h2 className="heading-style-h2">Free resources</h2>
              <div className="spacer-8" />
              <p className="text-size-large">Components, icons and open source tools you can use today.</p>
            </div>
            <Link className="button secondary w-inline-block" href="/freebies">
              <div className="text-size-large text-weight-bold">All resources</div>
              <div className="button-icon w-embed"><ArrowIcon /></div>
            </Link>
          </div>
          <div className="spacer-32" />
          <ul className="home-resources">
            {items.map((item, index) => (
              <li key={item.slug} data-home-position={index + 1}>
                <Link className="home-resource-card hover-lift is-large" href={item.previewHref}>
                  <span className="home-resource-img hover-lift-media">
                    <img alt={item.imageAlt ?? item.title} src={item.thumb} loading="lazy" decoding="async" />
                  </span>
                  <span className="home-resource-info">
                    <span className="text-size-tiny text-weight-semibold text-color-primary">{item.category}</span>
                    <span className="hover-lift-title heading-style-h5 text-color-dark-primary text-style-1line">
                      {item.title}
                    </span>
                    <span className="text-size-small text-style-2lines">{item.description}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
