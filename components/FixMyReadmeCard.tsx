"use client";

import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

interface FixMyReadmeCardProps {
  onTriggerFix: () => void;
  isLoading?: boolean;
}

export function FixMyReadmeCard({ onTriggerFix, isLoading = false }: FixMyReadmeCardProps) {
  return (
    <div className="h-full rounded-2xl border border-orange-500/30 bg-gradient-to-br from-[#2a1408] via-[#1a1215] to-[#10131c] p-6 sm:p-8 shadow-xl flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
          <Sparkles className="h-5 w-5 text-orange-400" />
          <span>Fix My README</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xs">
          Turn this roast into a README you can actually ship.
        </p>
      </div>

      <div className="pt-6 flex justify-end">
        <button
          type="button"
          onClick={onTriggerFix}
          disabled={isLoading}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f97316] hover:bg-[#ea580c] text-white shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
          title="Generate Improved README"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <ArrowRight className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );
}
