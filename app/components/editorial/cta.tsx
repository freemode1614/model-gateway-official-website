import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { EdButton, Label, Wrap } from "./primitives";

const sequence = ["Request", "Policy", "Route", "Model", "Record"];

export function FinalCta() {
  return (
    <section className="ed-dark border-t border-paper/15">
      <Wrap wide>
        <div className="grid grid-cols-5 border-b border-paper/15">
          {sequence.map((step, index) => (
            <div
              key={step}
              className={`flex items-center gap-2 py-3 ${index > 0 ? "border-l border-paper/15 pl-3 sm:pl-4" : ""}`}
            >
              <span className="ed-mono text-[8px] text-[#e4764f]">
                0{index + 1}
              </span>
              <span className="ed-mono text-[8px] uppercase tracking-[0.12em] text-paper/45 sm:text-[9px]">
                {step}
              </span>
            </div>
          ))}
        </div>

        <div className="py-16 lg:py-24">
          <Label className="text-paper/40">Start here</Label>
          <h2 className="ed-display mt-5 max-w-4xl text-[clamp(3rem,8vw,7rem)]">
            Put a <span className="ed-display-italic text-[#e4764f]">gate</span>{" "}
            in front of it.
          </h2>
          <p className="ed-body mt-7 max-w-xl text-paper/60">
            Start with one key. Route your first request in five minutes. Keep
            the SDK you already use.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <EdButton to="/docs#quickstart" variant="paper">
              Start free
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </EdButton>
            <Link
              to="/contact"
              className="ed-link text-[13px] text-paper/80 hover:text-paper"
            >
              Book a walkthrough
            </Link>
          </div>

          <p className="ed-mono mt-8 text-[9.5px] uppercase tracking-[0.13em] text-paper/35">
            No credit card · 1M free tokens · SOC 2 Type II · HIPAA · GDPR
          </p>
        </div>

        <div className="flex flex-col justify-between gap-3 border-t border-paper/15 py-4 sm:flex-row sm:items-center">
          <Label className="text-paper/35">
            Portico Systems, Inc. · San Francisco / New York
          </Label>
          <Label className="text-paper/35">hello@portico.dev</Label>
        </div>
      </Wrap>
    </section>
  );
}
