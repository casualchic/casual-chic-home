import { ImageWithFallback } from "./figma/ImageWithFallback";

const tiles = [
  {
    name: "Living",
    img: "https://images.unsplash.com/photo-1761330439252-325f2091e88d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1400",
    alt: "Neutral linen sofa with textured vase",
    cls: "lg:col-span-2 lg:row-span-2 aspect-[4/5] lg:aspect-auto",
  },
  {
    name: "Bedroom",
    img: "https://images.unsplash.com/photo-1762199904064-56ddc38eda99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
    alt: "Rumpled white linen bedding in morning light",
    cls: "lg:col-span-2 aspect-[4/5]",
  },
  {
    name: "Outdoor",
    img: "https://images.unsplash.com/photo-1621506821957-1b50ab7787a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
    alt: "Wooden table and chairs on patio",
    cls: "lg:col-span-2 aspect-[4/5]",
  },
  {
    name: "Lighting",
    img: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
    alt: "Pendant lamps glowing warmly",
    cls: "aspect-square",
  },
  {
    name: "Tabletop",
    img: "https://images.unsplash.com/photo-1759417479667-13c489eb61f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
    alt: "Dining table set with white flowers and place settings",
    cls: "aspect-square",
  },
];

export function CategoryTiles() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-16 lg:py-[120px]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {tiles.map((t) => (
          <a
            key={t.name}
            href="#"
            className={`group relative block overflow-hidden ${t.cls}`}
          >
            <ImageWithFallback
              src={t.img}
              alt={t.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <div className="absolute left-6 bottom-6 right-6 text-white">
              <div className="font-display mb-2" style={{ fontSize: "28px", lineHeight: 1.1, fontWeight: 500 }}>{t.name}</div>
              <span className="text-[13px] border-b border-white/70 pb-0.5">Shop →</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
