import { useState } from "react";
import { Check, ChevronDown, Lock, ArrowRight } from "lucide-react";
import { useStore } from "../store";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { products } from "../data";

type Step = 1 | 2 | 3;

export function CheckoutPage() {
  const { cart, subtotal, navigate, route } = useStore();
  const [step, setStep] = useState<Step>(1);
  const [info, setInfo] = useState({ email: "", first: "", last: "", address: "", apt: "", city: "", state: "", zip: "", phone: "" });
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState({ name: "", card: "", exp: "", cvc: "" });
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [done, setDone] = useState(false);

  if (route.name === "confirmation" || done) {
    return <Confirmation name={info.first || "friend"} email={info.email || "your inbox"} />;
  }

  const ship = shipping === "express" ? 25 : subtotal >= 150 ? 0 : 12;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + ship + tax;

  const placeOrder = () => { setDone(true); navigate({ name: "confirmation" }); };

  return (
    <div className="min-h-[80vh] bg-[var(--bg-base)]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12">
        <div>
          <h1 className="font-display mb-2" style={{ fontSize: "clamp(32px, 3.6vw, 42px)", lineHeight: 1.1, fontWeight: 500 }}>Checkout</h1>
          <p className="text-[14px] text-[var(--ink-secondary)] mb-8">Secure checkout · 60-day returns</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
            <ExpressButton label="Apple Pay" />
            <ExpressButton label="Shop Pay" />
            <ExpressButton label="PayPal" />
            <ExpressButton label="Google Pay" />
          </div>

          <div className="flex items-center gap-3 mb-10">
            <div className="flex-1 h-px bg-[var(--line)]" />
            <span className="eyebrow text-[var(--ink-tertiary)]">Or pay by card</span>
            <div className="flex-1 h-px bg-[var(--line)]" />
          </div>

          <Section n={1} title="Information" step={step} setStep={setStep}>
            <div className="space-y-4">
              <Input label="Email" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} type="email" />
              <label className="flex items-center gap-2 text-[13px] text-[var(--ink-secondary)] cursor-pointer">
                <input type="checkbox" className="accent-[var(--accent-clay)]" defaultChecked />
                Email me with news and offers
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input label="First name" value={info.first} onChange={(v) => setInfo({ ...info, first: v })} />
                <Input label="Last name" value={info.last} onChange={(v) => setInfo({ ...info, last: v })} />
              </div>
              <Input label="Address" value={info.address} onChange={(v) => setInfo({ ...info, address: v })} />
              <Input label="Apt, suite (optional)" value={info.apt} onChange={(v) => setInfo({ ...info, apt: v })} />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" value={info.city} onChange={(v) => setInfo({ ...info, city: v })} />
                <Input label="State" value={info.state} onChange={(v) => setInfo({ ...info, state: v })} />
                <Input label="ZIP" value={info.zip} onChange={(v) => setInfo({ ...info, zip: v })} />
              </div>
              <Input label="Phone" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} type="tel" />
              <button onClick={() => setStep(2)} className="mt-2 px-7 py-3.5 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase">
                Continue to shipping
              </button>
            </div>
          </Section>

          <Section n={2} title="Shipping" step={step} setStep={setStep}>
            <div className="space-y-3">
              <ShippingOption value="standard" current={shipping} onChange={setShipping} title="Standard" eta="5–7 business days" price={subtotal >= 150 ? "Free" : "$12"} />
              <ShippingOption value="express" current={shipping} onChange={setShipping} title="Express" eta="2–3 business days" price="$25" />
              <ShippingOption value="white-glove" current={shipping} onChange={setShipping} title="White-glove" eta="3–5 weeks, scheduled delivery" price="Included on furniture" />
              <button onClick={() => setStep(3)} className="mt-4 px-7 py-3.5 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.08em] uppercase">
                Continue to payment
              </button>
            </div>
          </Section>

          <Section n={3} title="Payment" step={step} setStep={setStep}>
            <div className="space-y-4">
              <Input label="Name on card" value={payment.name} onChange={(v) => setPayment({ ...payment, name: v })} />
              <Input label="Card number" value={payment.card} onChange={(v) => setPayment({ ...payment, card: v })} placeholder="1234 5678 9012 3456" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Expiration (MM/YY)" value={payment.exp} onChange={(v) => setPayment({ ...payment, exp: v })} />
                <Input label="CVC" value={payment.cvc} onChange={(v) => setPayment({ ...payment, cvc: v })} />
              </div>
              <label className="flex items-center gap-2 text-[13px] text-[var(--ink-secondary)] cursor-pointer mt-2">
                <input type="checkbox" className="accent-[var(--accent-clay)]" defaultChecked />
                Billing address same as shipping
              </label>
              <button onClick={placeOrder} className="mt-2 w-full py-4 bg-[var(--accent-clay)] hover:bg-[var(--accent-clay-deep)] text-white text-[13px] tracking-[0.1em] uppercase flex items-center justify-center gap-2">
                <Lock size={14} strokeWidth={1.5} /> Place order · ${total}
              </button>
              <p className="text-[12px] text-[var(--ink-tertiary)] text-center mt-2">Secure checkout · 60-day returns</p>
            </div>
          </Section>
        </div>

        <aside>
          <div className="lg:hidden mb-4 border border-[var(--line)] rounded-sm">
            <button onClick={() => setSummaryOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-3 text-[14px]">
              <span>Order summary ({cart.reduce((s, i) => s + i.qty, 0)})</span>
              <span className="flex items-center gap-2">
                <span>${total}</span>
                <ChevronDown size={14} strokeWidth={1.5} className={`transition-transform ${summaryOpen ? "rotate-180" : ""}`} />
              </span>
            </button>
          </div>
          <div className={`${summaryOpen ? "block" : "hidden"} lg:block lg:sticky lg:top-[120px] bg-[var(--surface-warm)] p-6`}>
            <div className="eyebrow mb-5">Order summary</div>
            <ul className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-1">
              {cart.length === 0 && <li className="text-[14px] text-[var(--ink-secondary)]">Your bag is empty.</li>}
              {cart.map((item) => (
                <li key={`${item.slug}-${item.variant}`} className="flex gap-3">
                  <div className="relative w-16 h-20 bg-white overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={item.image} alt="" className="w-full h-full object-cover" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--ink-primary)] text-white text-[10px] flex items-center justify-center">{item.qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] leading-tight">{item.name}</div>
                    <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">{item.variant}</div>
                  </div>
                  <div className="text-[13px]">${item.unitPrice * item.qty}</div>
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mb-5">
              <input placeholder="Gift card or code" className="flex-1 px-3 py-2.5 border border-[var(--line)] bg-white text-[13px] focus:outline-none focus:border-[var(--ink-primary)]" />
              <button className="px-4 py-2.5 border border-[var(--ink-primary)] text-[12px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white">Apply</button>
            </div>
            <Row label="Subtotal" value={`$${subtotal}`} />
            <Row label="Shipping" value={ship === 0 ? "Free" : `$${ship}`} />
            <Row label="Estimated tax" value={`$${tax}`} />
            <div className="h-px bg-[var(--line)] my-4" />
            <div className="flex items-baseline justify-between">
              <span className="text-[14px]">Total</span>
              <span className="text-[22px] font-display" style={{ fontWeight: 500 }}>USD ${total}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ExpressButton({ label }: { label: string }) {
  return (
    <button className="h-12 bg-[var(--ink-primary)] text-white text-[13px] hover:opacity-90 transition-opacity">{label}</button>
  );
}

function Section({ n, title, step, setStep, children }: { n: Step; title: string; step: Step; setStep: (s: Step) => void; children: React.ReactNode }) {
  const open = step === n;
  const done = step > n;
  return (
    <div className="border-b border-[var(--line)] py-6">
      <button onClick={() => done && setStep(n)} className="w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] ${done ? "bg-[var(--accent-sage)] text-white" : open ? "bg-[var(--ink-primary)] text-white" : "bg-[var(--line)] text-[var(--ink-tertiary)]"}`}>
            {done ? <Check size={13} strokeWidth={2} /> : n}
          </span>
          <span className="font-display" style={{ fontSize: "20px", fontWeight: 500 }}>{title}</span>
        </div>
        {done && <span className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2">Edit</span>}
      </button>
      {open && <div className="mt-6">{children}</div>}
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="block text-[12px] tracking-[0.06em] uppercase text-[var(--ink-secondary)] mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-[var(--line)] bg-white text-[14px] focus:outline-none focus:border-[var(--ink-primary)]"
      />
    </label>
  );
}

function ShippingOption({ value, current, onChange, title, eta, price }: { value: string; current: string; onChange: (v: string) => void; title: string; eta: string; price: string }) {
  const active = current === value;
  return (
    <label className={`flex items-center gap-4 px-5 py-4 border cursor-pointer transition-colors ${active ? "border-[var(--ink-primary)] bg-[var(--surface-warm)]" : "border-[var(--line)] hover:border-[var(--ink-secondary)]"}`}>
      <input type="radio" checked={active} onChange={() => onChange(value)} className="accent-[var(--accent-clay)]" />
      <div className="flex-1">
        <div className="text-[14px]">{title}</div>
        <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">{eta}</div>
      </div>
      <div className="text-[14px]">{price}</div>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1 text-[14px]">
      <span className="text-[var(--ink-secondary)]">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Confirmation({ name, email }: { name: string; email: string }) {
  const { navigate } = useStore();
  const recs = ["marin-sofa", "petra-candle", "field-throw"].map((s) => products.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <div className="min-h-[80vh] bg-[var(--bg-base)]">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-12 py-12 lg:py-20">
        <div className="bg-[var(--surface-warm)] p-10 lg:p-14 mb-12">
          <div className="eyebrow mb-4">Order #CC-2026-04219</div>
          <h1 className="font-display mb-4" style={{ fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1.05, fontWeight: 500 }}>
            Thank you, {name}.
          </h1>
          <p className="text-[16px] text-[var(--ink-secondary)] leading-[26px] max-w-[640px] mb-6">
            Your order's on its way to the makers. We've sent a confirmation to <span className="text-[var(--ink-primary)]">{email}</span> — you'll hear from us again when your pieces ship.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-[var(--line)]">
            <Info label="Estimated arrival" value="May 26 – Jun 2" />
            <Info label="Ship to" value="123 Hudson St, Brooklyn NY" />
            <Info label="Method" value="Standard · Free" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          <div>
            <div className="eyebrow mb-4">Read while you wait</div>
            <h2 className="font-display mb-6" style={{ fontSize: "28px", lineHeight: 1.2, fontWeight: 500 }}>From The Edit</h2>
            <ul className="space-y-4">
              <li><button onClick={() => navigate({ name: "edit-article", slug: "layer-a-bed" })} className="text-left text-[15px] hover:text-[var(--accent-clay)]">How to Layer a Bed for Spring →</button></li>
              <li><button onClick={() => navigate({ name: "edit-article", slug: "painters-cottage" })} className="text-left text-[15px] hover:text-[var(--accent-clay)]">Inside Anna's Painter's Cottage →</button></li>
              <li><button onClick={() => navigate({ name: "edit-article", slug: "belgian-linen" })} className="text-left text-[15px] hover:text-[var(--accent-clay)]">The Belgian Linen Mill Behind Our Sheets →</button></li>
            </ul>
          </div>
          <div className="bg-[var(--bg-elevated)] p-8">
            <div className="eyebrow mb-3">Share your space</div>
            <h2 className="font-display mb-3" style={{ fontSize: "24px", lineHeight: 1.2, fontWeight: 500 }}>Show us how it lives.</h2>
            <p className="text-[14px] text-[var(--ink-secondary)] leading-[22px] mb-5">Tag <span className="text-[var(--ink-primary)]">@casualchichome</span> when your order arrives. We feature reader homes every week.</p>
            <button className="px-6 py-3 border border-[var(--ink-primary)] text-[13px] tracking-[0.08em] uppercase hover:bg-[var(--ink-primary)] hover:text-white">Follow on Instagram</button>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-3">You may also like</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recs.map((p) => (
              <button key={p.slug} onClick={() => navigate({ name: "product", slug: p.slug })} className="text-left group">
                <div className="aspect-[4/5] overflow-hidden bg-[var(--surface-warm)] mb-3">
                  <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                </div>
                <div className="text-[15px]">{p.name}</div>
                <div className="text-[13px] text-[var(--ink-tertiary)] mt-0.5">{p.salePrice ?? p.price}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <button onClick={() => navigate({ name: "home" })} className="inline-flex items-center gap-2 text-[13px] tracking-[0.08em] uppercase border-b border-[var(--ink-primary)] pb-0.5">
            Keep browsing <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[12px] tracking-[0.08em] uppercase text-[var(--ink-tertiary)] mb-1.5">{label}</div>
      <div className="text-[14px]">{value}</div>
    </div>
  );
}
