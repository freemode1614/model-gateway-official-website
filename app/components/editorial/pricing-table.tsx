import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { Label, SectionTag, TextLink, Wrap } from "./primitives";

const plans = [
  {
    name: "Developer",
    price: "$0",
    unit: "per month",
    action: "Start free",
    to: "/docs#quickstart",
    note: "For prototypes and single-team products.",
  },
  {
    name: "Team",
    price: "$2,500",
    unit: "per month",
    action: "Start a trial",
    to: "/contact",
    note: "For production traffic and shared policy.",
    recommended: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    unit: "annual",
    action: "Talk to sales",
    to: "/contact",
    note: "For VPC, on-prem, and procurement.",
  },
];

const rows = [
  ["Gateway requests", "100k / mo", "5M / mo", "Unlimited"],
  ["Token markup", "0%", "0%", "0%"],
  ["Models", "120+", "120+", "120+ + private"],
  ["Routing policies", "3", "Unlimited", "Unlimited"],
  ["Guardrail packs", "2", "All", "All + custom"],
  ["Trace retention", "7 days", "90 days", "Custom"],
  ["Deployment", "Shared edge", "Shared or VPC", "VPC or on-prem"],
  ["Support", "Community", "24×5", "24×7 + TAM"],
];

export function PricingTable() {
  return (
    <section id="pricing" className="border-t border-rule py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionTag index="08">Pricing</SectionTag>
          </div>
          <div className="lg:col-span-6">
            <h2 className="ed-display ed-h2">
              Priced like infrastructure.{" "}
              <span className="ed-display-italic">Not like a toll booth.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:pt-2">
            <p className="ed-small text-graphite-soft">
              No token markup. No per-seat tax on the platform team. You pay
              model providers at list price and Portico for the gate.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <Label>Plan comparison / 2026</Label>
          <Label className="lg:hidden">Scroll →</Label>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="ed-table min-w-[760px]">
            <thead>
              <tr>
                <th className="w-[26%] pt-5 align-bottom">
                  <span className="sr-only">Feature</span>
                </th>
                {plans.map((plan) => (
                  <th
                    key={plan.name}
                    className="w-[24.6%] border-l border-rule px-5 pt-5 pb-5 align-bottom"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-sans text-[13px] font-medium tracking-normal text-graphite normal-case">
                        {plan.name}
                      </span>
                      {plan.recommended && (
                        <span className="inline-flex items-center gap-1.5 text-[8px] tracking-[0.12em] text-accent">
                          <span className="h-1 w-1 bg-accent" />
                          Recommended
                        </span>
                      )}
                    </div>
                    <div className="mt-4 font-display text-[2rem] leading-none tracking-[-0.035em] text-graphite">
                      {plan.price}
                    </div>
                    <div className="mt-1.5 font-sans text-[10px] tracking-normal text-quiet normal-case">
                      {plan.unit}
                    </div>
                    <p className="mt-3 font-sans text-[11.5px] leading-snug tracking-normal text-graphite-soft normal-case">
                      {plan.note}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, developer, team, enterprise]) => (
                <tr key={feature}>
                  <td className="text-[12px] text-quiet">{feature}</td>
                  <td className="ed-mono border-l border-rule px-5 text-[11.5px]">
                    {developer}
                  </td>
                  <td className="ed-mono border-l border-rule px-5 text-[11.5px]">
                    {team}
                  </td>
                  <td className="ed-mono border-l border-rule px-5 text-[11.5px]">
                    {enterprise}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[22px] border border-rule bg-rule">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-paper p-3 sm:p-4">
              <Link
                to={plan.to}
                className={`inline-flex items-center gap-1.5 text-[12px] font-medium transition-colors hover:text-accent ${
                  plan.recommended ? "text-accent" : "text-graphite"
                }`}
              >
                {plan.action}
                <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <p className="ed-small max-w-xl text-quiet">
            Every plan includes the full gateway. Model usage is billed by the
            provider at list price — we never touch the meter.
          </p>
          <TextLink to="/pricing">Compare plans in detail</TextLink>
        </div>
      </Wrap>
    </section>
  );
}
