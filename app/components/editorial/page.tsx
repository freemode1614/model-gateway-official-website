import type { ReactNode } from "react";
import { Label, SectionTag, Wrap } from "./primitives";

export function PageHero({
  index,
  label,
  title,
  intro,
  meta,
  actions,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="ed-gridlines pointer-events-none absolute inset-0"
      />
      <Wrap wide className="relative">
        <div className="flex items-center justify-between border-b border-rule py-4">
          <SectionTag index={index}>{label}</SectionTag>
          {meta ? <Label className="hidden sm:block">{meta}</Label> : null}
        </div>

        <div className="grid gap-8 pb-12 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-14">
          <div className="min-w-0 lg:col-span-8">
            <h1 className="ed-display ed-h1">{title}</h1>
            {actions ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                {actions}
              </div>
            ) : null}
          </div>
          <div className="min-w-0 lg:col-span-4 lg:pt-2">
            <p className="ed-body">{intro}</p>
          </div>
        </div>

        {children}
      </Wrap>
    </section>
  );
}

export function SectionHeader({
  index,
  label,
  title,
  intro,
  className = "",
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-8 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <div className="lg:col-span-3">
        <SectionTag index={index}>{label}</SectionTag>
      </div>
      <div className="min-w-0 lg:col-span-6">
        <h2 className="ed-display ed-h2">{title}</h2>
      </div>
      <div className="min-w-0 lg:col-span-3 lg:pt-2">
        {intro ? <p className="ed-small text-graphite-soft">{intro}</p> : null}
      </div>
    </div>
  );
}

export function SpecStrip({
  items,
  className = "",
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 border-t border-rule lg:grid-cols-4 ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={item.label}
          className={`py-6 ${
            index !== 0 ? "lg:border-l lg:border-rule lg:pl-6" : ""
          } ${index % 2 === 1 ? "border-l border-rule pl-5 lg:pl-6" : ""} ${
            index > 1 ? "border-t border-rule lg:border-t-0" : ""
          }`}
        >
          <p className="font-display text-[1.85rem] leading-none tracking-[-0.03em]">
            {item.value}
          </p>
          <p className="ed-label mt-2">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export function PageSection({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-t border-rule py-16 lg:py-24 ${className}`}
    >
      <Wrap wide>{children}</Wrap>
    </section>
  );
}
