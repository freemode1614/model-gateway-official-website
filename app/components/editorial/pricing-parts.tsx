import { ArrowDown, Check, Minus } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import { EdButton, Label, TextLink } from "./primitives";

type Tier = {
  name: string;
  tagline: string;
  monthly: number | null;
  cta: string;
  to: string;
  features: string[];
  recommended?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Developer",
    tagline: "For prototypes, side projects, and the first production spike.",
    monthly: 0,
    cta: "Start for free",
    to: "/docs#quickstart",
    features: [
      "1M tokens / month included",
      "3 providers · 12 models",
      "Semantic cache + 7-day traces",
      "Community support",
      "Up to 2 team members",
    ],
  },
  {
    name: "Scale",
    tagline: "For product teams running real traffic with real budgets.",
    monthly: 2400,
    cta: "Start 14-day trial",
    to: "/contact",
    recommended: true,
    features: [
      "50M tokens / month included",
      "All 120+ models · BYOK",
      "Advanced routing policies",
      "Guardrails + PII redaction",
      "30-day traces · SSO / SAML",
      "99.9% uptime SLA",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For regulated platforms that need control down to the network.",
    monthly: null,
    cta: "Talk to sales",
    to: "/contact",
    features: [
      "Unlimited tokens · volume pricing",
      "VPC, on-prem, or air-gapped",
      "99.999% SLA · 24/7 support",
      "Dedicated solutions architect",
      "Custom guardrails & eval suites",
      "SOC 2, HIPAA, DPA, audit logs",
    ],
  },
];

