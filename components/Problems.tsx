import React from "react";
import { ProblemItem } from "@/types/analysis";
import { AlertCircle, AlertTriangle, Info, ArrowRight } from "lucide-react";

interface ProblemsProps {
  problems: ProblemItem[];
}

export function Problems({ problems }: ProblemsProps) {
  if (!problems || problems.length === 0) return null;

  // Sort by severity: High first, then Medium, then Low
  const severityWeight = { high: 3, medium: 2, low: 1 };
  const sorted = [...problems].sort(
    (a, b) => (severityWeight[b.severity] || 0) - (severityWeight[a.severity] || 0)
  );

  const getSeverityBadge = (severity: "high" | "medium" | "low") => {
    switch (severity) {
      case "high":
        return (
          <span className="flex items-center gap-1 rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-rose-400 border border-rose-500/20">
            <AlertCircle className="h-3 w-3" />
            High
          </span>
        );
      case "medium":
        return (
          <span className="flex items-center gap-1 rounded bg-amber-500/10 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-amber-400 border border-amber-500/20">
            <AlertTriangle className="h-3 w-3" />
            Medium
          </span>
        );
      case "low":
        return (
          <span className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-zinc-400 border border-white/[0.08]">
            <Info className="h-3 w-3" />
            Low
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111218] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
          <AlertCircle className="h-4 w-4" />
          <span>What Needs Fixing ({sorted.length})</span>
        </div>
        <span className="text-[11px] font-mono text-zinc-400">Sorted by Severity</span>
      </div>

      <div className="space-y-4">
        {sorted.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-white/[0.08] bg-zinc-900/60 p-4 transition-colors hover:border-zinc-700"
          >
            <div className="flex items-center justify-between gap-3 mb-2">
              <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
              {getSeverityBadge(item.severity)}
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-3">
              {item.explanation}
            </p>

            <div className="rounded-md border border-white/[0.06] bg-zinc-950/70 p-3 text-xs">
              <span className="text-orange-400 font-mono font-semibold flex items-center gap-1.5 mb-1">
                <ArrowRight className="h-3 w-3" />
                Recommended fix:
              </span>
              <p className="text-zinc-300 pl-4 leading-relaxed font-mono text-[11px] sm:text-xs">
                {item.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
