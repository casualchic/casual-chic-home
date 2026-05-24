import { useEffect, useMemo, useState } from "react";
import { Search, X, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useStore } from "../store";
import { products } from "../data";
import { articles } from "./edit-pages";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const RECENT_KEY = "cch-recent-searches";
const trending = ["Marin sofa", "Linen bedding", "Brass pendant", "Outdoor", "Sale"];

export function SearchOverlay() {
  const { searchOpen, closeSearch, navigate } = useStore();
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); } catch { return []; }
  });

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => document.getElementById("search-input")?.focus(), 50);
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeSearch(); };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
        clearTimeout(t);
      };
    }
  }, [searchOpen, closeSearch]);

  const productResults = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return products.filter((p) =>
      p.name.toLowerCase().includes(term) ||
      p.descriptor.toLowerCase().includes(term) ||
      p.material.toLowerCase().includes(term) ||
      p.collection.toLowerCase().includes(term) ||
      p.subcategory.toLowerCase().includes(term),
    ).slice(0, 6);
  }, [q]);

  const articleResults = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return articles.filter((a) =>
      a.title.toLowerCase().includes(term) ||
      a.dek.toLowerCase().includes(term) ||
      a.category.toLowerCase().includes(term),
    ).slice(0, 3);
  }, [q]);

  const commit = (term: string) => {
    if (!term.trim()) return;
    const next = [term, ...recent.filter((r) => r.toLowerCase() !== term.toLowerCase())].slice(0, 6);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const clearRecent = () => {
    setRecent([]);
    try { localStorage.removeItem(RECENT_KEY); } catch { /* ignore */ }
  };

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex flex-col">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeSearch} />

      <div className="relative bg-[var(--bg-base)] border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12 h-[88px] flex items-center gap-4">
          <Search size={20} strokeWidth={1.5} className="text-[var(--ink-secondary)] flex-shrink-0" />
          <input
            id="search-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commit(q); }}
            placeholder="Search the house — sofas, linen, brass pendants…"
            className="flex-1 bg-transparent text-[18px] lg:text-[22px] py-2 focus:outline-none placeholder:text-[var(--ink-tertiary)]"
          />
          <button onClick={closeSearch} aria-label="Close" className="p-2 text-[var(--ink-secondary)] hover:text-[var(--ink-primary)]">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto bg-[var(--bg-base)]">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-12 py-10">
          {q.trim() === "" ? (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="eyebrow inline-flex items-center gap-2"><Clock size={12} /> Recent</div>
                  {recent.length > 0 && (
                    <button onClick={clearRecent} className="text-[12px] text-[var(--ink-tertiary)] underline underline-offset-2 hover:text-[var(--ink-primary)]">Clear</button>
                  )}
                </div>
                {recent.length === 0 ? (
                  <p className="text-[14px] text-[var(--ink-tertiary)]">Your recent searches will live here.</p>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {recent.map((r) => (
                      <li key={r}>
                        <button onClick={() => setQ(r)} className="px-3.5 py-1.5 text-[13px] rounded-full border border-[var(--line)] text-[var(--ink-secondary)] hover:border-[var(--ink-secondary)]">
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <div className="eyebrow inline-flex items-center gap-2 mb-5"><TrendingUp size={12} /> Trending</div>
                <ul className="space-y-2">
                  {trending.map((t) => (
                    <li key={t}>
                      <button onClick={() => setQ(t)} className="group flex items-center justify-between w-full text-left py-2 border-b border-[var(--line)]">
                        <span className="text-[15px] text-[var(--ink-primary)] group-hover:text-[var(--accent-clay)]">{t}</span>
                        <ArrowRight size={14} strokeWidth={1.5} className="text-[var(--ink-tertiary)] group-hover:text-[var(--accent-clay)]" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <div className="eyebrow mb-5">Editor's picks</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {products.slice(0, 4).map((p) => (
                    <button
                      key={p.slug}
                      onClick={() => { commit(p.name); closeSearch(); navigate({ name: "product", slug: p.slug }); }}
                      className="text-left group"
                    >
                      <div className="aspect-[4/5] overflow-hidden bg-[var(--surface-warm)] mb-2">
                        <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                      </div>
                      <div className="text-[13px]">{p.name}</div>
                      <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">{p.salePrice ?? p.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_280px] gap-10">
              <div>
                <div className="flex items-baseline justify-between mb-5">
                  <div className="eyebrow">Pieces · {productResults.length}</div>
                  {productResults.length > 0 && (
                    <button onClick={() => { commit(q); closeSearch(); navigate({ name: "category", category: "Living" }); }} className="text-[12px] underline underline-offset-2 hover:text-[var(--accent-clay)]">
                      See all results
                    </button>
                  )}
                </div>
                {productResults.length === 0 ? (
                  <div className="bg-[var(--surface-warm)] p-8 text-center">
                    <p className="font-display mb-2" style={{ fontSize: "22px", lineHeight: 1.25, fontWeight: 500 }}>No matches yet.</p>
                    <p className="text-[14px] text-[var(--ink-secondary)]">Try a material ("linen"), a room, or a collection name.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[var(--line)]">
                    {productResults.map((p) => (
                      <li key={p.slug}>
                        <button
                          onClick={() => { commit(q); closeSearch(); navigate({ name: "product", slug: p.slug }); }}
                          className="w-full flex items-center gap-4 py-3 text-left hover:bg-[var(--surface-warm)] -mx-3 px-3 transition-colors"
                        >
                          <div className="w-14 h-16 bg-[var(--surface-warm)] overflow-hidden flex-shrink-0">
                            <ImageWithFallback src={p.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[15px] truncate">{highlight(p.name, q)}</div>
                            <div className="text-[12px] text-[var(--ink-tertiary)] mt-0.5">{p.descriptor}</div>
                          </div>
                          <div className="text-[14px] flex-shrink-0">{p.salePrice ?? p.price}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <aside>
                <div className="eyebrow mb-5">From The Edit</div>
                {articleResults.length === 0 ? (
                  <p className="text-[13px] text-[var(--ink-tertiary)]">No matching stories.</p>
                ) : (
                  <ul className="space-y-4">
                    {articleResults.map((a) => (
                      <li key={a.slug}>
                        <button
                          onClick={() => { commit(q); closeSearch(); navigate({ name: "edit-article", slug: a.slug }); }}
                          className="block text-left group"
                        >
                          <div className="aspect-video overflow-hidden mb-2">
                            <ImageWithFallback src={a.hero} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                          </div>
                          <div className="text-[12px] text-[var(--ink-tertiary)] mb-1">{a.category}</div>
                          <div className="text-[14px] group-hover:text-[var(--accent-clay)]">{a.title}</div>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function highlight(text: string, term: string) {
  if (!term.trim()) return text;
  const i = text.toLowerCase().indexOf(term.toLowerCase());
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-[var(--surface-warm)] text-[var(--ink-primary)] px-0.5">{text.slice(i, i + term.length)}</mark>
      {text.slice(i + term.length)}
    </>
  );
}
