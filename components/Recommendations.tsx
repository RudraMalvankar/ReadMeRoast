import React from "react";
import { Wrench, CheckCircle } from "lucide-react";

interface RecommendationsProps {
  recommendations: string[];
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111218] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
          <Wrench className="h-4 w-4" />
          <span>Fix These First (Priority Action Plan)</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">High-ROI Updates</span>
      </div>

      <div className="space-y-2.5">
        {recommendations.map((rec, idx) => {
          const num = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-zinc-900/50 p-3 text-sm text-zinc-200"
            >
              <span className="font-mono text-xs font-bold text-orange-400 flex-shrink-0 mt-0.5 rounded bg-orange-500/10 px-1.5 py-0.5 border border-orange-500/20">
                {num}
              </span>
              <span className="leading-snug">{rec}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
