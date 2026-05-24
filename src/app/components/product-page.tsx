import { useState } from "react";
import { ChevronDown, ChevronRight, Heart, Plus, Minus, Star, Truck, RotateCcw, Package } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductCard } from "./product-card";
import { products, productBySlug, type FullProduct } from "../data";
import { useStore } from "../store";

const colorMap: Record<string, string> = {
  Bone: "#EDE3D2", Taupe: "#A89A86", Sage: "#7B8470", Camel: "#C8A98A",
  Ink: "#2C2620", Clay: "#B9755A", Cream: "#F1E9DA", Natural: "#C8A98A",
  "Brushed brass": "#B9905A", "Oat stripe": "#EDE3D2",
};

export function ProductPage({ slug }: { slug: string }) {
  const product = productBySlug(slug);
  const { navigate, addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(product?.color ?? "");
  const [size, setSize] = useState(product?.size ?? "");

  if (!product) {
    return (
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-24 text-center">
        <p className="font-display" style={{ fontSize: "32px", fontWeight: 500 }}>Not found.</p>
        <button onClick={() => navigate({ name: "home" })} className="mt-6 text-[var(--accent-clay)] underline">Back home</button>
      </div>
    );
  }

  const swatches = product.swatches ?? [colorMap[product.color] ?? "#EDE3D2"];
  const monthly = Math.round(Number((product.salePrice ?? product.price).replace(/[^0-9.]/g, "")) / 4);

  return (
    <div>
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-6 flex items-center gap-2 text-[12px] text-[var(--ink-tertiary)]">
        <button onClick={() => navigate({ name: "home" })} className="hover:text-[var(--ink-primary)]">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => navigate({ name: "category", category: "Living" })} className="hover:text-[var(--ink-primary)]">Living</button>
        <ChevronRight size={12} />
        <span className="text-[var(--ink-secondary)]">{product.name}</span>
      </div>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-[88px] pb-16 grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-10 lg:gap-16">
        <div className="grid grid-cols-[64px_1fr] gap-4 items-start">
          <div className="hidden lg:flex flex-col gap-3 sticky top-[140px]">
            {product.gallery.map((g, i) => (
              <button
                key={g}
                onClick={() => setActiveImg(i)}
                className={`w-16 h-20 overflow-hidden border-2 transition-colors ${activeImg === i ? "border-[var(--ink-primary)]" : "border-transparent opacity-70"}`}
              >
                <ImageWithFallback src={g} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="lg:col-start-2 -mx-6 lg:mx-0">
            <div className="aspect-[4/5] overflow-hidden bg-[var(--surface-warm)]">
              <ImageWithFallback
                src={product.gallery[activeImg]}
                alt={product.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:hidden flex gap-2 px-6 mt-3 overflow-x-auto">
              {product.gallery.map((g, i) => (
                <button key={g} onClick={() => setActiveImg(i)} className={`flex-shrink-0 w-14 h-16 overflow-hidden border-2 ${activeImg === i ? "border-[var(--ink-primary)]" : "border-transparent opacity-70"}`}>
                  <ImageWithFallback src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-[140px] h-fit">
          <div className="eyebrow mb-3">{product.collection} Collection</div>
          <h1 className="font-display mb-4" style={{ fontSize: "clamp(32px, 3.6vw, 44px)", lineHeight: 1.1, fontWeight: 500 }}>
            {product.name}
          </h1>
          <div className="flex items-baseline gap-3 mb-1">
            {product.salePrice ? (
              <>
                <span className="text-[20px] text-[var(--ink-tertiary)] line-through">{product.price}</span>
                <span className="text-[22px] text-[var(--accent-clay)]">{product.salePrice}</span>
              </>
            ) : (
              <span className="text-[22px]">{product.price}</span>
            )}
          </div>
          <div className="text-[12px] text-[var(--ink-tertiary)] mb-6">or 4 payments of ${monthly} with Afterpay</div>

          <p className="text-[16px] text-[var(--ink-secondary)] leading-[26px] mb-8">{product.dek}</p>

          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-[13px] tracking-[0.06em] uppercase">Color</span>
              <span className="text-[13px] text-[var(--ink-secondary)]">{variant}</span>
            </div>
            <div className="flex gap-2.5">
              {swatches.map((c, i) => {
                const labels = [product.color, "Taupe", "Sage", "Camel", "Ink"];
                const label = labels[i] ?? product.color;
                return (
                  <button
                    key={i}
                    onClick={() => setVariant(label)}
                    aria-label={label}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${variant === label ? "border-[var(--ink-primary)] scale-105" : "border-[var(--line)]"}`}
                    style={{ backgroundColor: c }}
                  />
                );
              })}
            </div>
          </div>

          {product.size && (
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[13px] tracking-[0.06em] uppercase">Size</span>
                <button className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2">Size guide</button>
              </div>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full px-4 py-3 border border-[var(--line)] bg-[var(--bg-elevated)] text-[14px] focus:outline-none focus:border-[var(--ink-primary)]"
              >
                {[product.size, "Twin", "Full", "Queen", "King"].filter((v, i, a) => a.indexOf(v) === i).map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-6">
            <div className="text-[13px] tracking-[0.06em] uppercase mb-3">Quantity</div>
            <div className="inline-flex items-center border border-[var(--line)]">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-11 h-11 flex items-center justify-center hover:bg-[var(--surface-warm)]"><Minus size={14} strokeWidth={1.5} /></button>
              <span className="w-11 text-center">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-[var(--surface-warm)]"><Plus size={14} strokeWidth={1.5} /></button>
            </div>
          </div>

          <button
            onClick={() => { for (let i = 0; i < qty; i++) addToCart(product, variant); }}
            className="w-full py-4 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.1em] uppercase transition-colors duration-150 mb-3"
          >
            Add to bag
          </button>
          <button
            onClick={() => product && toggleWishlist(product)}
            className="w-full py-4 border border-[var(--ink-primary)] text-[13px] tracking-[0.1em] uppercase flex items-center justify-center gap-2 hover:bg-[var(--ink-primary)] hover:text-white transition-colors"
          >
            <Heart size={15} strokeWidth={1.5} fill={product && isWishlisted(product.slug) ? "currentColor" : "none"} />
            {product && isWishlisted(product.slug) ? "Saved for later" : "Save for later"}
          </button>

          <div className="mt-6 grid grid-cols-3 gap-3 py-5 border-y border-[var(--line)] text-center">
            <Trust icon={<Truck size={16} strokeWidth={1.5} />} label="Free over $150" />
            <Trust icon={<RotateCcw size={16} strokeWidth={1.5} />} label="60-day returns" />
            <Trust icon={<Package size={16} strokeWidth={1.5} />} label="Ships 3–5 days" />
          </div>

          <div className="mt-2">
            <Accordion title="Details & Dimensions">
              <ul className="space-y-1.5 text-[14px] text-[var(--ink-secondary)] leading-[22px]">
                {product.details.map((d) => <li key={d}>· {d}</li>)}
              </ul>
            </Accordion>
            <Accordion title="Materials & Care"><p className="text-[14px] text-[var(--ink-secondary)] leading-[22px]">{product.care}</p></Accordion>
            <Accordion title="Sustainability"><p className="text-[14px] text-[var(--ink-secondary)] leading-[22px]">{product.sustainability}</p></Accordion>
            <Accordion title="Shipping & Returns"><p className="text-[14px] text-[var(--ink-secondary)] leading-[22px]">{product.shipping}</p></Accordion>
          </div>

          <div className="mt-8 bg-[var(--surface-warm)] p-6">
            <div className="eyebrow mb-3">Designer's Note</div>
            <p className="font-display italic mb-3" style={{ fontSize: "18px", lineHeight: 1.5, fontWeight: 400 }}>
              “{product.designerNote}”
            </p>
            <div className="text-[12px] text-[var(--ink-tertiary)] tracking-[0.08em] uppercase">— {product.designerName}</div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-elevated)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="eyebrow mb-3">In the room</div>
          <h2 className="font-display mb-10" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>
            Styled, lived with.
          </h2>
          <div className="aspect-[16/9] overflow-hidden">
            <ImageWithFallback src={product.inRoom} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-16 lg:py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-3">Pair it with</div>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>Goes well together.</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {product.pairWith.map((s) => {
            const p = productBySlug(s);
            return p ? <ProductCard key={s} product={p} /> : null;
          })}
        </div>
      </section>

      <ReviewsSection product={product} />

      <section className="bg-[var(--bg-elevated)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <h2 className="font-display mb-10" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>You may also like.</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {products.filter((p) => p.slug !== product.slug).slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </div>
  );
}

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[var(--ink-secondary)]">{icon}</span>
      <span className="text-[11px] text-[var(--ink-secondary)] tracking-[0.04em]">{label}</span>
    </div>
  );
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--line)]">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between py-4 text-left text-[14px]">
        <span>{title}</span>
        <ChevronDown size={16} strokeWidth={1.5} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}

function ReviewsSection({ product }: { product: FullProduct }) {
  const distribution = [82, 12, 4, 1, 1];
  const reviews = [
    { name: "Sarah K.", date: "March 2026", rating: 5, title: "Worth every penny", body: "I sat in this for hours the day it arrived. The linen is exactly the right kind of crumpled, and the frame feels like it'll outlive me.", verified: true },
    { name: "Maya R.", date: "February 2026", rating: 5, title: "The slipcover is a game-changer", body: "Two kids, a dog, and a coffee habit. Washed it twice already and it just keeps softening.", verified: true },
    { name: "James L.", date: "January 2026", rating: 4, title: "Beautiful piece", body: "Delivery took a little longer than expected, but the white-glove team was excellent. The sofa itself is gorgeous.", verified: true },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-16 lg:py-24 border-t border-[var(--line)]">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12">
        <div>
          <div className="eyebrow mb-3">Reviews</div>
          <h2 className="font-display mb-6" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>
            {product.rating.toFixed(1)} <span className="text-[var(--ink-tertiary)]">/ 5</span>
          </h2>
          <div className="flex items-center gap-0.5 mb-2 text-[var(--accent-clay)]">
            {[1,2,3,4,5].map((s) => <Star key={s} size={16} fill="currentColor" strokeWidth={0} />)}
          </div>
          <div className="text-[13px] text-[var(--ink-secondary)] mb-6">Based on {product.reviewCount} reviews</div>
          <ul className="space-y-2">
            {distribution.map((pct, i) => (
              <li key={i} className="flex items-center gap-3 text-[12px] text-[var(--ink-secondary)]">
                <span className="w-3">{5 - i}</span>
                <div className="flex-1 h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--accent-clay)]" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-8 text-right">{pct}%</span>
              </li>
            ))}
          </ul>
          <button className="mt-6 px-6 py-3 border border-[var(--ink-primary)] text-[13px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white">
            Write a review
          </button>
        </div>

        <div className="space-y-8">
          {reviews.map((r) => (
            <div key={r.name} className="pb-8 border-b border-[var(--line)] last:border-0">
              <div className="flex items-center gap-2 mb-2 text-[var(--accent-clay)]">
                {[1,2,3,4,5].map((s) => <Star key={s} size={14} fill={s <= r.rating ? "currentColor" : "none"} strokeWidth={1.5} />)}
              </div>
              <h3 className="font-display mb-2" style={{ fontSize: "20px", fontWeight: 500 }}>{r.title}</h3>
              <p className="text-[15px] text-[var(--ink-secondary)] leading-[24px] mb-3">{r.body}</p>
              <div className="flex items-center gap-3 text-[12px] text-[var(--ink-tertiary)]">
                <span>{r.name}</span>
                <span>·</span>
                <span>{r.date}</span>
                {r.verified && <><span>·</span><span className="text-[var(--accent-sage)]">Verified buyer</span></>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
