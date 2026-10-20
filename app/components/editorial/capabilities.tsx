import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Label, SectionTag, TextLink, Wrap } from "./primitives";

const capabilities = [
  {
    index: "01",
    title: "Route",
    body: "Send each request to the model that earns it. Cost ceilings, latency budgets, quality floors, and canary weights — evaluated per request, not per quarter.",
    specs: [
      "Cost / latency / quality",
      "Fallback chains",
      "38 ms p50 overhead",
    ],
    href: "/platform#routing",
  },
  {
    index: "02",
    title: "Enforce",
    body: "Policy travels with the request. Redact PII, block injection, pin residency, and allowlist models before a provider sees anything.",
    specs: ["PII + injection", "EU / US residency", "WASM policy hooks"],
    href: "/platform#guardrails",
  },
  {
    index: "03",
    title: "Cache",
    body: "Pay once for the same question. Exact and semantic cache, scoped by tenant and key, with a TTL you control and a hit rate you can see.",
    specs: ["Semantic + exact", "Tenant scoped", "24h default TTL"],
    href: "/platform#caching",
  },
  {
    index: "04",
    title: "Record",
    body: "Every token gets a receipt. Trace cost, latency, and quality back to the team, key, and feature that spent it — then export the record wherever you already look.",
    specs: ["OTel export", "Cost attribution", "90-day traces"],
    href: "/platform#observability",
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="border-t border-rule py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionTag index="03">The gateway</SectionTag>
          </div>
          <div className="lg:col-span-6">
            <h2 className="ed-display ed-h2">
              Four decisions, made once,{" "}
              <span className="ed-display-italic">enforced everywhere.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:pt-2">
            <p className="ed-small text-graphite-soft">
              The gateway is not a proxy with a dashboard. It is the place where
              routing, policy, caching, and accounting share one request
              context.
            </p>
          </div>
        </div>

        <div className="mt-12 border-y border-rule">
          {capabilities.map((capability) => (
            <Link
              key={capability.index}
              to={capability.href}
              className="ed-index-row grid grid-cols-12 items-start gap-x-4 gap-y-3 border-b border-rule px-1 py-7 last:border-b-0 sm:px-3 lg:items-center lg:gap-6 lg:py-8"
            >
              <span className="ed-mono col-span-2 text-[10px] text-quiet lg:col-span-1">
                {capability.index}
              </span>

              <span className="col-span-10 font-display text-[2rem] leading-none tracking-[-0.035em] lg:col-span-3 lg:text-[2.5rem]">
                {capability.title}
              </span>

              <span className="col-span-12 max-w-xl text-[13.5px] leading-relaxed text-graphite-soft lg:col-span-4">
                {capability.body}
              </span>

              <span className="col-span-10 col-start-3 flex flex-wrap gap-x-5 gap-y-1.5 lg:col-span-3 lg:col-start-auto">
                {capability.specs.map((spec) => (
                  <span
                    key={spec}
                    className="ed-mono text-[9.5px] uppercase tracking-[0.1em] text-quiet"
                  >
                    {spec}
                  </span>
                ))}
              </span>

              <span className="col-span-2 flex justify-end lg:col-span-1">
                <ArrowUpRight
                  className="ed-arrow h-5 w-5 text-quiet"
                  strokeWidth={1.3}
                />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Label>One request context · Four control surfaces</Label>
          <TextLink to="/platform">Read the full capability brief</TextLink>
        </div>
      </Wrap>
    </section>
  );
}
