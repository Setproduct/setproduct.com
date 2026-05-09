import React from "react";
import Link from "next/link";
import type { BreadcrumbItem } from "../../types/data";

type Props = { items: BreadcrumbItem[] };

export default function Breadcrumbs({ items }: Props) {
  return (
    <div className="section">
      <div className="container">
        <div className="breadcrump-wr">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <img
                  alt=""
                  className="breadcrump-icon"
                  loading="lazy"
                  src="/images/Icon.svg"
                />
              )}
              {item.href ? (
                <Link className="link-block no-margins w-inline-block" href={item.href}>
                  <div className="text-size-regular">{item.label}</div>
                </Link>
              ) : (
                <p className="text-size-regular">{item.label}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
