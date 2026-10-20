import { Check, Copy } from "lucide-react";
import { type ReactNode, useState } from "react";

export type CodeSample = {
  label: string;
  filename: string;
  code: string;
};

function splitComment(line: string): { code: string; comment: string } {
  let quote: '"' | "'" | "`" | null = null;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (quote) {
      if (character === "\\") {
        index += 1;
        continue;
      }
      if (character === quote) quote = null;
      continue;
    }

    if (character === '"' || character === "'" || character === "`") {
      quote = character;
      continue;
    }

    if (character === "#") {
      return { code: line.slice(0, index), comment: line.slice(index) };
    }

    if (character === "/" && line[index + 1] === "/") {
      return { code: line.slice(0, index), comment: line.slice(index) };
    }
  }

  return { code: line, comment: "" };
}

function tokenize(line: string) {
  const { code, comment } = splitComment(line);
  const parts = code.split(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
  );
  let offset = 0;

  return (
    <>
      {parts.map((part) => {
        const key = `${offset}-${part}`;
        offset += part.length;
        return part.startsWith('"') ||
          part.startsWith("'") ||
          part.startsWith("`") ? (
          <span key={key} className="text-[#e4764f]">
            {part}
          </span>
        ) : (
          <span key={key}>{part}</span>
        );
      })}
      {comment ? <span className="text-paper/30">{comment}</span> : null}
    </>
  );
}

export function EditorialCode({
  tabs,
  footerLeft = "Copy · paste · run",
  footerRight,
  compact = false,
  className = "",
}: {
  tabs: CodeSample[];
  footerLeft?: string;
  footerRight?: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  const [activeLabel, setActiveLabel] = useState(tabs[0]?.label);
  const [copied, setCopied] = useState(false);
  const active = tabs.find((tab) => tab.label === activeLabel) ?? tabs[0];
  const multiple = tabs.length > 1;

  if (!active) return null;

  let lineOffset = 0;
  const lines = active.code.split("\n").map((text, lineNumber) => {
    const line = {
      text,
      id: `line-${lineOffset}`,
      number: lineNumber + 1,
    };
    lineOffset += text.length + 1;
    return line;
  });

  const copy = async () => {
    const fallback = () => {
      const textarea = document.createElement("textarea");
      textarea.value = active.code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    };

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(active.code);
      } else if (!fallback()) {
        throw new Error("Copy unavailable");
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(fallback());
    }
  };

  return (
    <div
      className={`max-w-full border border-rule bg-paper-deep/40 ${className}`}
    >
      <div className="flex items-end justify-between gap-4 border-b border-rule px-4 pt-3">
        <div className="flex min-w-0 gap-6 overflow-x-auto">
          {multiple ? (
            tabs.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveLabel(tab.label)}
                data-active={active.label === tab.label}
                className="ed-tab shrink-0"
              >
                {tab.label}
              </button>
            ))
          ) : (
            <span className="pb-2 font-mono text-[10px] text-quiet">
              {active.filename}
            </span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3 pb-2">
          {multiple ? (
            <span className="hidden font-mono text-[9px] uppercase tracking-[0.12em] text-quiet sm:block">
              {active.filename}
            </span>
          ) : null}
          <button
            type="button"
            onClick={copy}
            aria-label="Copy code"
            className="grid h-7 w-7 cursor-pointer place-items-center border border-rule text-quiet transition-colors hover:border-graphite hover:text-graphite"
          >
            {copied ? (
              <Check className="h-3 w-3" strokeWidth={1.7} />
            ) : (
              <Copy className="h-3 w-3" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <div className="ed-code max-w-full overflow-x-auto">
        <pre
          className={`font-mono ${
            compact
              ? "min-w-[30rem] px-4 py-4 text-[10.5px] leading-[1.65]"
              : "min-w-[34rem] px-4 py-5 text-[11.5px] leading-[1.75]"
          }`}
        >
          <code>
            {lines.map((line) => (
              <span key={line.id} className="ed-code-line">
                <span className="ed-code-num">
                  {String(line.number).padStart(2, "0")}
                </span>
                <span className="whitespace-pre">{tokenize(line.text)}</span>
              </span>
            ))}
          </code>
        </pre>

        <div className="flex items-center justify-between gap-4 border-t border-paper/10 px-4 py-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-paper/30">
            {copied ? "Copied to clipboard" : footerLeft}
          </span>
          <span className="font-mono text-[9px] text-paper/30">
            <span className="sm:hidden">Scroll →</span>
            {footerRight ? (
              <span className="hidden sm:inline">{footerRight}</span>
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
}
