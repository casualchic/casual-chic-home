import { X, Heart, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useStore } from "../store";
import { products, productBySlug } from "../data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function WishlistDrawer() {
  const { wishlistOpen, closeWishlist, wishlist, toggleWishlist, addToCart, navigate } = useStore();

  useEffect(() => {
    if (wishlistOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [wishlistOpen]);

  const items = wishlist.map((s) => productBySlug(s)).filter(Boolean) as typeof products;

  return (
    <>
      <div
        onClick={closeWishlist}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${wishlistOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[440px] bg-[var(--bg-base)] shadow-2xl flex flex-col transition-transform duration-300 ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="px-6 pt-6 pb-4 border-b border-[var(--line)] flex items-center justify-between">
          <div className="font-display" style={{ fontSize: "22px", fontWeight: 500 }}>
            Wishlist <span className="text-[var(--ink-tertiary)]">({items.length})</span>
          </div>
          <button onClick={closeWishlist} aria-label="Close" className="p-1 hover:text-[var(--accent-clay)]">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-[var(--surface-warm)] mx-auto mb-5 flex items-center justify-center text-[var(--ink-secondary)]">
                <Heart size={18} strokeWidth={1.5} />
              </div>
              <p className="font-display mb-3" style={{ fontSize: "22px", lineHeight: 1.3, fontWeight: 500 }}>
                Nothing saved — yet.
              </p>
              <p className="text-[14px] text-[var(--ink-secondary)] mb-6">Tap the heart on anything you love and we'll keep it for later.</p>
              <button onClick={closeWishlist} className="px-6 py-3 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase">
                Start browsing
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--line)]">
              {items.map((p) => (
                <li key={p.slug} className="p-6 flex gap-4">
                  <button
                    onClick={() => { closeWishlist(); navigate({ name: "product", slug: p.slug }); }}
                    className="w-20 h-24 flex-shrink-0 bg-[var(--surface-warm)] overflow-hidden"
                  >
                    <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => { closeWishlist(); navigate({ name: "product", slug: p.slug }); }}
                      className="text-[14px] text-left hover:text-[var(--accent-clay)]"
                    >
                      {p.name}
                    </button>
                    <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">{p.descriptor}</div>
                    <div className="text-[13px] mt-1.5">{p.salePrice ?? p.price}</div>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => addToCart(p)}
                        className="px-4 py-2 bg-[var(--ink-primary)] text-white text-[11px] tracking-[0.08em] uppercase hover:bg-[var(--accent-clay)] transition-colors"
                      >
                        Add to bag
                      </button>
                      <button
                        onClick={() => toggleWishlist(p)}
                        className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2 hover:text-[var(--accent-clay)]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[var(--line)] bg-[var(--bg-base)] px-6 py-5">
            <button
              onClick={() => { closeWishlist(); navigate({ name: "account", tab: "wishlist" }); }}
              className="w-full py-3.5 border border-[var(--ink-primary)] text-[13px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              View full wishlist <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
