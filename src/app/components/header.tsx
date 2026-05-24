import { Search, User, Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const messages = [
  "Complimentary swatches",
  "Free shipping on orders $150+",
  "Trade program now open",
];

type NavItem = {
  label: string;
  category?: string;
  mega?: {
    shop: string[];
    rooms: string[];
    featured: { eyebrow: string; title: string; cta: string; image: string };
  };
};

const navItems: NavItem[] = [
  {
    label: "Living",
    category: "Living",
    mega: {
      shop: ["Sofas", "Chairs", "Coffee Tables", "Side Tables", "Rugs", "Throws", "Accents"],
      rooms: ["By the Window", "Reading Nook", "Linen Bedroom No. 03", "The Long Table", "Linen", "Oak", "Bouclé"],
      featured: {
        eyebrow: "Just In",
        title: "The Marin Collection",
        cta: "Shop the Collection",
        image: "https://images.unsplash.com/photo-1761330439252-325f2091e88d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
      },
    },
  },
  {
    label: "Bedroom",
    category: "Bedroom",
    mega: {
      shop: ["Beds", "Headboards", "Bedding", "Pillows", "Throws", "Nightstands", "Dressers"],
      rooms: ["Linen Bedroom No. 03", "Guest Suite", "Bouclé", "Linen", "Oak"],
      featured: {
        eyebrow: "How To",
        title: "How to Layer a Bed for Spring",
        cta: "Read the guide",
        image: "https://images.unsplash.com/photo-1762199904138-d163fe89540a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
      },
    },
  },
  {
    label: "Dining",
    category: "Dining",
    mega: {
      shop: ["Tables", "Chairs", "Tabletop", "Glassware", "Serveware", "Linens"],
      rooms: ["The Long Table", "Sunday Brunch", "Ceramic", "Stoneware"],
      featured: {
        eyebrow: "Seasonal",
        title: "A Spring Supper Menu",
        cta: "Set the table",
        image: "https://images.unsplash.com/photo-1759417479667-13c489eb61f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
      },
    },
  },
  {
    label: "Outdoor",
    category: "Outdoor",
    mega: {
      shop: ["Lounge", "Dining", "Umbrellas", "Lanterns", "Planters"],
      rooms: ["The Patio Edit", "Teak", "Powder-coated steel"],
      featured: {
        eyebrow: "Spring 2026",
        title: "The Patio Edit",
        cta: "Shop outdoor",
        image: "https://images.unsplash.com/photo-1621506821957-1b50ab7787a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
      },
    },
  },
  {
    label: "Lighting",
    category: "Lighting",
    mega: {
      shop: ["Pendants", "Table Lamps", "Floor Lamps", "Sconces", "Bulbs"],
      rooms: ["Brass", "Linen Shades", "Ceramic"],
      featured: {
        eyebrow: "Just In",
        title: "Brass, brushed warm",
        cta: "Shop lighting",
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
      },
    },
  },
  {
    label: "Decor",
    category: "Decor",
    mega: {
      shop: ["Vases", "Candles", "Books", "Trays", "Mirrors", "Art"],
      rooms: ["The Mantel", "Bookshelf Styling", "Ceramic"],
      featured: {
        eyebrow: "The Edit",
        title: "Quiet objects, well chosen",
        cta: "Shop decor",
        image: "https://images.unsplash.com/photo-1620812067822-899be8a6a9a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=900",
      },
    },
  },
  { label: "Sale", category: "Sale" },
  { label: "The Edit" },
];

export function Header() {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const { navigate, openCart, cartCount, openSearch, openWishlist, wishlist } = useStore();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[var(--surface-warm)] text-[var(--ink-primary)]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] h-9 flex items-center justify-center overflow-hidden">
          <span className="eyebrow transition-opacity duration-500" key={messages[idx]}>{messages[idx]}</span>
        </div>
      </div>

      <div
        className="backdrop-blur-md bg-[rgba(247,243,236,0.92)] border-b border-[var(--line)]"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] h-[72px] grid grid-cols-3 items-center">
          <button
            onClick={() => navigate({ name: "home" })}
            className="font-display tracking-[0.08em] uppercase text-left"
            style={{ fontSize: "20px" }}
          >
            Casual Chic Home
          </button>
          <nav className="hidden lg:flex items-center justify-center gap-8 h-full">
            {navItems.map((item) => (
              <div
                key={item.label}
                onMouseEnter={() => setHovered(item.mega ? item.label : null)}
                className="h-full flex items-center"
              >
                <button
                  onClick={() => {
                    if (item.label === "The Edit") navigate({ name: "edit-hub" });
                    else if (item.category) navigate({ name: "category", category: item.category });
                  }}
                  className="text-[14px] text-[var(--ink-primary)] hover:text-[var(--accent-clay)] transition-colors duration-150"
                >
                  {item.label}
                </button>
              </div>
            ))}
          </nav>
          <div className="flex items-center justify-end gap-5 text-[var(--ink-primary)]">
            <button onClick={openSearch} aria-label="Search" className="p-2 hover:text-[var(--accent-clay)]"><Search size={18} strokeWidth={1.5} /></button>
            <button onClick={() => navigate({ name: "account" })} aria-label="Account" className="p-2 hover:text-[var(--accent-clay)] hidden sm:block"><User size={18} strokeWidth={1.5} /></button>
            <button onClick={openWishlist} aria-label="Wishlist" className="p-2 relative hover:text-[var(--accent-clay)] hidden sm:block">
              <Heart size={18} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[var(--accent-clay)] text-white text-[10px] rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>
            <button onClick={openCart} aria-label="Bag" className="p-2 relative hover:text-[var(--accent-clay)]">
              <ShoppingBag size={18} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[var(--accent-clay)] text-white text-[10px] rounded-full min-w-4 h-4 px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {hovered && (
          <MegaMenu
            item={navItems.find((i) => i.label === hovered)!}
            onClose={() => setHovered(null)}
          />
        )}
      </div>
    </header>
  );
}

