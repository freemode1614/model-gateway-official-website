import { container, eyebrow } from "./ui";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`${container} ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow: kicker,
  title,
  description,
  align = "center",
  className = "",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}
    >
      {kicker && (
        <div
          className={`mb-4 flex items-center gap-2.5 ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="h-px w-6 bg-gradient-to-r from-transparent to-violet-400/70" />
          <span className={eyebrow}>{kicker}</span>
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-violet-400/70" />
        </div>
      )}
      <h2 className="text-balance text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.85rem] lg:leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-slate-400 sm:text-[17px]">
          {description}
        </p>
      )}
    </div>
  );
}
