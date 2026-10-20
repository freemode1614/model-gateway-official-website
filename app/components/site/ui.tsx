import type { ComponentPropsWithoutRef } from "react";

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

export const btnBase =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060a] disabled:pointer-events-none disabled:opacity-50";

export const btnPrimary = `${btnBase} bg-white px-5 py-3 text-[#080a12] shadow-[0_10px_40px_-12px_rgba(196,181,253,0.7)] hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-[0_16px_50px_-12px_rgba(167,139,250,0.8)]`;

export const btnViolet = `${btnBase} bg-gradient-to-r from-violet-500 to-indigo-500 px-5 py-3 text-white shadow-[0_12px_40px_-12px_rgba(124,58,237,0.9)] hover:-translate-y-0.5 hover:brightness-110`;

export const btnGhost = `${btnBase} border border-white/12 bg-white/[0.03] px-5 py-3 text-slate-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.07] hover:text-white`;

export const btnSmall = "px-4 py-2 text-[13px]";

export const eyebrow =
  "text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-300/80";

export const chip =
  "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-300";

export const mutedText = "text-[15px] leading-relaxed text-slate-400";

export function Tag({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={`${chip} ${className}`}>{children}</span>;
}

export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-white/12 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[11px] text-slate-300">
      {children}
    </kbd>
  );
}

export function VisuallyHidden({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>;
}

export type DivProps = ComponentPropsWithoutRef<"div">;
