import type { Product } from "../../types/data";
import TemplateCard from "./TemplateCard";

type Props = {
  products: Product[];
  visibleCount?: number;
  onLoadMore?: () => void;
  variant?: "default" | "home";
};

export default function TemplateGrid({ products, visibleCount, onLoadMore, variant = "default" }: Props) {
  const displayProducts = visibleCount != null ? products.slice(0, visibleCount) : products;
  const hasMore = visibleCount != null && visibleCount < products.length;
  const gridClass = variant === "home" ? "templates_cl is-home w-dyn-items" : "templates_cl w-dyn-items";

  return (
    <div className="templates_cl-wr w-dyn-list">
      <div className={gridClass} role="list">
        {displayProducts.map((product) => (
          <div key={product.slug} className="w-dyn-item" role="listitem">
            <TemplateCard product={product} imgHeight={variant === "home" ? "default" : "480"} />
          </div>
        ))}
      </div>
      {hasMore && onLoadMore && (
        <>
          <div className="spacer-40" />
          <div className="main_blog-liist2-btn-wr">
            <a
              className="button-small outlined w-inline-block"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onLoadMore();
              }}
            >
              <div className="text-size-medium text-weight-bold">Load More</div>
            </a>
          </div>
        </>
      )}
    </div>
  );
}
