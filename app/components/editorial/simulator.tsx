import { Check, Minus } from "lucide-react";
import { useMemo, useState } from "react";
import { Label, SectionTag, Wrap } from "./primitives";

type WorkloadId = "support" | "code" | "contract";

type Model = {
  name: string;
  cost: number;
  latency: number;
  quality: number;
  region: "us" | "eu" | "self";
  trains: boolean;
};

type Weights = { cost: number; latency: number; quality: number };

const workloads: Record<
  WorkloadId,
  {
    label: string;
    request: string;
    cache: number;
    weights: Weights;
    models: Model[];
  }
> = {
  support: {
    label: "Support",
    request: "Answer a billing question",
    cache: 38,
    weights: { cost: 70, latency: 55, quality: 45 },
    models: [
      {
        name: "GPT-5 mini",
        cost: 0.0042,
        latency: 620,
        quality: 82,
        region: "us",
        trains: false,
      },
      {
        name: "Claude Haiku 4",
        cost: 0.0038,
        latency: 540,
        quality: 84,
        region: "us",
        trains: false,
      },
      {
        name: "Gemini 2.5 Flash",
        cost: 0.0021,
        latency: 480,
        quality: 79,
        region: "eu",
        trains: false,
      },
      {
        name: "Llama 4 70B",
        cost: 0.0012,
        latency: 720,
        quality: 71,
        region: "self",
        trains: true,
      },
    ],
  },
  code: {
    label: "Code",
    request: "Explain a failing migration",
    cache: 14,
    weights: { cost: 10, latency: 15, quality: 100 },
    models: [
      {
        name: "GPT-5",
        cost: 0.018,
        latency: 1100,
        quality: 94,
        region: "us",
        trains: false,
      },
      {
        name: "Claude Sonnet 4.5",
        cost: 0.015,
        latency: 980,
        quality: 96,
        region: "us",
        trains: false,
      },
      {
        name: "DeepSeek V3",
        cost: 0.006,
        latency: 950,
        quality: 82,
        region: "eu",
        trains: false,
      },
      {
        name: "Llama 4 405B",
        cost: 0.003,
        latency: 900,
        quality: 84,
        region: "self",
        trains: true,
      },
    ],
  },
  contract: {
    label: "Contract",
    request: "Flag risky clauses in an MSA",
    cache: 9,
    weights: { cost: 5, latency: 5, quality: 100 },
    models: [
      {
        name: "Claude Opus 4",
        cost: 0.042,
        latency: 1800,
        quality: 97,
        region: "us",
        trains: false,
      },
      {
        name: "GPT-5",
        cost: 0.038,
        latency: 1600,
        quality: 94,
        region: "us",
        trains: false,
      },
      {
        name: "Gemini 2.5 Pro",
        cost: 0.021,
        latency: 1400,
        quality: 92,
        region: "eu",
        trains: false,
      },
      {
        name: "Llama 4 405B",
        cost: 0.009,
        latency: 1200,
        quality: 86,
        region: "self",
        trains: true,
      },
    ],
  },
};

const workloadOrder: WorkloadId[] = ["support", "code", "contract"];

function scoreModels(
  models: Model[],
  weights: Weights,
  euOnly: boolean,
  noTrain: boolean,
) {
  const eligible = models.filter((model) => {
    if (euOnly && model.region === "us") return false;
    if (noTrain && model.trains) return false;
    return true;
  });

  const costs = eligible.map((model) => model.cost);
  const latencies = eligible.map((model) => model.latency);
  const minCost = Math.min(...costs);
  const maxCost = Math.max(...costs);
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  const total = Math.max(weights.cost + weights.latency + weights.quality, 1);

  return eligible
    .map((model) => {
      const costScore =
        maxCost === minCost
          ? 100
          : 100 - ((model.cost - minCost) / (maxCost - minCost)) * 100;
      const latencyScore =
        maxLatency === minLatency
          ? 100
          : 100 -
            ((model.latency - minLatency) / (maxLatency - minLatency)) * 100;
      const score =
        (costScore * weights.cost +
          latencyScore * weights.latency +
          model.quality * weights.quality) /
        total;

      return { ...model, score };
    })
    .sort((a, b) => b.score - a.score);
}

