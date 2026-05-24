import { useState } from "react";
import { ChevronDown, Check, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const benefits = [
  {
    title: "Pricing",
    body: "A flat 15% trade discount on everything in the house — furniture, lighting, textiles, tabletop. No tiers, no thresholds, no expiration.",
    bullets: ["15% off every order", "Volume pricing above $25k", "Tax exemption on file"],
  },
  {
    title: "Service",
    body: "A dedicated trade specialist on speed dial. Swatch kits on us, project quotes within 24 hours, and white-glove delivery on every order.",
    bullets: ["Dedicated account contact", "Free swatch kits", "White-glove delivery"],
  },
  {
    title: "Resources",
    body: "High-res tearsheets, CAD blocks, lead time visibility, and editorial co-marketing for completed projects you'd like to share.",
    bullets: ["Tearsheets & CAD blocks", "Lead time dashboard", "Project co-marketing"],
  },
];

const faqs = [
  { q: "Who qualifies for the trade program?", a: "Interior designers, architects, builders, stagers, hospitality buyers, and licensed stylists. We review applications individually — what matters is that you're working on projects, not the size of your firm." },
  { q: "How long does approval take?", a: "Most applications are reviewed within two business days. We'll email you either way, and once approved your discount is applied automatically when you sign in." },
  { q: "Can I combine the trade discount with sale pricing?", a: "Yes — the trade discount applies on top of any sale price, with the exception of clearance and a handful of limited-edition pieces, which are clearly marked." },
  { q: "Do you ship to the trade outside the US?", a: "We currently ship trade orders within the US and Canada. International project shipping is handled case by case — reach out to your trade specialist." },
  { q: "What's the lead time on custom pieces?", a: "Made-to-order upholstery and case goods typically ship in 4–8 weeks. Your trade specialist can pull live lead times for any piece in any finish." },
];

export function TradePage() {
  const [form, setForm] = useState({ name: "", company: "", role: "", website: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="relative w-full" style={{ height: "70vh", minHeight: "520px" }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1557243962-0a093922933f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=2200"
          alt="Designer working at a wooden desk with swatches and sketches"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute inset-0 mx-auto max-w-[1440px] px-6 lg:px-[88px] flex flex-col justify-end pb-16 lg:pb-24">
          <span className="eyebrow text-white/90 mb-5">Trade Program</span>
          <h1 className="font-display text-white max-w-[860px] mb-6" style={{ fontSize: "clamp(44px, 6vw, 76px)", lineHeight: 1.05, fontWeight: 500 }}>
            For the people who make rooms.
          </h1>
          <p className="text-white/90 max-w-[600px] text-[17px] leading-[28px] mb-8">
            A flat 15% discount, white-glove logistics, and a real human on the other end of the email. Built for designers, builders, and stylists.
          </p>
          <div>
            <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.1em] uppercase transition-colors">
              Apply <ArrowRight size={16} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px]">
          <div className="max-w-[640px] mb-14 lg:mb-20">
            <div className="eyebrow mb-3">What you get</div>
            <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 500 }}>
              Pricing, service, resources.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
            {benefits.map((b, i) => (
              <div key={b.title}>
                <div className="text-[12px] tracking-[0.18em] uppercase text-[var(--accent-clay)] mb-4">0{i + 1}</div>
                <h3 className="font-display mb-4" style={{ fontSize: "28px", lineHeight: 1.2, fontWeight: 500 }}>{b.title}</h3>
                <p className="text-[15px] text-[var(--ink-secondary)] leading-[24px] mb-5">{b.body}</p>
                <ul className="space-y-2.5">
                  {b.bullets.map((x) => (
                    <li key={x} className="flex items-start gap-2.5 text-[14px] text-[var(--ink-primary)]">
                      <span className="text-[var(--accent-sage)] mt-0.5 flex-shrink-0"><Check size={15} strokeWidth={2} /></span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface-warm)] py-16 lg:py-24 border-y border-[var(--line)]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12 text-center">
          <p className="font-display italic mx-auto max-w-[820px] mb-6" style={{ fontSize: "clamp(22px, 2.6vw, 32px)", lineHeight: 1.4, fontWeight: 400 }}>
            "Casual Chic has become the first place I send clients. The discount helps. The fact that my contact actually picks up the phone helps more."
          </p>
          <div className="text-[12px] tracking-[0.12em] uppercase text-[var(--ink-secondary)]">— Maya Reyes, Reyes Studio, Brooklyn</div>
        </div>
      </section>

      <section id="apply" className="py-16 lg:py-[120px]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-[88px] grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-[140px] h-fit">
            <div className="eyebrow mb-3">Apply</div>
            <h2 className="font-display mb-5" style={{ fontSize: "clamp(32px, 4vw, 48px)", lineHeight: 1.1, fontWeight: 500 }}>
              Tell us about your work.
            </h2>
            <p className="text-[16px] text-[var(--ink-secondary)] leading-[26px] mb-6">
              A few quick questions. Most applications are reviewed within two business days — we'll be in touch either way.
            </p>
            <ul className="space-y-3 text-[14px] text-[var(--ink-secondary)]">
              <li className="flex gap-2.5"><span className="text-[var(--accent-sage)]"><Check size={16} strokeWidth={2} /></span>No application fee</li>
              <li className="flex gap-2.5"><span className="text-[var(--accent-sage)]"><Check size={16} strokeWidth={2} /></span>Discount applies automatically once approved</li>
              <li className="flex gap-2.5"><span className="text-[var(--accent-sage)]"><Check size={16} strokeWidth={2} /></span>Tax exemption uploadable in your dashboard</li>
            </ul>
          </div>

          <div className="bg-[var(--bg-elevated)] p-8 lg:p-10 border border-[var(--line)]">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 rounded-full bg-[var(--accent-sage)] text-white mx-auto mb-5 flex items-center justify-center">
                  <Check size={20} strokeWidth={2} />
                </div>
                <h3 className="font-display mb-3" style={{ fontSize: "26px", lineHeight: 1.2, fontWeight: 500 }}>Application received.</h3>
                <p className="text-[15px] text-[var(--ink-secondary)] leading-[24px] max-w-[400px] mx-auto">
                  Thank you, {form.name || "friend"}. We'll review your application and be in touch within two business days at {form.email || "the email you provided"}.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <Field label="Full name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="form-input" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Company"><input required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="form-input" /></Field>
                  <Field label="Role">
                    <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="form-input">
                      <option value="">Select</option>
                      <option>Interior Designer</option>
                      <option>Architect</option>
                      <option>Builder / GC</option>
                      <option>Stager</option>
                      <option>Stylist</option>
                      <option>Hospitality Buyer</option>
                      <option>Other</option>
                    </select>
                  </Field>
                </div>
                <Field label="Website or portfolio"><input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className="form-input" placeholder="https://" /></Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Email"><input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="form-input" /></Field>
                  <Field label="Phone"><input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="form-input" /></Field>
                </div>
                <Field label="Tell us about a recent project"><textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="form-input resize-none" /></Field>
                <button type="submit" className="w-full py-4 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.1em] uppercase">
                  Submit application
                </button>
                <p className="text-[12px] text-[var(--ink-tertiary)] text-center">By applying you agree to our trade program terms.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-elevated)] py-16 lg:py-24 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[820px] px-6">
          <div className="eyebrow mb-3 text-center">FAQ</div>
          <h2 className="font-display mb-10 text-center" style={{ fontSize: "clamp(28px, 3vw, 38px)", lineHeight: 1.15, fontWeight: 500 }}>
            Common questions.
          </h2>
          <div>
            {faqs.map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      <style>{`.form-input { width: 100%; padding: 0.75rem 1rem; border: 1px solid var(--line); background: var(--bg-base); font-size: 14px; outline: none; transition: border-color 150ms; } .form-input:focus { border-color: var(--ink-primary); }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[12px] tracking-[0.06em] uppercase text-[var(--ink-secondary)] mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[var(--line)]">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-[16px]">{q}</span>
        <ChevronDown size={18} strokeWidth={1.5} className={`flex-shrink-0 ml-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-[15px] text-[var(--ink-secondary)] leading-[26px]">{a}</p>}
    </div>
  );
}
