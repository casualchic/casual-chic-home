import { X, Plus, Minus, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useStore } from "../store";
import { products } from "../data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const FREE_SHIP_THRESHOLD = 150;

export function CartDrawer() {
  const { cartOpen, closeCart, cart, updateQty, removeFromCart, subtotal, navigate } = useStore();
  const goCheckout = () => { closeCart(); navigate({ name: "checkout" }); };
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [cartOpen]);

  const frequentlyAdded = products.filter((p) => ["petra-candle", "field-throw", "hudson-mug", "olive-vase"].includes(p.slug));

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${cartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[480px] bg-[var(--bg-base)] shadow-2xl flex flex-col transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!cartOpen}
      >
        <div className="px-6 pt-6 pb-4 border-b border-[var(--line)]">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display" style={{ fontSize: "22px", fontWeight: 500 }}>
              Your bag <span className="text-[var(--ink-tertiary)]">({cart.length})</span>
            </div>
            <button onClick={closeCart} aria-label="Close" className="p-1 hover:text-[var(--accent-clay)]">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <div>
            <div className="text-[13px] text-[var(--ink-secondary)] mb-2">
              {remaining > 0
                ? <>You're <span className="text-[var(--ink-primary)]">${remaining}</span> away from free shipping.</>
                : <>You've unlocked <span className="text-[var(--accent-sage)]">free shipping</span>.</>}
            </div>
            <div className="h-[3px] bg-[var(--line)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--accent-clay)] transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="font-display mb-3" style={{ fontSize: "22px", lineHeight: 1.3, fontWeight: 500 }}>
                Your bag's empty — for now.
              </p>
              <p className="text-[14px] text-[var(--ink-secondary)] mb-6">Start with a candle? Or take the long way through The Edit.</p>
              <button onClick={closeCart} className="px-6 py-3 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase">
                Keep browsing
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {cart.map((item) => (
                <li key={`${item.slug}-${item.variant}`} className="p-6 flex gap-4">
                  <div className="w-20 h-24 flex-shrink-0 bg-[var(--surface-warm)] overflow-hidden">
                    <ImageWithFallback src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div className="text-[14px]">{item.name}</div>
                      <div className="text-[14px]">${item.unitPrice * item.qty}</div>
                    </div>
                    <div className="text-[12px] text-[var(--ink-tertiary)] mt-1">{item.variant}</div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[var(--line)]">
                        <button onClick={() => updateQty(item.slug, item.variant, item.qty - 1)} aria-label="Decrease" className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-warm)]">
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-[13px]">{item.qty}</span>
                        <button onClick={() => updateQty(item.slug, item.variant, item.qty + 1)} aria-label="Increase" className="w-8 h-8 flex items-center justify-center hover:bg-[var(--surface-warm)]">
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.slug, item.variant)} className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2 hover:text-[var(--accent-clay)]">
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {cart.length > 0 && (
            <>
              <div className="px-6 py-5 border-t border-[var(--line)]">
                <label className="flex items-center gap-3 text-[13px] text-[var(--ink-secondary)] cursor-pointer">
                  <input type="checkbox" className="accent-[var(--accent-clay)]" />
                  Add a gift note
                </label>
              </div>
              <div className="px-6 py-6 border-t border-[var(--line)]">
                <div className="eyebrow mb-4">Frequently added</div>
                <div className="flex gap-3 overflow-x-auto -mx-6 px-6">
                  {frequentlyAdded.map((p) => (
                    <FreqCard key={p.slug} slug={p.slug} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[var(--line)] bg-[var(--bg-base)] px-6 py-5">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-[14px] text-[var(--ink-secondary)]">Subtotal</span>
              <span className="text-[18px]">${subtotal}</span>
            </div>
            <div className="text-[12px] text-[var(--ink-tertiary)] mb-4">Shipping and taxes calculated at checkout.</div>
            <button onClick={goCheckout} className="w-full py-4 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase flex items-center justify-center gap-2 transition-colors duration-150">
              Checkout <ArrowRight size={16} strokeWidth={1.5} />
            </button>
            <button onClick={closeCart} className="w-full mt-3 py-2 text-[13px] text-[var(--ink-primary)] underline underline-offset-4 hover:text-[var(--accent-clay)]">
              View bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function FreqCard({ slug }: { slug: string }) {
  const { addToCart } = useStore();
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  return (
    <div className="flex-shrink-0 w-[110px]">
      <div className="aspect-square bg-[var(--surface-warm)] overflow-hidden mb-2">
        <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="text-[12px] truncate">{p.name}</div>
      <div className="text-[12px] text-[var(--ink-secondary)] mt-0.5">{p.salePrice ?? p.price}</div>
      <button onClick={() => addToCart(p)} className="mt-1.5 text-[11px] tracking-[0.08em] uppercase text-[var(--accent-clay)] hover:text-[var(--accent-clay-deep)]">
        Add +
      </button>
    </div>
  );
}
