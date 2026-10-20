const companies = [
  { name: "Northwind", glyph: "circle" },
  { name: "VELTRIX", glyph: "triangle" },
  { name: "Lumen", glyph: "star" },
  { name: "ARCADIA", glyph: "arch" },
  { name: "Quanta", glyph: "square" },
  { name: "helix", glyph: "wave" },
  { name: "VERTEX", glyph: "diamond" },
  { name: "nimbus", glyph: "dot" },
] as const;

function Glyph({ shape }: { shape: (typeof companies)[number]["glyph"] }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      {shape === "circle" && (
        <>
          <circle cx="10" cy="10" r="7" {...common} />
          <path d="M3 13.5 17 6.5" {...common} />
        </>
      )}
      {shape === "triangle" && <path d="M10 3 17 16H3L10 3Z" {...common} />}
      {shape === "star" && (
        <path
          d="M10 2v16M2 10h16M4.3 4.3l11.4 11.4M15.7 4.3 4.3 15.7"
          {...common}
        />
      )}
      {shape === "arch" && (
        <path
          d="M4 17V9a6 6 0 0 1 12 0v8M8 17v-7a2 2 0 0 1 4 0v7"
          {...common}
        />
      )}
      {shape === "square" && (
        <>
          <rect x="4" y="4" width="12" height="12" rx="2" {...common} />
          <rect x="8" y="8" width="4" height="4" rx="1" {...common} />
        </>
      )}
      {shape === "wave" && (
        <path
          d="M2 12c2.5 0 2.5-4 5-4s2.5 4 5 4 2.5-4 5-4M2 16c2.5 0 2.5-4 5-4s2.5 4 5 4 2.5-4 5-4"
          {...common}
        />
      )}
      {shape === "diamond" && <path d="m10 2 8 8-8 8-8-8 8-8Z" {...common} />}
      {shape === "dot" && (
        <>
          <circle cx="10" cy="10" r="7" {...common} />
          <circle cx="10" cy="10" r="2.5" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}

export function LogoCloud() {
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.012] py-8">
      <p className="mb-6 text-center text-[10.5px] font-semibold uppercase tracking-[0.24em] text-slate-600">
        Powering AI at teams that can&apos;t afford downtime
      </p>
      <div className="marquee">
        <div className="marquee-track items-center">
          {[0, 1].map((copy) =>
            companies.map((company) => (
              <div
                key={`${company.name}-${copy}`}
                className="flex shrink-0 items-center gap-2 px-7 text-slate-500 transition-colors hover:text-slate-200"
              >
                <Glyph shape={company.glyph} />
                <span className="text-[15px] font-semibold tracking-[-0.01em]">
                  {company.name}
                </span>
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
