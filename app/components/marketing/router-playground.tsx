import {
  ArrowRight,
  Code2,
  Coins,
  Gauge,
  MessagesSquare,
  RefreshCw,
  ScanEye,
  SlidersHorizontal,
  Sparkles,
  Workflow,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Container, SectionHeading } from "../site/section";
import { btnPrimary, btnSmall } from "../site/ui";
import { Reveal } from "./reveal";

type Task = "chat" | "code" | "vision" | "agent";
type Policy = "balanced" | "cost" | "latency" | "quality";

const tasks: {
  id: Task;
  label: string;
  hint: string;
  prompt: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    id: "chat",
    label: "Customer chat",
    hint: "Support & success",
    prompt: "Summarize this ticket and draft a friendly reply.",
    icon: MessagesSquare,
  },
  {
    id: "code",
    label: "Code assistant",
    hint: "Engineering",
    prompt: "Refactor this module, add tests, and explain the diff.",
    icon: Code2,
  },
  {
    id: "vision",
    label: "Document AI",
    hint: "Invoice & contract OCR",
    prompt: "Extract line items and totals from this invoice image.",
    icon: ScanEye,
  },
  {
    id: "agent",
    label: "Agent workflow",
    hint: "Multi-step tool use",
    prompt: "Research competitors and update the CRM record.",
    icon: Workflow,
  },
];

const policies: {
  id: Policy;
  label: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
  weights: { quality: number; cost: number; speed: number };
}[] = [
  {
    id: "balanced",
    label: "Balanced",
    hint: "Best overall value",
    icon: Gauge,
    weights: { quality: 0.45, cost: 0.3, speed: 0.25 },
  },
  {
    id: "cost",
    label: "Cost saver",
    hint: "Protect the margin",
    icon: Coins,
    weights: { quality: 0.15, cost: 0.65, speed: 0.2 },
  },
  {
    id: "latency",
    label: "Latency first",
    hint: "Sub-second UX",
    icon: Sparkles,
    weights: { quality: 0.2, cost: 0.15, speed: 0.65 },
  },
  {
    id: "quality",
    label: "Max quality",
    hint: "When it must be right",
    icon: SlidersHorizontal,
    weights: { quality: 0.75, cost: 0.1, speed: 0.15 },
  },
];

type Model = {
  id: string;
  name: string;
  provider: string;
  initials: string;
  color: string;
  input: number;
  output: number;
  latency: number;
  context: string;
  quality: number;
  task: Record<Task, number>;
};

const models: Model[] = [
  {
    id: "claude-sonnet-4.8",
    name: "claude-sonnet-4.8",
    provider: "Anthropic",
    initials: "AN",
    color: "#fb923c",
    input: 3,
    output: 15,
    latency: 190,
    context: "300K",
    quality: 94,
    task: { chat: 94, code: 96, vision: 82, agent: 93 },
  },
  {
    id: "gpt-5.2",
    name: "gpt-5.2",
    provider: "OpenAI",
    initials: "OA",
    color: "#34d399",
    input: 2.5,
    output: 10,
    latency: 210,
    context: "400K",
    quality: 95,
    task: { chat: 92, code: 94, vision: 88, agent: 95 },
  },
  {
    id: "gemini-3-pro",
    name: "gemini-3-pro",
    provider: "Google",
    initials: "GO",
    color: "#60a5fa",
    input: 1.25,
    output: 5,
    latency: 180,
    context: "1M",
    quality: 91,
    task: { chat: 90, code: 88, vision: 97, agent: 89 },
  },
  {
    id: "gpt-5.2-mini",
    name: "gpt-5.2-mini",
    provider: "OpenAI",
    initials: "OA",
    color: "#34d399",
    input: 0.4,
    output: 1.6,
    latency: 90,
    context: "200K",
    quality: 82,
    task: { chat: 86, code: 84, vision: 78, agent: 80 },
  },
  {
    id: "claude-haiku-4.5",
    name: "claude-haiku-4.5",
    provider: "Anthropic",
    initials: "AN",
    color: "#fb923c",
    input: 0.8,
    output: 4,
    latency: 75,
    context: "200K",
    quality: 80,
    task: { chat: 88, code: 82, vision: 74, agent: 79 },
  },
  {
    id: "gemini-3-flash",
    name: "gemini-3-flash",
    provider: "Google",
    initials: "GO",
    color: "#60a5fa",
    input: 0.15,
    output: 0.6,
    latency: 60,
    context: "1M",
    quality: 76,
    task: { chat: 82, code: 76, vision: 84, agent: 75 },
  },
  {
    id: "deepseek-v4.1",
    name: "deepseek-v4.1",
    provider: "DeepSeek",
    initials: "DS",
    color: "#22d3ee",
    input: 0.28,
    output: 1.1,
    latency: 85,
    context: "256K",
    quality: 85,
    task: { chat: 83, code: 91, vision: 60, agent: 84 },
  },
  {
    id: "llama-4.1-405b",
    name: "llama-4.1-405b",
    provider: "Meta",
    initials: "ME",
    color: "#a78bfa",
    input: 2.2,
    output: 8.8,
    latency: 240,
    context: "128K",
    quality: 84,
    task: { chat: 80, code: 85, vision: 70, agent: 81 },
  },
];

