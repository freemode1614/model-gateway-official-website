import { Link } from "react-router";

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-violet-500 via-indigo-500 to-cyan-400 shadow-[0_0_28px_-6px_rgba(139,92,246,0.8)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[62%] w-[62%]">
        <title>NCS</title>
        <path
          d="M4.5 20.5V11a7.5 7.5 0 0 1 15 0v9.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9.5 20.5v-7.6a2.5 2.5 0 0 1 5 0v7.6"
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="12" cy="4.4" r="1.35" fill="white" />
      </svg>
    </span>
  );
}

export function Logo({
  className = "",
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="NCS Model Gateway home"
    >
      <LogoMark />
      {showWordmark && (
        <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
          ncs
          <span className="text-violet-400 transition-colors group-hover:text-cyan-300">
            .
          </span>
        </span>
      )}
    </Link>
  );
}
