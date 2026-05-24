import { useState } from "react";
import { Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const hotspots = [
  { id: 1, top: "32%", left: "22%", name: "Linnea Linen Duvet", price: "$320", img: "https://images.unsplash.com/photo-1762199904064-56ddc38eda99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=400" },
  { id: 2, top: "58%", left: "44%", name: "Hudson Stoneware Mug", price: "$32", img: "https://images.unsplash.com/photo-1619911013257-8f1fbc919fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=400" },
  { id: 3, top: "44%", left: "72%", name: "Loma Pendant", price: "$320", img: "https://images.unsplash.com/photo-1559924508-1461423083c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=400" },
  { id: 4, top: "76%", left: "60%", name: "Anza Hand-Knotted Rug", price: "$1,890", img: "https://images.unsplash.com/photo-1567001605689-687b337ded33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=400" },
];

export function ShopTheRoom() {
  const [active, setActive] = useState<number | null>(1);
  return (
    <section className="bg-[var(--surface-warm)] py-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="max-w-[640px] mb-12">
          <div className="eyebrow mb-3">Shop the Room</div>
          <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 500 }}>
            Linen Bedroom No. 03.
          </h2>
          <p className="mt-4 text-[16px] text-[var(--ink-secondary)] leading-[26px]">
            A north-window bedroom built around washed linen, oak, and warm brass — every piece shoppable, none of it precious.
          </p>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1778731660248-897f9afcd93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2000"
            alt="Styled bedroom with fireplace and large window"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {hotspots.map((h) => (
            <div key={h.id} style={{ top: h.top, left: h.left }} className="absolute -translate-x-1/2 -translate-y-1/2">
              <button
                onClick={() => setActive(active === h.id ? null : h.id)}
                aria-label={h.name}
                className="w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-[var(--accent-clay)] hover:text-white transition-colors"
              >
                <Plus size={16} strokeWidth={1.75} className={active === h.id ? "rotate-45 transition-transform" : "transition-transform"} />
              </button>
              {active === h.id && (
                <div className="absolute left-12 top-0 w-[240px] bg-white p-3 shadow-xl flex items-center gap-3 animate-[fadeIn_200ms_ease-out]">
                  <img src={h.img} alt="" className="w-14 h-14 object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] truncate">{h.name}</div>
                    <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5">{h.price}</div>
                    <button className="mt-1.5 text-[11px] tracking-[0.1em] uppercase text-[var(--accent-clay)]">Add to bag</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
