import { Check } from "lucide-react";
import type { ReactNode } from "react";
import {
  type CodeSample,
  EditorialCode,
} from "../components/editorial/code-block";
import { PageHero } from "../components/editorial/page";
import {
  EdButton,
  Label,
  TextLink,
  Wrap,
} from "../components/editorial/primitives";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/docs";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Documentation — Portico" },
    {
      name: "description",
      content:
        "Quickstart, routing policies, guardrails, caching, observability, and API reference for the Portico model gateway.",
    },
  ];
}

const navGroups = [
  {
    title: "Getting started",
    links: [
      { id: "quickstart", label: "Quickstart", index: "02" },
      { id: "authentication", label: "Authentication", index: "03" },
    ],
  },
  {
    title: "Core concepts",
    links: [
      { id: "routing", label: "Routing policies", index: "04" },
      { id: "caching", label: "Semantic cache", index: "05" },
      { id: "guardrails", label: "Guardrails", index: "06" },
      { id: "observability", label: "Observability", index: "07" },
    ],
  },
  {
    title: "Reference",
    links: [
      { id: "sdks", label: "SDKs & libraries", index: "08" },
      { id: "api", label: "API reference", index: "09" },
      { id: "errors", label: "Errors", index: "10" },
    ],
  },
];

const installTabs: CodeSample[] = [
  {
    label: "pnpm",
    filename: "terminal",
    code: `pnpm add openai
# already installed? change the base URL and you're done`,
  },
  {
    label: "npm",
    filename: "terminal",
    code: `npm install openai
# already installed? change the base URL and you're done`,
  },
  {
    label: "Python",
    filename: "terminal",
    code: `pip install openai
# already installed? change the base URL and you're done`,
  },
];

const firstRequestTabs: CodeSample[] = [
  {
    label: "TypeScript",
    filename: "first-request.ts",
    code: `import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://api.portico.dev/v1",
  apiKey: process.env.PORTICO_API_KEY,
});

const res = await client.chat.completions.create({
  model: "auto",
  messages: [{ role: "user", content: "Explain semantic caching" }],
});

console.log(res.choices[0].message.content);`,
  },
  {
    label: "Python",
    filename: "first_request.py",
    code: `import os
from openai import OpenAI

client = OpenAI(
    base_url="https://api.portico.dev/v1",
    api_key=os.environ["PORTICO_API_KEY"],
)

res = client.chat.completions.create(
    model="auto",
    messages=[{"role": "user", "content": "Explain semantic caching"}],
)

print(res.choices[0].message.content)`,
  },
  {
    label: "cURL",
    filename: "request.sh",
    code: `curl https://api.portico.dev/v1/chat/completions \\
  -H "Authorization: Bearer $PORTICO_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "auto",
    "messages": [
      { "role": "user", "content": "Explain semantic caching" }
    ]
  }'`,
  },
];

const headersSample: CodeSample[] = [
  {
    label: "headers",
    filename: "headers",
    code: `Authorization: Bearer pk_live_9f2c4a7e21d8
X-Portico-Tenant: acme-prod
X-Portico-Policy: support-replies
X-Portico-Trace: 01J9Z4K7Q2`,
  },
];

const envSample: CodeSample[] = [
  {
    label: ".env",
    filename: ".env",
    code: `PORTICO_API_KEY=pk_live_9f2c4a7e21d8`,
  },
];

const policySample: CodeSample[] = [
  {
    label: "yaml",
    filename: "policies/support.yaml",
    code: `intent: support.reply
policy: balanced
max_cost_per_1k: 0.004
region: us-east
primary: anthropic/claude-sonnet-4.8
fallback:
  - openai/gpt-5.2-mini
  - google/gemini-3-flash
guardrails: [pii, prompt-injection]
cache:
  semantic: true
  ttl: 24h`,
  },
];

const cacheSample: CodeSample[] = [
  {
    label: "TypeScript",
    filename: "cache.ts",
    code: `const res = await client.chat.completions.create({
  model: "auto",
  messages,
  portico: {
    cache: {
      semantic: true,     // embedding similarity
      threshold: 0.94,    // 0-1
      ttl: "24h",
      namespace: "support",
    },
  },
});

// Cache status is always exposed on the response:
// X-Portico-Cache: HIT | MISS | BYPASS`,
  },
];

const guardrailSample: CodeSample[] = [
  {
    label: "yaml",
    filename: "policies/guardrails.yaml",
    code: `guardrails:
  pii:
    action: redact
    entities: [email, phone, credit_card, iban]
  prompt-injection:
    action: block
    threshold: 0.85
  secrets:
    action: block
  custom:
    - name: no-medical-advice
      action: block
      pattern: "diagnos(e|is)|prescrib(e|tion)"`,
  },
];

