import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Label, SectionTag, TextLink, Wrap } from "./primitives";

export type FaqItem = {
  q: string;
  a: ReactNode;
};

export function FaqBlock({
  id = "faq",
  index,
  label = "Questions",
  title,
  intro,
  items,
  contactTo = "/contact",
  contactLabel = "Ask us something else",
  response = "< 4 hours · Mon–Fri, 09:00–18:00 ET",
  openFirst = true,
  className = "",
}: {
  id?: string;
  index: string;
  label?: string;
  title: ReactNode;
  intro: ReactNode;
  items: FaqItem[];
  contactTo?: string;
  contactLabel?: string;
  response?: string;
  openFirst?: boolean;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-rule py-16 lg:py-24 ${className}`}
    >
      <Wrap wide>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTag index={index}>{label}</SectionTag>
              <h2 className="ed-display ed-h2 mt-6">{title}</h2>
              <p className="ed-body mt-5 max-w-sm">{intro}</p>
              <div className="mt-6">
                <TextLink to={contactTo}>{contactLabel}</TextLink>
              </div>
              <div className="mt-10 border-t border-rule pt-4">
                <Label>Response time</Label>
                <p className="ed-mono mt-2 text-[11px] text-graphite-soft">
                  {response}
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="border-t border-rule">
              {items.map((item, itemIndex) => (
                <details
                  key={item.q}
                  className="ed-faq border-b border-rule"
                  open={openFirst && itemIndex === 0}
                >
                  <summary className="flex items-start justify-between gap-6 py-5">
                    <span className="flex items-baseline gap-4">
                      <span className="ed-mono text-[9px] text-quiet">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.15rem] leading-snug tracking-[-0.02em] text-graphite sm:text-[1.3rem]">
                        {item.q}
                      </span>
                    </span>
                    <Plus
                      className="ed-faq-plus mt-0.5 h-4 w-4 shrink-0 text-quiet"
                      strokeWidth={1.5}
                    />
                  </summary>
                  <div className="max-w-2xl pb-6 pl-8 pr-8 text-[13.5px] leading-relaxed text-graphite-soft">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
