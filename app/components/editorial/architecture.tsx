import { useState } from "react";
import { FigureCaption, Label, SectionTag, Wrap } from "./primitives";

type PathId = "request" | "policy" | "telemetry";

const paths: Record<
  PathId,
  {
    label: string;
    caption: string;
    steps: [string, string, string][];
    guarantees: string[];
  }
> = {
  request: {
    label: "Request path",
    caption: "The SDK speaks OpenAI. The gate changes policy, not protocol.",
    steps: [
      [
        "01",
        "Auth + quota",
        "Key, team, and spend ceiling resolve before the body is parsed.",
      ],
      [
        "02",
        "Route",
        "Eligible models are scored against live price, latency, and quality.",
      ],
      [
        "03",
        "Forward",
        "Streaming is preserved end to end. The provider sees one request.",
      ],
    ],
    guarantees: ["OpenAI-compatible", "SSE preserved", "No retry storms"],
  },
  policy: {
    label: "Policy path",
    caption:
      "Policy is evaluated before the provider is called. Not reconstructed after.",
    steps: [
      [
        "01",
        "Normalize",
        "Prompt and metadata map into one policy context, per tenant.",
      ],
      [
        "02",
        "Evaluate",
        "PII, injection, residency, and model allowlists run in-process.",
      ],
      [
        "03",
        "Act",
        "Redact, block, or reroute — with the decision written to the record.",
      ],
    ],
    guarantees: ["< 6 ms policy pass", "WASM sandbox", "Versioned rules"],
  },
  telemetry: {
    label: "Telemetry path",
    caption:
      "The receipt is written on the way out, not rebuilt from logs later.",
    steps: [
      [
        "01",
        "Capture",
        "Tokens, latency, price, model, policy version, and cache state.",
      ],
      [
        "02",
        "Attribute",
        "Cost rolls up to team, key, feature, and end customer.",
      ],
      [
        "03",
        "Export",
        "OTel, webhook, S3, or your warehouse. Your schema, not ours.",
      ],
    ],
    guarantees: ["OTel native", "90-day traces", "No prompt lock-in"],
  },
};

const providers = [
  { name: "GPT-5", region: "us-east", y: 40 },
  { name: "CLAUDE SONNET 4.5", region: "us-west", y: 130 },
  { name: "GEMINI 2.5 PRO", region: "eu-west", y: 220 },
  { name: "LLAMA 4 405B", region: "self-hosted", y: 310 },
];

