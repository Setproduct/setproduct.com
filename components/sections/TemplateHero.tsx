import { getGumroadLinkProps } from "../../lib/gumroad";
import HeroCoverImage from "./HeroCoverImage";

type Props = {
  title: string;
  description: string;
  heroImage: string;
  buyHref: string;
  previewHref: string;
  price?: string;
};

export default function TemplateHero({
  title,
  description,
  heroImage,
  buyHref,
  previewHref,
}: Props) {
  return (
    <div className="section is-height-100vh">
      <div className="section-padding top-80 bottom-64">
        <div className="container">
          <div className="template_hero-sect is-light">
            <div className="template_hero-wr max-width-900">
              <h1 className="heading-style-h1">{title}</h1>
              <p className="heading-style-h5">{description}</p>
              <div className="template_hero-btn-wr">
                <a
                  href={buyHref}
                  {...getGumroadLinkProps(buyHref, "button w-inline-block")}
                >
                  <div className="text-size-large text-weight-bold">Get started</div>
                </a>
                <a
                  className="button secondary w-inline-block"
                  href={previewHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-size-large text-weight-bold">Preview in Figma</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HeroCoverImage key={heroImage} src={heroImage} alt={title} />
    </div>
  );
}
