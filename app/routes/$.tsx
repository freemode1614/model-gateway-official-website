import { ArrowUpRight } from "lucide-react";
import {
  EdButton,
  FigureCaption,
  Label,
  SectionTag,
  Wrap,
} from "../components/editorial/primitives";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/$";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "404 — Page not found · Portico" },
    { name: "robots", content: "noindex" },
    { name: "theme-color", content: "#eef1f6" },
  ];
}

const trace = [
  ["Request", "GET /this-page"],
  ["Policy", "allow"],
  ["Route", "no match"],
  ["Result", "404"],
];

export default function NotFound() {
  return (
    <SiteShell variant="editorial">
      <section className="relative overflow-hidden">
        <Wrap wide>
          <div className="flex items-center justify-between border-b border-rule py-4">
            <SectionTag index="404">Route miss</SectionTag>
            <Label className="hidden sm:block">
              Portico 3.0 / Decision record
            </Label>
          </div>

          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
            <div className="lg:col-span-7">
              <p className="ed-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                HTTP 404 · Not found
              </p>
              <h1 className="mt-5 font-mono text-[clamp(4.5rem,12vw,10rem)] font-normal leading-[0.8] tracking-[-0.08em] text-graphite">
                404<span className="text-accent">.</span>
              </h1>
              <h2 className="ed-display mt-8 max-w-xl text-[clamp(2rem,3.6vw,3.4rem)] leading-[1.02]">
                This route never made it past the{" "}
                <span className="ed-display-italic">gate.</span>
              </h2>
              <p className="ed-body mt-6 max-w-lg">
                The page does not exist, moved, or sits behind a policy you do
                not have. The gateway still wrote it down.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <EdButton to="/">
                  Back to home
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </EdButton>
                <EdButton to="/docs" variant="ghost">
                  Read the docs
                </EdButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="ed-ledger relative">
                <div className="flex items-center justify-between border-b border-paper/15 px-4 py-3">
                  <Label className="text-paper/45">Request trace</Label>
                  <span className="ed-mono text-[9px] uppercase tracking-[0.12em] text-paper/35">
                    us-east-1
                  </span>
                </div>
                <div>
                  {trace.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-paper/10 px-4 py-4 last:border-b-0"
                    >
                      <span className="ed-mono text-[9px] uppercase tracking-[0.13em] text-paper/40">
                        {label}
                      </span>
                      <span
                        className={`ed-mono text-[10.5px] ${
                          label === "Result"
                            ? "text-[#e4764f]"
                            : "text-paper/80"
                        }`}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-paper/15 px-4 py-3">
                  <span className="ed-mono text-[9px] text-paper/35">
                    0 tokens billed · 0 policy violations
                  </span>
                </div>
              </div>
              <FigureCaption index="Fig. 00">
                A miss is still a decision record. This one leaves with you.
              </FigureCaption>
            </div>
          </div>
        </Wrap>
      </section>
    </SiteShell>
  );
}
