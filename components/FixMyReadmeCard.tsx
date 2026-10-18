"use client";

import React from "react";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

interface FixMyReadmeCardProps {
  onTriggerFix: () => void;
  isLoading?: boolean;
  isGenerated?: boolean;
}

export function FixMyReadmeCard({
  onTriggerFix,
  isLoading = false,
  isGenerated = false,
}: FixMyReadmeCardProps) {
  return (
    <div className="h-full rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#2a1408] via-[#1a1215] to-[#10131c] p-6 sm:p-7 shadow-xl flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
          <Sparkles className="h-5 w-5 text-orange-400" />
          <span>Fix My README</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-sm">
          Turn this roast into a README you can actually ship. Zero hallucinations guaranteed.
        </p>
      </div>

      <div className="pt-6 flex items-center justify-between gap-4 border-t border-white/[0.06] mt-4">
        <span className="text-[11px] font-mono text-zinc-400">
          {isLoading
            ? "Synthesizing with Gemma..."
            : isGenerated
            ? "README generated below"
            : "On-demand AI rewrite"}
        </span>

        <button
          type="button"
          onClick={onTriggerFix}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-5 py-3 text-sm font-bold text-white shadow-xl hover:scale-105 active:scale-95 disabled:opacity-60 transition-all cursor-pointer flex-shrink-0"
          title="Generate Improved README"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Generating...</span>
            </>
          ) : isGenerated ? (
            <>
              <span>Regenerate</span>
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <span>Fix My README</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
