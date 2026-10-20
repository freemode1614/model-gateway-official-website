import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { btnGhost, btnPrimary } from "../site/ui";
import { SpotlightCard } from "./spotlight-card";

type Tier = {
  name: string;
  tagline: string;
  monthly: number | null;
  cta: string;
  to: string;
  features: string[];
  popular?: boolean;
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
    popular: true,
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

export function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!annual}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
          !annual ? "bg-white text-ink" : "text-slate-400 hover:text-white"
        }`}
      >
        Monthly
      </button>
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={annual}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
          annual ? "bg-white text-ink" : "text-slate-400 hover:text-white"
        }`}
      >
        Annual
        <span
          className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
            annual ? "bg-acid/20 text-emerald-700" : "bg-acid/15 text-acid"
          }`}
        >
          −20%
        </span>
      </button>
    </div>
  );
}

export function PricingCards({
  defaultAnnual = false,
  showToggle = true,
}: {
  defaultAnnual?: boolean;
  showToggle?: boolean;
}) {
  const [annual, setAnnual] = useState(defaultAnnual);

  return (
    <div>
      {showToggle && (
        <div className="mb-10 flex flex-col items-center gap-3">
          <BillingToggle annual={annual} onChange={setAnnual} />
          <p className="text-[11px] text-slate-600">
            Prices in USD. Annual plans are billed yearly.
          </p>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map((tier) => {
          const amount =
            tier.monthly === null
              ? null
              : annual
                ? Math.round(tier.monthly * 0.8)
                : tier.monthly;

          return (
            <SpotlightCard
              key={tier.name}
              className={`flex flex-col p-6 sm:p-7 ${
                tier.popular
                  ? "ring-gradient bg-violet-500/[0.055] lg:-mt-2 lg:mb-2"
                  : ""
              }`}
            >
              {tier.popular && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full border border-violet-400/25 bg-violet-500/15 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-violet-200">
                  <Sparkles className="h-2.5 w-2.5" />
                  Most popular
                </span>
              )}

              <h3 className="text-[15px] font-semibold text-white">
                {tier.name}
              </h3>
              <p className="mt-2 min-h-[2.75rem] max-w-[16rem] text-[12px] leading-relaxed text-slate-500">
                {tier.tagline}
              </p>

              <div className="mt-6 flex items-end gap-1.5">
                {amount === null ? (
                  <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white">
                    Custom
                  </span>
                ) : (
                  <>
                    <span className="text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-white">
                      ${amount.toLocaleString("en-US")}
                    </span>
                    <span className="pb-1 text-xs text-slate-500">/mo</span>
                  </>
                )}
              </div>
              <p className="mt-2 h-4 text-[10.5px] text-slate-600">
                {amount === null
                  ? "Volume pricing · annual contract"
                  : amount === 0
                    ? "Free forever · no card required"
                    : annual
                      ? "Billed annually · save $5,760/yr"
                      : "Billed monthly · cancel anytime"}
              </p>

              <Link
                to={tier.to}
                className={`mt-6 w-full ${
                  tier.popular ? btnPrimary : btnGhost
                }`}
              >
                {tier.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              <ul className="mt-7 space-y-2.5 border-t border-white/[0.07] pt-6">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[12px] text-slate-400"
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-acid"
                      strokeWidth={2.5}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          );
        })}
      </div>
    </div>
  );
}
