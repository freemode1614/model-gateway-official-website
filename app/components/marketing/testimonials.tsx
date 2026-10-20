import { Quote, Star } from "lucide-react";
import { Container, SectionHeading } from "../site/section";
import { Reveal } from "./reveal";

const testimonials = [
  {
    quote:
      "We replaced 1,400 lines of retry, fallback, and logging code with a 40-line Portico policy. p95 dropped 31% and our model bill dropped 44% in the first month.",
    name: "Maya Chen",
    role: "VP Platform",
    company: "Northwind",
    initials: "MC",
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    quote:
      "The first time a provider had a regional outage, nobody on my team noticed. Portico rerouted 2.1M requests before our status page even updated.",
    name: "Jonas Weber",
    role: "Head of AI",
    company: "VELTRIX",
    initials: "JW",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    quote:
      "Guardrails at the gateway meant we shipped to a regulated bank in six weeks instead of six months. Our security review was almost boring.",
    name: "Priya Raman",
    role: "CTO",
    company: "ARCADIA",
    initials: "PR",
    gradient: "from-amber-400 to-orange-500",
  },
];

export function Testimonials() {
  return (
    <section className="relative border-y border-white/[0.06] py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.08),transparent_60%)]"
      />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Customer stories"
            title={
              <>
                Trusted when the{" "}
                <span className="text-gradient-static">pager is on</span>.
              </>
            }
            description="Platform teams choose Portico for the same reason they choose a database: it has to be boringly reliable at 3am."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.022] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.035]">
                <div className="flex items-center gap-1 text-amber-300">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-3.5 w-3.5 fill-current"
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <Quote className="mt-5 h-5 w-5 text-violet-400/40" />
                <blockquote className="mt-2 flex-1 text-[13.5px] leading-relaxed text-slate-300">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-[10px] font-bold text-white`}
                  >
                    {testimonial.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-medium text-white">
                      {testimonial.name}
                    </span>
                    <span className="block text-[10.5px] text-slate-500">
                      {testimonial.role}
                    </span>
                  </span>
                  <span className="ml-auto text-[11px] font-semibold tracking-tight text-slate-600">
                    {testimonial.company}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              <span className="font-semibold text-slate-300">4.9/5</span> on G2
              · 240 reviews
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span>Leader · Enterprise AI Infrastructure</span>
            <span className="h-3 w-px bg-white/10" />
            <span>SOC 2 Type II · HIPAA · GDPR</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
