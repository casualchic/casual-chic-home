import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useStore } from "../store";
import { articles } from "./edit-pages";

const stories = articles.map((a) => ({
  slug: a.slug,
  eyebrow: a.category,
  title: a.title,
  dek: a.dek,
  img: a.hero,
}));

export function EditStrip() {
  const { navigate } = useStore();
  return (
    <section className="bg-[var(--bg-elevated)] py-16 lg:py-[120px]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <div className="eyebrow mb-3">The Edit</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 500 }}>
              Notes from the house.
            </h2>
          </div>
          <button onClick={() => navigate({ name: "edit-hub" })} className="hidden md:inline-block text-[13px] border-b border-[var(--ink-primary)] pb-0.5">All stories →</button>
        </div>

        <div className="flex gap-6 lg:gap-8 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 snap-x">
          {stories.map((s) => (
            <button key={s.title} onClick={() => navigate({ name: "edit-article", slug: s.slug })} className="group block flex-shrink-0 w-[280px] lg:w-[300px] snap-start text-left">
              <div className="aspect-[4/5] overflow-hidden mb-5">
                <ImageWithFallback
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
                />
              </div>
              <div className="eyebrow mb-2">{s.eyebrow}</div>
              <h3 className="font-display mb-2" style={{ fontSize: "22px", lineHeight: 1.2, fontWeight: 500 }}>{s.title}</h3>
              <p className="text-[14px] text-[var(--ink-secondary)] leading-[22px] mb-3">{s.dek}</p>
              <span className="text-[12px] tracking-[0.08em] uppercase border-b border-[var(--ink-primary)] pb-0.5">Read</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