function MegaMenu({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const { navigate } = useStore();
  if (!item.mega) return null;
  const go = () => {
    if (item.category) navigate({ name: "category", category: item.category });
    onClose();
  };
  return (
    <div className="absolute left-0 right-0 top-full bg-[var(--bg-elevated)] border-b border-[var(--line)] shadow-[0_24px_40px_-24px_rgba(31,27,22,0.18)]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] py-12 grid grid-cols-12 gap-10">
        <div className="col-span-3">
          <div className="eyebrow mb-5">Shop by Category</div>
          <ul className="space-y-3">
            {item.mega.shop.map((s) => (
              <li key={s}>
                <button onClick={go} className="text-[15px] text-[var(--ink-primary)] hover:text-[var(--accent-clay)] transition-colors">{s}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3">
          <div className="eyebrow mb-5">Shop by Room / Material</div>
          <ul className="space-y-3">
            {item.mega.rooms.map((r) => (
              <li key={r}>
                <button onClick={go} className="text-[15px] text-[var(--ink-secondary)] hover:text-[var(--accent-clay)] transition-colors">{r}</button>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={go} className="col-span-6 group block text-left">
          <div className="aspect-[16/9] overflow-hidden mb-5">
            <ImageWithFallback
              src={item.mega.featured.image}
              alt={item.mega.featured.title}
              className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
            />
          </div>
          <div className="eyebrow mb-2">{item.mega.featured.eyebrow}</div>
          <h3 className="font-display mb-3" style={{ fontSize: "24px", lineHeight: 1.2, fontWeight: 500 }}>
            {item.mega.featured.title}
          </h3>
          <span className="text-[13px] tracking-[0.08em] uppercase border-b border-[var(--ink-primary)] pb-0.5">
            {item.mega.featured.cta} →
          </span>
        </button>
      </div>
    </div>
  );
}
