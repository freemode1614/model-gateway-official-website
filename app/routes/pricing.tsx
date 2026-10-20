import { ArrowUpRight } from "lucide-react";
import { FinalCta } from "../components/editorial/cta";
import { FaqBlock } from "../components/editorial/faq-block";
import {
  PageHero,
  PageSection,
  SectionHeader,
  SpecStrip,
} from "../components/editorial/page";
import {
  PlanCards,
  PlanComparison,
  SavingsCalculator,
} from "../components/editorial/pricing-parts";
import { EdButton } from "../components/editorial/primitives";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/pricing";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Pricing — Portico" },
    {
      name: "description",
      content:
        "Traffic-based pricing for the Portico model gateway. No token markup, no per-seat tax, and the full gateway on every plan.",
    },
  ];
}

const specs = [
  { value: "0%", label: "Token markup" },
  { value: "1M", label: "Free tokens to start" },
  { value: "14d", label: "Scale trial" },
  { value: "99.999%", label: "Enterprise SLA" },
];

const pricingFaqs = [
  {
    q: "How does pricing work?",
    a: "A platform fee plus included tokens. Overage is billed at your negotiated provider rate with no token markup. You can set hard budgets per team, application, or customer, and get alerts before you hit them.",
  },
  {
    q: "What counts as a token?",
    a: "Input and output tokens across chat, tools, embeddings, and vision are counted exactly as the provider reports them. Cached responses are billed at the cache rate, not the model rate.",
  },
  {
    q: "Do you mark up model usage?",
    a: "No. You pay providers at list price, or at the rate you negotiated directly with them. Portico charges for the gateway, never for the meter.",
  },
  {
    q: "What happens when we outgrow a plan?",
    a: "Nothing breaks. Overage is metered, and your account team will propose a committed contract once the trend is clear. You can also move to annual billing at any time.",
  },
  {
    q: "Is annual billing cheaper?",
    a: "Yes. Annual plans are billed yearly and save 20% versus monthly. The discount applies to the platform fee, not to provider usage.",
  },
  {
    q: "Can we set budgets per team or customer?",
    a: "Yes. Budgets are a first-class policy: hard ceilings, soft alerts, and chargeback dimensions by team, key, feature, or end customer. A request that would exceed a hard budget is rejected before egress.",
  },
];

export default function Pricing() {
  return (
    <SiteShell variant="editorial">
      <PageHero
        index="01"
        label="Pricing"
        meta="Plans / 2026"
        title={
          <>
            Pay for traffic,{" "}
            <span className="ed-display-italic">not for seats.</span>
          </>
        }
        intro="Every plan includes the full gateway: routing, caching, guardrails, and traces. No token markup, no per-seat tax, no surprise invoices."
        actions={
          <>
            <EdButton to="/docs#quickstart">
              Start for free
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </EdButton>
            <EdButton to="/contact" variant="ghost">
              Talk to sales
            </EdButton>
          </>
        }
      >
        <SpecStrip items={specs} />
      </PageHero>

      <PageSection>
        <SectionHeader
          index="02"
          label="Plans"
          title={
            <>
              Start small.{" "}
              <span className="ed-display-italic">Keep the same gate.</span>
            </>
          }
          intro="Every tier runs the same gateway core. Higher tiers add scale, governance, and deployment options — not a different product."
        />
        <div className="mt-10">
          <PlanCards />
        </div>
      </PageSection>

      <PageSection id="roi">
        <SectionHeader
          index="03"
          label="ROI"
          title={
            <>
              Most teams cut model spend{" "}
              <span className="ed-display-italic">in the first month.</span>
            </>
          }
          intro="Routing to the cheapest capable model, caching repeats, and eliminating retry storms compound quickly. Move the sliders to size it for your traffic."
        />
        <div className="mt-10">
          <SavingsCalculator />
        </div>
      </PageSection>

      <PageSection id="compare">
        <SectionHeader
          index="04"
          label="Compare"
          title={
            <>
              The details,{" "}
              <span className="ed-display-italic">side by side.</span>
            </>
          }
          intro="The same gateway core on every plan. The differences are scale, governance, and where the gate runs."
        />
        <div className="mt-10">
          <PlanComparison />
        </div>
      </PageSection>

      <FaqBlock
        index="05"
        label="Pricing questions"
        title={
          <>
            How billing{" "}
            <span className="ed-display-italic">actually works.</span>
          </>
        }
        intro="Tokens, overage, annual terms, and what happens when you outgrow a plan."
        items={pricingFaqs}
        response="< 4 hours · Mon–Fri, 09:00–18:00 ET"
      />

      <FinalCta />
    </SiteShell>
  );
}
