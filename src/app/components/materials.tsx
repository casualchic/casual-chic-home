import { ImageWithFallback } from "./figma/ImageWithFallback";

const items = [
  {
    img: "https://images.unsplash.com/photo-1619459074324-33d5f591c53e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800",
    title: "Belgian linen, woven slow.",
    body: "Sourced from a fourth-generation Flemish mill. Pre-washed, garment-dyed, and built to soften with every wash.",
  },
  {
    img: "https://images.unsplash.com/photo-1620812067822-899be8a6a9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800",
    title: "FSC oak, dried for years.",
    body: "Our case goods are built in North Carolina from solid white oak — kiln-dried twelve months, joined by hand.",
  },
  {
    img: "https://images.unsplash.com/photo-1603897076223-17f346f02a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=800",
    title: "Stoneware, thrown by hand.",
    body: "A small Portuguese studio shapes every mug, vase, and serving piece. No two pieces are identical — that's the point.",
  },
];

export function Materials() {
  return (
    <section className="py-16 lg:py-[120px] border-t border-[var(--line)]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
        <div className="max-w-[560px] mb-14">
          <div className="eyebrow mb-3">Materials & Makers</div>
          <h2 className="font-display" style={{ fontSize: "clamp(28px, 3.2vw, 40px)", lineHeight: 1.15, fontWeight: 500 }}>
            What we use, and who we make it with.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {items.map((it) => (
            <div key={it.title}>
              <div className="aspect-square overflow-hidden mb-6">
                <ImageWithFallback src={it.img} alt="" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-display mb-3" style={{ fontSize: "22px", lineHeight: 1.25, fontWeight: 500 }}>
                {it.title}
              </h3>
              <p className="text-[15px] text-[var(--ink-secondary)] leading-[24px]">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
