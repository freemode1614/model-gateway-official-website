import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router";
import { Container } from "../site/section";
import { btnGhost, btnPrimary } from "../site/ui";
import { Reveal } from "./reveal";

export function FinalCta() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#080a14] px-6 py-16 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              <div className="absolute inset-0 grid-fade opacity-80" />
              <div className="aurora-blob left-[10%] top-[-40%] h-80 w-80 bg-violet-600/40" />
              <div className="aurora-blob aurora-blob--slow right-[6%] top-[-30%] h-72 w-72 bg-cyan-500/25" />
              <div className="aurora-blob aurora-blob--fast bottom-[-50%] left-[42%] h-72 w-72 bg-fuchsia-600/25" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#080a14] to-transparent" />
              <div className="noise absolute inset-0" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10.5px] uppercase tracking-[0.18em] text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_10px_rgba(163,230,53,0.8)]" />
                Start in 5 minutes
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-5xl">
                Ship AI.
                <br />
                <span className="text-gradient">Skip the model drama.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-slate-400">
                Point your SDK at Portico and get routing, safety, caching, and
                observability on the next request. Keep the freedom to switch
                models forever.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/docs#quickstart" className={btnPrimary}>
                  Start building free
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
                <Link to="/contact" className={btnGhost}>
                  <Terminal className="h-4 w-4" />
                  Talk to an engineer
                </Link>
              </div>

              <p className="mt-5 text-[11px] text-slate-600">
                1M free tokens · No credit card · SOC 2 Type II
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
