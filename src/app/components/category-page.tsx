import { useMemo, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProductCard } from "./product-card";
import { products, type FullProduct } from "../data";
import { useStore } from "../store";

const headers: Record<string, { eyebrow: string; title: string; dek: string; image: string; subs: string[] }> = {
  Living: {
    eyebrow: "Spring 2026",
    title: "Living",
    dek: "Soft silhouettes, honest materials, and the kind of sofa you actually want to nap on. Our living collection is built around the way you really live.",
    image: "https://images.unsplash.com/photo-1773061865077-12120d59a217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All", "Sofas", "Chairs", "Coffee Tables", "Rugs", "Throws", "Accents"],
  },
  Bedroom: {
    eyebrow: "Spring 2026",
    title: "Bedroom",
    dek: "Linen, oak, and a calm palette built for the room you wake up in.",
    image: "https://images.unsplash.com/photo-1778731660248-897f9afcd93d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All", "Bedding", "Throws", "Accents"],
  },
  Dining: {
    eyebrow: "Spring 2026",
    title: "Dining",
    dek: "The long table, set for everyone.",
    image: "https://images.unsplash.com/photo-1759417479667-13c489eb61f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All", "Accents", "Tabletop"],
  },
  Outdoor: {
    eyebrow: "Spring 2026",
    title: "Outdoor",
    dek: "Furniture that earns its place outside.",
    image: "https://images.unsplash.com/photo-1621506821957-1b50ab7787a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All"],
  },
  Lighting: {
    eyebrow: "Spring 2026",
    title: "Lighting",
    dek: "Brass, linen shades, the right kind of glow.",
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All", "Accents"],
  },
  Decor: {
    eyebrow: "Spring 2026",
    title: "Decor",
    dek: "Quiet objects, well chosen.",
    image: "https://images.unsplash.com/photo-1620812067822-899be8a6a9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All", "Accents"],
  },
  Sale: {
    eyebrow: "Sale",
    title: "Sale",
    dek: "Quietly marked down. Same materials, same makers.",
    image: "https://images.unsplash.com/photo-1603905179139-db12ab535ca9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200",
    subs: ["All"],
  },
};

const materialFilters = ["Linen", "Wool", "Oak", "Brass", "Stoneware", "Cotton", "Bouclé"];
const colorFilters = [
  { name: "Bone", hex: "#EDE3D2" },
  { name: "Camel", hex: "#C8A98A" },
  { name: "Taupe", hex: "#A89A86" },
  { name: "Ink", hex: "#2C2620" },
  { name: "Sage", hex: "#7B8470" },
  { name: "Clay", hex: "#B9755A" },
];
const sustainabilityFilters = ["FSC Wood", "OEKO-TEX", "GoodWeave", "Made to Order"];
const sortOptions = ["Featured", "New", "Price ↑", "Price ↓", "Best Selling"];

