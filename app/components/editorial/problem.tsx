import { FigureCaption, Label, SectionTag, Wrap } from "./primitives";

const nonNegotiables = [
  "We don’t train on your traffic.",
  "We don’t mark up tokens.",
  "We don’t hold your prompts hostage.",
];

function SprawlDiagram() {
  return (
    <figure>
      <svg
        viewBox="0 0 300 322"
        className="w-full text-graphite"
        role="img"
        aria-label="A product connected directly to five model providers, compared with the same product connected through a single gateway."
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1"
        >
          <text
            x="0"
            y="9"
            fill="currentColor"
            stroke="none"
            fontSize="7.5"
            letterSpacing="1.2"
            opacity="0.6"
          >
            WITHOUT A GATE
          </text>

          <rect x="0" y="22" width="70" height="32" />
          <text
            x="35"
            y="41"
            fill="currentColor"
            stroke="none"
            fontSize="7"
            textAnchor="middle"
            letterSpacing="0.8"
          >
            PRODUCT
          </text>

          {[0, 1, 2, 3, 4].map((index) => {
            const y = 16 + index * 27;
            return (
              <g key={index}>
                <rect x="210" y={y} width="90" height="21" />
                <text
                  x="255"
                  y={y + 14}
                  fill="currentColor"
                  stroke="none"
                  fontSize="6.5"
                  textAnchor="middle"
                  letterSpacing="0.5"
                  opacity="0.75"
                >
                  PROVIDER {index + 1}
                </text>
                <path
                  d={`M70 38 C130 ${38 + index * 6}, 150 ${y + 10}, 210 ${y + 10}`}
                  strokeOpacity={index === 2 ? 0.22 : 0.4}
                />
              </g>
            );
          })}

          <text
            x="210"
            y="162"
            fill="currentColor"
            stroke="none"
            fontSize="6.5"
            letterSpacing="0.6"
            opacity="0.45"
          >
            5 KEYS · 5 BILLS · 5 FAILURE MODES
          </text>

          <line
            x1="0"
            y1="186"
            x2="300"
            y2="186"
            strokeOpacity="0.35"
            strokeDasharray="2 3"
          />

          <text
            x="0"
            y="207"
            fill="currentColor"
            stroke="none"
            fontSize="7.5"
            letterSpacing="1.2"
            opacity="0.6"
          >
            WITH PORTICO
          </text>

          <rect x="0" y="222" width="70" height="32" />
          <text
            x="35"
            y="241"
            fill="currentColor"
            stroke="none"
            fontSize="7"
            textAnchor="middle"
            letterSpacing="0.8"
          >
            PRODUCT
          </text>

          <path d="M70 238 H112" />
          <path d="M184 230 H222" />
          <path d="M184 238 H222" />
          <path d="M184 246 H222" />

          {[218, 232, 246].map((y, index) => (
            <g key={y}>
              <rect x="222" y={y} width="78" height="18" />
              <text
                x="261"
                y={y + 12}
                fill="currentColor"
                stroke="none"
                fontSize="6.5"
                textAnchor="middle"
                letterSpacing="0.5"
                opacity="0.75"
              >
                MODEL {index + 1}
              </text>
            </g>
          ))}

          <rect
            x="112"
            y="214"
            width="72"
            height="52"
            stroke="var(--color-accent)"
            strokeWidth="1.3"
          />
          <text
            x="148"
            y="235"
            fill="var(--color-accent)"
            stroke="none"
            fontSize="7"
            textAnchor="middle"
            letterSpacing="1"
          >
            GATE
          </text>
          <text
            x="148"
            y="247"
            fill="var(--color-accent)"
            stroke="none"
            fontSize="5.8"
            textAnchor="middle"
            letterSpacing="0.6"
            opacity="0.8"
          >
            POLICY
          </text>

          <text
            x="112"
            y="292"
            fill="currentColor"
            stroke="none"
            fontSize="6.5"
            letterSpacing="0.6"
            opacity="0.45"
          >
            1 KEY · 1 POLICY · 1 RECORD
          </text>
        </g>
      </svg>
      <FigureCaption index="Fig. 02">
        The gateway does not remove providers. It removes the exceptions.
      </FigureCaption>
    </figure>
  );
}

export function Problem() {
  return (
    <section id="problem" className="border-t border-rule py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <SectionTag index="02">The problem</SectionTag>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="ed-display ed-h2 max-w-3xl">
              Model sprawl is a{" "}
              <span className="ed-display-italic text-accent">governance</span>{" "}
              problem. Most teams treat it as an API problem.
            </h2>

            <div className="mt-9 grid gap-6 sm:grid-cols-2">
              <p className="ed-body">
                The average product team now calls four providers and a dozen
                model versions. Each has its own key, rate limit, failure mode,
                and invoice. The result is not a model strategy. It is a mesh of
                exceptions.
              </p>
              <p className="ed-body">
                A gateway gives you one place to make the decision: one policy
                language, one routing table, one record. It does not make models
                interchangeable. It makes them governable.
              </p>
            </div>

            <blockquote className="mt-10 border-l border-accent pl-6">
              <p className="font-display text-[1.7rem] leading-[1.15] tracking-[-0.03em] text-graphite sm:text-[2rem]">
                You can’t govern what you didn’t route through.
              </p>
              <footer className="mt-3">
                <Label>Working principle · Portico engineering</Label>
              </footer>
            </blockquote>

            <div className="mt-10 border-t border-rule pt-6">
              <Label>What we don’t do</Label>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {nonNegotiables.map((item, index) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="ed-mono pt-0.5 text-[9px] text-accent">
                      0{index + 1}
                    </span>
                    <span className="ed-small text-graphite-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <SprawlDiagram />
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
