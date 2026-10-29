import {
  ArrowRight,
  BarChart3,
  Braces,
  Check,
  Cloud,
  Coins,
  Database,
  Globe,
  Route,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import { Container, SectionHeading } from "../site/section";
import { btnGhost, btnSmall, eyebrow } from "../site/ui";
import { Reveal } from "./reveal";
import { SpotlightCard } from "./spotlight-card";

const tintMap = {
  violet: "border-violet-400/20 bg-violet-500/10 text-violet-300",
  cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
  acid: "border-lime-400/20 bg-lime-400/10 text-lime-300",
  amber: "border-amber-400/20 bg-amber-500/10 text-amber-300",
} as const;

function FeatureCard({
  icon: Icon,
  title,
  body,
  tint = "violet",
  className = "",
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  tint?: keyof typeof tintMap;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <SpotlightCard className={`flex flex-col p-6 sm:p-7 ${className}`}>
      <span
        className={`mb-5 grid h-9 w-9 place-items-center rounded-xl border ${tintMap[tint]}`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-white">
        {title}
      </h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
        {body}
      </p>
      {children}
    </SpotlightCard>
  );
}

const modelScores = [
  { name: "claude-sonnet-4.8", score: 94, cost: "$3.00", routed: true },
  { name: "gpt-5.2", score: 91, cost: "$2.50", routed: false },
  { name: "gemini-3-flash", score: 78, cost: "$0.15", routed: false },
];

const tools = [
  { label: "search_web", calls: "12.4k", ok: true },
  { label: "query_snowflake", calls: "8.1k", ok: true },
  { label: "send_email", calls: "3.2k", ok: false },
];

export function FeaturesBento() {
  return (
    <section id="platform" className="relative py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-24 h-[32rem] w-[48rem] -translate-x-1/2 rounded-full bg-violet-700/[0.07] blur-[120px]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="The control plane"
            title={
              <>
                Everything between your app and{" "}
                <span className="text-gradient-static">every model</span>.
              </>
            }
            description="Model Gateway replaces a pile of SDK wrappers, retry logic, prompt logs, and spreadsheets with one policy-driven gateway built for production."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <FeatureCard
              icon={Route}
              title="Semantic routing that thinks in intent"
              body="Describe the request, not the model. Model Gateway scores every provider on intent fit, cost, latency, and region — then routes to the winner in under 15ms."
              className="h-full"
            >
              <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#060810]/80 p-3.5">
                <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px]">
                  <span className="rounded bg-violet-500/15 px-1.5 py-0.5 text-violet-300">
                    policy: balanced
                  </span>
                  <span className="text-slate-500">intent: billing.refund</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-acid">
                    <Zap className="h-3 w-3" /> 12ms
                  </span>
                </div>
                <div className="space-y-2">
                  {modelScores.map((model) => (
                    <div
                      key={model.name}
                      className={`flex items-center gap-3 rounded-lg border px-2.5 py-2 ${
                        model.routed
                          ? "border-acid/20 bg-acid/[0.06]"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          model.routed ? "bg-acid" : "bg-slate-700"
                        }`}
                      />
                      <span className="w-[8.5rem] shrink-0 truncate font-mono text-[10.5px] text-slate-300">
                        {model.name}
                      </span>
                      <span className="hidden h-1 flex-1 overflow-hidden rounded-full bg-white/[0.05] sm:block">
                        <span
                          className={`block h-full rounded-full ${
                            model.routed
                              ? "bg-gradient-to-r from-violet-400 to-acid"
                              : "bg-white/20"
                          }`}
                          style={{ width: `${model.score}%` }}
                        />
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-slate-500">
                        {model.score} · {model.cost}
                      </span>
                      {model.routed && (
                        <span className="font-mono text-[9px] uppercase tracking-wider text-acid">
                          routed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={60}>
            <FeatureCard
              icon={Braces}
              title="One API. Any model."
              body="Drop-in OpenAI compatibility. Change one string to move from GPT to Claude to your private vLLM cluster."
              tint="cyan"
              className="h-full"
            >
              <div className="mt-6 overflow-hidden rounded-xl border border-white/[0.07] bg-[#060810]/80">
                <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                  <span className="ml-1 font-mono text-[9px] text-slate-600">
                    client.ts
                  </span>
                </div>
                <pre className="overflow-x-auto p-3 font-mono text-[10px] leading-relaxed text-slate-400">
                  <code>
                    <span className="text-violet-300">const</span> client ={" "}
                    <span className="text-violet-300">new</span>{" "}
                    <span className="text-sky-300">OpenAI</span> {"{"}
                    {"\n  "}baseURL:{" "}
                    <span className="text-emerald-300">
                      &quot;https://api.ncs.dev/v1&quot;
                    </span>
                    ,{"\n  "}model:{" "}
                    <span className="text-emerald-300">&quot;auto&quot;</span>
                    {"\n"}
                    {"}"});
                  </code>
                </pre>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {["OpenAI", "Anthropic", "Gemini", "Llama", "Mistral"].map(
                  (provider) => (
                    <span
                      key={provider}
                      className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[10px] text-slate-400"
                    >
                      {provider}
                    </span>
                  ),
                )}
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={40}>
            <FeatureCard
              icon={Zap}
              title="Failover you never notice"
              body="Rate limits, 5xx storms, regional outages. Model Gateway retries, reroutes, and hedges requests in under 50ms."
              tint="amber"
              className="h-full"
            >
              <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#060810]/80 p-3.5">
                <div className="flex items-center justify-between gap-2 text-[10px]">
                  <div className="rounded-lg border border-rose-400/20 bg-rose-500/[0.07] px-2 py-1.5">
                    <p className="font-mono text-slate-300">anthropic</p>
                    <p className="mt-0.5 font-mono text-[9px] text-rose-300">
                      429 · degraded
                    </p>
                  </div>
                  <ArrowRight className="h-3 w-3 shrink-0 text-slate-600" />
                  <div className="rounded-lg border border-acid/20 bg-acid/[0.06] px-2 py-1.5">
                    <p className="font-mono text-slate-300">openai</p>
                    <p className="mt-0.5 font-mono text-[9px] text-acid">
                      200 · 31ms
                    </p>
                  </div>
                </div>
                <p className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Check className="h-3 w-3 text-acid" />0 dropped requests this
                  month
                </p>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={80}>
            <FeatureCard
              icon={Database}
              title="Semantic cache"
              body="Exact and embedding-based caching returns repeat answers instantly — without serving stale context."
              tint="cyan"
              className="h-full"
            >
              <div className="mt-6 flex items-center gap-4 rounded-xl border border-white/[0.07] bg-[#060810]/80 p-3.5">
                <div
                  className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full"
                  style={{
                    background:
                      "conic-gradient(#a3e635 0deg 244deg, rgba(255,255,255,0.06) 244deg 360deg)",
                  }}
                >
                  <div className="grid h-[62px] w-[62px] place-items-center rounded-full bg-[#060810]">
                    <span className="text-sm font-semibold text-white">
                      68%
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 text-[10px]">
                  <p className="text-slate-400">
                    hit rate <span className="text-acid">↑ 14%</span>
                  </p>
                  <p className="text-slate-500">avg. saved 612ms</p>
                  <p className="font-mono text-slate-400">$412k saved / qtr</p>
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={120}>
            <FeatureCard
              icon={ShieldCheck}
              title="Guardrails, enforced"
              body="PII redaction, prompt-injection detection, jailbreak scoring, and custom policies — at the gateway, not in every app."
              tint="violet"
              className="h-full"
            >
              <div className="mt-6 space-y-1.5">
                {[
                  ["PII redacted", "2 fields"],
                  ["Prompt injection", "blocked"],
                  ["Policy pack", "SOC 2"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#060810]/70 px-2.5 py-1.5 text-[10px]"
                  >
                    <span className="inline-flex items-center gap-1.5 text-slate-400">
                      <Check className="h-3 w-3 text-acid" />
                      {label}
                    </span>
                    <span className="font-mono text-slate-500">{value}</span>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal className="lg:col-span-2">
            <FeatureCard
              icon={BarChart3}
              title="Observability down to the token"
              body="Every request, prompt, completion, tool call, and dollar — traced, searchable, and exportable to your warehouse."
              className="h-full"
            >
              <div className="mt-6 rounded-xl border border-white/[0.07] bg-[#060810]/80 p-4">
                <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px]">
                  <span className="text-slate-500">
                    Requests{" "}
                    <span className="ml-1 text-sm text-white">2.4M</span>
                  </span>
                  <span className="text-slate-500">
                    Spend{" "}
                    <span className="ml-1 text-sm text-white">$4,182</span>
                  </span>
                  <span className="text-slate-500">
                    p95 <span className="ml-1 text-sm text-white">214ms</span>
                  </span>
                  <span className="ml-auto inline-flex items-center gap-1 text-acid">
                    <span className="h-1.5 w-1.5 rounded-full bg-acid" /> live
                  </span>
                </div>
                <svg
                  viewBox="0 0 420 110"
                  className="h-24 w-full"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="obsFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#8b5cf6"
                        stopOpacity="0.35"
                      />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[18, 45, 72, 99].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="420"
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}
                  <path
                    d="M0 88 C30 84 48 70 72 72 C96 74 108 52 132 55 C156 58 168 40 192 44 C216 48 228 30 252 34 C276 38 288 58 312 52 C336 46 350 24 374 28 C392 31 404 18 420 16 L420 110 L0 110 Z"
                    fill="url(#obsFill)"
                  />
                  <path
                    d="M0 88 C30 84 48 70 72 72 C96 74 108 52 132 55 C156 58 168 40 192 44 C216 48 228 30 252 34 C276 38 288 58 312 52 C336 46 350 24 374 28 C392 31 404 18 420 16"
                    fill="none"
                    stroke="#a78bfa"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 96 C34 92 52 88 80 90 C108 92 124 80 152 82 C180 84 200 70 228 74 C256 78 276 66 304 68 C332 70 352 54 380 58 C398 60 410 52 420 50"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.4"
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
                <div className="mt-2 flex items-center gap-4 text-[9px] text-slate-600">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-0.5 w-3 rounded bg-violet-400" />{" "}
                    requests
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-0.5 w-3 rounded bg-cyan-400" /> cache
                    hits
                  </span>
                  <span className="ml-auto font-mono">last 24h</span>
                </div>
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={60}>
            <FeatureCard
              icon={Coins}
              title="Token economics"
              body="Budgets, quotas, and chargeback per team, app, or customer. Stop the surprise invoice."
              tint="acid"
              className="h-full"
            >
              <div className="mt-6 space-y-3">
                {[
                  ["Search", 72, "$8,240"],
                  ["Support", 46, "$4,910"],
                  ["Agents", 91, "$12,600"],
                ].map(([team, used, spend]) => (
                  <div key={team as string}>
                    <div className="mb-1 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{team}</span>
                      <span className="font-mono text-slate-500">{spend}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                      <div
                        className={`h-full rounded-full ${
                          (used as number) > 85
                            ? "bg-gradient-to-r from-amber-400 to-rose-400"
                            : "bg-gradient-to-r from-violet-500 to-cyan-400"
                        }`}
                        style={{ width: `${used}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={40}>
            <FeatureCard
              icon={Workflow}
              title="Agent infrastructure"
              body="Route MCP tools, persist memory, enforce step budgets, and replay any agent run."
              tint="violet"
              className="h-full"
            >
              <div className="mt-6 space-y-1.5">
                {tools.map((tool) => (
                  <div
                    key={tool.label}
                    className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-[#060810]/70 px-2.5 py-1.5 font-mono text-[10px]"
                  >
                    <span className="text-slate-400">{tool.label}()</span>
                    <span className="flex items-center gap-2">
                      <span className="text-slate-600">{tool.calls}</span>
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          tool.ok ? "bg-acid" : "bg-amber-400"
                        }`}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-2">
            <FeatureCard
              icon={Cloud}
              title="Deploy where your data lives"
              body="Managed edge, your VPC, or fully air-gapped. Bring your own keys, identity provider, and object storage."
              tint="cyan"
              className="h-full"
            >
              <div className="mt-6 grid gap-2 sm:grid-cols-2">
                {[
                  ["Managed edge", "38 regions · 99.999% SLA"],
                  ["Private VPC", "AWS · GCP · Azure"],
                  ["On-prem", "Air-gapped · BYOC"],
                  ["BYOK / HSM", "Keys never leave your KMS"],
                ].map(([title, detail]) => (
                  <div
                    key={title}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-[#060810]/70 px-3 py-2.5"
                  >
                    <Globe className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" />
                    <span>
                      <span className="block text-[11.5px] font-medium text-slate-200">
                        {title}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-slate-500">
                        {detail}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </FeatureCard>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 sm:flex-row">
            <p className={`${eyebrow} normal-case tracking-normal`}>
              <span className="text-slate-400">
                Want the full architecture tour?
              </span>
            </p>
            <Link to="/platform" className={`${btnGhost} ${btnSmall}`}>
              Explore the platform
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
