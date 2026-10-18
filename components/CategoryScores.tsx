import React from "react";
import { CategoryScores as CategoryScoresType } from "@/types/analysis";

interface CategoryScoresProps {
  scores: CategoryScoresType;
}

const CATEGORY_ITEMS: Array<{ key: keyof CategoryScoresType; label: string }> = [
  { key: "clarity", label: "Clarity" },
  { key: "documentation", label: "Documentation" },
  { key: "setup", label: "Setup" },
  { key: "usage", label: "Usage" },
  { key: "examples", label: "Examples" },
  { key: "visuals", label: "Visuals" },
  { key: "developerExperience", label: "Developer Experience" },
];

export function CategoryScores({ scores }: CategoryScoresProps) {
  const getColorClass = (val: number) => {
    if (val >= 70) return { bar: "bg-emerald-400", text: "text-emerald-400" };
    if (val >= 55) return { bar: "bg-amber-400", text: "text-amber-400" };
    return { bar: "bg-rose-500", text: "text-rose-400" };
  };

  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 shadow-xl flex flex-col">
      <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-5">
        README HEALTH
      </div>

      <div className="space-y-3.5 flex-1">
        {CATEGORY_ITEMS.map(({ key, label }) => {
          const val = scores[key] ?? 50;
          const { bar, text } = getColorClass(val);

          return (
            <div key={key} className="flex items-center justify-between gap-3 text-xs font-mono">
              <span className="w-28 text-zinc-300 font-sans truncate">{label}</span>

              {/* Progress bar */}
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className={`h-full ${bar} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${Math.max(6, val)}%` }}
                />
              </div>

              {/* Score number */}
              <span className={`w-8 text-right font-bold ${text}`}>{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