function Diagram({ active }: { active: PathId }) {
  const requestOn = active === "request";
  const policyOn = active === "policy";
  const telemetryOn = active === "telemetry";
  const line = "rgba(242,239,231,0.2)";
  const accent = "var(--color-accent)";
  const paper = "rgba(242,239,231,0.86)";
  const dim = "rgba(242,239,231,0.34)";

  const step = (
    x: number,
    y: number,
    width: number,
    title: string,
    on: boolean,
  ) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="40"
        fill={on ? "rgba(200,69,31,0.12)" : "rgba(242,239,231,0.025)"}
        stroke={on ? accent : "rgba(242,239,231,0.16)"}
        strokeWidth="1"
      />
      <text
        x={x + 10}
        y={y + 25}
        fill={on ? "#e4764f" : dim}
        fontSize="8"
        letterSpacing="1.1"
        fontFamily="var(--font-mono)"
      >
        {title}
      </text>
    </g>
  );

  return (
    <svg
      viewBox="0 0 1120 460"
      className="w-full min-w-[760px]"
      role="img"
      aria-label="Model Gateway request lifecycle: client, gateway policy, model providers, and telemetry."
    >
      <defs>
        <marker
          id="arch-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill={dim} />
        </marker>
        <marker
          id="arch-arrow-accent"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 L8 4 L0 8 Z" fill={accent} />
        </marker>
      </defs>

      {/* VPC boundary */}
      <rect
        x="1"
        y="16"
        width="612"
        height="428"
        fill="none"
        stroke="rgba(242,239,231,0.14)"
        strokeDasharray="3 5"
      />
      <text
        x="14"
        y="34"
        fill="rgba(242,239,231,0.34)"
        fontSize="8"
        letterSpacing="1.4"
        fontFamily="var(--font-mono)"
      >
        YOUR VPC
      </text>

      <text
        x="760"
        y="26"
        fill="rgba(242,239,231,0.34)"
        fontSize="8"
        letterSpacing="1.4"
        fontFamily="var(--font-mono)"
      >
        MODEL PROVIDERS
      </text>

      {/* Client */}
      <rect
        x="24"
        y="190"
        width="150"
        height="70"
        fill="rgba(242,239,231,0.025)"
        stroke="rgba(242,239,231,0.3)"
      />
      <text
        x="40"
        y="216"
        fill={paper}
        fontSize="10"
        letterSpacing="1.2"
        fontFamily="var(--font-mono)"
      >
        CLIENT
      </text>
      <text
        x="40"
        y="232"
        fill={dim}
        fontSize="8"
        fontFamily="var(--font-mono)"
      >
        OpenAI SDK
      </text>
      <text
        x="40"
        y="246"
        fill={dim}
        fontSize="8"
        fontFamily="var(--font-mono)"
      >
        api.ncs.dev
      </text>

      {/* Client -> Gate */}
      <path
        d="M174 225 H310"
        fill="none"
        stroke={requestOn || policyOn ? accent : line}
        strokeWidth={requestOn || policyOn ? 1.4 : 1}
        markerEnd={
          requestOn || policyOn ? "url(#arch-arrow-accent)" : "url(#arch-arrow)"
        }
      />

      {/* Gate */}
      <rect
        x="310"
        y="100"
        width="270"
        height="220"
        fill="rgba(242,239,231,0.02)"
        stroke="rgba(242,239,231,0.34)"
      />
      <text
        x="326"
        y="124"
        fill={paper}
        fontSize="10"
        letterSpacing="1.3"
        fontFamily="var(--font-mono)"
      >
        NCS GATE
      </text>
      <text
        x="326"
        y="139"
        fill={dim}
        fontSize="7.5"
        letterSpacing="0.5"
        fontFamily="var(--font-mono)"
      >
        policy · route · cache · record
      </text>

      {step(326, 156, 110, "AUTH", policyOn)}
      {step(452, 156, 112, "POLICY", policyOn)}
      {step(326, 208, 110, "ROUTE", requestOn)}
      {step(452, 208, 112, "CACHE", requestOn)}
      {step(326, 260, 238, "DECISION RECORD", telemetryOn)}

      {/* Gate -> Providers */}
      {providers.map((provider) => {
        const targetY = provider.y + 32;
        return (
          <path
            key={provider.name}
            d={`M580 225 C670 225, 680 ${targetY}, 758 ${targetY}`}
            fill="none"
            stroke={requestOn ? accent : line}
            strokeWidth={requestOn ? 1.2 : 1}
            strokeDasharray={requestOn ? "4 4" : undefined}
            className={requestOn ? "ed-flow" : undefined}
            markerEnd={
              requestOn ? "url(#arch-arrow-accent)" : "url(#arch-arrow)"
            }
          />
        );
      })}

      {/* Providers */}
      {providers.map((provider) => (
        <g key={provider.name}>
          <rect
            x="760"
            y={provider.y}
            width="220"
            height="64"
            fill="rgba(242,239,231,0.02)"
            stroke="rgba(242,239,231,0.2)"
          />
          <text
            x="776"
            y={provider.y + 27}
            fill={paper}
            fontSize="9"
            letterSpacing="0.7"
            fontFamily="var(--font-mono)"
          >
            {provider.name}
          </text>
          <text
            x="776"
            y={provider.y + 44}
            fill={dim}
            fontSize="7.5"
            fontFamily="var(--font-mono)"
          >
            {provider.region}
          </text>
          <circle
            cx="966"
            cy={provider.y + 32}
            r="2.5"
            fill="rgba(242,239,231,0.3)"
          />
        </g>
      ))}

      {/* Gate -> Telemetry */}
      <path
        d="M445 320 V380"
        fill="none"
        stroke={telemetryOn ? accent : line}
        strokeWidth={telemetryOn ? 1.4 : 1}
        strokeDasharray={telemetryOn ? "4 4" : undefined}
        className={telemetryOn ? "ed-flow" : undefined}
        markerEnd={telemetryOn ? "url(#arch-arrow-accent)" : "url(#arch-arrow)"}
      />

      {/* Telemetry */}
      <rect
        x="310"
        y="380"
        width="270"
        height="48"
        fill={telemetryOn ? "rgba(200,69,31,0.1)" : "rgba(242,239,231,0.02)"}
        stroke={telemetryOn ? accent : "rgba(242,239,231,0.24)"}
      />
      <text
        x="326"
        y="401"
        fill={telemetryOn ? "#e4764f" : paper}
        fontSize="9"
        letterSpacing="1.1"
        fontFamily="var(--font-mono)"
      >
        OTEL / WAREHOUSE
      </text>
      <text
        x="326"
        y="416"
        fill={dim}
        fontSize="7.5"
        fontFamily="var(--font-mono)"
      >
        your schema, your retention
      </text>
    </svg>
  );
}

