import { Link } from "react-router";

export function EditorialMark({
  className = "h-7 w-7",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="0.5"
        y="0.5"
        width="31"
        height="31"
        rx="9"
        stroke="currentColor"
        strokeOpacity="0.85"
      />
      <path
        d="M8 25V14a8 8 0 0 1 16 0v11"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 25v-8a3 3 0 0 1 6 0v8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.65"
      />
    </svg>
  );
}

export function EditorialLogo({
  className = "",
  tone = "ink",
  showMark = true,
}: {
  className?: string;
  tone?: "ink" | "paper";
  showMark?: boolean;
}) {
  const paper = tone === "paper";
  return (
    <Link
      to="/"
      aria-label="NCS Model Gateway home"
      className={`group inline-flex items-end gap-2.5 ${paper ? "text-paper" : "text-graphite"} ${className}`}
    >
      {showMark && (
        <EditorialMark className="mb-0.5 h-7 w-7 shrink-0 transition-transform duration-500 group-hover:rotate-90" />
      )}
      <span className="font-display text-[27px] font-medium leading-none tracking-[-0.045em]">
        NCS
      </span>
      <span
        className={`mb-1.5 h-3.5 w-px ${paper ? "bg-paper/30" : "bg-rule"}`}
        aria-hidden="true"
      />
      <span className={`ed-label mb-1 ${paper ? "text-paper/60" : ""}`}>
        Model Gateway
      </span>
    </Link>
  );
}
