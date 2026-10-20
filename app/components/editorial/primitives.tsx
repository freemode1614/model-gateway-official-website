import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "react-router";

export function Wrap({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div className={`ed-wrap ${wide ? "ed-wrap-wide" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Label({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`ed-label ${className}`}>{children}</span>;
}

export function SectionTag({
  index,
  children,
  className = "",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="ed-mono text-[10px] font-medium tracking-[0.14em] text-accent">
        {index}
      </span>
      <span className="h-px w-7 bg-rule" aria-hidden="true" />
      <Label>{children}</Label>
    </div>
  );
}

export function Corners({
  tone = "ink",
  className = "",
}: {
  tone?: "ink" | "paper";
  className?: string;
}) {
  const color = tone === "paper" ? "border-paper/35" : "border-graphite/40";
  const positions = [
    "left-0 top-0 border-l border-t",
    "right-0 top-0 border-r border-t",
    "bottom-0 left-0 border-b border-l",
    "bottom-0 right-0 border-b border-r",
  ];
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    >
      {positions.map((position) => (
        <span
          key={position}
          className={`absolute h-2 w-2 ${color} ${position}`}
        />
      ))}
    </div>
  );
}

export function FigureCaption({
  index,
  children,
  className = "",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-4 flex gap-3 text-[11.5px] leading-relaxed text-quiet ${className}`}
    >
      <span className="ed-mono shrink-0 pt-px text-accent">{index}</span>
      <span>{children}</span>
    </p>
  );
}

type ButtonVariant = "solid" | "ghost" | "paper";

export function EdButton({
  to,
  href,
  children,
  variant = "solid",
  className = "",
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
}) {
  const classes = [
    "ed-btn",
    variant === "ghost" ? "ed-btn-ghost" : "",
    variant === "paper" ? "ed-btn-paper" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick}>
      {children}
    </a>
  );
}

export function TextLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`ed-link inline-flex items-center gap-1.5 ${className}`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
    </Link>
  );
}
