import React from "react";
import { ArrowRight } from "lucide-react";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 shadow-xl flex flex-col justify-between">
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-5">
        TOP RECOMMENDATIONS
      </div>

      <div className="space-y-3 flex-1">
        {recommendations.slice(0, 5).map((rec, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={idx}
              className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-[#131620] px-4 py-3 text-xs sm:text-sm text-zinc-200 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber-400 rounded bg-amber-500/10 px-1.5 py-0.5 border border-amber-500/20">
                  {num}
                </span>
                <span className="leading-snug">{rec}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