const otelSample: CodeSample[] = [
  {
    label: "env",
    filename: "otel.env",
    code: `PORTICO_OTEL_EXPORTER=otlp
PORTICO_OTEL_ENDPOINT=https://otlp.datadoghq.com:4317
PORTICO_OTEL_HEADERS=dd-api-key=***
PORTICO_TRACE_SAMPLE_RATE=0.25`,
  },
];

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="border border-rule bg-paper-deep/60 px-1.5 py-0.5 font-mono text-[0.92em] text-graphite">
      {children}
    </code>
  );
}

function Callout({
  tone = "accent",
  children,
}: {
  tone?: "accent" | "neutral";
  children: ReactNode;
}) {
  const styles =
    tone === "accent"
      ? "border-accent bg-accent-wash/40"
      : "border-rule bg-paper-deep/40";
  return (
    <div
      className={`border-l-2 px-4 py-3 text-[12.5px] leading-relaxed text-graphite-soft ${styles}`}
    >
      {children}
    </div>
  );
}

function DocSection({
  id,
  index,
  eyebrow,
  title,
  children,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t border-rule py-10 first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[9px] text-accent">{index}</span>
        <Label>{eyebrow}</Label>
      </div>
      <h2 className="ed-display mt-3 text-[clamp(1.7rem,2.4vw,2.2rem)] leading-[1.05] tracking-[-0.03em]">
        {title}
      </h2>
      <div className="mt-4 space-y-5 text-[14px] leading-relaxed text-graphite-soft">
        {children}
      </div>
    </section>
  );
}

function Subhead({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-quiet">
      {children}
    </h3>
  );
}

function ScrollHint() {
  return (
    <p className="mb-2 text-right font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet sm:hidden">
      Scroll →
    </p>
  );
}

