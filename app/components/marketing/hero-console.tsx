import { Activity, Check, LoaderCircle, TrendingDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";

const steps = [
  {
    label: "Authenticate",
    detail: "tenant acme-prod · key pk_live_9f2c",
    value: "3ms",
  },
  {
    label: "Evaluate policy",
    detail: "balanced · PII redaction · us-east",
    value: "1ms",
  },
  {
    label: "Select model",
    detail: "anthropic/claude-sonnet-4.8",
    value: "42ms",
  },
  {
    label: "Apply guardrails",
    detail: "0 violations · 2 redactions",
    value: "6ms",
  },
  {
    label: "Semantic cache",
    detail: "miss · nearest match 0.12",
    value: "0.4ms",
  },
  {
    label: "Stream response",
    detail: "1,284 tokens → client",
    value: "610ms",
  },
  {
    label: "Export trace",
    detail: "OTLP → Datadog · cost $0.0041",
    value: "async",
  },
];

const providers = [
  { name: "Anthropic", latency: 42, width: "88%", healthy: true },
  { name: "OpenAI", latency: 58, width: "72%", healthy: true },
  { name: "Google", latency: 71, width: "61%", healthy: true },
  { name: "Self-hosted", latency: 29, width: "94%", healthy: true },
];

export function HeroConsole() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(reduced ? steps.length : 0);

  useEffect(() => {
    if (reduced) {
      setActive(steps.length);
      return;
    }

    setActive(0);
    const timer = window.setInterval(() => {
      setActive((value) => (value + 1) % (steps.length + 1));
    }, 1200);

    return () => window.clearInterval(timer);
  }, [reduced]);

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div
        aria-hidden="true"
        className="absolute -inset-8 rounded-[40px] bg-[radial-gradient(closest-side,rgba(124,58,237,0.28),transparent)] blur-2xl"
      />

      <div className="animate-float absolute -top-4 right-6 z-10 hidden sm:block">
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-slate-300 shadow-xl shadow-black/40">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
          </span>
          routing <span className="font-mono text-white">4.2B</span> req/day
        </div>
      </div>

      <div className="ring-gradient relative rounded-[26px] p-px shadow-[0_40px_120px_-40px_rgba(109,40,217,0.55)]">
        <div className="overflow-hidden rounded-[25px] bg-[#060810]/95 backdrop-blur-xl">
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
              <span className="h-2 w-2 rounded-full bg-white/15" />
            </div>
            <span className="ml-1 font-mono text-[10.5px] text-slate-500">
              ncs · live-router
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-acid/20 bg-acid/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-acid">
              <span className="h-1 w-1 rounded-full bg-acid animate-pulse-soft" />
              live
            </span>
          </div>

          <div className="px-4 pt-4">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 font-mono text-[11px]">
              <span className="rounded bg-violet-500/20 px-1.5 py-0.5 font-semibold text-violet-200">
                POST
              </span>
              <span className="text-slate-300">/v1/chat/completions</span>
              <span className="ml-auto text-acid">200 OK</span>
              <span className="text-slate-500">642ms</span>
            </div>
          </div>

          <ol className="px-2.5 py-3">
            {steps.map((step, index) => {
              const done = index < active;
              const running = index === active;
              return (
                <li
                  key={step.label}
                  className={`flex items-center gap-2.5 rounded-lg px-2 py-2 transition-all duration-500 ${
                    running
                      ? "bg-violet-500/[0.09] ring-1 ring-inset ring-violet-400/20"
                      : ""
                  }`}
                >
                  <span
                    className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                      done
                        ? "border-acid/40 bg-acid/15 text-acid"
                        : running
                          ? "border-violet-400/40 bg-violet-500/15 text-violet-300"
                          : "border-white/10 bg-white/[0.02] text-slate-700"
                    }`}
                  >
                    {done ? (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    ) : running ? (
                      <LoaderCircle className="h-2.5 w-2.5 animate-spin" />
                    ) : (
                      <span className="h-1 w-1 rounded-full bg-current" />
                    )}
                  </span>

                  <span
                    className={`min-w-0 flex-1 truncate text-[11.5px] transition-colors ${
                      done || running ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {step.label}
                    <span className="hidden text-slate-600 sm:inline">
                      {" "}
                      · <span className="text-[10.5px]">{step.detail}</span>
                    </span>
                  </span>

                  <span
                    className={`shrink-0 font-mono text-[10px] ${
                      running ? "text-violet-300" : "text-slate-600"
                    }`}
                  >
                    {step.value}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="border-t border-white/[0.07] px-4 py-3.5">
            <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-slate-600">
              <span>Provider health</span>
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal text-slate-500">
                <Activity className="h-3 w-3 text-acid" />4 fallbacks ready
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-2.5">
              {providers.map((provider) => (
                <div key={provider.name}>
                  <div className="mb-1 flex items-center justify-between text-[10.5px]">
                    <span className="text-slate-400">{provider.name}</span>
                    <span className="font-mono text-slate-600">
                      {provider.latency}ms
                    </span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-1000"
                      style={{ width: provider.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float-slow absolute -bottom-10 left-6 z-10 hidden sm:block">
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] text-slate-300 shadow-xl shadow-black/40">
          <TrendingDown className="h-3 w-3 text-acid" />
          cost saved <span className="font-mono text-white">$18.4k</span>/mo
        </div>
      </div>
    </div>
  );
}
