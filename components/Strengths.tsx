import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StrengthsProps {
  strengths: string[];
}

export function Strengths({ strengths }: StrengthsProps) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111218] p-6 shadow-xl">
      <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 mb-4 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
        <CheckCircle2 className="h-4 w-4" />
        <span>What&apos;s Good</span>
      </div>

      <div className="space-y-3">
        {strengths.map((strength, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 rounded-lg border border-emerald-500/15 bg-emerald-950/10 p-3 text-sm text-zinc-200"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{strength}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