export default function Docs() {
  return (
    <SiteShell variant="editorial">
      <PageHero
        index="01"
        label="Documentation"
        meta="v3.0 / API stable"
        title={
          <>
            Build on Portico{" "}
            <span className="ed-display-italic">in minutes.</span>
          </>
        }
        intro="Everything you need to route your first request, write a policy, and ship to production. If you already use the OpenAI SDK, you are one URL away."
        actions={
          <>
            <EdButton href="#quickstart">Jump to quickstart</EdButton>
            <EdButton to="/contact" variant="ghost">
              Talk to an engineer
            </EdButton>
          </>
        }
      >
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-rule py-4">
          {[
            "v3.0 · API stable",
            "OpenAI-compatible",
            "OpenTelemetry-native",
            "OpenAPI 3.1",
          ].map((item, index) => (
            <span key={item} className="flex items-center gap-2">
              <span
                className={`h-1 w-1 ${index === 0 ? "bg-accent" : "bg-rule"}`}
                aria-hidden="true"
              />
              <Label>{item}</Label>
            </span>
          ))}
        </div>
      </PageHero>

      <section className="border-t border-rule py-12 lg:py-16">
        <Wrap wide>
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
              <nav aria-label="Docs navigation">
                {navGroups.map((group) => (
                  <div key={group.title} className="mb-6">
                    <Label>{group.title}</Label>
                    <div className="mt-2 border-t border-rule">
                      {group.links.map(({ id, label, index }) => (
                        <a
                          key={id}
                          href={`#${id}`}
                          className="group flex items-baseline justify-between gap-3 border-b border-rule py-2 text-[12px] text-graphite-soft transition-colors hover:text-accent"
                        >
                          <span>{label}</span>
                          <span className="font-mono text-[8.5px] text-quiet transition-colors group-hover:text-accent">
                            {index}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              <div className="border border-rule bg-paper-deep/30 p-4">
                <Label>Need a hand?</Label>
                <p className="mt-2 text-[11.5px] leading-relaxed text-quiet">
                  Join the community or talk to an engineer.
                </p>
                <div className="mt-3">
                  <TextLink to="/contact" className="text-[12px]">
                    Contact support
                  </TextLink>
                </div>
              </div>
            </aside>

            <div className="min-w-0 max-w-3xl">
              <nav
                aria-label="Docs sections"
                className="mb-8 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:hidden"
              >
                {navGroups.flatMap((group) =>
                  group.links.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className="shrink-0 border border-rule px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-graphite-soft transition-colors hover:border-graphite hover:text-graphite"
                    >
                      {label}
                    </a>
                  )),
                )}
              </nav>

              <DocSection
                id="quickstart"
                index="02"
                eyebrow="Getting started"
                title="Your first routed request"
              >
                <p>
                  Portico is a drop-in replacement for the OpenAI API. Install
                  the SDK if you have not already, set your key, and point the
                  client at the gateway. No new package, no rewrite.
                </p>

                <div>
                  <Subhead>1. Install (or keep) your SDK</Subhead>
                  <EditorialCode tabs={installTabs} compact className="mt-2" />
                </div>

                <div>
                  <Subhead>2. Set your API key</Subhead>
                  <EditorialCode tabs={envSample} compact className="mt-2" />
                  <p className="mt-2 text-[11.5px] text-quiet">
                    Create keys per environment and per team. Keys are scoped to
                    a tenant and can be rotated without a deploy.
                  </p>
                </div>

                <div>
                  <Subhead>3. Send a request</Subhead>
                  <EditorialCode tabs={firstRequestTabs} className="mt-2" />
                </div>

                <Callout>
                  <strong className="font-medium text-graphite">
                    That&apos;s it.
                  </strong>{" "}
                  The response is a standard OpenAI completion. Routing,
                  caching, and safety already ran.
                </Callout>
              </DocSection>

              <DocSection
                id="authentication"
                index="03"
                eyebrow="Getting started"
                title="Authentication & virtual keys"
              >
                <p>
                  Every request is authenticated with a bearer key. Use{" "}
                  <InlineCode>pk_live_</InlineCode> keys in production and{" "}
                  <InlineCode>pk_test_</InlineCode> keys in development. Keys
                  inherit a tenant, a default policy, and a set of scopes.
                </p>

                <EditorialCode tabs={headersSample} compact />

                <ul className="grid gap-2">
                  {[
                    "Virtual keys per team, app, or customer with hard budgets.",
                    "Scopes for chat, embeddings, tools, and admin endpoints.",
                    "Automatic rotation with overlapping validity windows.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </DocSection>

              <DocSection
                id="routing"
                index="04"
                eyebrow="Core concepts"
                title="Routing policies"
              >
                <p>
                  Set <InlineCode>model: &quot;auto&quot;</InlineCode> and
                  Portico chooses per request. A policy declares the
                  optimization goal, eligible providers, cost ceiling,
                  fallbacks, and region. Policies are YAML, versioned in Git,
                  and hot-reloaded.
                </p>

                <EditorialCode tabs={policySample} />

                <ScrollHint />
                <div className="overflow-x-auto">
                  <table className="ed-table min-w-[460px]">
                    <thead>
                      <tr>
                        <th>Field</th>
                        <th>Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "policy",
                          "balanced · cost · latency · quality · custom",
                        ],
                        ["max_cost_per_1k", "USD ceiling per 1K tokens"],
                        ["fallback", "Ordered list of models or providers"],
                        ["region", "us-east · eu-west · ap-southeast · any"],
                        ["pin", "Force a model for a tenant or percentage"],
                      ].map(([field, value]) => (
                        <tr key={field}>
                          <td className="font-mono text-[10px] text-graphite">
                            {field}
                          </td>
                          <td className="text-[11.5px] text-graphite-soft">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Callout tone="neutral">
                  Need a one-off override? Send{" "}
                  <InlineCode>X-Portico-Policy</InlineCode> or set{" "}
                  <InlineCode>model</InlineCode> to a concrete model ID. The
                  gateway records the override in the trace.
                </Callout>
              </DocSection>

              <DocSection
                id="caching"
                index="05"
                eyebrow="Core concepts"
                title="Semantic & exact cache"
              >
                <p>
                  Cache repeats by exact prompt hash or by embedding similarity.
                  The gateway returns a hit before calling any provider, and
                  marks the response so your app can react.
                </p>

                <EditorialCode tabs={cacheSample} />

                <p>
                  Namespaces isolate tenants and prompt versions. Bypass the
                  cache with <InlineCode>cache: false</InlineCode> or when the
                  request includes tools, images, or a temperature above 0.
                </p>
              </DocSection>

              <DocSection
                id="guardrails"
                index="06"
                eyebrow="Core concepts"
                title="Guardrails & compliance"
              >
                <p>
                  Guardrails run before egress and on the response. Attach a
                  built-in pack or write custom rules in Rego. Blocked requests
                  never reach a provider.
                </p>

                <EditorialCode tabs={guardrailSample} />

                <Callout tone="neutral">
                  A blocked request returns{" "}
                  <InlineCode>400 guardrail_blocked</InlineCode> with the rule
                  name and a trace ID. It is still counted in policy analytics,
                  never in provider spend.
                </Callout>
              </DocSection>

              <DocSection
                id="observability"
                index="07"
                eyebrow="Core concepts"
                title="Traces, cost, and exports"
              >
                <p>
                  Every request emits an OpenTelemetry span with model,
                  provider, token counts, cost, cache status, guardrail
                  decisions, and the policy version. Export via OTLP or read it
                  in the console.
                </p>

                <EditorialCode tabs={otelSample} />

                <div className="grid gap-px border border-rule bg-rule sm:grid-cols-3">
                  {[
                    ["Traces", "Spans for every hop, tool, and retry."],
                    ["Cost", "Attribution by tenant, team, and customer."],
                    ["Evals", "Replay traces against candidate models."],
                  ].map(([title, body]) => (
                    <div key={title} className="bg-paper p-3.5">
                      <p className="text-[12px] font-medium text-graphite">
                        {title}
                      </p>
                      <p className="mt-1 text-[10.5px] leading-relaxed text-quiet">
                        {body}
                      </p>
                    </div>
                  ))}
                </div>
              </DocSection>

              <DocSection
                id="sdks"
                index="08"
                eyebrow="Reference"
                title="SDKs & libraries"
              >
                <p>
                  Use the OpenAI SDK you already have. For gateway-specific
                  features, the native SDKs expose typed policies, budgets, and
                  trace helpers.
                </p>

                <div className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
                  {[
                    ["TypeScript", "portico", "npm · 14kb tree-shaken"],
                    ["Python", "portico", "pip · async + sync"],
                    ["Go", "github.com/portico/portico-go", "go get"],
                    ["Java", "dev.portico:client", "Maven · GraalVM ready"],
                  ].map(([name, pkg, detail]) => (
                    <div key={name} className="bg-paper p-4">
                      <p className="text-[12px] font-medium text-graphite">
                        {name}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-accent-deep">
                        {pkg}
                      </p>
                      <p className="mt-1.5 text-[10px] text-quiet">{detail}</p>
                    </div>
                  ))}
                </div>
              </DocSection>

              <DocSection
                id="api"
                index="09"
                eyebrow="Reference"
                title="API reference"
              >
                <p>
                  Base URL <InlineCode>https://api.portico.dev/v1</InlineCode>.
                  OpenAI-compatible endpoints plus gateway control endpoints.
                </p>

                <ScrollHint />
                <div className="overflow-x-auto">
                  <table className="ed-table min-w-[560px]">
                    <thead>
                      <tr>
                        <th>Method</th>
                        <th>Path</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "POST",
                          "/chat/completions",
                          "Chat, tools, vision, streaming",
                        ],
                        ["POST", "/embeddings", "Embeddings with cache"],
                        ["GET", "/models", "Catalog, pricing, availability"],
                        [
                          "POST",
                          "/portico/route",
                          "Preview a routing decision",
                        ],
                        [
                          "GET",
                          "/portico/usage",
                          "Usage and cost by dimension",
                        ],
                        [
                          "GET",
                          "/portico/traces/:id",
                          "Inspect a single trace",
                        ],
                      ].map(([method, path, purpose]) => (
                        <tr key={path}>
                          <td>
                            <span
                              className={`font-mono text-[9px] font-medium uppercase tracking-[0.08em] ${
                                method === "GET"
                                  ? "text-accent-deep"
                                  : "text-accent"
                              }`}
                            >
                              {method}
                            </span>
                          </td>
                          <td className="font-mono text-[10.5px] text-graphite">
                            {path}
                          </td>
                          <td className="text-[11.5px] text-graphite-soft">
                            {purpose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DocSection>

              <DocSection
                id="errors"
                index="10"
                eyebrow="Reference"
                title="Errors & retries"
              >
                <p>
                  Errors follow the OpenAI shape:{" "}
                  <InlineCode>
                    {"{ error: { type, code, message, trace_id } }"}
                  </InlineCode>
                  . Retryable failures are handled by the gateway before they
                  reach your app.
                </p>

                <ScrollHint />
                <div className="overflow-x-auto">
                  <table className="ed-table min-w-[460px]">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Meaning</th>
                        <th>Retry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["401 invalid_api_key", "Missing or revoked key", "No"],
                        [
                          "402 budget_exceeded",
                          "Tenant budget exhausted",
                          "No",
                        ],
                        [
                          "429 rate_limited",
                          "Tenant or provider limit",
                          "Gateway",
                        ],
                        [
                          "400 guardrail_blocked",
                          "Policy blocked the request",
                          "No",
                        ],
                        ["502 provider_error", "All fallbacks failed", "Yes"],
                        [
                          "504 gateway_timeout",
                          "Request exceeded deadline",
                          "Yes",
                        ],
                      ].map(([code, meaning, retry]) => (
                        <tr key={code}>
                          <td className="font-mono text-[10px] text-accent-deep">
                            {code}
                          </td>
                          <td className="text-[11.5px] text-graphite-soft">
                            {meaning}
                          </td>
                          <td className="font-mono text-[10px] text-quiet">
                            {retry}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DocSection>

              <div className="mt-10 flex flex-col items-start justify-between gap-4 border border-rule bg-paper-deep/30 p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[13px] font-medium text-graphite">
                    Ready to route production traffic?
                  </p>
                  <p className="mt-1 text-[11.5px] text-quiet">
                    Create a free workspace and get 1M tokens.
                  </p>
                </div>
                <EdButton to="/contact">Start free</EdButton>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </SiteShell>
  );
}
