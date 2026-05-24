import { useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { useStore } from "../store";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { productBySlug, products } from "../data";

type Article = {
  slug: string;
  category: "How-To" | "Inside the Home" | "Maker Stories" | "Seasonal";
  title: string;
  dek: string;
  author: string;
  date: string;
  readTime: string;
  hero: string;
  lead: string;
  body: { kind: "p" | "quote" | "h3" | "shop"; text?: string; productSlug?: string }[];
};

export const articles: Article[] = [
  {
    slug: "layer-a-bed",
    category: "How-To",
    title: "How to Layer a Bed for Spring",
    dek: "Three weights of linen, one well-worn quilt, and the case for the imperfect tuck.",
    author: "Anna Field",
    date: "April 12, 2026",
    readTime: "5 min read",
    hero: "https://images.unsplash.com/photo-1762199904138-d163fe89540a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2000",
    lead: "There's a quiet science to a well-made bed — and an even quieter art to one that looks like you actually sleep in it. Here's the way we do it at home.",
    body: [
      { kind: "h3", text: "Start with the heaviest weight" },
      { kind: "p", text: "Layer one is the foundation: a substantial Belgian linen flat sheet, garment-washed so it lands soft on the first night. Tuck it in tightly at the foot and let the top hang loose — you'll fold it back over the duvet later." },
      { kind: "shop", productSlug: "linnea-duvet" },
      { kind: "h3", text: "Then break the rules a little" },
      { kind: "p", text: "Throw the duvet on top, mostly. Pull it slightly off-center. Fold one corner back. The aim isn't a hotel bed — it's a bed that looks like someone you like just got out of it." },
      { kind: "quote", text: "Make it look like the bed you'd actually want to climb back into. That's the only test." },
      { kind: "h3", text: "Finish with a throw at the foot" },
      { kind: "p", text: "A washed cotton throw, folded in thirds and draped at the foot of the bed, is the single most-asked-about thing in our bedroom shoots. It's also the most useful." },
      { kind: "shop", productSlug: "field-throw" },
    ],
  },
  {
    slug: "painters-cottage",
    category: "Inside the Home",
    title: "A Painter's Cottage in Hudson",
    dek: "Inside Anna's 1890 farmhouse, where every object earned its keep.",
    author: "Editorial Team",
    date: "March 28, 2026",
    readTime: "8 min read",
    hero: "https://images.unsplash.com/photo-1773061865077-12120d59a217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2000",
    lead: "Anna's house sits at the end of a dirt road in upstate New York. We spent a weekend there in early spring — here's what we took home.",
    body: [
      { kind: "p", text: "The first thing you notice is the quiet. The second is that nothing in the house is precious. The Marin sofa, slipcovered in oat linen, has a faint coffee mark on the left arm that Anna shrugs at. \"It washes out. Eventually.\"" },
      { kind: "shop", productSlug: "marin-sofa" },
      { kind: "h3", text: "The living room" },
      { kind: "p", text: "Built around a wood stove and a wide north-facing window. An Ojai coffee table sits low between the sofa and a pair of bouclé lounge chairs. \"I like a coffee table you can put your feet on,\" Anna says. \"Anything else is just decoration.\"" },
      { kind: "quote", text: "Build a room around one thing you love. Everything else falls into place around it." },
      { kind: "shop", productSlug: "ojai-table" },
    ],
  },
  {
    slug: "belgian-linen",
    category: "Maker Stories",
    title: "The Belgian Linen Mill Behind Our Sheets",
    dek: "Four generations, one river, and the slow weave that defines the house.",
    author: "Editorial Team",
    date: "March 15, 2026",
    readTime: "6 min read",
    hero: "https://images.unsplash.com/photo-1619459074324-33d5f591c53e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2000",
    lead: "On a cold morning in West Flanders, the looms have been running since five.",
    body: [
      { kind: "p", text: "The mill that weaves our linen has been owned by the same family for four generations. They source their flax from within 200 kilometers of the building — a constraint they've kept by choice, not necessity." },
      { kind: "h3", text: "Why slow matters" },
      { kind: "p", text: "Fast looms produce a tighter, flatter linen. Slower looms — like the ones here — produce a slubby, slightly irregular weave that feels softer in the hand and ages better with washing. It's the difference between a sheet that looks new for a year and one that improves for a decade." },
      { kind: "shop", productSlug: "linnea-duvet" },
    ],
  },
  {
    slug: "spring-supper",
    category: "Seasonal",
    title: "The Long Table: A Spring Supper Menu",
    dek: "Tablescape notes, a market list, and the centerpiece that survives a five-hour meal.",
    author: "Anna Field",
    date: "March 4, 2026",
    readTime: "4 min read",
    hero: "https://images.unsplash.com/photo-1759417479667-13c489eb61f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2000",
    lead: "A no-fuss spring menu and the table to serve it on.",
    body: [
      { kind: "h3", text: "Set the table the morning of" },
      { kind: "p", text: "Linen runner down the center, mismatched stoneware, taper candles in low brass holders. Done by ten. Forgotten about until guests arrive." },
      { kind: "shop", productSlug: "olive-vase" },
    ],
  },
];

const categories = ["All", "How-To", "Inside the Home", "Maker Stories", "Seasonal"] as const;

export function EditHub() {
  const { navigate } = useStore();
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const filtered = filter === "All" ? articles : articles.filter((a) => a.category === filter);
  const [feature, ...rest] = filtered;

  return (
    <div>
      <section className="bg-[var(--bg-elevated)] py-14 lg:py-20 border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12 text-center">
          <div className="eyebrow mb-4">The Edit</div>
          <h1 className="font-display mb-5" style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: 1.05, fontWeight: 500 }}>
            Notes from the house.
          </h1>
          <p className="text-[17px] text-[var(--ink-secondary)] max-w-[640px] mx-auto leading-[28px]">
            Styling notes, maker stories, and the long way around to a more considered home.
          </p>
        </div>
      </section>

      <div className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-5 flex gap-3 overflow-x-auto justify-center">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 text-[13px] rounded-full border whitespace-nowrap transition-colors ${
                filter === c
                  ? "bg-[var(--ink-primary)] text-white border-[var(--ink-primary)]"
                  : "border-[var(--line)] text-[var(--ink-secondary)] hover:border-[var(--ink-secondary)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-16 lg:py-24">
        {feature && (
          <button onClick={() => navigate({ name: "edit-article", slug: feature.slug })} className="group grid md:grid-cols-2 gap-8 lg:gap-14 mb-16 lg:mb-24 text-left w-full">
            <div className="aspect-[4/3] overflow-hidden">
              <ImageWithFallback src={feature.hero} alt="" className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="eyebrow mb-3">{feature.category}</div>
              <h2 className="font-display mb-5" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 500 }}>{feature.title}</h2>
              <p className="text-[17px] text-[var(--ink-secondary)] leading-[28px] mb-5">{feature.dek}</p>
              <div className="text-[12px] text-[var(--ink-tertiary)] tracking-[0.04em]">{feature.author} · {feature.readTime}</div>
            </div>
          </button>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
          {rest.map((a) => (
            <button key={a.slug} onClick={() => navigate({ name: "edit-article", slug: a.slug })} className="group text-left">
              <div className="aspect-[4/5] overflow-hidden mb-5">
                <ImageWithFallback src={a.hero} alt="" className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]" />
              </div>
              <div className="eyebrow mb-2">{a.category}</div>
              <h3 className="font-display mb-3" style={{ fontSize: "24px", lineHeight: 1.2, fontWeight: 500 }}>{a.title}</h3>
              <p className="text-[15px] text-[var(--ink-secondary)] leading-[24px] mb-3">{a.dek}</p>
              <div className="text-[12px] text-[var(--ink-tertiary)]">{a.readTime}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditArticle({ slug }: { slug: string }) {
  const { navigate } = useStore();
  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    return (
      <div className="mx-auto max-w-[680px] px-6 py-24 text-center">
        <p className="font-display" style={{ fontSize: "28px", fontWeight: 500 }}>Story not found.</p>
        <button onClick={() => navigate({ name: "edit-hub" })} className="mt-4 text-[var(--accent-clay)] underline">Back to The Edit</button>
      </div>
    );
  }

  const moreStories = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <article>
      <div className="mx-auto max-w-[920px] px-6 pt-10 pb-6">
        <button onClick={() => navigate({ name: "edit-hub" })} className="inline-flex items-center gap-2 text-[12px] tracking-[0.08em] uppercase text-[var(--ink-secondary)] hover:text-[var(--accent-clay)]">
          <ArrowLeft size={14} strokeWidth={1.5} /> The Edit
        </button>
      </div>

      <header className="mx-auto max-w-[920px] px-6 text-center pb-10 lg:pb-14">
        <div className="eyebrow mb-4">{article.category}</div>
        <h1 className="font-display mb-5" style={{ fontSize: "clamp(40px, 5.5vw, 64px)", lineHeight: 1.05, fontWeight: 500 }}>
          {article.title}
        </h1>
        <p className="text-[18px] text-[var(--ink-secondary)] leading-[30px] max-w-[680px] mx-auto mb-6">{article.dek}</p>
        <div className="flex items-center justify-center gap-3 text-[12px] text-[var(--ink-tertiary)] tracking-[0.04em]">
          <span>{article.author}</span>
          <span>·</span>
          <span>{article.date}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={11} strokeWidth={1.5} /> {article.readTime}</span>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-0 lg:px-6 mb-14 lg:mb-20">
        <div className="aspect-[16/9] overflow-hidden">
          <ImageWithFallback src={article.hero} alt={article.title} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="mx-auto max-w-[680px] px-6 pb-20">
        <p className="font-display italic mb-12" style={{ fontSize: "22px", lineHeight: 1.5, fontWeight: 400 }}>
          {article.lead}
        </p>

        {article.body.map((block, i) => {
          if (block.kind === "h3") return (
            <h3 key={i} className="font-display mt-12 mb-5" style={{ fontSize: "28px", lineHeight: 1.2, fontWeight: 500 }}>{block.text}</h3>
          );
          if (block.kind === "p") return (
            <p key={i} className="text-[17px] text-[var(--ink-primary)] leading-[30px] mb-6">{block.text}</p>
          );
          if (block.kind === "quote") return (
            <blockquote key={i} className="my-12 pl-8 border-l-2 border-[var(--accent-clay)]">
              <p className="font-display italic" style={{ fontSize: "26px", lineHeight: 1.4, fontWeight: 400 }}>"{block.text}"</p>
            </blockquote>
          );
          if (block.kind === "shop") {
            const p = block.productSlug ? productBySlug(block.productSlug) : null;
            if (!p) return null;
            return (
              <div key={i} className="my-10 bg-[var(--surface-warm)] p-5 flex gap-5 items-center">
                <button onClick={() => navigate({ name: "product", slug: p.slug })} className="w-24 h-28 flex-shrink-0 bg-white overflow-hidden">
                  <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="eyebrow mb-1.5">Shop the story</div>
                  <button onClick={() => navigate({ name: "product", slug: p.slug })} className="block text-left">
                    <div className="text-[16px] hover:text-[var(--accent-clay)]">{p.name}</div>
                    <div className="text-[13px] text-[var(--ink-tertiary)] mt-0.5">{p.descriptor}</div>
                  </button>
                  <div className="text-[14px] mt-1.5">{p.salePrice ?? p.price}</div>
                </div>
                <button onClick={() => navigate({ name: "product", slug: p.slug })} className="px-5 py-2.5 bg-[var(--ink-primary)] text-white text-[12px] tracking-[0.08em] uppercase hover:bg-[var(--accent-clay)] whitespace-nowrap">
                  View
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>

      <section className="bg-[var(--bg-elevated)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="eyebrow mb-3">More from The Edit</div>
          <h2 className="font-display mb-10" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>
            Keep reading.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {moreStories.map((a) => (
              <button key={a.slug} onClick={() => navigate({ name: "edit-article", slug: a.slug })} className="group text-left">
                <div className="aspect-[4/5] overflow-hidden mb-5">
                  <ImageWithFallback src={a.hero} alt="" className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]" />
                </div>
                <div className="eyebrow mb-2">{a.category}</div>
                <h3 className="font-display" style={{ fontSize: "22px", lineHeight: 1.2, fontWeight: 500 }}>{a.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] py-16 lg:py-20">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
          <div className="eyebrow mb-3 text-center">Shop the story</div>
          <h2 className="font-display mb-10 text-center" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>Pieces from this piece.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p) => (
              <button key={p.slug} onClick={() => navigate({ name: "product", slug: p.slug })} className="group text-left">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--surface-warm)] mb-3">
                  <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="text-[14px]">{p.name}</div>
                <div className="text-[13px] text-[var(--ink-tertiary)] mt-0.5">{p.salePrice ?? p.price}</div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
