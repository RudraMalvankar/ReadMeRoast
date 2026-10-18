import React from "react";
import { Flame, Quote } from "lucide-react";

export function ExampleRoasts() {
  const roasts = [
    {
      repo: "badge-collector / ui-kit",
      score: 58,
      quote: "Your README has more decorative status badges than actual installation instructions. Bold strategy.",
      highlight: "Missing Quick Start",
    },
    {
      repo: "cryptic-core / fast-orm",
      score: 44,
      quote: "The project looks promising. Unfortunately, figuring out how to run it feels like an archaeological expedition.",
      highlight: "Zero Usage Examples",
    },
    {
      repo: "stealth-agent / runner",
      score: 63,
      quote: "Installation instructions are currently operating on a strictly need-to-know basis. And right now, nobody knows.",
      highlight: "Missing Env Vars",
    },
  ];

  return (
    <section className="py-16 border-t border-white/[0.08]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
            Real Developer Humor
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Constructive, Savage, Honest
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
            We roast the documentation, never the developer. Every roast is backed by concrete diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roasts.map((roast) => (
            <div
              key={roast.repo}
              className="flex flex-col justify-between rounded-xl border border-white/[0.08] bg-[#111218] p-5 relative"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3 border-b border-white/[0.06] pb-2.5">
                  <span className="truncate max-w-[160px]">{roast.repo}</span>
                  <span className="text-amber-400 font-bold">{roast.score}/100</span>
                </div>
                <div className="text-orange-400/80 mb-2">
                  <Quote className="h-5 w-5 rotate-180" />
                </div>
                <p className="text-sm text-zinc-200 font-mono italic leading-relaxed">
                  &ldquo;{roast.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-zinc-500 font-mono text-[11px]">Identified issue:</span>
                <span className="text-rose-400 font-medium font-mono text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  {roast.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