const price = (model: Model) => model.input * 0.3 + model.output * 0.7;

const priceValues = models.map(price);
const latencyValues = models.map((model) => model.latency);
const minPrice = Math.min(...priceValues);
const maxPrice = Math.max(...priceValues);
const minLatency = Math.min(...latencyValues);
const maxLatency = Math.max(...latencyValues);

const costScore = (model: Model) =>
  Math.round(100 - ((price(model) - minPrice) / (maxPrice - minPrice)) * 88);

const speedScore = (model: Model) =>
  Math.round(
    100 - ((model.latency - minLatency) / (maxLatency - minLatency)) * 88,
  );

const reasons: Record<Policy, string> = {
  balanced:
    "The best overall trade-off for this workload — quality, price, and response time are all in the top tier.",
  cost: "The cheapest option that still clears the quality bar for this workload. Failover stays warm.",
  latency:
    "The fastest option that meets the quality floor. Requests hedge to a second region after 150ms.",
  quality:
    "The highest task fit available. Cost and latency are deprioritized for maximum answer quality.",
};

function formatUsd(value: number) {
  return `$${value.toFixed(2)}`;
}

export function RouterPlayground() {
  const [task, setTask] = useState<Task>("chat");
  const [policy, setPolicy] = useState<Policy>("balanced");
  const [prompt, setPrompt] = useState(tasks[0]?.prompt ?? "");
  const [routing, setRouting] = useState(false);
  const [nonce, setNonce] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const selected = tasks.find((item) => item.id === task);
    if (selected) setPrompt(selected.prompt);
  }, [task]);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const ranked = useMemo(() => {
    const weights =
      policies.find((item) => item.id === policy)?.weights ??
      policies[0]!.weights;

    return models
      .map((model) => {
        const fit = model.task[task];
        const total =
          fit * weights.quality +
          costScore(model) * weights.cost +
          speedScore(model) * weights.speed;
        return {
          model,
          fit,
          cost: costScore(model),
          speed: speedScore(model),
          total: Math.round(total * 10) / 10,
        };
      })
      .sort((a, b) => b.total - a.total);
  }, [policy, task]);

  const winner = ranked[0]!;
  const runnersUp = ranked.slice(1, 4);
  const selectedTask = tasks.find((item) => item.id === task) ?? tasks[0]!;
  const selectedPolicy =
    policies.find((item) => item.id === policy) ?? policies[0]!;

  const reroute = () => {
    setRouting(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setRouting(false);
      setNonce((value) => value + 1);
    }, 520);
  };

  return (
    <section
      id="playground"
      className="relative overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.06),transparent_55%),radial-gradient(ellipse_at_75%_80%,rgba(124,58,237,0.09),transparent_55%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Interactive demo"
            title={
              <>
                Watch the router{" "}
                <span className="text-gradient-static">make the call</span>.
              </>
            }
            description="Pick a workload and an optimization goal. This is a live model of Model Gateway's policy engine — the same scoring logic that runs on every production request."
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 overflow-hidden rounded-3xl border border-white/[0.09] bg-[#070911]/80 shadow-[0_40px_120px_-50px_rgba(109,40,217,0.5)]">
            <div className="grid lg:grid-cols-[1.02fr_0.98fr]">
              {/* Controls */}
              <div className="border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                    01 · Workload
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {tasks.map(({ id, label, hint, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setTask(id)}
                        aria-pressed={task === id}
                        className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                          task === id
                            ? "border-violet-400/40 bg-violet-500/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            task === id ? "text-violet-300" : "text-slate-500"
                          }`}
                        />
                        <span>
                          <span className="block text-[12px] font-medium text-slate-200">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-[10px] text-slate-500">
                            {hint}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                    02 · Optimization goal
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {policies.map(({ id, label, hint, icon: Icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setPolicy(id)}
                        aria-pressed={policy === id}
                        className={`flex items-start gap-2.5 rounded-xl border p-3 text-left transition-all ${
                          policy === id
                            ? "border-cyan-400/35 bg-cyan-500/[0.08]"
                            : "border-white/[0.07] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                        }`}
                      >
                        <Icon
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            policy === id ? "text-cyan-300" : "text-slate-500"
                          }`}
                        />
                        <span>
                          <span className="block text-[12px] font-medium text-slate-200">
                            {label}
                          </span>
                          <span className="mt-0.5 block text-[10px] text-slate-500">
                            {hint}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-7">
                  <label
                    htmlFor="playground-prompt"
                    className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600"
                  >
                    03 · Prompt
                  </label>
                  <div className="mt-3 rounded-xl border border-white/[0.08] bg-[#05060b] p-3 focus-within:border-violet-400/40">
                    <textarea
                      id="playground-prompt"
                      value={prompt}
                      onChange={(event) => setPrompt(event.target.value)}
                      rows={2}
                      className="w-full resize-none bg-transparent text-[12.5px] leading-relaxed text-slate-300 outline-none placeholder:text-slate-600"
                    />
                    <div className="mt-2 flex items-center justify-between text-[9.5px] text-slate-600">
                      <span className="font-mono">
                        POST /v1/chat/completions
                      </span>
                      <span>{prompt.length} chars</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={reroute}
                    className={`${btnPrimary} ${btnSmall}`}
                  >
                    <RefreshCw
                      className={`h-3.5 w-3.5 ${routing ? "animate-spin" : ""}`}
                    />
                    {routing ? "Routing…" : "Route request"}
                    {!routing && <ArrowRight className="h-3.5 w-3.5" />}
                  </button>
                  <p className="text-[10.5px] text-slate-600">
                    decision in <span className="text-slate-400">12ms</span>
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="relative overflow-hidden p-6 sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl"
                />
                <div
                  key={`${winner.model.id}-${policy}-${task}-${nonce}`}
                  className="rise-in relative"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                      Selected model
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-acid/20 bg-acid/[0.08] px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-acid">
                      <span className="h-1 w-1 rounded-full bg-acid animate-pulse-soft" />
                      auto
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-3.5">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 text-[12px] font-bold text-white"
                      style={{
                        background: `linear-gradient(140deg, ${winner.model.color}44, ${winner.model.color}12)`,
                        color: winner.model.color,
                      }}
                    >
                      {winner.model.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-mono text-[15px] font-medium text-white">
                        {winner.model.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {winner.model.provider} · {winner.model.context} context
                      </p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-xl font-semibold tracking-[-0.03em] text-white">
                        {winner.total}
                      </p>
                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        fit score
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {[
                      ["Input", `${formatUsd(winner.model.input)} / 1M`],
                      ["Output", `${formatUsd(winner.model.output)} / 1M`],
                      ["p95 latency", `${winner.model.latency}ms`],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2"
                      >
                        <p className="text-[9px] uppercase tracking-wider text-slate-600">
                          {label}
                        </p>
                        <p className="mt-1 font-mono text-[11px] text-slate-200">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {[
                      [
                        "Task fit",
                        winner.fit,
                        "from-violet-500 to-fuchsia-400",
                      ],
                      ["Cost score", winner.cost, "from-cyan-500 to-sky-400"],
                      ["Speed score", winner.speed, "from-acid to-emerald-400"],
                    ].map(([label, value, gradient]) => (
                      <div key={label as string}>
                        <div className="mb-1 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500">{label}</span>
                          <span className="font-mono text-slate-400">
                            {value}
                          </span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-violet-400/15 bg-violet-500/[0.06] p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300">
                      Why this route
                    </p>
                    <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-400">
                      {reasons[policy]}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-[9.5px] uppercase tracking-[0.18em] text-slate-600">
                      Runner-ups · {selectedTask.label.toLowerCase()} ·{" "}
                      {selectedPolicy.label.toLowerCase()}
                    </p>
                    <div className="space-y-1">
                      {runnersUp.map((entry) => (
                        <div
                          key={entry.model.id}
                          className="flex items-center gap-2.5 rounded-lg px-1 py-1.5 text-[10.5px]"
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ background: entry.model.color }}
                          />
                          <span className="min-w-0 flex-1 truncate font-mono text-slate-400">
                            {entry.model.name}
                          </span>
                          <span className="font-mono text-slate-600">
                            {formatUsd(price(entry.model))}/M
                          </span>
                          <span className="w-8 text-right font-mono text-slate-400">
                            {entry.total}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4 text-[9.5px] text-slate-600">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-acid" />
                      fallback armed · 2 models
                    </span>
                    <span className="font-mono">policy: {policy}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-4 text-center text-[11px] text-slate-600">
            Illustrative model scores and pricing. Route with your own catalog
            in production.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
