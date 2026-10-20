import { Container } from "../site/section";
import { Counter } from "./counter";
import { Reveal } from "./reveal";

const stats = [
  {
    value: 4.2,
    decimals: 1,
    suffix: "B",
    label: "requests routed daily",
    detail: "across 38 regions",
  },
  {
    value: 120,
    suffix: "+",
    label: "models, one API",
    detail: "frontier, open, and private",
  },
  {
    value: 38,
    suffix: "ms",
    label: "added p99 latency",
    detail: "measured at the edge",
  },
  {
    value: 99.999,
    decimals: 3,
    suffix: "%",
    label: "uptime SLA",
    detail: "multi-region by default",
  },
];

export function Stats() {
  return (
    <section className="relative border-b border-white/[0.06] py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.08),transparent_65%)]"
      />
      <Container className="relative">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.label}
              delay={index * 80}
              className={`px-2 sm:px-6 ${
                index > 0 ? "lg:border-l lg:border-white/[0.08]" : ""
              }`}
            >
              <p className="text-[2.1rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.6rem]">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-1.5 text-sm font-medium text-slate-300">
                {stat.label}
              </p>
              <p className="mt-0.5 text-xs text-slate-600">{stat.detail}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
