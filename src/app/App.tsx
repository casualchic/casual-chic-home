import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { CategoryTiles } from "./components/category-tiles";
import { EditStrip } from "./components/edit-strip";
import { BestSellers } from "./components/best-sellers";
import { ShopTheRoom } from "./components/shop-the-room";
import { Materials } from "./components/materials";
import { PressStrip } from "./components/press-strip";
import { TradeBanner } from "./components/trade-banner";
import { NewsletterFooter } from "./components/newsletter-footer";
import { CartDrawer } from "./components/cart-drawer";
import { CategoryPage } from "./components/category-page";
import { ProductPage } from "./components/product-page";
import { CheckoutPage } from "./components/checkout-page";
import { EditHub, EditArticle } from "./components/edit-pages";
import { TradePage } from "./components/trade-page";
import { AccountPage } from "./components/account-page";
import { Toasts } from "./components/toasts";
import { WishlistDrawer } from "./components/wishlist-drawer";
import { SearchOverlay } from "./components/search-overlay";
import { StoreProvider, useStore } from "./store";

function Pages() {
  const { route } = useStore();
  switch (route.name) {
    case "category": return <CategoryPage category={route.category} />;
    case "product": return <ProductPage slug={route.slug} />;
    case "checkout":
    case "confirmation": return <CheckoutPage />;
    case "edit-hub": return <EditHub />;
    case "edit-article": return <EditArticle slug={route.slug} />;
    case "trade": return <TradePage />;
    case "account": return <AccountPage initialTab={route.tab} />;
    default: return (
      <>
        <Hero />
        <CategoryTiles />
        <EditStrip />
        <BestSellers />
        <ShopTheRoom />
        <Materials />
        <PressStrip />
        <TradeBanner />
      </>
    );
  }
}

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-[var(--bg-base)] text-[var(--ink-primary)]">
        <Header />
        <main>
          <Pages />
        </main>
        <NewsletterFooter />
        <CartDrawer />
        <WishlistDrawer />
        <SearchOverlay />
        <Toasts />
      </div>
    </StoreProvider>
  );
}
