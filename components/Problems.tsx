import React from "react";
import { AlertTriangle } from "lucide-react";
import { ProblemItem } from "@/types/analysis";

interface ProblemsProps {
  problems: ProblemItem[];
}

export function Problems({ problems }: ProblemsProps) {
  if (!problems || problems.length === 0) return null;

  // Prioritize high/medium severity
  const severityWeight = { high: 3, medium: 2, low: 1 };
  const sorted = [...problems].sort(
    (a, b) => (severityWeight[b.severity] || 0) - (severityWeight[a.severity] || 0)
  );

  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 shadow-xl flex flex-col">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-500 mb-5">
        <AlertTriangle className="h-4 w-4 text-rose-500" />
        <span>WHAT NEEDS FIXING</span>
      </div>

      <div className="space-y-3.5 flex-1">
        {sorted.slice(0, 6).map((item, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200 group">
            <span className="flex h-2 w-2 rounded-full bg-rose-500 flex-shrink-0 mt-1.5 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            <span className="leading-snug font-normal text-zinc-200">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