export function Architecture() {
  const [active, setActive] = useState<PathId>("request");
  const current = paths[active];

  return (
    <section id="architecture" className="ed-dark py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionTag index="04">Architecture</SectionTag>
          </div>
          <div className="lg:col-span-6">
            <h2 className="ed-display ed-h2">
              One hop. Three checks.{" "}
              <span className="ed-display-italic text-[#e4764f]">
                A complete record.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:pt-2">
            <p className="ed-small text-paper/60">
              The gate runs inside your network boundary. Providers sit outside
              it. Nothing about your prompts is stored to make the routing work.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-b border-paper/15">
          <div
            role="tablist"
            aria-label="Architecture paths"
            className="flex gap-7"
          >
            {(Object.keys(paths) as PathId[]).map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active === id}
                data-active={active === id}
                onClick={() => setActive(id)}
                className="ed-tab"
              >
                {paths[id].label}
              </button>
            ))}
          </div>
          <span className="ed-mono ml-auto hidden pb-2 text-[9px] uppercase tracking-[0.13em] text-paper/35 sm:block">
            Fig. 03 / Request lifecycle
          </span>
        </div>

        <p className="ed-mono mt-3 text-[9px] uppercase tracking-[0.12em] text-paper/35 sm:hidden">
          Scroll diagram →
        </p>

        <div className="mt-3 overflow-x-auto sm:mt-8">
          <div className="min-w-[760px] border border-paper/12 p-4 sm:p-6">
            <Diagram active={active} />
          </div>
        </div>

        <FigureCaption
          index="Fig. 03"
          className="max-w-2xl text-paper/45 [&>span]:text-[#e4764f]"
        >
          {current.caption}
        </FigureCaption>

        <div className="mt-10 grid gap-8 border-t border-paper/15 pt-8 sm:grid-cols-3 sm:gap-6">
          {current.steps.map(([index, title, body]) => (
            <div key={index}>
              <span className="ed-mono text-[9px] text-[#e4764f]">{index}</span>
              <h3 className="mt-2 text-[15px] font-medium text-paper">
                {title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-paper/55">
                {body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-paper/15 pt-5">
          <Label className="text-paper/35">Guarantees</Label>
          {current.guarantees.map((guarantee) => (
            <span
              key={guarantee}
              className="flex items-center gap-2 text-[12px] text-paper/70"
            >
              <span className="h-1 w-1 bg-[#e4764f]" aria-hidden="true" />
              {guarantee}
            </span>
          ))}
        </div>
      </Wrap>
    </section>
  );
}
