import { useRef } from "react";
import { getGumroadLinkProps } from "../../lib/gumroad";
import { useHeroParallax } from "../../hooks/useHeroParallax";

export type HeroAction = {
  label: string;
  href: string;
  /** "light" = lavender secondary button, "solid" = purple primary button. */
  variant?: "light" | "solid";
  /** Gumroad buy link: opens the on-site popup overlay instead of a new tab. */
  gumroad?: boolean;
  /** Open in a new tab (for external previews). Ignored for Gumroad links. */
  external?: boolean;
};

type Props = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  /** CSS object-position for the cover crop, e.g. "center 20%". */
  imagePosition?: string;
  actions?: HeroAction[];
  /** Wrapper width modifier class. Pass "" for the default 880em width. */
  maxWidthClass?: string;
};

export default function TemplateHero({
  title,
  description,
  image,
  imageAlt,
  imagePosition,
  actions,
  maxWidthClass = "max-width-900",
}: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  // No-op in browsers that support `animation-timeline: view()`; in Safari and
  // older Firefox it drives the parallax with a passive scroll listener.
  useHeroParallax(sectionRef, layerRef);

  return (
    <div className="section is-height-100vh" ref={sectionRef}>
      <div className="section-padding top-80 bottom-64">
        <div className="container">
          <div className="template_hero-sect">
            <div
              className={
                maxWidthClass
                  ? `template_hero-wr ${maxWidthClass}`
                  : "template_hero-wr"
              }
            >
              <h1 className="heading-style-h1">{title}</h1>
              <p className="heading-style-h5">{description}</p>
              {actions && actions.length > 0 && (
                <div className="template_hero-btn-wr">
                  {actions.map((action, index) => {
                    const baseClass = `button${
                      action.variant === "light" ? " secondary" : ""
                    } w-inline-block`;

                    if (action.gumroad) {
                      return (
                        <a
                          key={index}
                          href={action.href}
                          {...getGumroadLinkProps(action.href, baseClass)}
                        >
                          <div className="text-size-large text-weight-bold">
                            {action.label}
                          </div>
                        </a>
                      );
                    }

                    return (
                      <a
                        key={index}
                        className={baseClass}
                        href={action.href}
                        target={action.external ? "_blank" : undefined}
                        rel={action.external ? "noopener noreferrer" : undefined}
                      >
                        <div className="text-size-large text-weight-bold">
                          {action.label}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="section-bg-image-wr" ref={layerRef}>
        <img
          alt={imageAlt ?? title}
          className="image-cover"
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          src={image}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
        <div className="section-bg-gradient" />
      </div>
    </div>
  );
}
