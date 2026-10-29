import type { ReactNode } from "react";
import { FinalCta } from "../components/editorial/cta";
import { FaqBlock } from "../components/editorial/faq-block";
import {
  PageHero,
  PageSection,
  SectionHeader,
  SpecStrip,
} from "../components/editorial/page";
import { EdButton, Label, TextLink } from "../components/editorial/primitives";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/platform";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Platform — NCS Model Gateway" },
    {
      name: "description",
      content:
        "Routing, guardrails, semantic caching, observability, and agent infrastructure for production AI. One request path, governed end to end.",
    },
  ];
}

const specs = [
  { value: "12 ms", label: "Median routing decision" },
  { value: "31 ms", label: "Median failover" },
  { value: "68%", label: "Semantic cache hit rate" },
  { value: "120+", label: "Models behind one key" },
];

function FigureFrame({
  label,
  meta,
  children,
  footer,
}: {
  label: string;
  meta: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="max-w-full border border-graphite/70 bg-[#f7f4ec] shadow-[8px_8px_0_0_var(--color-paper-deep)]">
      <div className="flex items-center justify-between gap-4 border-b border-graphite/70 bg-graphite px-4 py-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/60">
          {label}
        </span>
        <span className="font-mono text-[9px] text-paper/40">{meta}</span>
      </div>
      {children}
      {footer ? (
        <div className="flex items-center justify-between gap-4 border-t border-rule px-4 py-2.5 font-mono text-[8.5px] text-quiet">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function RoutingFigure() {
  const models = [
    ["claude-sonnet-4.8", "94", true],
    ["gpt-5.2", "91", false],
    ["gemini-3-flash", "78", false],
  ] as const;

  return (
    <FigureFrame
      label="Policy / support.yaml"
      meta="v14 · deployed"
      footer={
        <>
          <span>decision 12 ms · us-east</span>
          <span className="text-accent">cached policy</span>
        </>
      }
    >
      <pre className="border-b border-rule bg-paper-deep/30 px-4 py-4 font-mono text-[10.5px] leading-[1.75] text-graphite-soft">
        <code>
          <span className="text-accent">intent</span>: billing.refund{"\n"}
          <span className="text-accent">policy</span>: balanced{"\n"}
          <span className="text-accent">max_cost_per_1k</span>: 0.004{"\n"}
          <span className="text-accent">fallback</span>: [gpt-5.2-mini,
          gemini-3-flash]
        </code>
      </pre>

      <div className="px-4 py-3">
        <div className="grid grid-cols-[1fr_2.5rem_4rem] gap-2 border-b border-rule pb-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-quiet">
          <span>Model</span>
          <span className="text-right">Score</span>
          <span className="text-right">State</span>
        </div>
        {models.map(([name, score, routed]) => (
          <div
            key={name}
            className={`grid grid-cols-[1fr_2.5rem_4rem] items-center gap-2 border-b border-rule py-2.5 last:border-b-0 ${
              routed ? "bg-accent-wash/40" : ""
            }`}
          >
            <span className="flex min-w-0 items-center gap-2 font-mono text-[10px] text-graphite">
              <span
                className={`h-1.5 w-1.5 shrink-0 ${
                  routed ? "bg-accent" : "bg-rule"
                }`}
              />
              <span className="truncate">{name}</span>
            </span>
            <span className="text-right font-mono text-[10px] text-quiet">
              {score}
            </span>
            <span
              className={`text-right font-mono text-[8.5px] uppercase tracking-[0.1em] ${
                routed ? "text-accent" : "text-quiet/50"
              }`}
            >
              {routed ? "routed" : "warm"}
            </span>
          </div>
        ))}
      </div>
    </FigureFrame>
  );
}

function GuardrailsFigure() {
  const events = [
    ["12:04:11", "prompt.injection", "0.98", "blocked"],
    ["12:04:09", "pii.email", "2 fields", "redacted"],
    ["12:03:58", "policy.compliance", "SOC 2", "passed"],
    ["12:03:41", "jailbreak.attempt", "0.91", "blocked"],
  ];

  return (
    <FigureFrame
      label="Guardrail events"
      meta="streaming"
      footer={
        <>
          <span>0 bytes of raw PII left your VPC</span>
          <span>policy: pci-dss</span>
        </>
      }
    >
      <div>
        {events.map(([time, event, detail, action]) => (
          <div
            key={`${time}-${event}`}
            className="grid grid-cols-[3.6rem_minmax(0,1fr)_4rem_4.5rem] items-center gap-2 border-b border-rule px-4 py-3 last:border-b-0"
          >
            <span className="font-mono text-[8.5px] text-quiet">{time}</span>
            <span className="truncate font-mono text-[10px] text-graphite">
              {event}
            </span>
            <span className="text-right font-mono text-[8.5px] text-quiet">
              {detail}
            </span>
            <span
              className={`text-right font-mono text-[8px] uppercase tracking-[0.1em] ${
                action === "blocked"
                  ? "text-accent"
                  : action === "redacted"
                    ? "text-accent-deep"
                    : "text-quiet"
              }`}
            >
              {action}
            </span>
          </div>
        ))}
      </div>
    </FigureFrame>
  );
}

function CacheFigure() {
  const rows = [
    ["support.reply/v12", "74%"],
    ["billing.faq", "68%"],
    ["contract.summary", "31%"],
  ];

  return (
    <FigureFrame
      label="Cache / 24h TTL"
      meta="support namespace"
      footer={
        <>
          <span>TTL 24h · tenant scoped</span>
          <span>bypass on tools + temp &gt; 0</span>
        </>
      }
    >
      <div className="p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Label>Semantic hit rate</Label>
            <p className="mt-2 font-display text-[3.2rem] leading-none tracking-[-0.05em]">
              68<span className="text-accent">%</span>
            </p>
          </div>
          <span className="font-mono text-[9px] text-quiet">
            +11 pts vs last month
          </span>
        </div>

        <div className="mt-5 flex h-2 w-full">
          <div className="w-[42%] bg-graphite" />
          <div className="w-[26%] bg-accent" />
          <div className="flex-1 bg-rule" />
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[8px] uppercase tracking-[0.1em] text-quiet">
          <span>Exact 42</span>
          <span>Semantic 26</span>
          <span>Miss 32</span>
        </div>

        <div className="mt-5 border-t border-rule">
          {rows.map(([name, rate]) => (
            <div
              key={name}
              className="flex items-center justify-between gap-3 border-b border-rule py-2.5 last:border-b-0"
            >
              <span className="truncate font-mono text-[9.5px] text-graphite-soft">
                {name}
              </span>
              <span className="font-mono text-[10px] text-graphite">
                {rate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FigureFrame>
  );
}

function ObservabilityFigure() {
  const spend = [
    ["anthropic / sonnet", 46, "$1,842"],
    ["openai / gpt-5.2", 31, "$1,204"],
    ["google / gemini-3", 23, "$1,136"],
  ];

  return (
    <FigureFrame
      label="Usage / 30 days"
      meta="all tenants"
      footer={
        <>
          <span>p95 214 ms · 2.4M requests</span>
          <span>export: otel → warehouse</span>
        </>
      }
    >
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-3 border-b border-rule pb-4">
          {[
            ["Spend", "$4,182"],
            ["Requests", "2.4M"],
            ["Cache", "68%"],
            ["p95", "214ms"],
          ].map(([label, value]) => (
            <div key={label}>
              <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-quiet">
                {label}
              </span>
              <p className="mt-1 font-mono text-[11px] text-graphite">
                {value}
              </p>
            </div>
          ))}
        </div>

        <svg
          viewBox="0 0 400 100"
          className="mt-4 h-24 w-full"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[20, 50, 80].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="400"
              y2={y}
              stroke="var(--color-rule)"
              strokeWidth="0.8"
            />
          ))}
          <path
            d="M0 76 C24 72 40 60 62 62 C84 64 98 46 120 49 C142 52 156 34 178 38 C200 42 214 26 236 30 C258 34 272 50 294 44 C316 38 330 20 352 24 C372 27 386 14 400 12 L400 100 L0 100 Z"
            fill="var(--color-accent-wash)"
            opacity="0.55"
          />
          <path
            d="M0 76 C24 72 40 60 62 62 C84 64 98 46 120 49 C142 52 156 34 178 38 C200 42 214 26 236 30 C258 34 272 50 294 44 C316 38 330 20 352 24 C372 27 386 14 400 12"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        <div className="mt-4 space-y-2.5 border-t border-rule pt-4">
          {spend.map(([name, pct, amount]) => (
            <div key={name} className="flex items-center gap-3">
              <span className="w-32 shrink-0 truncate font-mono text-[8.5px] text-quiet">
                {name}
              </span>
              <span className="h-1 flex-1 bg-rule">
                <span
                  className="block h-full bg-graphite"
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="w-12 shrink-0 text-right font-mono text-[9px] text-graphite-soft">
                {amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FigureFrame>
  );
}

function AgentsFigure() {
  const steps = [
    ["plan.next_step", "reasoning", "220ms"],
    ["tool.search_web", "MCP", "840ms"],
    ["tool.snowflake.query", "MCP", "310ms"],
    ["model.verify", "sonnet-4.8", "1.2s"],
    ["respond", "stream", "90ms"],
  ];

  return (
    <FigureFrame
      label="Run / 7f3a9c"
      meta="completed"
      footer={
        <>
          <span>5 steps · 2 tools · 1 retry</span>
          <span className="text-graphite">cost $0.018</span>
        </>
      }
    >
      <div className="p-5">
        <div className="ml-1 border-l border-rule pl-5">
          {steps.map(([label, detail, time]) => (
            <div
              key={label}
              className="relative flex items-center justify-between gap-3 border-b border-rule py-3 last:border-b-0"
            >
              <span className="absolute -left-[23px] h-1.5 w-1.5 bg-accent" />
              <span className="min-w-0 font-mono text-[9.5px] text-graphite">
                <span className="block truncate">{label}</span>
                <span className="mt-0.5 block text-[8px] text-quiet">
                  {detail}
                </span>
              </span>
              <span className="shrink-0 font-mono text-[9px] text-quiet">
                {time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </FigureFrame>
  );
}

type Capability = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  body: string;
  points: string[];
  href: string;
  figure: ReactNode;
  reverse?: boolean;
};

const capabilities: Capability[] = [
  {
    id: "routing",
    index: "01",
    label: "Semantic routing",
    title: (
      <>
        Route by intent,{" "}
        <span className="ed-display-italic">not by guesswork.</span>
      </>
    ),
    body: "Model Gateway scores every eligible model against your declared policy: task fit, price ceiling, latency SLO, region, and context window. The winner gets the request. The rest stay warm as fallbacks.",
    points: [
      "Quality, cost, speed, and region constraints in one policy",
      "Per-tenant and per-customer routing rules",
      "Shadow traffic and canary rollouts built in",
    ],
    href: "/docs#routing",
    figure: <RoutingFigure />,
  },
  {
    id: "guardrails",
    index: "02",
    label: "Safety & governance",
    title: (
      <>
        Guardrails at the gate,{" "}
        <span className="ed-display-italic">not in every app.</span>
      </>
    ),
    body: "Redact PII before it leaves your network. Block prompt injection, jailbreaks, and unsafe tool calls. Apply compliance packs per tenant — and prove what happened with immutable audit logs.",
    points: [
      "PII, secrets, and custom entity redaction",
      "Prompt injection and jailbreak scoring",
      "Per-tenant policy packs and audit trails",
    ],
    href: "/docs#guardrails",
    figure: <GuardrailsFigure />,
    reverse: true,
  },
  {
    id: "caching",
    index: "03",
    label: "Semantic cache",
    title: (
      <>
        Pay once for the same question.{" "}
        <span className="ed-display-italic">Twice is a bug.</span>
      </>
    ),
    body: "Exact and semantic cache sit inside the gate, scoped by tenant and prompt version. A hit returns before any provider is called, and the response says so — so your app can reason about it.",
    points: [
      "Exact hash and embedding-similarity cache",
      "Tenant namespaces with a TTL you control",
      "Bypass on tools, images, or high temperature",
    ],
    href: "/docs#caching",
    figure: <CacheFigure />,
  },
  {
    id: "observability",
    index: "04",
    label: "Observability",
    title: (
      <>
        Every token, dollar, and decision{" "}
        <span className="ed-display-italic">traced.</span>
      </>
    ),
    body: "See requests, completions, tool calls, cache hits, and cost in real time. Slice by team, customer, model, or policy — then stream the raw spans to Datadog, Snowflake, or S3.",
    points: [
      "OpenTelemetry-native traces and metrics",
      "Token-level cost attribution and chargeback",
      "Replay production traces against new models",
    ],
    href: "/docs#observability",
    figure: <ObservabilityFigure />,
    reverse: true,
  },
  {
    id: "agents",
    index: "05",
    label: "Agent infrastructure",
    title: (
      <>
        Govern agents like{" "}
        <span className="ed-display-italic">any other workload.</span>
      </>
    ),
    body: "Route MCP tool calls, persist memory, enforce step and spend budgets, and replay any run. Your agents get a control plane instead of a pile of glue code.",
    points: [
      "MCP tool registry with scoped permissions",
      "Step budgets, loop detection, and retries",
      "Full run replay with tool-level traces",
    ],
    href: "/docs#sdks",
    figure: <AgentsFigure />,
  },
];

const catalog = [
  ["OpenAI", "gpt-5.2", "400K", "$2.50"],
  ["OpenAI", "gpt-5.2-mini", "200K", "$0.40"],
  ["OpenAI", "o4", "200K", "$6.00"],
  ["Anthropic", "claude-opus-4.6", "500K", "$15.00"],
  ["Anthropic", "claude-sonnet-4.8", "300K", "$3.00"],
  ["Anthropic", "claude-haiku-4.5", "200K", "$0.80"],
  ["Google", "gemini-3-pro", "1M", "$1.25"],
  ["Google", "gemini-3-flash", "1M", "$0.15"],
  ["Meta", "llama-4.1-405b", "128K", "$2.20"],
  ["Mistral", "large-3", "128K", "$1.80"],
  ["DeepSeek", "v4.1", "256K", "$0.28"],
  ["Private", "acme/llama-70b", "128K", "$0.20"],
];

const integrations = [
  "AWS Bedrock",
  "Azure OpenAI",
  "Google Vertex",
  "Snowflake",
  "Datadog",
  "Grafana",
  "Okta",
  "HashiCorp Vault",
  "GitHub",
  "OIDC / SAML",
  "Kubernetes",
  "Cloudflare",
];

const platformFaqs = [
  {
    q: "Is Model Gateway a proxy, or something I install?",
    a: "Both. The managed gateway runs on our edge. Enterprise customers can deploy the same control plane inside their VPC, on-prem, or fully air-gapped. It sits in the request path and adds roughly 12 ms median overhead.",
  },
  {
    q: "Do I have to change my application code?",
    a: "No. Model Gateway is OpenAI-compatible: keep your SDK, swap the base URL, and set model to auto — or pin a specific model. Streaming, tool calls, embeddings, and vision inputs work unchanged.",
  },
  {
    q: "Which providers and models are supported?",
    a: "120+ models across OpenAI, Anthropic, Google Vertex, Azure OpenAI, AWS Bedrock, Meta, Mistral, Cohere, DeepSeek, and self-hosted vLLM or Ollama. Bring your own keys or use NCS-provisioned capacity.",
  },
  {
    q: "Where does my data go?",
    a: "Nowhere you don't choose. Zero data retention is the default, PII can be redacted before egress, and logs stay in your region. BYOK, customer-managed HSM keys, and private networking are available.",
  },
  {
    q: "How fast is failover, really?",
    a: "Median reroute is 31 ms. Model Gateway watches provider health, rate-limit headers, and error rates per region, then retries, hedges, or fails over to your fallback list.",
  },
  {
    q: "Can I run evaluations and A/B tests?",
    a: "Yes. Split traffic by percentage, user segment, or prompt hash. Replay production traces against a new model, score them with built-in or custom evaluators, and promote the winner with a policy change in Git.",
  },
];

export default function Platform() {
  return (
    <SiteShell variant="editorial">
      <PageHero
        index="01"
        label="Platform"
        meta="Control plane / 2026"
        title={
          <>
            The control plane for{" "}
            <span className="ed-display-italic">production AI.</span>
          </>
        }
        intro="One endpoint in front of every model. Routing, safety, caching, cost control, and observability — governed by policies your team can review, version, and roll back."
        actions={
          <>
            <EdButton to="/docs#quickstart">Start building free</EdButton>
            <EdButton to="/contact" variant="ghost">
              Book a demo
            </EdButton>
          </>
        }
      >
        <SpecStrip items={specs} />
      </PageHero>

      <PageSection>
        <SectionHeader
          index="02"
          label="Capabilities"
          title={
            <>
              Five layers of control.{" "}
              <span className="ed-display-italic">One request path.</span>
            </>
          }
          intro="Each layer is independent, policy-driven, and observable. Turn on what you need today; the rest is one config change away."
        />

        <div className="mt-10">
          {capabilities.map((capability) => (
            <article
              key={capability.id}
              id={capability.id}
              className="grid gap-8 border-t border-rule py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-8 lg:py-14"
            >
              <div
                className={`min-w-0 lg:col-span-5 ${
                  capability.reverse ? "lg:order-2" : ""
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] text-accent">
                    {capability.index}
                  </span>
                  <Label>{capability.label}</Label>
                </div>
                <h3 className="ed-display mt-4 text-[clamp(1.9rem,2.8vw,2.7rem)] leading-[1.02] tracking-[-0.035em]">
                  {capability.title}
                </h3>
                <p className="ed-body mt-4 max-w-lg text-[15px]">
                  {capability.body}
                </p>
                <ul className="mt-5 border-t border-rule">
                  {capability.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-baseline gap-3 border-b border-rule py-2.5"
                    >
                      <span className="font-mono text-[9px] text-accent">
                        +
                      </span>
                      <span className="ed-small text-graphite-soft">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <TextLink to={capability.href}>Read the docs</TextLink>
                </div>
              </div>

              <div
                className={`min-w-0 lg:col-span-7 ${
                  capability.reverse ? "lg:order-1" : ""
                }`}
              >
                {capability.figure}
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="models">
        <SectionHeader
          index="03"
          label="Model index"
          title={
            <>
              The frontier, the open weights, and{" "}
              <span className="ed-display-italic">your private cluster.</span>
            </>
          }
          intro="One schema, one billing line, one set of policies. New models are added weekly — no integration work on your side."
        />

        <div className="mt-10 flex justify-end sm:hidden">
          <Label>Scroll →</Label>
        </div>
        <div className="mt-2 overflow-x-auto sm:mt-10">
          <table className="ed-table min-w-[720px]">
            <thead>
              <tr>
                <th className="w-[18%]">Provider</th>
                <th className="w-[34%]">Model</th>
                <th className="w-[18%]">Context</th>
                <th className="w-[18%]">Input / 1M</th>
                <th className="w-[12%]">Access</th>
              </tr>
            </thead>
            <tbody>
              {catalog.map(([provider, model, context, input]) => (
                <tr
                  key={`${provider}-${model}`}
                  className="hover:bg-paper-deep/40"
                >
                  <td className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-quiet">
                    {provider}
                  </td>
                  <td className="font-mono text-[11px] text-graphite">
                    {model}
                  </td>
                  <td className="font-mono text-[10.5px] text-graphite-soft">
                    {context}
                  </td>
                  <td className="font-mono text-[10.5px] text-graphite-soft">
                    {input}
                  </td>
                  <td className="font-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                    {provider === "Private" ? "VPC" : "GA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <Label>
            +108 more models across Bedrock, Vertex, Azure, Together
          </Label>
          <TextLink to="/contact">Request a model</TextLink>
        </div>
      </PageSection>

      <PageSection>
        <SectionHeader
          index="04"
          label="Fits your stack"
          title={
            <>
              No rip <span className="ed-display-italic">and replace.</span>
            </>
          }
          intro="Model Gateway slots into the identity, observability, and data tools your platform team already trusts."
        />

        <div className="mt-10 grid grid-cols-2 border-l border-t border-rule sm:grid-cols-3 lg:grid-cols-4">
          {integrations.map((name, index) => (
            <div
              key={name}
              className="flex items-baseline gap-2 border-b border-r border-rule px-3 py-4"
            >
              <span className="font-mono text-[8px] text-quiet">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="ed-small text-graphite-soft">{name}</span>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
          {[
            [
              "12 ms overhead",
              "Median gateway latency across 38 edge regions, measured at p50.",
            ],
            [
              "Zero retention",
              "Prompts and completions are never stored by default. Opt in per tenant.",
            ],
            [
              "GitOps policies",
              "Review, version, and roll back routing changes like any other code.",
            ],
          ].map(([title, body]) => (
            <div key={title}>
              <p className="font-display text-[1.35rem] leading-tight tracking-[-0.025em]">
                {title}
              </p>
              <p className="ed-small mt-2 text-graphite-soft">{body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <FaqBlock
        index="05"
        label="Platform questions"
        title={
          <>
            The details CTOs and on-call engineers{" "}
            <span className="ed-display-italic">ask first.</span>
          </>
        }
        intro="Security reviews, failover behavior, model coverage, and what changes in your application."
        items={platformFaqs}
      />

      <FinalCta />
    </SiteShell>
  );
}
