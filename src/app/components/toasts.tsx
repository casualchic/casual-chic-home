import { X, Check, Heart, Info } from "lucide-react";
import { useStore } from "../store";

export function Toasts() {
  const { toasts, dismissToast } = useStore();
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[100] flex flex-col gap-3 pointer-events-none w-[calc(100%-2rem)] sm:w-[360px]">
      {toasts.map((t) => {
        const Icon = t.tone === "sage" ? Check : t.tone === "clay" ? Heart : Info;
        const accent = t.tone === "sage" ? "var(--accent-sage)" : t.tone === "clay" ? "var(--accent-clay)" : "var(--ink-primary)";
        return (
          <div
            key={t.id}
            className="pointer-events-auto bg-[var(--bg-elevated)] border border-[var(--line)] shadow-[0_12px_32px_-12px_rgba(31,27,22,0.25)] p-4 flex items-start gap-3 animate-[fadeIn_200ms_ease-out]"
          >
            <span className="mt-0.5 flex-shrink-0" style={{ color: accent }}>
              <Icon size={16} strokeWidth={1.75} fill={t.tone === "clay" ? "currentColor" : "none"} />
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-[var(--ink-primary)]">{t.title}</div>
              {t.body && <div className="text-[13px] text-[var(--ink-secondary)] mt-0.5 truncate">{t.body}</div>}
            </div>
            <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="text-[var(--ink-tertiary)] hover:text-[var(--ink-primary)]">
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