function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="inline-flex border border-rule">
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!annual}
        className={`cursor-pointer px-4 py-2 text-[12px] font-medium transition-colors ${
          !annual
            ? "bg-graphite text-paper"
            : "bg-paper text-graphite-soft hover:text-graphite"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={annual}
        className={`cursor-pointer border-l border-rule px-4 py-2 text-[12px] font-medium transition-colors ${
          annual
            ? "bg-graphite text-paper"
            : "bg-paper text-graphite-soft hover:text-graphite"
        }`}
      >
        Annual <span className="text-accent">−20%</span>
      </button>
    </div>
  );
}

export function PlanCards() {
  const [annual, setAnnual] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <BillingToggle annual={annual} onChange={setAnnual} />
        <p className="ed-mono text-[9.5px] uppercase tracking-[0.12em] text-quiet">
          Prices in USD · annual plans billed yearly
        </p>
      </div>

      <div className="mt-6 grid gap-px border border-rule bg-rule lg:grid-cols-3">
        {tiers.map((tier) => {
          const amount =
            tier.monthly === null
              ? null
              : annual
                ? Math.round(tier.monthly * 0.8)
                : tier.monthly;

          return (
            <div
              key={tier.name}
              className={`flex flex-col bg-paper p-6 sm:p-7 ${
                tier.recommended ? "bg-[#f7f4ec]" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-[1.4rem] leading-none tracking-[-0.03em]">
                  {tier.name}
                </h3>
                {tier.recommended ? (
                  <span className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-accent">
                    <span className="h-1 w-1 bg-accent" aria-hidden="true" />
                    Recommended
                  </span>
                ) : null}
              </div>

              <p className="mt-3 min-h-[2.7rem] max-w-[17rem] text-[12px] leading-relaxed text-quiet">
                {tier.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1.5">
                <span className="font-display text-[2.8rem] leading-none tracking-[-0.045em]">
                  {amount === null
                    ? "Custom"
                    : `$${amount.toLocaleString("en-US")}`}
                </span>
                <span className="pb-1 font-mono text-[10px] text-quiet">
                  {amount === null ? "annual" : "/mo"}
                </span>
              </div>
              <p className="mt-2 h-4 font-mono text-[9.5px] text-quiet">
                {amount === null
                  ? "Volume pricing · annual contract"
                  : amount === 0
                    ? "Free forever · no card required"
                    : annual
                      ? "Billed annually · save $5,760/yr"
                      : "Billed monthly · cancel anytime"}
              </p>

              <EdButton
                to={tier.to}
                variant={tier.recommended ? "solid" : "ghost"}
                className="mt-6 w-full"
              >
                {tier.cta}
              </EdButton>

              <ul className="mt-7 space-y-2.5 border-t border-rule pt-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[12px] text-graphite-soft"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Cell = string | boolean;

const comparison: { group: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    group: "Usage",
    rows: [
      ["Included tokens / month", "1M", "50M", "Unlimited"],
      ["Token markup", "None", "None", "None"],
      ["Platform seats", "2", "Unlimited", "Unlimited"],
      ["Overage billing", "Metered", "Metered", "Committed"],
    ],
  },
  {
    group: "Routing & platform",
    rows: [
      ["Providers", "3", "All 120+", "All + private"],
      ["Routing policies", "Basic", "Advanced", "Custom"],
      ["Semantic cache", true, true, true],
      ["Shadow traffic & canaries", false, true, true],
      ["BYOK / HSM keys", false, true, true],
    ],
  },
  {
    group: "Safety & governance",
    rows: [
      ["Guardrails", "PII only", "Full pack", "Custom packs"],
      ["SSO / SAML", false, true, true],
      ["Audit log retention", "7 days", "90 days", "Unlimited"],
      ["Private VPC / on-prem", false, false, true],
    ],
  },
  {
    group: "Support",
    rows: [
      ["Uptime SLA", "Community", "99.9%", "99.999%"],
      ["Support", "Community", "Priority", "24/7 + architect"],
      ["Evaluation suites", "1", "10", "Unlimited"],
    ],
  },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-grid h-4 w-4 place-items-center border border-accent/40 bg-accent-wash">
        <Check className="h-2.5 w-2.5 text-accent-deep" strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return <Minus className="mx-auto h-3.5 w-3.5 text-quiet/50" />;
  }
  return (
    <span className="font-mono text-[10.5px] text-graphite-soft">{value}</span>
  );
}

export function PlanComparison() {
  return (
    <div>
      <div className="mb-2 flex justify-end lg:hidden">
        <Label>Scroll →</Label>
      </div>
      <div className="overflow-x-auto">
        <table className="ed-table min-w-[760px]">
          <thead>
            <tr>
              <th className="w-[34%] py-4">Feature</th>
              <th className="border-l border-rule px-4 py-4 text-center">
                Developer
              </th>
              <th className="border-l border-rule px-4 py-4 text-center">
                <span className="text-graphite">Scale</span>
                <span className="ml-2 text-[8px] text-accent">Recommended</span>
              </th>
              <th className="border-l border-rule px-4 py-4 text-center">
                Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((group) => (
              <Fragment key={group.group}>
                <tr>
                  <td
                    colSpan={4}
                    className="border-y border-rule bg-paper-deep/60 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-quiet"
                  >
                    {group.group}
                  </td>
                </tr>
                {group.rows.map(([feature, developer, scale, enterprise]) => (
                  <tr key={feature}>
                    <td className="text-[12px] text-graphite-soft">
                      {feature}
                    </td>
                    <td className="border-l border-rule px-4 text-center">
                      <CellValue value={developer} />
                    </td>
                    <td className="border-l border-rule bg-paper-deep/30 px-4 text-center">
                      <CellValue value={scale} />
                    </td>
                    <td className="border-l border-rule px-4 text-center">
                      <CellValue value={enterprise} />
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <Label>All plans include the full gateway core</Label>
        <TextLink to="/contact">
          Need a bespoke contract or regional residency?
        </TextLink>
      </div>
    </div>
  );
}

const mixes = [
  { id: "quality", label: "Quality first", savings: 0.35 },
  { id: "balanced", label: "Balanced", savings: 0.58 },
  { id: "cost", label: "Cost first", savings: 0.72 },
] as const;

function money(value: number) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function SavingsCalculator() {
  const [requests, setRequests] = useState(20);
  const [tokens, setTokens] = useState(1200);
  const [mix, setMix] = useState<(typeof mixes)[number]["id"]>("balanced");

  const savingsRate = mixes.find((item) => item.id === mix)?.savings ?? 0.58;

  const { current, routed, saved } = useMemo(() => {
    const premiumPerMillion = 8;
    const baseline = requests * tokens * premiumPerMillion;
    const after = baseline * (1 - savingsRate);
    return { current: baseline, routed: after, saved: baseline - after };
  }, [requests, tokens, savingsRate]);

  return (
    <div className="max-w-full border border-graphite/70 bg-[#f7f4ec] shadow-[8px_8px_0_0_var(--color-paper-deep)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-rule p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <Label>Estimate your savings</Label>
          <h3 className="ed-display mt-3 text-[1.8rem] leading-[1.05] tracking-[-0.035em]">
            Your traffic, routed smarter.
          </h3>
          <p className="mt-3 max-w-md text-[12.5px] leading-relaxed text-quiet">
            A rough model based on customer medians: 35–72% lower token spend
            after routing, caching, and fallbacks.
          </p>

          <div className="mt-7 space-y-6">
            <label className="block">
              <span className="mb-2 flex items-baseline justify-between gap-3">
                <span className="ed-small font-medium">Monthly requests</span>
                <span className="ed-mono text-[11px] text-graphite">
                  {requests}M
                </span>
              </span>
              <input
                type="range"
                min={1}
                max={200}
                step={1}
                value={requests}
                onChange={(event) => setRequests(Number(event.target.value))}
                className="ed-range"
                aria-label="Monthly requests in millions"
              />
              <span className="mt-1 flex justify-between font-mono text-[8.5px] text-quiet">
                <span>1M</span>
                <span>200M</span>
              </span>
            </label>

            <label className="block">
              <span className="mb-2 flex items-baseline justify-between gap-3">
                <span className="ed-small font-medium">
                  Average tokens / request
                </span>
                <span className="ed-mono text-[11px] text-graphite">
                  {tokens.toLocaleString("en-US")}
                </span>
              </span>
              <input
                type="range"
                min={200}
                max={8000}
                step={100}
                value={tokens}
                onChange={(event) => setTokens(Number(event.target.value))}
                className="ed-range"
                aria-label="Average tokens per request"
              />
              <span className="mt-1 flex justify-between font-mono text-[8.5px] text-quiet">
                <span>200</span>
                <span>8,000</span>
              </span>
            </label>

            <div>
              <p className="ed-small mb-2 font-medium">Optimization mix</p>
              <div className="grid grid-cols-3 gap-px border border-rule bg-rule">
                {mixes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMix(item.id)}
                    aria-pressed={mix === item.id}
                    className={`cursor-pointer px-2 py-2.5 text-[10.5px] transition-colors ${
                      mix === item.id
                        ? "bg-graphite text-paper"
                        : "bg-paper text-graphite-soft hover:bg-paper-deep"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-graphite p-6 text-paper sm:p-8">
          <Label className="text-paper/40">Estimated monthly savings</Label>
          <p className="mt-3 font-display text-[3.4rem] leading-none tracking-[-0.05em] text-paper sm:text-[4rem]">
            {money(saved)}
          </p>
          <p className="mt-2 font-mono text-[10px] text-paper/45">
            ≈ <span className="text-[#e4764f]">{money(saved * 12)}</span> saved
            per year
          </p>

          <div className="mt-8 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between font-mono text-[9.5px]">
                <span className="text-paper/45">Current spend</span>
                <span className="text-paper/75">{money(current)}</span>
              </div>
              <div className="h-1.5 bg-paper/15">
                <div className="h-full w-full bg-paper/35" />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between font-mono text-[9.5px]">
                <span className="text-paper/45">With Portico</span>
                <span className="text-[#e4764f]">{money(routed)}</span>
              </div>
              <div className="h-1.5 bg-paper/15">
                <div
                  className="h-full bg-[#e4764f] transition-all duration-500"
                  style={{ width: `${(1 - savingsRate) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-2 border-t border-paper/15 pt-4 text-[10.5px] text-paper/55">
            <ArrowDown className="h-3.5 w-3.5 text-[#e4764f]" />
            <span>
              <strong className="font-medium text-[#e4764f]">
                {Math.round(savingsRate * 100)}% lower
              </strong>{" "}
              token cost at the same answer quality
            </span>
          </div>

          <EdButton
            to="/docs#quickstart"
            variant="paper"
            className="mt-6 w-full"
          >
            Start free
          </EdButton>

          <p className="mt-3 text-center font-mono text-[8.5px] text-paper/30">
            Illustrative. Baseline: $8 / 1M blended tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
