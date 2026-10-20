import { useRef } from "react";

export function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      }}
      className={`spotlight group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.022] transition-colors duration-300 hover:border-white/[0.14] hover:bg-white/[0.035] ${className}`}
    >
      {children}
    </div>
  );
}
