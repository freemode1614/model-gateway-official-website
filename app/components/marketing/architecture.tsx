import { BarChart3, Check, Route, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";
import { Container } from "../site/section";
import { eyebrow as eyebrowClass } from "../site/ui";
import { Reveal } from "./reveal";

type Focus = "route" | "protect" | "observe";

const modes: {
  id: Focus;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  caption: string;
}[] = [
  {
    id: "route",
    label: "Route",
    icon: Route,
    caption:
      "Model Gateway parses intent and scores every eligible model against your policy — cost ceiling, latency SLO, region, and quality floor — then picks the best fit in 12ms.",
  },
  {
    id: "protect",
    label: "Protect",
    icon: ShieldCheck,
    caption:
      "Before a prompt leaves your network, guardrails redact PII, block injection and jailbreak attempts, and apply your compliance pack. Every decision is logged.",
  },
  {
    id: "observe",
    label: "Observe",
    icon: BarChart3,
    caption:
      "Every hop emits an OpenTelemetry span: tokens, cost, latency, cache status, tool calls, and the exact policy that fired. Stream it to Datadog, S3, or Snowflake.",
  },
];

const providers = [
  { name: "OpenAI", status: "p50 58ms", color: "#34d399", y: 49 },
  { name: "Anthropic", status: "p50 42ms", color: "#fb923c", y: 131 },
  { name: "Google", status: "p50 71ms", color: "#60a5fa", y: 213 },
  { name: "Llama 4.1", status: "p50 96ms", color: "#a78bfa", y: 295 },
  { name: "Private vLLM", status: "p50 29ms", color: "#22d3ee", y: 377 },
];

const paths = [
  "M 416 240 C 452 240 452 49 500 49",
  "M 416 248 C 456 248 456 131 500 131",
  "M 416 256 C 460 256 460 213 500 213",
  "M 416 268 C 460 268 460 295 500 295",
  "M 416 280 C 456 280 456 377 500 377",
];

export function Architecture() {
  const [focus, setFocus] = useState<Focus>("route");
  const reduced = usePrefersReducedMotion();
  const active = modes.find((mode) => mode.id === focus) ?? modes[0];
  const caption = active.caption;

  return (
    <section
      id="architecture"
      className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(34,211,238,0.07),transparent_55%),radial-gradient(ellipse_at_80%_100%,rgba(124,58,237,0.1),transparent_55%)]"
      />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className={`${eyebrowClass} mb-4`}>How it works</p>
              <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
                A request in. A{" "}
                <span className="text-gradient-static">policy decision</span>{" "}
                out.
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-slate-400">
                Your app talks to one endpoint. Model Gateway handles auth,
                routing, retries, caching, safety, and telemetry — so your
                product team ships features instead of plumbing.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-8 inline-flex rounded-xl border border-white/10 bg-white/[0.025] p-1">
                {modes.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setFocus(id)}
                    aria-pressed={focus === id}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                      focus === id
                        ? "bg-white/[0.09] text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
              <p className="mt-4 min-h-[5.5rem] max-w-lg text-[13.5px] leading-relaxed text-slate-400">
                {caption}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <ul className="mt-2 grid gap-2.5">
                {[
                  "Drop-in OpenAI-compatible endpoint",
                  "Policies in Git — reviewed, versioned, rollback-able",
                  "No SDK lock-in, no model lock-in",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[13px] text-slate-400"
                  >
                    <span className="grid h-4 w-4 place-items-center rounded-full border border-acid/30 bg-acid/10">
                      <Check
                        className="h-2.5 w-2.5 text-acid"
                        strokeWidth={3}
                      />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <div className="ring-gradient relative overflow-hidden rounded-3xl bg-[#060810]/80 p-1">
              <div className="dot-grid relative overflow-hidden rounded-[22px] bg-[#070911]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-600/15 blur-3xl"
                />
                <div className="overflow-x-auto">
                  <svg
                    viewBox="0 0 720 460"
                    className="h-auto w-full min-w-[520px]"
                    role="img"
                    aria-label="Architecture diagram: applications call the NCS Model Gateway, which routes to model providers and streams telemetry."
                  >
                    <defs>
                      <linearGradient id="coreGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="55%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#22d3ee" />
                      </linearGradient>
                      <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop
                          offset="0%"
                          stopColor="#8b5cf6"
                          stopOpacity="0.15"
                        />
                        <stop
                          offset="100%"
                          stopColor="#22d3ee"
                          stopOpacity="0.7"
                        />
                      </linearGradient>
                      <filter
                        id="softGlow"
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                      >
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <text
                      x="16"
                      y="188"
                      fill="#64748b"
                      fontSize="9"
                      letterSpacing="2.4"
                    >
                      YOUR APPS
                    </text>
                    <text
                      x="236"
                      y="152"
                      fill="#64748b"
                      fontSize="9"
                      letterSpacing="2.4"
                    >
                      MODEL GATEWAY
                    </text>
                    <text
                      x="500"
                      y="14"
                      fill="#64748b"
                      fontSize="9"
                      letterSpacing="2.4"
                    >
                      PROVIDERS
                    </text>

                    {/* Apps node */}
                    <g opacity={focus === "route" ? 1 : 0.65}>
                      <rect
                        x="16"
                        y="210"
                        width="120"
                        height="104"
                        rx="14"
                        fill="#0b0e18"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <rect
                        x="30"
                        y="226"
                        width="60"
                        height="6"
                        rx="3"
                        fill="rgba(255,255,255,0.16)"
                      />
                      <rect
                        x="30"
                        y="240"
                        width="88"
                        height="4"
                        rx="2"
                        fill="rgba(255,255,255,0.08)"
                      />
                      <rect
                        x="30"
                        y="250"
                        width="72"
                        height="4"
                        rx="2"
                        fill="rgba(255,255,255,0.08)"
                      />
                      <rect
                        x="30"
                        y="270"
                        width="76"
                        height="18"
                        rx="6"
                        fill="rgba(139,92,246,0.12)"
                        stroke="rgba(139,92,246,0.25)"
                      />
                      <text
                        x="38"
                        y="282"
                        fill="#c4b5fd"
                        fontSize="8.5"
                        fontFamily="monospace"
                      >
                        POST /v1
                      </text>
                      <text x="30" y="304" fill="#64748b" fontSize="8.5">
                        SDK · HTTP · streaming
                      </text>
                    </g>

                    {/* Incoming line */}
                    <path
                      d="M 136 262 C 180 262 190 262 236 262"
                      stroke="url(#lineGrad)"
                      strokeWidth="1.5"
                      fill="none"
                    />
                    {focus === "route" && !reduced && (
                      <>
                        <circle r="2.5" fill="#a3e635">
                          <animateMotion
                            dur="2.4s"
                            repeatCount="indefinite"
                            path="M 136 262 C 180 262 190 262 236 262"
                          />
                        </circle>
                        <circle r="2.5" fill="#a3e635" opacity="0.6">
                          <animateMotion
                            dur="2.4s"
                            begin="1.2s"
                            repeatCount="indefinite"
                            path="M 136 262 C 180 262 190 262 236 262"
                          />
                        </circle>
                      </>
                    )}

                    {/* Gateway core */}
                    <g>
                      <rect
                        x="236"
                        y="174"
                        width="180"
                        height="176"
                        rx="22"
                        fill="#0a0c15"
                        stroke="url(#coreGrad)"
                        strokeWidth="1.4"
                        filter={
                          focus === "protect" ? "url(#softGlow)" : undefined
                        }
                      />
                      <rect
                        x="236"
                        y="174"
                        width="180"
                        height="176"
                        rx="22"
                        fill="rgba(139,92,246,0.04)"
                      />
                      <path
                        d="M 316 212 v-8 a10 10 0 0 1 20 0 v8"
                        stroke="url(#coreGrad)"
                        strokeWidth="2.4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx="326" cy="200" r="1.8" fill="#c4b5fd" />
                      <text
                        x="326"
                        y="230"
                        fill="#f8fafc"
                        fontSize="11"
                        fontWeight="600"
                        textAnchor="middle"
                        letterSpacing="1.4"
                      >
                        MODEL GATEWAY
                      </text>

                      {[
                        { label: "route · intent", active: focus === "route" },
                        { label: "guard · PII", active: focus === "protect" },
                        {
                          label: "cache · semantic",
                          active: focus === "observe",
                        },
                      ].map((pill, index) => {
                        const y = 246 + index * 30;
                        return (
                          <g key={pill.label}>
                            <rect
                              x="252"
                              y={y}
                              width="148"
                              height="22"
                              rx="7"
                              fill={
                                pill.active
                                  ? "rgba(139,92,246,0.16)"
                                  : "rgba(255,255,255,0.03)"
                              }
                              stroke={
                                pill.active
                                  ? "rgba(167,139,250,0.4)"
                                  : "rgba(255,255,255,0.07)"
                              }
                            />
                            <circle
                              cx="263"
                              cy={y + 11}
                              r="2"
                              fill={pill.active ? "#a3e635" : "#475569"}
                            />
                            <text
                              x="271"
                              y={y + 14.5}
                              fill={pill.active ? "#e9d5ff" : "#94a3b8"}
                              fontSize="8.5"
                              fontFamily="monospace"
                            >
                              {pill.label}
                            </text>
                          </g>
                        );
                      })}
                    </g>

                    {/* Provider lines */}
                    {paths.map((path, index) => {
                      const dim =
                        focus === "route" ? (index === 1 ? 1 : 0.55) : 0.22;
                      return (
                        <g key={path}>
                          <path
                            d={path}
                            fill="none"
                            stroke="url(#lineGrad)"
                            strokeWidth="1.3"
                            opacity={dim}
                          />
                          {focus === "route" && index === 1 && !reduced && (
                            <circle r="2.5" fill="#a3e635">
                              <animateMotion
                                dur="2.2s"
                                repeatCount="indefinite"
                                path={path}
                              />
                            </circle>
                          )}
                        </g>
                      );
                    })}

                    {/* Providers */}
                    {providers.map((provider) => (
                      <g
                        key={provider.name}
                        opacity={focus === "route" ? 1 : 0.6}
                      >
                        <rect
                          x="500"
                          y={provider.y}
                          width="196"
                          height="58"
                          rx="12"
                          fill="#0b0e18"
                          stroke="rgba(255,255,255,0.1)"
                        />
                        <circle
                          cx="518"
                          cy={provider.y + 20}
                          r="3"
                          fill={provider.color}
                        />
                        <text
                          x="529"
                          y={provider.y + 24}
                          fill="#e2e8f0"
                          fontSize="10"
                          fontWeight="500"
                        >
                          {provider.name}
                        </text>
                        <text
                          x="518"
                          y={provider.y + 41}
                          fill="#64748b"
                          fontSize="8.5"
                          fontFamily="monospace"
                        >
                          {provider.status}
                        </text>
                        <text
                          x="680"
                          y={provider.y + 24}
                          fill="#475569"
                          fontSize="8"
                          textAnchor="end"
                          fontFamily="monospace"
                        >
                          {provider.y === 131 ? "PRIMARY" : "READY"}
                        </text>
                      </g>
                    ))}

                    {/* Telemetry */}
                    <path
                      d="M 326 350 L 326 396"
                      stroke={
                        focus === "observe"
                          ? "rgba(34,211,238,0.7)"
                          : "rgba(148,163,184,0.22)"
                      }
                      strokeWidth="1.2"
                      strokeDasharray="4 4"
                      fill="none"
                    />
                    {focus === "observe" && !reduced && (
                      <circle r="2.5" fill="#22d3ee">
                        <animateMotion
                          dur="2s"
                          repeatCount="indefinite"
                          path="M 326 350 L 326 396"
                        />
                      </circle>
                    )}
                    <g opacity={focus === "observe" ? 1 : 0.55}>
                      <rect
                        x="256"
                        y="396"
                        width="140"
                        height="48"
                        rx="11"
                        fill="#0b0e18"
                        stroke={
                          focus === "observe"
                            ? "rgba(34,211,238,0.35)"
                            : "rgba(255,255,255,0.1)"
                        }
                      />
                      <text
                        x="326"
                        y="416"
                        fill="#e2e8f0"
                        fontSize="9.5"
                        fontWeight="500"
                        textAnchor="middle"
                      >
                        Telemetry
                      </text>
                      <text
                        x="326"
                        y="431"
                        fill="#64748b"
                        fontSize="8"
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        OTLP · traces · evals
                      </text>
                    </g>
                  </svg>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070911] to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
