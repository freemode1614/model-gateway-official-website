import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { Container } from "../site/section";
import { btnGhost, btnPrimary } from "../site/ui";
import { HeroConsole } from "./hero-console";
import { ParticleField } from "./particle-field";
import { Reveal } from "./reveal";

const trustPoints = ["1M free tokens", "No credit card", "5-minute setup"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-fade" />
        <ParticleField className="opacity-60" />
        <div className="aurora-blob left-[-8%] top-[-14%] h-[30rem] w-[30rem] bg-violet-600/35" />
        <div className="aurora-blob aurora-blob--slow right-[-10%] top-[2%] h-[26rem] w-[26rem] bg-cyan-500/20" />
        <div className="aurora-blob aurora-blob--fast bottom-[-24%] left-[38%] h-[22rem] w-[22rem] bg-fuchsia-600/16" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="noise absolute inset-0" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
          <div className="relative z-10">
            <Reveal>
              <Link
                to="/platform#agents"
                className="group inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/[0.08] py-1.5 pl-1.5 pr-3.5 text-xs text-violet-200/90 transition-colors hover:border-violet-300/40 hover:bg-violet-500/[0.13]"
              >
                <span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-200">
                  New
                </span>
                Agent-aware routing is live
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 text-balance text-[2.9rem] font-semibold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-[4.15rem]">
                One gateway.
                <br />
                Every model.
                <br />
                <span className="text-gradient">Total control.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-pretty text-[16.5px] leading-relaxed text-slate-400 sm:text-[17.5px]">
                Model Gateway is the enterprise control plane for teams shipping
                AI at scale. Route across{" "}
                <span className="text-slate-200">120+ models</span>, enforce
                guardrails, cut token spend by{" "}
                <span className="text-slate-200">60%</span>, and trace every
                request — through one OpenAI-compatible API.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/docs#quickstart" className={btnPrimary}>
                  <Sparkles className="h-4 w-4" />
                  Start building free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link to="/contact" className={btnGhost}>
                  Book a demo
                </Link>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                {trustPoints.map((point) => (
                  <li
                    key={point}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500"
                  >
                    <Check
                      className="h-3.5 w-3.5 text-acid"
                      strokeWidth={2.5}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-9 flex items-center gap-3 border-t border-white/[0.07] pt-6">
                <div className="flex -space-x-2">
                  {[
                    ["AK", "from-violet-500 to-fuchsia-500"],
                    ["MJ", "from-cyan-500 to-blue-500"],
                    ["RS", "from-amber-400 to-orange-500"],
                    ["LT", "from-emerald-400 to-teal-500"],
                  ].map(([initials, gradient]) => (
                    <span
                      key={initials}
                      className={`grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-gradient-to-br ${gradient} text-[9px] font-bold text-white`}
                    >
                      {initials}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  <span className="font-medium text-slate-300">
                    4,000+ platform teams
                  </span>{" "}
                  route production traffic through Model Gateway
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative">
            <HeroConsole />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
