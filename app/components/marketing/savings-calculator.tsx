import { ArrowDown, Coins } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { btnSmall, btnViolet } from "../site/ui";
import { Counter } from "./counter";

const mixes = [
  { id: "quality", label: "Quality first", savings: 0.35 },
  { id: "balanced", label: "Balanced", savings: 0.58 },
  { id: "cost", label: "Cost first", savings: 0.72 },
] as const;

export function SavingsCalculator() {
  const [requests, setRequests] = useState(20);
  const [tokens, setTokens] = useState(1200);
  const [mix, setMix] = useState<(typeof mixes)[number]["id"]>("balanced");

  const savingsRate = mixes.find((item) => item.id === mix)?.savings ?? 0.58;

  const { current, routed, saved } = useMemo(() => {
    const premiumPerMillion = 8;
    const baseline = requests * tokens * premiumPerMillion;
    const after = baseline * (1 - savingsRate);
    return { current: baseline, routed: after, saved: baseline - after };
  }, [requests, tokens, savingsRate]);

  const money = (value: number) =>
    `$${Math.round(value).toLocaleString("en-US")}`;

  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.09] bg-[#070911]/80">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="border-b border-white/[0.07] p-6 sm:p-8 lg:border-b-0 lg:border-r">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Estimate your savings
          </p>
          <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">
            Your traffic, routed smarter.
          </h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-slate-500">
            A rough model based on customer medians: 35–72% lower token spend
            after routing, caching, and fallbacks.
          </p>

          <div className="mt-7 space-y-6">
            <div>
              <div className="mb-2 flex items-center justify-between text-[11.5px]">
                <label htmlFor="calc-requests" className="text-slate-400">
                  Monthly requests
                </label>
                <span className="font-mono text-white">{requests}M</span>
              </div>
              <input
                id="calc-requests"
                type="range"
                min={1}
                max={200}
                step={1}
                value={requests}
                onChange={(event) => setRequests(Number(event.target.value))}
                className="h-1.5 w-full cursor-pointer accent-violet-500"
              />
              <div className="mt-1 flex justify-between text-[9px] text-slate-600">
                <span>1M</span>
                <span>200M</span>
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-[11.5px]">
                <label htmlFor="calc-tokens" className="text-slate-400">
                  Average tokens / request
                </label>
                <span className="font-mono text-white">
                  {tokens.toLocaleString("en-US")}
                </span>
              </div>
              <input
                id="calc-tokens"
                type="range"
                min={200}
                max={8000}
                step={100}
                value={tokens}
                onChange={(event) => setTokens(Number(event.target.value))}
                className="h-1.5 w-full cursor-pointer accent-violet-500"
              />
              <div className="mt-1 flex justify-between text-[9px] text-slate-600">
                <span>200</span>
                <span>8,000</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-[11.5px] text-slate-400">
                Optimization mix
              </p>
              <div className="flex flex-wrap gap-1.5">
                {mixes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMix(item.id)}
                    aria-pressed={mix === item.id}
                    className={`rounded-full border px-3 py-1.5 text-[10.5px] transition-all ${
                      mix === item.id
                        ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                        : "border-white/10 bg-white/[0.03] text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden p-6 sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-600/15 blur-3xl"
          />
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
            Estimated monthly savings
          </p>
          <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            <Counter value={saved} prefix="$" />
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            ≈ <span className="text-acid">{money(saved * 12)}</span> saved per
            year
          </p>

          <div className="mt-7 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-[10.5px]">
                <span className="text-slate-500">Current spend</span>
                <span className="font-mono text-slate-300">
                  {money(current)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-rose-500/70 to-rose-400/40" />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-[10.5px]">
                <span className="text-slate-500">With Model Gateway</span>
                <span className="font-mono text-acid">{money(routed)}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                  style={{ width: `${(1 - savingsRate) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-xl border border-acid/15 bg-acid/[0.05] px-3 py-2.5 text-[10.5px] text-slate-400">
            <ArrowDown className="h-3.5 w-3.5 text-acid" />
            <span className="font-semibold text-acid">
              {Math.round(savingsRate * 100)}% lower
            </span>
            token cost at the same answer quality
          </div>

          <Link
            to="/docs#quickstart"
            className={`${btnViolet} ${btnSmall} mt-6 w-full`}
          >
            <Coins className="h-3.5 w-3.5" />
            Start free
          </Link>

          <p className="mt-3 text-center text-[9px] text-slate-600">
            Illustrative. Baseline: $8 / 1M blended tokens.
          </p>
        </div>
      </div>
    </div>
  );
}
