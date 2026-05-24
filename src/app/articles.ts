export type ArticleBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "shop"; productSlug: string };

export type Article = {
  slug: string;
  category: "How-To" | "Inside the Home" | "Maker Stories" | "Seasonal";
  title: string;
  dek: string;
  author: string;
  date: string;
  readTime: string;
  hero: string;
  lead: string;
  body: ArticleBlock[];
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

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
