import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { FullProduct } from "./data";

export type Route =
  | { name: "home" }
  | { name: "category"; category: string }
  | { name: "product"; slug: string }
  | { name: "checkout" }
  | { name: "confirmation" }
  | { name: "edit-hub" }
  | { name: "edit-article"; slug: string }
  | { name: "trade" }
  | { name: "account"; tab?: AccountTab };

export type AccountTab = "orders" | "addresses" | "payment" | "wishlist" | "trade" | "preferences";

export type CartItem = {
  slug: string;
  name: string;
  variant: string;
  price: string;
  unitPrice: number;
  image: string;
  qty: number;
};

export type Toast = { id: number; title: string; body?: string; tone?: "default" | "sage" | "clay" };

type Ctx = {
  route: Route;
  navigate: (r: Route) => void;
  cart: CartItem[];
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (p: FullProduct, variant?: string) => void;
  updateQty: (slug: string, variant: string, qty: number) => void;
  removeFromCart: (slug: string, variant: string) => void;
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  wishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: (p: FullProduct) => void;
  isWishlisted: (slug: string) => boolean;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toasts: Toast[];
  pushToast: (t: Omit<Toast, "id">) => void;
  dismissToast: (id: number) => void;
};

const StoreContext = createContext<Ctx | null>(null);
const priceToNum = (s: string) => Number(s.replace(/[^0-9.]/g, "")) || 0;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [cart, setCart] = useState<CartItem[]>([
    {
      slug: "hudson-mug",
      name: "Hudson Stoneware Mug",
      variant: "Cream",
      price: "$32",
      unitPrice: 32,
      image: "https://images.unsplash.com/photo-1619911013257-8f1fbc919fc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=400",
      qty: 2,
    },
  ]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(["marin-sofa", "loma-pendant"]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const navigate = (r: Route) => {
    setRoute(r);
    setCartOpen(false);
    setWishlistOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const pushToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => dismissToast(id), 3800);
  }, [dismissToast]);

  const addToCart: Ctx["addToCart"] = (p, variant = p.color) => {
    setCart((c) => {
      const existing = c.find((i) => i.slug === p.slug && i.variant === variant);
      if (existing) return c.map((i) => (i === existing ? { ...i, qty: i.qty + 1 } : i));
      const priceStr = p.salePrice ?? p.price;
      return [...c, { slug: p.slug, name: p.name, variant, price: priceStr, unitPrice: priceToNum(priceStr), image: p.image, qty: 1 }];
    });
    setCartOpen(true);
    pushToast({ title: "Added to your bag", body: p.name, tone: "sage" });
  };

  const updateQty: Ctx["updateQty"] = (slug, variant, qty) => {
    setCart((c) => c.map((i) => (i.slug === slug && i.variant === variant ? { ...i, qty: Math.max(0, qty) } : i)).filter((i) => i.qty > 0));
  };

  const removeFromCart: Ctx["removeFromCart"] = (slug, variant) => {
    setCart((c) => c.filter((i) => !(i.slug === slug && i.variant === variant)));
  };

  const toggleWishlist: Ctx["toggleWishlist"] = (p) => {
    setWishlist((w) => {
      const has = w.includes(p.slug);
      pushToast({
        title: has ? "Removed from wishlist" : "Saved to wishlist",
        body: p.name,
        tone: has ? "default" : "clay",
      });
      return has ? w.filter((s) => s !== p.slug) : [...w, p.slug];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);

  return (
    <StoreContext.Provider
      value={{
        route, navigate,
        cart, cartOpen, openCart: () => setCartOpen(true), closeCart: () => setCartOpen(false),
        addToCart, updateQty, removeFromCart, cartCount, subtotal,
        wishlist, wishlistOpen, openWishlist: () => setWishlistOpen(true), closeWishlist: () => setWishlistOpen(false),
        toggleWishlist, isWishlisted: (slug) => wishlist.includes(slug),
        searchOpen, openSearch: () => setSearchOpen(true), closeSearch: () => setSearchOpen(false),
        toasts, pushToast, dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const c = useContext(StoreContext);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
