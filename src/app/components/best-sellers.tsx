import { ProductCard } from "./product-card";
import { products } from "../data";
import { useStore } from "../store";

const slugs = ["marin-sofa", "ojai-table", "hudson-mug", "petra-candle", "loma-pendant", "field-throw", "anza-rug", "olive-vase"];

export function BestSellers() {
  const { navigate } = useStore();
  const list = slugs.map((s) => products.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <section className="py-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <div className="eyebrow mb-3">Best Sellers</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 500 }}>
              Quiet favorites.
            </h2>
          </div>
          <button onClick={() => navigate({ name: "category", category: "Living" })} className="hidden md:inline-block text-[13px] border-b border-[var(--ink-primary)] pb-0.5">
            Shop all →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}
