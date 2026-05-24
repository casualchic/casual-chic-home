import { useState } from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { useStore, type Route } from "../store";

type Link = { label: string; route?: Route };
const columns: Record<string, Link[]> = {
  Shop: [
    { label: "Living", route: { name: "category", category: "Living" } },
    { label: "Bedroom", route: { name: "category", category: "Bedroom" } },
    { label: "Dining", route: { name: "category", category: "Dining" } },
    { label: "Outdoor", route: { name: "category", category: "Outdoor" } },
    { label: "Lighting", route: { name: "category", category: "Lighting" } },
    { label: "Decor", route: { name: "category", category: "Decor" } },
    { label: "Sale", route: { name: "category", category: "Sale" } },
  ],
  Help: [{ label: "Contact" }, { label: "Shipping" }, { label: "Returns" }, { label: "Care Guides" }, { label: "FAQs" }],
  Company: [
    { label: "Our Story" },
    { label: "Sustainability" },
    { label: "The Edit", route: { name: "edit-hub" } },
    { label: "Press" },
    { label: "Careers" },
  ],
  Trade: [
    { label: "Trade Program", route: { name: "trade" } },
    { label: "Hospitality", route: { name: "trade" } },
    { label: "Designer Services", route: { name: "trade" } },
  ],
};

export function NewsletterFooter() {
  const { navigate } = useStore();
  const [email, setEmail] = useState("");
  return (
    <footer>
      <div className="bg-[var(--surface-warm)] py-16 lg:py-24">
        <div className="mx-auto max-w-[860px] px-6 text-center">
          <div className="eyebrow mb-4">The List</div>
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>
            First looks, styling notes, and 10% off.
          </h2>
          <p className="text-[15px] text-[var(--ink-secondary)] mb-8 max-w-[520px] mx-auto leading-[24px]">
            Sign up and we'll send the new arrivals, an essay or two, and a code for your first order.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
            className="flex flex-col sm:flex-row gap-3 max-w-[520px] mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 px-4 py-3.5 bg-white border border-[var(--line)] text-[14px] text-[var(--ink-primary)] placeholder:text-[var(--ink-tertiary)] focus:outline-none focus:border-[var(--ink-primary)]"
            />
            <button
              type="submit"
              className="px-7 py-3.5 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase transition-colors duration-150"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-[var(--ink-primary)] text-[#D8D2C5] pt-16 pb-10">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14">
            <div className="col-span-2 md:col-span-1">
              <div className="font-display tracking-[0.06em] uppercase text-white mb-4" style={{ fontSize: "18px" }}>
                Casual Chic Home
              </div>
              <p className="text-[13px] text-[#A89F8E] leading-[22px] max-w-[220px]">
                Beautifully lived in. Furniture and home pieces made to be used, layered, and loved.
              </p>
            </div>
            {Object.entries(columns).map(([title, links]) => (
              <div key={title}>
                <div className="text-[12px] tracking-[0.12em] uppercase text-white mb-4">{title}</div>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.label}>
                      <button onClick={() => l.route && navigate(l.route)} className="text-[13px] text-[#A89F8E] hover:text-white transition-colors text-left">{l.label}</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="text-[12px] text-[#7E7669]">© 2026 Casual Chic Home · All rights reserved · Privacy · Terms</div>
            <div className="flex items-center gap-4 text-[#A89F8E]">
              <a href="#" aria-label="Instagram" className="hover:text-white"><Instagram size={18} strokeWidth={1.5} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={18} strokeWidth={1.5} /></a>
              <a href="#" aria-label="Youtube" className="hover:text-white"><Youtube size={18} strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
