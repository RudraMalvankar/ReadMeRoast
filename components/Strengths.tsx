import React from "react";
import { Check } from "lucide-react";

interface StrengthsProps {
  strengths: string[];
}

export function Strengths({ strengths }: StrengthsProps) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 shadow-xl flex flex-col">
      <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-5">
        <Check className="h-4 w-4 text-emerald-400" />
        <span>WHAT&apos;S GOOD</span>
      </div>

      <div className="space-y-3.5 flex-1">
        {strengths.slice(0, 6).map((strength, idx) => (
          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
            <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{strength}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
