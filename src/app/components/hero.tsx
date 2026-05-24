import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section className="relative w-full" style={{ height: "80vh", minHeight: "560px" }}>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1773061865077-12120d59a217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200"
        alt="Sunlit living room corner with rocking chairs and bookshelf"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      <div className="absolute inset-0 mx-auto max-w-[1440px] px-6 lg:px-[88px] flex flex-col justify-end pb-16 lg:pb-24">
        <span className="eyebrow text-white/90 mb-6">Spring Collection 2026</span>
        <h1
          className="font-display text-white mb-8 max-w-[820px]"
          style={{ fontSize: "clamp(48px, 7vw, 80px)", lineHeight: 1.05, fontWeight: 500 }}
        >
          Beautifully lived in.
        </h1>
        <div>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[14px] transition-colors duration-150"
          >
            Shop New Arrivals <ArrowRight size={16} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </section>
  );
}
