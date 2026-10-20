// biome-ignore-all lint/suspicious/noArrayIndexKey: syntax highlighting is positional; line and token order is stable.

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export type CodeTab = {
  label: string;
  filename: string;
  language: string;
  code: string;
};

const TOKEN_RE =
  /(\/\/[^\n]*|#[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|^[\t ]*[A-Za-z_][\w.-]*(?=\s*:(?!\/\/))|\b(?:import|from|export|const|let|var|await|async|new|return|function|def|class|if|else|for|in|of|true|false|null|undefined|type|interface|curl|POST|GET)\b|\b\d+(?:\.\d+)?\b|--?[a-zA-Z][\w-]*)/gm;

const KEYWORDS = new Set([
  "import",
  "from",
  "export",
  "const",
  "let",
  "var",
  "await",
  "async",
  "new",
  "return",
  "function",
  "def",
  "class",
  "if",
  "else",
  "for",
  "in",
  "of",
  "true",
  "false",
  "null",
  "undefined",
  "type",
  "interface",
  "curl",
  "POST",
  "GET",
]);

function tokenClass(token: string) {
  if (token.startsWith("//") || token.startsWith("#")) {
    return "text-slate-600 italic";
  }
  if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
    return "text-emerald-300/90";
  }
  if (/^\d/.test(token)) return "text-amber-300/90";
  if (token.startsWith("-")) return "text-cyan-300/90";
  if (KEYWORDS.has(token)) return "text-violet-300";
  return "text-sky-300/90";
}

function highlight(code: string) {
  return code.split(TOKEN_RE).map((part, index) => {
    if (!part) return null;
    // With a single capture group, odd entries are the matched tokens.
    if (index % 2 === 0) return <span key={index}>{part}</span>;
    return (
      <span key={index} className={tokenClass(part)}>
        {part}
      </span>
    );
  });
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked — the code is still selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="inline-flex h-7 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 text-[11px] text-slate-400 transition-colors hover:border-white/20 hover:text-white"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3 text-acid" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy
        </>
      )}
    </button>
  );
}

function TrafficLights() {
  return (
    <div className="hidden items-center gap-1.5 sm:flex" aria-hidden="true">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
    </div>
  );
}

export function CodeTabs({
  tabs,
  className = "",
  compact = false,
}: {
  tabs: CodeTab[];
  className?: string;
  compact?: boolean;
}) {
  const [active, setActive] = useState(0);
  const tab = tabs[active] ?? tabs[0];
  if (!tab) return null;

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#070911]/95 shadow-2xl shadow-black/50 backdrop-blur ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5">
        <TrafficLights />
        <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
          {tabs.map((item, index) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                index === active
                  ? "bg-white/[0.08] text-white"
                  : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-wider text-slate-600 md:block">
          {tab.filename}
        </span>
        <CopyButton code={tab.code} />
      </div>

      <pre
        className={`code-scroll overflow-x-auto p-4 font-mono text-[12.5px] leading-[1.75] text-slate-300 sm:p-5 ${
          compact ? "max-h-[340px]" : ""
        }`}
      >
        <code>
          {tab.code.split("\n").map((line, index) => (
            <span key={index} className="flex">
              <span
                aria-hidden="true"
                className="mr-4 inline-block w-6 shrink-0 select-none text-right text-slate-700"
              >
                {index + 1}
              </span>
              <span className="whitespace-pre">{highlight(line)}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

export function CodeBlock({
  code,
  language,
  filename,
  className = "",
  compact = false,
}: {
  code: string;
  language: string;
  filename: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <CodeTabs
      tabs={[{ label: language, language, filename, code }]}
      className={className}
      compact={compact}
    />
  );
}
