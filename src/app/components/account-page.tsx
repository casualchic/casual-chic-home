import { useState } from "react";
import { Package, MapPin, CreditCard, Heart, Briefcase, Settings, LogOut, Plus, Edit2, Check, Download, ChevronRight } from "lucide-react";
import { useStore, type AccountTab } from "../store";
import { products, productBySlug } from "../data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const user = { firstName: "Anna", lastName: "Field", email: "anna@example.com", since: "March 2024", trade: true };

const tabs: { key: AccountTab; label: string; icon: typeof Package }[] = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "addresses", label: "Addresses", icon: MapPin },
  { key: "payment", label: "Payment methods", icon: CreditCard },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "trade", label: "Trade dashboard", icon: Briefcase },
  { key: "preferences", label: "Preferences", icon: Settings },
];

export function AccountPage({ initialTab }: { initialTab?: AccountTab }) {
  const [tab, setTab] = useState<AccountTab>(initialTab ?? "orders");
  const { navigate } = useStore();

  return (
    <div className="bg-[var(--bg-base)] min-h-[80vh]">
      <section className="bg-[var(--surface-warm)] py-12 lg:py-16 border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="eyebrow mb-3">Your account</div>
            <h1 className="font-display" style={{ fontSize: "clamp(36px, 4.5vw, 52px)", lineHeight: 1.05, fontWeight: 500 }}>
              Welcome back, {user.firstName}.
            </h1>
            <p className="text-[14px] text-[var(--ink-secondary)] mt-3">
              {user.email} · Member since {user.since}{user.trade && " · "}
              {user.trade && <span className="text-[var(--accent-sage)]">Trade approved</span>}
            </p>
          </div>
          <button onClick={() => navigate({ name: "home" })} className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase text-[var(--ink-secondary)] hover:text-[var(--accent-clay)]">
            <LogOut size={14} strokeWidth={1.5} /> Sign out
          </button>
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
        <aside>
          <nav className="lg:sticky lg:top-[140px]">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 pb-2 lg:pb-0">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.key;
                return (
                  <li key={t.key} className="flex-shrink-0">
                    <button
                      onClick={() => setTab(t.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-[14px] whitespace-nowrap text-left transition-colors ${
                        active ? "bg-[var(--ink-primary)] text-white" : "text-[var(--ink-secondary)] hover:bg-[var(--surface-warm)]"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                      <span className="flex-1">{t.label}</span>
                      {!active && <ChevronRight size={14} strokeWidth={1.5} className="hidden lg:block text-[var(--ink-tertiary)]" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <div>
          {tab === "orders" && <OrdersTab />}
          {tab === "addresses" && <AddressesTab />}
          {tab === "payment" && <PaymentTab />}
          {tab === "wishlist" && <WishlistTab />}
          {tab === "trade" && <TradeTab />}
          {tab === "preferences" && <PreferencesTab />}
        </div>
      </div>
    </div>
  );
}

const orders = [
  {
    id: "CC-2026-04219", date: "April 18, 2026", status: "In transit", eta: "Arrives April 24",
    items: [{ slug: "marin-sofa", qty: 1 }, { slug: "field-throw", qty: 2 }], total: 3186,
  },
  {
    id: "CC-2026-03104", date: "March 12, 2026", status: "Delivered", eta: "Delivered March 18",
    items: [{ slug: "ojai-table", qty: 1 }, { slug: "olive-vase", qty: 1 }], total: 1336,
  },
  {
    id: "CC-2026-01088", date: "January 4, 2026", status: "Delivered", eta: "Delivered January 10",
    items: [{ slug: "hudson-mug", qty: 4 }, { slug: "petra-candle", qty: 2 }], total: 216,
  },
];

function OrdersTab() {
  const { navigate } = useStore();
  return (
    <div>
      <SectionHeader title="Orders" subtitle="Track current orders, view past purchases, and re-order what you love." />
      <ul className="space-y-5">
        {orders.map((o) => {
          const items = o.items.map((x) => ({ ...x, product: productBySlug(x.slug)! })).filter((x) => x.product);
          return (
            <li key={o.id} className="bg-[var(--bg-elevated)] border border-[var(--line)]">
              <div className="px-6 py-4 border-b border-[var(--line)] flex flex-wrap gap-x-8 gap-y-2 items-baseline justify-between">
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
                  <span className="text-[var(--ink-tertiary)]">Order #{o.id}</span>
                  <span className="text-[var(--ink-tertiary)]">{o.date}</span>
                  <span className={o.status === "Delivered" ? "text-[var(--accent-sage)]" : "text-[var(--accent-clay)]"}>
                    {o.status} · {o.eta}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-[12px] tracking-[0.08em] uppercase text-[var(--ink-secondary)] hover:text-[var(--accent-clay)] inline-flex items-center gap-1.5">
                    <Download size={13} strokeWidth={1.5} /> Invoice
                  </button>
                  <span className="text-[14px]">${o.total}</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="divide-y divide-[var(--line)]">
                  {items.map((it) => (
                    <li key={it.slug} className="py-3 first:pt-0 last:pb-0 flex gap-4 items-center">
                      <button onClick={() => navigate({ name: "product", slug: it.slug })} className="w-16 h-20 bg-[var(--surface-warm)] overflow-hidden flex-shrink-0">
                        <ImageWithFallback src={it.product.image} alt="" className="w-full h-full object-cover" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <button onClick={() => navigate({ name: "product", slug: it.slug })} className="text-[14px] text-left hover:text-[var(--accent-clay)]">{it.product.name}</button>
                        <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">Qty {it.qty}</div>
                      </div>
                      <button className="text-[12px] tracking-[0.08em] uppercase text-[var(--ink-primary)] underline underline-offset-2 hover:text-[var(--accent-clay)]">Re-order</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-6 py-3 border-t border-[var(--line)] bg-[var(--bg-base)] flex justify-end gap-4 text-[12px] tracking-[0.08em] uppercase">
                <button className="hover:text-[var(--accent-clay)]">Track shipment</button>
                <button className="hover:text-[var(--accent-clay)]">Start a return</button>
                <button className="hover:text-[var(--accent-clay)]">Contact support</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const addresses = [
  { id: 1, label: "Home", name: "Anna Field", line1: "123 Hudson St, Apt 4B", city: "Brooklyn", state: "NY", zip: "11201", phone: "(555) 123-4567", default: true },
  { id: 2, label: "Studio", name: "Field Studio", line1: "88 Greene St, 3rd Fl", city: "New York", state: "NY", zip: "10012", phone: "(555) 987-6543", default: false },
];

function AddressesTab() {
  return (
    <div>
      <SectionHeader title="Addresses" subtitle="Save the places you ship to most." action={<AddButton label="Add address" />} />
      <div className="grid sm:grid-cols-2 gap-5">
        {addresses.map((a) => (
          <div key={a.id} className="bg-[var(--bg-elevated)] border border-[var(--line)] p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-[12px] tracking-[0.1em] uppercase">{a.label}</span>
                {a.default && <span className="px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase bg-[var(--accent-sage)] text-white rounded-full">Default</span>}
              </div>
              <button aria-label="Edit" className="text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]"><Edit2 size={14} strokeWidth={1.5} /></button>
            </div>
            <div className="text-[14px] leading-[22px]">
              <div>{a.name}</div>
              <div className="text-[var(--ink-secondary)]">{a.line1}</div>
              <div className="text-[var(--ink-secondary)]">{a.city}, {a.state} {a.zip}</div>
              <div className="text-[var(--ink-tertiary)] mt-1">{a.phone}</div>
            </div>
            {!a.default && (
              <button className="mt-4 text-[12px] tracking-[0.08em] uppercase text-[var(--ink-primary)] underline underline-offset-2 hover:text-[var(--accent-clay)]">
                Set as default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const cards = [
  { id: 1, brand: "Visa", last4: "4242", exp: "07 / 28", default: true },
  { id: 2, brand: "Amex", last4: "1009", exp: "11 / 27", default: false },
];

function PaymentTab() {
  return (
    <div>
      <SectionHeader title="Payment methods" subtitle="Cards are encrypted and stored with our payments partner." action={<AddButton label="Add card" />} />
      <div className="grid sm:grid-cols-2 gap-5">
        {cards.map((c) => (
          <div key={c.id} className="bg-[var(--bg-elevated)] border border-[var(--line)] p-6 flex items-center gap-5">
            <div className="w-12 h-9 bg-[var(--ink-primary)] text-white text-[10px] tracking-[0.12em] uppercase flex items-center justify-center">{c.brand}</div>
            <div className="flex-1">
              <div className="text-[14px]">•••• {c.last4}</div>
              <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">Exp {c.exp}</div>
            </div>
            {c.default && <span className="px-2 py-0.5 text-[10px] tracking-[0.08em] uppercase bg-[var(--accent-sage)] text-white rounded-full">Default</span>}
            <button aria-label="Edit" className="text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]"><Edit2 size={14} strokeWidth={1.5} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function WishlistTab() {
  const { wishlist, toggleWishlist, addToCart, navigate } = useStore();
  const items = wishlist.map((s) => productBySlug(s)).filter(Boolean) as typeof products;
  return (
    <div>
      <SectionHeader title="Wishlist" subtitle="The pieces you've saved, in one place." />
      {items.length === 0 ? (
        <div className="bg-[var(--surface-warm)] p-10 text-center">
          <p className="font-display mb-2" style={{ fontSize: "24px", fontWeight: 500 }}>Nothing saved — yet.</p>
          <p className="text-[14px] text-[var(--ink-secondary)] mb-6">Tap the heart on anything you love and it'll show up here.</p>
          <button onClick={() => navigate({ name: "home" })} className="px-6 py-3 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase">
            Start browsing
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {items.map((p) => (
            <div key={p.slug}>
              <button onClick={() => navigate({ name: "product", slug: p.slug })} className="block aspect-[4/5] overflow-hidden bg-[var(--surface-warm)] mb-3 w-full group">
                <ImageWithFallback src={p.image} alt={p.alt} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </button>
              <div className="text-[15px]">{p.name}</div>
              <div className="text-[13px] text-[var(--ink-tertiary)] mt-0.5">{p.descriptor}</div>
              <div className="text-[14px] mt-1.5">{p.salePrice ?? p.price}</div>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => addToCart(p)} className="px-4 py-2 bg-[var(--ink-primary)] text-white text-[11px] tracking-[0.08em] uppercase hover:bg-[var(--accent-clay)] transition-colors">
                  Add to bag
                </button>
                <button onClick={() => toggleWishlist(p)} className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2 hover:text-[var(--accent-clay)]">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const projects = [
  { name: "Eastman Residence", role: "Lead designer", budget: 48200, status: "In progress" },
  { name: "Catskills Guesthouse", role: "Stylist", budget: 12600, status: "Quoted" },
  { name: "Reyes Studio Lobby", role: "Hospitality", budget: 21900, status: "Delivered" },
];

function TradeTab() {
  return (
    <div>
      <SectionHeader title="Trade dashboard" subtitle="Your trade benefits, projects, and resources — all in one place." />
      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <Stat label="YTD spend" value="$48,720" delta="+12% vs. last year" />
        <Stat label="Savings earned" value="$7,308" delta="15% trade discount" />
        <Stat label="Open projects" value="3" delta="2 ready to ship" />
      </div>

      <div className="bg-[var(--bg-elevated)] border border-[var(--line)] mb-10">
        <div className="px-6 py-4 border-b border-[var(--line)] flex items-center justify-between">
          <h3 className="text-[15px]">Active projects</h3>
          <button className="text-[12px] tracking-[0.08em] uppercase text-[var(--accent-clay)]">+ New project</button>
        </div>
        <table className="w-full text-[14px]">
          <thead className="text-[11px] tracking-[0.12em] uppercase text-[var(--ink-tertiary)]">
            <tr className="border-b border-[var(--line)]">
              <th className="text-left font-normal px-6 py-3">Project</th>
              <th className="text-left font-normal px-6 py-3">Role</th>
              <th className="text-right font-normal px-6 py-3">Budget</th>
              <th className="text-right font-normal px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.name} className="border-b border-[var(--line)] last:border-0">
                <td className="px-6 py-4">{p.name}</td>
                <td className="px-6 py-4 text-[var(--ink-secondary)]">{p.role}</td>
                <td className="px-6 py-4 text-right">${p.budget.toLocaleString()}</td>
                <td className="px-6 py-4 text-right">
                  <span className={`px-2.5 py-1 text-[11px] tracking-[0.08em] uppercase rounded-full ${
                    p.status === "Delivered" ? "bg-[var(--accent-sage)] text-white" : p.status === "In progress" ? "bg-[var(--accent-clay)] text-white" : "border border-[var(--line)] text-[var(--ink-secondary)]"
                  }`}>{p.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-[15px] mb-4">Trade resources</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Order swatch kit", body: "Free fabric & finish samples shipped to your studio." },
          { title: "Download tearsheets", body: "High-res PDFs with specs and pricing." },
          { title: "CAD blocks", body: "Drawings for every furniture piece in the catalog." },
          { title: "Contact your specialist", body: "Quotes within 24 hours — Liv Sandberg, your contact." },
        ].map((r) => (
          <button key={r.title} className="text-left p-5 bg-[var(--surface-warm)] hover:bg-[var(--bg-elevated)] hover:border-[var(--ink-secondary)] border border-transparent transition-colors">
            <div className="text-[14px] mb-1.5">{r.title}</div>
            <div className="text-[12px] text-[var(--ink-secondary)] leading-[18px]">{r.body}</div>
            <span className="inline-block mt-3 text-[11px] tracking-[0.08em] uppercase text-[var(--accent-clay)]">Open →</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PreferencesTab() {
  const [prefs, setPrefs] = useState({ newArrivals: true, edit: true, sale: false, sms: false });
  const [saved, setSaved] = useState(false);
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 1800); };
  return (
    <div>
      <SectionHeader title="Preferences" subtitle="Decide how and when we get in touch." />
      <div className="bg-[var(--bg-elevated)] border border-[var(--line)] divide-y divide-[var(--line)]">
        <Toggle label="New arrivals" body="A weekly preview of the new pieces in the house." value={prefs.newArrivals} onChange={(v) => setPrefs({ ...prefs, newArrivals: v })} />
        <Toggle label="The Edit" body="Styling notes, maker stories, seasonal essays." value={prefs.edit} onChange={(v) => setPrefs({ ...prefs, edit: v })} />
        <Toggle label="Sale & promotions" body="Occasional markdowns. Never more than monthly." value={prefs.sale} onChange={(v) => setPrefs({ ...prefs, sale: v })} />
        <Toggle label="Order updates by SMS" body="Texted shipping updates for the orders you care about." value={prefs.sms} onChange={(v) => setPrefs({ ...prefs, sms: v })} />
      </div>
      <div className="mt-6 flex items-center gap-4">
        <button onClick={save} className="px-7 py-3 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase">
          Save preferences
        </button>
        {saved && <span className="inline-flex items-center gap-1.5 text-[13px] text-[var(--accent-sage)]"><Check size={14} strokeWidth={1.75} /> Saved</span>}
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="font-display" style={{ fontSize: "clamp(28px, 3vw, 36px)", lineHeight: 1.1, fontWeight: 500 }}>{title}</h2>
        {subtitle && <p className="text-[14px] text-[var(--ink-secondary)] mt-2 max-w-[520px]">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function AddButton({ label }: { label: string }) {
  return (
    <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--ink-primary)] text-[12px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white">
      <Plus size={14} strokeWidth={1.5} /> {label}
    </button>
  );
}

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="bg-[var(--surface-warm)] p-5">
      <div className="text-[11px] tracking-[0.12em] uppercase text-[var(--ink-tertiary)] mb-2">{label}</div>
      <div className="font-display" style={{ fontSize: "32px", lineHeight: 1.1, fontWeight: 500 }}>{value}</div>
      <div className="text-[12px] text-[var(--accent-sage)] mt-1">{delta}</div>
    </div>
  );
}

function Toggle({ label, body, value, onChange }: { label: string; body: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-5 px-6 py-4 cursor-pointer">
      <div>
        <div className="text-[14px]">{label}</div>
        <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">{body}</div>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${value ? "bg-[var(--accent-sage)]" : "bg-[var(--line)]"}`}
      >
        <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-[22px]" : "translate-x-0.5"}`} />
      </button>
    </label>
  );
}