export function CategoryPage({ category }: { category: string }) {
  const header = headers[category] ?? headers.Living;
  const [sub, setSub] = useState("All");
  const [activeMaterials, setActiveMaterials] = useState<string[]>([]);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [inStock, setInStock] = useState(false);
  const [activeSust, setActiveSust] = useState<string[]>([]);
  const [sort, setSort] = useState("Featured");
  const [sortOpen, setSortOpen] = useState(false);
  const [visible, setVisible] = useState(9);
  const { navigate } = useStore();

  const filtered = useMemo(() => {
    let list: FullProduct[] = products;
    if (category === "Sale") list = list.filter((p) => p.salePrice);
    if (sub !== "All") list = list.filter((p) => p.subcategory === sub);
    if (activeMaterials.length) list = list.filter((p) => activeMaterials.includes(p.material));
    if (activeColors.length) list = list.filter((p) => activeColors.includes(p.color.split(" ")[0]));
    list = list.filter((p) => Number((p.salePrice ?? p.price).replace(/[^0-9.]/g, "")) <= maxPrice);
    const numPrice = (p: FullProduct) => Number((p.salePrice ?? p.price).replace(/[^0-9.]/g, ""));
    if (sort === "Price ↑") list = [...list].sort((a, b) => numPrice(a) - numPrice(b));
    if (sort === "Price ↓") list = [...list].sort((a, b) => numPrice(b) - numPrice(a));
    if (sort === "New") list = [...list].sort((a) => (a.tag?.label === "New" ? -1 : 1));
    return list;
  }, [category, sub, activeMaterials, activeColors, maxPrice, sort]);

  const shown = filtered.slice(0, visible);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  return (
    <div>
      <section className="relative w-full" style={{ height: "50vh", minHeight: "380px" }}>
        <ImageWithFallback src={header.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
        <div className="absolute inset-0 mx-auto max-w-[1440px] px-6 lg:px-[88px] flex flex-col justify-end pb-14">
          <span className="eyebrow text-white/90 mb-4">{header.eyebrow}</span>
          <h1 className="font-display text-white mb-4" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1.05, fontWeight: 500 }}>
            {header.title}
          </h1>
          <p className="text-white/90 max-w-[640px] text-[16px] leading-[26px]">{header.dek}</p>
        </div>
      </section>

      <div className="border-b border-[var(--line)] bg-[var(--bg-base)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-5 flex gap-3 overflow-x-auto">
          {header.subs.map((s) => (
            <button
              key={s}
              onClick={() => setSub(s)}
              className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap transition-colors ${
                sub === s
                  ? "bg-[var(--ink-primary)] text-white border-[var(--ink-primary)]"
                  : "border-[var(--line)] text-[var(--ink-secondary)] hover:border-[var(--ink-secondary)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
        <aside className="lg:sticky lg:top-[140px] h-fit">
          <div className="flex items-center justify-between mb-6">
            <div className="eyebrow">Filter</div>
            {(activeMaterials.length || activeColors.length || activeSust.length) ? (
              <button
                onClick={() => { setActiveMaterials([]); setActiveColors([]); setActiveSust([]); }}
                className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2"
              >
                Clear all
              </button>
            ) : null}
          </div>

          <FilterGroup title="Material">
            <div className="flex flex-wrap gap-2">
              {materialFilters.map((m) => (
                <Chip key={m} active={activeMaterials.includes(m)} onClick={() => toggle(activeMaterials, m, setActiveMaterials)}>{m}</Chip>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Color">
            <div className="flex flex-wrap gap-2.5">
              {colorFilters.map((c) => {
                const active = activeColors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    onClick={() => toggle(activeColors, c.name, setActiveColors)}
                    aria-label={c.name}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${active ? "border-[var(--ink-primary)] scale-110" : "border-[var(--line)]"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          </FilterGroup>

          <FilterGroup title="Price">
            <input
              type="range"
              min={50}
              max={3000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--accent-clay)]"
            />
            <div className="flex justify-between text-[12px] text-[var(--ink-tertiary)] mt-2">
              <span>$50</span>
              <span>up to ${maxPrice}</span>
            </div>
          </FilterGroup>

          <FilterGroup title="Availability">
            <label className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-[var(--accent-clay)]" />
              In stock
            </label>
          </FilterGroup>

          <FilterGroup title="Sustainability">
            <div className="flex flex-wrap gap-2">
              {sustainabilityFilters.map((s) => (
                <Chip key={s} active={activeSust.includes(s)} onClick={() => toggle(activeSust, s, setActiveSust)}>{s}</Chip>
              ))}
            </div>
          </FilterGroup>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="text-[13px] text-[var(--ink-secondary)]">{filtered.length} pieces</div>
            <div className="relative">
              <button
                onClick={() => setSortOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 border border-[var(--line)] text-[13px] hover:border-[var(--ink-secondary)]"
              >
                Sort: {sort}
                <ChevronDown size={14} strokeWidth={1.5} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 mt-2 bg-[var(--bg-elevated)] border border-[var(--line)] shadow-lg z-10 w-44">
                  {sortOptions.map((o) => (
                    <button
                      key={o}
                      onClick={() => { setSort(o); setSortOpen(false); }}
                      className="block w-full text-left px-4 py-2.5 text-[13px] hover:bg-[var(--surface-warm)]"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {(activeMaterials.length > 0 || activeColors.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-8">
              {[...activeMaterials, ...activeColors].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--surface-warm)] text-[12px]">
                  {t}
                  <button onClick={() => { setActiveMaterials((a) => a.filter((x) => x !== t)); setActiveColors((a) => a.filter((x) => x !== t)); }}>
                    <X size={12} strokeWidth={1.5} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display mb-3" style={{ fontSize: "24px", fontWeight: 500 }}>Nothing matches — yet.</p>
              <p className="text-[14px] text-[var(--ink-secondary)]">Loosen a filter, or shop the whole category.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12">
                {shown.map((p, i) => (
                  <div key={p.slug} className={i === 5 && shown.length > 6 ? "col-span-2 lg:col-span-3" : ""}>
                    {i === 5 && shown.length > 6 ? (
                      <EditorialBreak />
                    ) : (
                      <ProductCard product={p} />
                    )}
                  </div>
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-16 flex justify-center">
                  <button
                    onClick={() => setVisible((v) => v + 9)}
                    className="px-8 py-3.5 border border-[var(--ink-primary)] text-[13px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white transition-colors"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="py-5 border-b border-[var(--line)]">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between mb-3">
        <span className="text-[13px] tracking-[0.06em] uppercase">{title}</span>
        <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pt-2">{children}</div>}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-[12px] rounded-full border transition-colors ${
        active
          ? "bg-[var(--ink-primary)] text-white border-[var(--ink-primary)]"
          : "border-[var(--line)] text-[var(--ink-secondary)] hover:border-[var(--ink-secondary)]"
      }`}
    >
      {children}
    </button>
  );
}

function EditorialBreak() {
  return (
    <div className="bg-[var(--surface-warm)] px-8 py-12 lg:py-16 text-center">
      <div className="eyebrow mb-3">Styling Note</div>
      <p className="font-display italic mx-auto max-w-[640px]" style={{ fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.4, fontWeight: 400 }}>
        “Build a room around one thing you love. Everything else falls into place around it.”
      </p>
      <div className="text-[12px] text-[var(--ink-tertiary)] mt-4 tracking-[0.1em] uppercase">— Anna, Head of Design</div>
    </div>
  );
}
