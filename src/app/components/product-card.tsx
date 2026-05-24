import { Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useStore } from "../store";
import type { FullProduct } from "../data";

export type Product = {
  name: string;
  descriptor: string;
  price: string;
  salePrice?: string;
  image: string;
  hoverImage?: string;
  alt: string;
  tag?: { label: string; tone: "sage" | "clay" };
  swatches?: string[];
  extraSwatches?: number;
};

export function ProductCard({ product }: { product: FullProduct }) {
  const { navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const saved = isWishlisted(product.slug);
  return (
    <div className="group">
      <button
        onClick={() => navigate({ name: "product", slug: product.slug })}
        className="relative block w-full aspect-[4/5] overflow-hidden bg-[var(--surface-warm)] mb-4 text-left"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
        />
        {product.hoverImage && (
          <ImageWithFallback
            src={product.hoverImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        {product.tag && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] tracking-[0.12em] uppercase rounded-full text-white"
            style={{ backgroundColor: product.tag.tone === "sage" ? "var(--accent-sage)" : "var(--accent-clay)" }}
          >
            {product.tag.label}
          </span>
        )}

        <span
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200 hover:text-[var(--accent-clay)] ${saved ? "opacity-100 text-[var(--accent-clay)]" : "opacity-0 group-hover:opacity-100"}`}
        >
          <Heart size={15} strokeWidth={1.5} fill={saved ? "currentColor" : "none"} />
        </span>

        <span
          onClick={(e) => { e.stopPropagation(); addToCart(product); }}
          className="absolute left-3 right-3 bottom-3 py-2.5 text-center bg-white/95 text-[var(--ink-primary)] text-[12px] tracking-[0.1em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:bg-[var(--ink-primary)] hover:text-white cursor-pointer"
        >
          Quick add
        </span>
      </button>

      <button
        onClick={() => navigate({ name: "product", slug: product.slug })}
        className="text-left w-full"
      >
        <div className="text-[16px] text-[var(--ink-primary)] leading-tight">{product.name}</div>
        <div className="text-[13px] text-[var(--ink-tertiary)] mt-1">{product.descriptor}</div>
        <div className="mt-2 flex items-baseline gap-2">
          {product.salePrice ? (
            <>
              <span className="text-[15px] text-[var(--ink-tertiary)] line-through">{product.price}</span>
              <span className="text-[15px] text-[var(--accent-clay)]">{product.salePrice}</span>
            </>
          ) : (
            <span className="text-[15px] text-[var(--ink-primary)]">{product.price}</span>
          )}
        </div>
        {product.swatches && (
          <div className="mt-3 flex items-center gap-1.5">
            {product.swatches.map((c, i) => (
              <span key={i} className="w-3.5 h-3.5 rounded-full border border-[var(--line)]" style={{ backgroundColor: c }} />
            ))}
            {product.extraSwatches ? (
              <span className="text-[11px] text-[var(--ink-tertiary)] ml-1">+{product.extraSwatches}</span>
            ) : null}
          </div>
        )}
      </button>
    </div>
  );
}
