import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { PageHero } from "../components/editorial/page";
import {
  EdButton,
  Label,
  TextLink,
  Wrap,
} from "../components/editorial/primitives";
import { SiteShell } from "../components/site/shell";
import type { Route } from "./+types/contact";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Contact — NCS" },
    {
      name: "description",
      content:
        "Talk to the NCS team about routing, guardrails, enterprise deployment, or a security review.",
    },
  ];
}

const interests = [
  "Model gateway",
  "Guardrails",
  "Observability",
  "Agents & MCP",
  "Enterprise / VPC",
];

const offices = [
  { city: "San Francisco", detail: "535 Mission St · HQ" },
  { city: "London", detail: "1 Finsbury Avenue" },
  { city: "Singapore", detail: "8 Marina View" },
];

function Field({
  htmlFor,
  label,
  children,
}: {
  htmlFor: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="ed-label mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [selected, setSelected] = useState<string[]>(["Model gateway"]);

  const toggle = (interest: string) => {
    setSelected((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest],
    );
  };

  return (
    <SiteShell variant="editorial">
      <PageHero
        index="01"
        label="Contact"
        meta="Replies / 1 business day"
        title={
          <>
            Talk to a human who has{" "}
            <span className="ed-display-italic">been on call.</span>
          </>
        }
        intro="Tell us what you are building and where the model layer hurts. A solutions engineer — not a lead-qualification bot — will reply within one business day."
        actions={
          <>
            <EdButton href="#form">Request a demo</EdButton>
            <EdButton to="/docs#quickstart" variant="ghost">
              Start building instead
            </EdButton>
          </>
        }
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-t border-rule py-4">
          {[
            ["Sales", "< 1 business day"],
            ["Support", "< 1 hour (Scale+)"],
            ["Security", "< 4 hours"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-baseline gap-2">
              <Label>{label}</Label>
              <span className="font-mono text-[9.5px] text-graphite-soft">
                {value}
              </span>
            </div>
          ))}
        </div>
      </PageHero>

      <section id="form" className="border-t border-rule py-12 lg:py-16">
        <Wrap wide>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="min-w-0 lg:col-span-7">
              <div className="border border-rule bg-paper-deep/20 p-6 sm:p-8">
                {submitted ? (
                  <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                    <span className="grid h-14 w-14 place-items-center border border-accent bg-accent-wash">
                      <Check className="h-6 w-6 text-accent" strokeWidth={2} />
                    </span>
                    <h2 className="ed-display mt-6 text-[2.4rem] leading-none tracking-[-0.04em]">
                      Message received.
                    </h2>
                    <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-graphite-soft">
                      A solutions engineer will reply within one business day.
                      If it is urgent, email{" "}
                      <a href="mailto:sales@ncs.dev" className="ed-link">
                        sales@ncs.dev
                      </a>
                      .
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="ed-btn ed-btn-ghost mt-7"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    <Label>Request a demo</Label>
                    <h2 className="ed-display mt-3 text-[2rem] leading-[1.02] tracking-[-0.04em]">
                      30 minutes, your use case,{" "}
                      <span className="ed-display-italic">no slide deck.</span>
                    </h2>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      <Field htmlFor="name" label="Full name">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Ada Lovelace"
                          className="ed-input"
                        />
                      </Field>
                      <Field htmlFor="email" label="Work email">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="ada@company.com"
                          className="ed-input"
                        />
                      </Field>
                      <Field htmlFor="company" label="Company">
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          autoComplete="organization"
                          placeholder="Northwind"
                          className="ed-input"
                        />
                      </Field>
                      <Field htmlFor="team" label="Team size">
                        <div className="relative">
                          <select
                            id="team"
                            name="team"
                            className="ed-input appearance-none pr-8"
                            defaultValue="11-50"
                          >
                            <option value="1-10">1–10</option>
                            <option value="11-50">11–50</option>
                            <option value="51-200">51–200</option>
                            <option value="201-1000">201–1,000</option>
                            <option value="1000+">1,000+</option>
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-quiet"
                            strokeWidth={1.5}
                          />
                        </div>
                      </Field>
                    </div>

                    <div className="mt-6">
                      <p className="ed-label mb-2">
                        What do you need help with?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => {
                          const active = selected.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggle(interest)}
                              aria-pressed={active}
                              className={`cursor-pointer rounded-full border px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] backdrop-blur-sm transition-colors ${
                                active
                                  ? "border-graphite bg-graphite text-paper"
                                  : "border-rule text-graphite-soft hover:border-graphite"
                              }`}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-6">
                      <Field htmlFor="message" label="What are you building?">
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          placeholder="We run 40M requests/month across three providers and need failover + cost control…"
                          className="w-full resize-none border border-rule bg-paper p-3 text-[13px] text-graphite outline-none transition-colors placeholder:text-quiet focus:border-accent"
                        />
                      </Field>
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <button type="submit" className="ed-btn">
                        Request a demo
                        <ArrowUpRight
                          className="h-3.5 w-3.5"
                          strokeWidth={1.5}
                        />
                      </button>
                      <p className="max-w-xs text-[10px] leading-relaxed text-quiet">
                        By submitting you agree to our privacy policy. We never
                        share your data.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="min-w-0 lg:col-span-5">
              <div className="border-t border-rule">
                <div className="py-5">
                  <Label>Direct lines</Label>
                  <div className="mt-3">
                    {[
                      ["Sales", "sales@ncs.dev", "Within 1 business day"],
                      ["Support", "support@ncs.dev", "Within 1 hour (Scale+)"],
                      ["Security", "security@ncs.dev", "Within 4 hours"],
                    ].map(([label, email, sla]) => (
                      <div
                        key={label}
                        className="border-b border-rule py-3 last:border-b-0"
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-quiet">
                            {label}
                          </span>
                          <span className="font-mono text-[8.5px] text-quiet">
                            {sla}
                          </span>
                        </div>
                        <a
                          href={`mailto:${email}`}
                          className="mt-1 block text-[12.5px] text-graphite transition-colors hover:text-accent"
                        >
                          {email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-rule py-5">
                  <Label>Offices</Label>
                  <div className="mt-3">
                    {offices.map((office) => (
                      <div
                        key={office.city}
                        className="flex items-baseline justify-between gap-4 border-b border-rule py-2.5 last:border-b-0"
                      >
                        <span className="text-[12.5px] text-graphite">
                          {office.city}
                        </span>
                        <span className="font-mono text-[9px] text-quiet">
                          {office.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-rule py-5">
                  <Label>Security review?</Label>
                  <p className="mt-2 text-[12px] leading-relaxed text-graphite-soft">
                    We can share our SOC 2 report, DPA, pentest summary, and
                    data-flow diagram under NDA.
                  </p>
                  <div className="mt-3">
                    <TextLink to="/company#security">
                      Visit the trust center
                    </TextLink>
                  </div>
                </div>

                <div className="mt-4 border border-rule bg-paper-deep/30 p-5">
                  <Label>Already building?</Label>
                  <p className="mt-2 text-[12px] leading-relaxed text-graphite-soft">
                    Skip the call. Create a free workspace and route your first
                    request in about five minutes.
                  </p>
                  <div className="mt-3">
                    <TextLink to="/docs#quickstart">
                      Read the quickstart
                    </TextLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>
    </SiteShell>
  );
}
