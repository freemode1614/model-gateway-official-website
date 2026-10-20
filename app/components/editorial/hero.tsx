import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { EdButton, FigureCaption, Label, SectionTag, Wrap } from "./primitives";

const ledgerRows = [
  {
    time: "14:02:11",
    request: "chat.completions",
    policy: "EU",
    model: "claude-sonnet-4.5",
    latency: "38 ms",
  },
  {
    time: "14:02:12",
    request: "chat.completions",
    policy: "PII",
    model: "gpt-5-mini",
    latency: "31 ms",
  },
  {
    time: "14:02:13",
    request: "embeddings",
    policy: "CACHE",
    model: "text-embedding-3-l",
    latency: "12 ms",
  },
  {
    time: "14:02:14",
    request: "chat.completions",
    policy: "COST",
    model: "gemini-2.5-flash",
    latency: "44 ms",
  },
  {
    time: "14:02:15",
    request: "agents.run",
    policy: "MCP",
    model: "gpt-5",
    latency: "52 ms",
  },
];

function Ledger() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % ledgerRows.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <figure className="relative">
      <div className="ed-ledger relative">
        <div className="flex items-center justify-between border-b border-paper/15 px-4 py-3">
          <Label className="text-paper/45">Decision ledger</Label>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#e4764f]" aria-hidden="true" />
            <Label className="text-paper/60">Live · us-east-1</Label>
          </span>
        </div>

        <div className="grid grid-cols-[2.9rem_minmax(0,1fr)_3.1rem_minmax(0,1.15fr)_2.7rem] gap-2 border-b border-paper/15 px-4 py-2">
          {["Time", "Request", "Policy", "Model", "Lat"].map((heading) => (
            <span
              key={heading}
              className="ed-mono text-[8.5px] uppercase tracking-[0.14em] text-paper/35"
            >
              {heading}
            </span>
          ))}
        </div>

        <div>
          {ledgerRows.map((row, index) => (
            <div
              key={row.time}
              data-active={active === index}
              className="ed-ledger-row grid grid-cols-[2.9rem_minmax(0,1fr)_3.1rem_minmax(0,1.15fr)_2.7rem] items-center gap-2 border-b border-paper/10 px-4 py-3 last:border-b-0"
            >
              <span className="ed-mono text-[9.5px] text-paper/35">
                {row.time}
              </span>
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="ed-ledger-mark shrink-0" aria-hidden="true" />
                <span className="ed-mono truncate text-[9.5px] text-paper/70">
                  {row.request}
                </span>
              </span>
              <span className="ed-mono text-[8.5px] tracking-[0.08em] text-paper/50">
                {row.policy}
              </span>
              <span className="ed-mono truncate text-[9.5px] text-paper/85">
                {row.model}
              </span>
              <span className="ed-mono text-right text-[9.5px] text-paper/55">
                {row.latency}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-paper/15 px-4 py-3">
          <span className="ed-mono text-[9px] text-paper/40">
            p50 38 ms · $0.0041 / request
          </span>
          <span className="ed-mono text-[9px] text-paper/40">0 violations</span>
        </div>
      </div>

      <FigureCaption index="Fig. 01" className="max-w-md">
        Every request carries a decision record: policy version, model, price,
        latency. The record leaves with you — warehouse, SIEM, or webhook.
      </FigureCaption>
    </figure>
  );
}

const specs = [
  { value: "120+", label: "Models behind one key" },
  { value: "38 ms", label: "p50 gateway overhead" },
  { value: "0%", label: "Token markup" },
  { value: "SOC 2", label: "Type II · HIPAA · GDPR" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 ed-gridlines"
      />

      <Wrap wide className="relative">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <SectionTag index="01">The control plane</SectionTag>
          <Label className="hidden sm:block">Portico 3.0 / October 2026</Label>
        </div>

        <div className="grid gap-12 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-7">
            <h1 className="ed-display ed-h1">
              <span
                className="ed-rise block"
                style={{ animationDelay: "40ms" }}
              >
                Your models are
              </span>
              <span
                className="ed-rise block"
                style={{ animationDelay: "120ms" }}
              >
                <span className="ed-display-italic text-accent">
                  infrastructure.
                </span>
              </span>
              <span
                className="ed-rise block"
                style={{ animationDelay: "200ms" }}
              >
                Treat them like it.
              </span>
            </h1>

            <p
              className="ed-body ed-rise mt-8 max-w-[34rem]"
              style={{ animationDelay: "300ms" }}
            >
              Portico sits between your product and every model you depend on.
              Route each request by cost, latency, or quality. Enforce policy
              before inference. Keep the receipt.
            </p>

            <div
              className="ed-rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: "360ms" }}
            >
              <EdButton href="#architecture">
                Read the architecture
                <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              </EdButton>
              <EdButton to="/contact" variant="ghost">
                Book a walkthrough
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </EdButton>
            </div>

            <p
              className="ed-mono ed-rise mt-7 text-[10px] uppercase tracking-[0.13em] text-quiet"
              style={{ animationDelay: "420ms" }}
            >
              OpenAI-compatible · No credit card · 1M free tokens
            </p>
          </div>

          <div
            className="ed-rise lg:col-span-5 lg:pt-1"
            style={{ animationDelay: "250ms" }}
          >
            <Ledger />
            <div className="mt-10 hidden justify-end lg:flex">
              <a
                href="#problem"
                className="ed-mono flex items-center gap-2 text-[9.5px] uppercase tracking-[0.14em] text-quiet transition-colors hover:text-accent"
              >
                Continue
                <ArrowDown className="h-3 w-3" strokeWidth={1.5} />
                <span>02 / The problem</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-rule lg:grid-cols-4">
          {specs.map((spec, index) => (
            <div
              key={spec.label}
              className={`py-6 ${index !== 0 ? "lg:border-l lg:border-rule lg:pl-6" : ""} ${index % 2 === 1 ? "border-l border-rule pl-5 lg:pl-6" : ""} ${index > 1 ? "border-t border-rule lg:border-t-0" : ""}`}
            >
              <p className="font-display text-[1.85rem] leading-none tracking-[-0.03em]">
                {spec.value}
              </p>
              <p className="ed-label mt-2">{spec.label}</p>
            </div>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
