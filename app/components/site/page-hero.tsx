import { Container } from "./section";
import { eyebrow as eyebrowClass, Tag } from "./ui";

export function PageHero({
  eyebrow: kicker,
  title,
  description,
  children,
  align = "center",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] pt-16 pb-16 sm:pt-24 sm:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-fade opacity-70" />
        <div className="aurora-blob left-[8%] top-[-18%] h-72 w-72 bg-violet-600/30" />
        <div className="aurora-blob aurora-blob--slow right-[4%] top-[-10%] h-80 w-80 bg-cyan-500/18" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container className="relative">
        <div
          className={
            align === "center"
              ? "mx-auto max-w-3xl text-center"
              : "max-w-3xl text-left"
          }
        >
          {kicker && (
            <div className="mb-5">
              <Tag className="border-violet-400/20 bg-violet-500/10 text-violet-200">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(196,181,253,0.9)]" />
                {kicker}
              </Tag>
            </div>
          )}
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.04]">
            {title}
          </h1>
          {description && (
            <p
              className={`mt-6 text-pretty text-base leading-relaxed text-slate-400 sm:text-lg ${
                align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
              }`}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </Container>
    </section>
  );
}

export function PageSectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={`${eyebrowClass} mb-3`}>{eyebrow}</p>}
      <h2 className="text-2xl font-semibold tracking-[-0.02em] text-white sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}