function reasonFor(model: Model, weights: Weights): string {
  if (weights.quality >= weights.cost && weights.quality >= weights.latency) {
    return `Highest quality among eligible models, at $${model.cost.toFixed(4)} per request.`;
  }
  if (weights.cost >= weights.latency) {
    return weights.quality < 20
      ? "Lowest cost among eligible models. Quality is recorded, not optimized."
      : "Lowest weighted cost that still clears the quality floor.";
  }
  return weights.quality < 20
    ? "Fastest eligible model. Quality is recorded, not optimized."
    : "Fastest eligible model with acceptable quality.";
}

function Toggle({
  on,
  label,
  detail,
  onChange,
}: {
  on: boolean;
  label: string;
  detail: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 border-b border-rule py-3.5">
      <input
        type="checkbox"
        checked={on}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
      <span className="ed-check mt-0.5" data-on={on} aria-hidden="true">
        {on ? (
          <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
        ) : (
          <Minus className="h-2.5 w-2.5" strokeWidth={2} />
        )}
      </span>
      <span>
        <span className="ed-small block font-medium text-graphite">
          {label}
        </span>
        <span className="mt-0.5 block text-[11.5px] leading-relaxed text-quiet">
          {detail}
        </span>
      </span>
    </label>
  );
}

export function Simulator() {
  const [workloadId, setWorkloadId] = useState<WorkloadId>("support");
  const [weights, setWeights] = useState<Weights>(workloads.support.weights);
  const [euOnly, setEuOnly] = useState(false);
  const [noTrain, setNoTrain] = useState(true);

  const workload = workloads[workloadId];
  const ranked = useMemo(
    () => scoreModels(workload.models, weights, euOnly, noTrain),
    [workload.models, weights, euOnly, noTrain],
  );
  const selected = ranked[0];
  const excluded = workload.models.length - ranked.length;
  const total = Math.max(weights.cost + weights.latency + weights.quality, 1);

  const chooseWorkload = (id: WorkloadId) => {
    setWorkloadId(id);
    setWeights(workloads[id].weights);
  };

  const setWeight = (key: keyof Weights, value: number) => {
    setWeights((current) => ({ ...current, [key]: value }));
  };

  return (
    <section id="simulator" className="border-t border-rule py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionTag index="06">Test drive</SectionTag>
          </div>
          <div className="lg:col-span-6">
            <h2 className="ed-display ed-h2">
              Set the policy.{" "}
              <span className="ed-display-italic">Watch the route.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:pt-2">
            <p className="ed-small text-graphite-soft">
              A small model of the routing decision. Change the workload,
              weights, or constraints and the record updates.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 lg:col-span-5">
            <Label>01 / Workload</Label>
            <div className="mt-3 grid grid-cols-3 gap-px border border-rule bg-rule">
              {workloadOrder.map((id) => {
                const item = workloads[id];
                const active = workloadId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => chooseWorkload(id)}
                    className={`cursor-pointer px-3 py-3 text-left transition-colors ${
                      active
                        ? "bg-graphite text-paper"
                        : "bg-paper text-graphite hover:bg-paper-deep"
                    }`}
                  >
                    <span className="ed-mono block text-[9px] uppercase tracking-[0.12em] opacity-55">
                      {item.label}
                    </span>
                    <span className="mt-1.5 block text-[11.5px] leading-snug">
                      {item.request}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <Label>02 / Weights</Label>
                <span className="ed-mono text-[9px] uppercase tracking-[0.12em] text-quiet">
                  Normalized
                </span>
              </div>

              <div className="mt-4 space-y-5">
                {(
                  [
                    ["cost", "Cost"],
                    ["latency", "Latency"],
                    ["quality", "Quality"],
                  ] as [keyof Weights, string][]
                ).map(([key, label]) => (
                  <label key={key} className="block">
                    <span className="mb-2 flex items-baseline justify-between">
                      <span className="ed-small font-medium">{label}</span>
                      <span className="ed-mono text-[10px] text-quiet">
                        {Math.round((weights[key] / total) * 100)}%
                      </span>
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={weights[key]}
                      onChange={(event) =>
                        setWeight(key, Number(event.target.value))
                      }
                      className="ed-range"
                      aria-label={`${label} weight`}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Label>03 / Constraints</Label>
              <div className="mt-2 border-t border-rule">
                <Toggle
                  on={euOnly}
                  label="EU residency"
                  detail="Only models hosted in the EU can receive the request."
                  onChange={setEuOnly}
                />
                <Toggle
                  on={noTrain}
                  label="No training on traffic"
                  detail="Exclude providers that retain prompts for training."
                  onChange={setNoTrain}
                />
                <div className="flex items-start gap-3 border-b border-rule py-3.5">
                  <span
                    className="ed-check mt-0.5"
                    data-on="true"
                    aria-hidden="true"
                  >
                    <Check className="h-2.5 w-2.5" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="ed-small block font-medium text-graphite">
                        Model allowlist
                      </span>
                      <span className="ed-mono text-[8px] uppercase tracking-[0.1em] text-quiet">
                        Always on
                      </span>
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-relaxed text-quiet">
                      Unapproved model versions are rejected at the gate.
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <p className="ed-mono mt-6 text-[9.5px] leading-relaxed uppercase tracking-[0.1em] text-quiet">
              Illustrative model. Production scores use live provider telemetry
              and your own evals.
            </p>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <div className="max-w-full border border-graphite/70 bg-[#f7f4ec] shadow-[8px_8px_0_0_var(--color-paper-deep)]">
              <div className="flex items-center justify-between border-b border-graphite/70 bg-graphite px-4 py-3 text-paper">
                <span className="ed-mono text-[9px] uppercase tracking-[0.14em] text-paper/60">
                  Decision record
                </span>
                <span className="ed-mono text-[9px] text-paper/45">
                  req_8f2a · {workload.label.toLowerCase()}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 border-b border-rule pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <Label>Selected model</Label>
                    <p className="mt-2 font-display text-[2.2rem] leading-none tracking-[-0.04em] sm:text-[2.7rem]">
                      {selected.name}
                    </p>
                    <p className="mt-3 max-w-md text-[12.5px] leading-relaxed text-graphite-soft">
                      {reasonFor(selected, weights)}
                    </p>
                  </div>
                  <div className="shrink-0 border border-accent/40 bg-accent-wash px-3 py-2">
                    <span className="ed-mono block text-[8.5px] uppercase tracking-[0.12em] text-accent-deep">
                      Score
                    </span>
                    <span className="ed-mono mt-1 block text-[20px] leading-none text-accent-deep">
                      {Math.round(selected.score)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 border-b border-rule py-5 sm:grid-cols-4">
                  {[
                    ["Est. cost / req", `$${selected.cost.toFixed(4)}`],
                    ["p95 latency", `${selected.latency} ms`],
                    ["Quality", `${selected.quality}/100`],
                    ["Cache hit", `${workload.cache}%`],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <span className="ed-label">{label}</span>
                      <p className="ed-mono mt-1.5 text-[13px] text-graphite">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="py-5">
                  <div className="flex items-center justify-between">
                    <Label>Policy checks</Label>
                    <span className="ed-mono text-[9px] text-quiet">
                      {excluded > 0
                        ? `${excluded} model${excluded === 1 ? "" : "s"} excluded`
                        : "All models eligible"}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {[
                      ["PII redaction", "pass"],
                      ["Injection screen", "pass"],
                      ["Residency", euOnly ? "EU only" : "any"],
                      ["Training", noTrain ? "blocked" : "allowed"],
                    ].map(([label, value]) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1.5 text-[11.5px] text-graphite-soft"
                      >
                        <Check
                          className="h-3 w-3 text-accent"
                          strokeWidth={2}
                        />
                        {label}
                        <span className="ed-mono text-[9px] text-quiet">
                          {value}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-rule pt-4">
                  <Label>Alternatives</Label>
                  <div className="mt-2 overflow-x-auto">
                    <table className="ed-table min-w-[28rem]">
                      <thead>
                        <tr>
                          <th>Model</th>
                          <th>Cost</th>
                          <th>p95</th>
                          <th>Quality</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ranked.map((model, index) => (
                          <tr
                            key={model.name}
                            className={
                              index === 0 ? "bg-accent-wash/60" : undefined
                            }
                          >
                            <td className="text-[12.5px]">
                              <span className="flex items-center gap-2">
                                {index === 0 && (
                                  <span className="h-1 w-1 bg-accent" />
                                )}
                                {model.name}
                              </span>
                            </td>
                            <td className="ed-mono text-[11px]">
                              ${model.cost.toFixed(4)}
                            </td>
                            <td className="ed-mono text-[11px]">
                              {model.latency}
                            </td>
                            <td className="ed-mono text-[11px]">
                              {model.quality}
                            </td>
                            <td className="ed-mono text-[11px]">
                              {Math.round(model.score)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
