import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { FinalCta } from "../components/editorial/cta";
import {
  PageHero,
  PageSection,
  SectionHeader,
  SpecStrip,
} from "../components/editorial/page";
import { EdButton, Label, TextLink } from "../components/editorial/primitives";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/company";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Company — NCS" },
    {
      name: "description",
      content:
        "NCS is building the neutral control plane for production AI. Meet the team, values, and the road that got us here.",
    },
  ];
}

const stats = [
  { value: "2023", label: "Founded" },
  { value: "68", label: "People" },
  { value: "4,000+", label: "Customers" },
  { value: "$112M", label: "Raised" },
];

const values = [
  {
    title: "Boring reliability",
    body: "A gateway is infrastructure. It should be the least interesting part of your stack — and the last thing that pages you.",
  },
  {
    title: "No lock-in, ever",
    body: "Models, clouds, and SDKs change. We win by making it easy to leave, not by trapping you.",
  },
  {
    title: "Security is a feature",
    body: "Zero retention by default, BYOK, VPC, and audit trails you can hand to a regulator without a rewrite.",
  },
  {
    title: "Ship small, measure",
    body: "Policies are code. Rollouts are progressive. Every change has a metric, a trace, and a rollback.",
  },
  {
    title: "Default to clarity",
    body: "Public status, public benchmarks, honest pricing. No invented magic, no mystery tokens.",
  },
  {
    title: "Customers before models",
    body: "The newest model is not automatically the right one. We optimize for your product, budget, and latency.",
  },
];

const timeline = [
  {
    year: "2023",
    quarter: "Q1",
    title: "Founded in San Francisco",
    body: "Three infrastructure engineers who had each built a model proxy at their last company decide to build the real thing.",
  },
  {
    year: "2023",
    quarter: "Q4",
    title: "Seed round · $14M",
    body: "Backed by operators from Stripe, Cloudflare, and Datadog. First 40 design partners onboarded.",
  },
  {
    year: "2024",
    quarter: "Q2",
    title: "Gateway GA",
    body: "OpenAI-compatible gateway launches with failover, streaming, and token-level traces across 12 providers.",
  },
  {
    year: "2025",
    quarter: "Q1",
    title: "Semantic routing",
    body: "Intent-aware routing ships. Customers cut token spend by an average of 44% in the first month.",
  },
  {
    year: "2025",
    quarter: "Q4",
    title: "Series B · $40M",
    body: "4,000 teams, 4.2B daily requests, and a 99.999% edge SLA. Enterprise VPC deployments go live.",
  },
  {
    year: "2026",
    quarter: "Q2",
    title: "Agent infrastructure",
    body: "MCP tool governance, memory, run replay, and step budgets bring agents into the same control plane.",
  },
];

const team = [
  {
    name: "Elena Park",
    role: "Co-founder & CEO",
    bio: "Ex-Stripe infrastructure. Built payment routing at 40k RPS.",
    initials: "EP",
  },
  {
    name: "Marcus Bell",
    role: "Co-founder & CTO",
    bio: "Ex-Cloudflare edge. Spent a decade making the network boring.",
    initials: "MB",
  },
  {
    name: "Aisha Rahman",
    role: "Head of Security",
    bio: "Ex-bank CISO. Turns compliance reviews into a checklist.",
    initials: "AR",
  },
  {
    name: "Daniel Kim",
    role: "VP Engineering",
    bio: "Ex-Datadog observability. Believes traces beat dashboards.",
    initials: "DK",
  },
];

const customers = [
  ["Northstar", "Fintech"],
  ["Meridian Health", "Healthcare"],
  ["Ledgerline", "Accounting"],
  ["Atlas Freight", "Logistics"],
  ["Corvus", "Security"],
  ["Halcyon", "Media"],
  ["Nimbus", "Developer tools"],
  ["Arclight", "Energy"],
  ["Vela", "Retail"],
  ["Foundry", "Manufacturing"],
  ["Kite", "Travel"],
  ["Reliance", "Insurance"],
];

const compliance = [
  ["SOC 2 Type II", "Annual audit · report on request"],
  ["HIPAA", "BAA available · PHI-safe routing"],
  ["GDPR", "EU residency · DPA"],
  ["ISO 27001", "Certified · 2025"],
];

