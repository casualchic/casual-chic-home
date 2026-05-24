const logos = ["Architectural Digest", "House Beautiful", "Domino", "Apartment Therapy", "Kinfolk"];

export function PressStrip() {
  return (
    <section className="bg-[var(--bg-elevated)] py-16 lg:py-24 border-y border-[var(--line)]">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-[88px] text-center">
        <p
          className="font-display italic text-[var(--ink-primary)] mb-12 mx-auto max-w-[760px]"
          style={{ fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.35, fontWeight: 400 }}
        >
          “The kind of pieces you don't replace — you just rearrange around them.”
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
          {logos.map((l) => (
            <span
              key={l}
              className="text-[12px] tracking-[0.14em] uppercase text-[var(--ink-secondary)]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.18em" }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
