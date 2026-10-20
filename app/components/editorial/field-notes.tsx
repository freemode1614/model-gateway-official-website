import { Label, SectionTag, TextLink, Wrap } from "./primitives";

const notes = [
  {
    index: "01",
    quote:
      "We cut model spend by 41% in the first quarter without downgrading a single customer-facing answer. The routing policy did it — not a re-architecture.",
    name: "Elena Park",
    role: "VP Platform, Northstar",
  },
  {
    index: "02",
    quote:
      "The first time legal asked where a prompt went, we had the answer in seconds. That used to take a week.",
    name: "Marcus Bell",
    role: "Head of AI, Meridian Health",
  },
  {
    index: "03",
    quote:
      "Portico is the only vendor that didn’t ask us to move our data. The gate sits in our VPC.",
    name: "Priya Raman",
    role: "CTO, Ledgerline",
  },
];

export function FieldNotes() {
  return (
    <section id="notes" className="border-t border-rule py-16 lg:py-24">
      <Wrap wide>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <SectionTag index="07">Field notes</SectionTag>
          </div>
          <div className="lg:col-span-6">
            <h2 className="ed-display ed-h2">
              What changes when the{" "}
              <span className="ed-display-italic">gate is in the path.</span>
            </h2>
          </div>
          <div className="lg:col-span-3 lg:pt-2">
            <p className="ed-small text-graphite-soft">
              Three accounts from teams running production traffic through
              Portico. Names and numbers are theirs; the mistakes were ours.
            </p>
          </div>
        </div>

        <figure className="mt-12 grid gap-6 border-t border-rule pt-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Label>Note 01 / 03</Label>
          </div>
          <blockquote className="lg:col-span-7">
            <p className="font-display text-[1.75rem] leading-[1.18] tracking-[-0.03em] text-graphite sm:text-[2.35rem]">
              “{notes[0].quote}”
            </p>
            <footer className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-[12.5px] font-medium text-graphite">
                {notes[0].name}
              </span>
              <span className="h-1 w-1 bg-accent" aria-hidden="true" />
              <span className="ed-mono text-[9.5px] uppercase tracking-[0.1em] text-quiet">
                {notes[0].role}
              </span>
            </footer>
          </blockquote>
          <div className="lg:col-span-3 lg:pt-1">
            <div className="border-t border-rule pt-3">
              <Label>Outcome</Label>
              <p className="mt-2 font-display text-[2rem] leading-none tracking-[-0.03em] text-accent">
                41%
              </p>
              <p className="ed-small mt-1 text-graphite-soft">
                lower model spend, same quality bar
              </p>
            </div>
          </div>
        </figure>

        <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2 lg:ml-[16.666%] lg:gap-16">
          {notes.slice(1).map((note) => (
            <figure key={note.index}>
              <Label>Note {note.index} / 03</Label>
              <blockquote className="mt-3">
                <p className="font-display text-[1.25rem] leading-[1.3] tracking-[-0.02em] text-graphite">
                  “{note.quote}”
                </p>
                <footer className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <span className="text-[12px] font-medium text-graphite">
                    {note.name}
                  </span>
                  <span className="h-1 w-1 bg-accent" aria-hidden="true" />
                  <span className="ed-mono text-[9px] uppercase tracking-[0.1em] text-quiet">
                    {note.role}
                  </span>
                </footer>
              </blockquote>
            </figure>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <TextLink to="/company#customers">Read the customer index</TextLink>
        </div>
      </Wrap>
    </section>
  );
}