const roles = [
  {
    title: "Staff Software Engineer, Data Plane",
    team: "Engineering",
    location: "San Francisco / Remote",
  },
  {
    title: "Security Engineer, Guardrails",
    team: "Security",
    location: "Remote (US)",
  },
  {
    title: "Solutions Architect, Enterprise",
    team: "Field Engineering",
    location: "London",
  },
  {
    title: "Developer Advocate",
    team: "Developer Experience",
    location: "Remote",
  },
];

const investors = [
  "Northline Ventures",
  "Signal Ridge",
  "Aperture Capital",
  "Kite Partners",
  "Operator Collective",
];

export default function Company() {
  return (
    <SiteShell variant="editorial">
      <PageHero
        index="01"
        label="Company"
        meta="NCS / 2026"
        title={
          <>
            The neutral layer for{" "}
            <span className="ed-display-italic">production AI.</span>
          </>
        }
        intro="Every company will run on many models. We are building the control plane that makes that safe, affordable, and fast — independent of any single provider."
        actions={
          <>
            <EdButton to="/contact">Talk to us</EdButton>
            <EdButton href="#careers" variant="ghost">
              See open roles
            </EdButton>
          </>
        }
      >
        <SpecStrip items={stats} />
      </PageHero>

      <PageSection>
        <SectionHeader
          index="02"
          label="Mission"
          title={
            <>
              Make the model layer{" "}
              <span className="ed-display-italic">boring.</span>
            </>
          }
          intro="We are not a model company. We are the neutral layer that lets you use all of them."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="border-l border-accent pl-6">
              <p className="font-display text-[1.8rem] leading-[1.12] tracking-[-0.035em] sm:text-[2.2rem]">
                “Four thousand teams route production traffic through us. The
                pager has stayed quiet.”
              </p>
              <div className="mt-4">
                <Label>Since 2023 · San Francisco</Label>
              </div>
            </div>
          </div>

          <div className="space-y-5 lg:col-span-7 lg:col-start-6">
            <p className="ed-body">
              In 2023 we watched every company rebuild the same thing: retry
              logic, provider fallbacks, prompt logs, cost dashboards, and a
              security review that arrived six weeks too late. The model layer
              was becoming the most fragile part of otherwise excellent
              products.
            </p>
            <p className="ed-body">
              NCS exists so teams can treat models like any other infrastructure
              dependency: versioned, observable, governed, and replaceable. We
              are not a model company. We are the neutral layer that lets you
              use all of them.
            </p>
          </div>
        </div>
      </PageSection>

      <PageSection id="values">
        <SectionHeader
          index="03"
          label="Values"
          title={
            <>
              How we <span className="ed-display-italic">operate.</span>
            </>
          }
          intro="Six principles we use to make decisions — and to say no."
        />

        <div className="mt-10 grid border-t border-rule sm:grid-cols-2 sm:gap-x-10">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="border-b border-rule py-6 sm:py-7"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[9px] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[1.45rem] leading-tight tracking-[-0.03em]">
                  {value.title}
                </h3>
              </div>
              <p className="mt-2 max-w-md pl-7 text-[12.5px] leading-relaxed text-graphite-soft">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection id="timeline">
        <SectionHeader
          index="04"
          label="Timeline"
          title={
            <>
              From proxy to{" "}
              <span className="ed-display-italic">control plane.</span>
            </>
          }
          intro="A short, deliberate road. We shipped infrastructure before we shipped a brand."
        />

        <div className="mt-10 border-t border-rule">
          {timeline.map((item) => (
            <div
              key={`${item.year}-${item.quarter}`}
              className="grid gap-3 border-b border-rule py-5 sm:grid-cols-[8rem_1fr] sm:gap-6"
            >
              <div className="flex items-baseline gap-2 sm:block">
                <p className="font-display text-[1.5rem] leading-none tracking-[-0.03em]">
                  {item.year}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent sm:mt-1.5">
                  {item.quarter}
                </p>
              </div>
              <div>
                <h3 className="text-[13.5px] font-medium text-graphite">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-[12.5px] leading-relaxed text-graphite-soft">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          index="05"
          label="Leadership"
          title={
            <>
              Operators,{" "}
              <span className="ed-display-italic">not academics.</span>
            </>
          }
          intro="We have run infrastructure at scale, been on call, and written the postmortems. That shows up in the product."
        />

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <div key={person.name} className="border-t border-rule pt-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-rule bg-paper-deep/20 font-mono text-[11px] tracking-[0.08em] backdrop-blur-sm">
                {person.initials}
              </span>
              <h3 className="mt-4 text-[13.5px] font-medium text-graphite">
                {person.name}
              </h3>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-accent">
                {person.role}
              </p>
              <p className="mt-3 text-[11.5px] leading-relaxed text-quiet">
                {person.bio}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-rule pt-5">
          <Label>Backed by</Label>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {investors.map((investor) => (
              <span
                key={investor}
                className="font-display text-[1.05rem] tracking-[-0.02em] text-graphite-soft"
              >
                {investor}
              </span>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection id="customers">
        <SectionHeader
          index="06"
          label="Customers"
          title={
            <>
              A few of the teams{" "}
              <span className="ed-display-italic">in the path.</span>
            </>
          }
          intro="4,000+ teams route production traffic through Model Gateway. These are some of the names we can talk about."
        />

        <div className="mt-10 grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-4">
          {customers.map(([name, industry]) => (
            <div key={name} className="border-b border-r border-rule px-4 py-5">
              <p className="font-display text-[1.2rem] leading-none tracking-[-0.025em]">
                {name}
              </p>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-quiet">
                {industry}
              </p>
            </div>
          ))}
        </div>

        <blockquote className="mt-10 max-w-3xl border-l border-accent pl-6">
          <p className="font-display text-[1.5rem] leading-[1.2] tracking-[-0.03em] text-graphite sm:text-[1.8rem]">
            “We replaced three internal proxies and a spreadsheet with one gate.
            Finance noticed before engineering did.”
          </p>
          <footer className="mt-4">
            <Label>Dana Whitfield · COO, Atlas Freight</Label>
          </footer>
        </blockquote>
      </PageSection>

      <PageSection id="security">
        <SectionHeader
          index="07"
          label="Trust & security"
          title={
            <>
              Built for the review{" "}
              <span className="ed-display-italic">that takes six weeks.</span>
            </>
          }
          intro="We bring the evidence: audit reports, data-flow diagrams, DPA, pentest summaries, and a named security contact. Zero retention is the default."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="ed-body">
              Security is not an enterprise add-on. It is the reason the gate
              exists. Prompts are not retained by default, PII can be redacted
              before egress, and every policy decision is written to an
              immutable record.
            </p>
            <div className="mt-6">
              <TextLink to="/contact">Request the trust package</TextLink>
            </div>

            <div className="mt-8 border-t border-rule pt-4">
              <Label>Data residency</Label>
              <p className="mt-2 font-mono text-[11px] text-graphite-soft">
                US · EU · APAC · private VPC · air-gapped
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-rule">
              {compliance.map(([name, detail]) => (
                <div
                  key={name}
                  className="flex flex-col gap-1 border-b border-rule py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <span className="flex items-center gap-2 text-[13px] text-graphite">
                    <span className="h-1 w-1 bg-accent" aria-hidden="true" />
                    {name}
                  </span>
                  <span className="pl-3 font-mono text-[9.5px] text-quiet sm:pl-0">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection id="careers">
        <SectionHeader
          index="08"
          label="Careers"
          title={
            <>
              Build the layer{" "}
              <span className="ed-display-italic">everyone depends on.</span>
            </>
          }
          intro="Small team, high trust, low drama. We hire operators who like hard problems and quiet pagers."
        />

        <div className="mt-10 border-t border-rule">
          {roles.map((role) => (
            <Link
              key={role.title}
              to="/contact"
              className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 border-b border-rule py-4 sm:grid-cols-[1fr_10rem_auto]"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-graphite transition-colors group-hover:text-accent">
                  {role.title}
                </p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                  {role.team}
                </p>
              </div>
              <span className="col-start-1 row-start-2 font-mono text-[9.5px] text-quiet sm:col-start-auto sm:row-start-auto">
                {role.location}
              </span>
              <ArrowUpRight
                className="col-start-2 row-span-2 row-start-1 h-4 w-4 text-quiet transition-colors group-hover:text-accent sm:col-start-auto sm:row-span-1 sm:row-start-auto"
                strokeWidth={1.4}
              />
            </Link>
          ))}
        </div>

        <div className="mt-5">
          <p className="ed-small text-quiet">
            Don’t see your role?{" "}
            <Link to="/contact" className="ed-link">
              Introduce yourself
            </Link>
            .
          </p>
        </div>
      </PageSection>

      <FinalCta />
    </SiteShell>
  );
}
