import type { BundleItem } from "../../data/bundles";
import ArrowIcon from "./ArrowIcon";
import { getGumroadLinkProps } from "../../lib/gumroad";

type Props = { item: BundleItem };

export default function BundleCard({ item }: Props) {
  return (
    <div className="template-list-item hover-lift is-large scroll-mt-28" id={item.slug}>
      <div className="template-list-item-img-wr is-height-480 hover-lift-media">
        <img
          alt=""
          className="image-cover"
          loading="lazy"
          src={item.image}
        />
      </div>
      <div className="template-list-text-wr">
        <p className="subtitle-all-caps">{item.subtitle}</p>
        <p className="hover-lift-title heading-style-h4 text-color-dark-primary text-style-2lines">
          {item.title}
        </p>
        <p
          className="text-size-medium"
          dangerouslySetInnerHTML={{ __html: item.descriptionHtml }}
        />
      </div>
      <div className="template-list-btn-wr">
        <a
          href={item.buyHref}
          {...getGumroadLinkProps(item.buyHref, "button-small w-inline-block")}
        >
          <div className="text-size-medium text-weight-bold">
            Buy {item.price}
          </div>
          <div className="button-icon is-small w-embed">
            <ArrowIcon />
          </div>
        </a>
      </div>
    </div>
  );
}
