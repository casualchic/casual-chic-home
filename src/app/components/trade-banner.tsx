import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useStore } from "../store";

export function TradeBanner() {
  const { navigate } = useStore();
  return (
    <section className="py-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="bg-[var(--surface-warm)] grid md:grid-cols-2 overflow-hidden">
          <div className="p-10 lg:p-16 flex flex-col justify-center">
            <div className="eyebrow mb-4">Trade Program</div>
            <h2 className="font-display mb-5" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.15, fontWeight: 500 }}>
              Designers, builders, stylists: 15% trade discount.
            </h2>
            <p className="text-[15px] text-[var(--ink-secondary)] leading-[24px] mb-7 max-w-[460px]">
              Dedicated account support, swatch kits on us, and white-glove delivery on every project — large or small.
            </p>
            <div>
              <button
                onClick={() => navigate({ name: "trade" })}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--ink-primary)] text-[13px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white transition-colors duration-150"
              >
                Apply <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            </div>
          </div>
          <div className="aspect-[4/3] md:aspect-auto md:h-full min-h-[280px] relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1618572195571-1fdd75cd7add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1200"
              alt="Designer working at a wooden desk in a warm interior"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
