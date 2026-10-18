"use client";

import React, { useEffect, useState } from "react";
import { Flame, Check, Loader2 } from "lucide-react";

interface LoadingAnalysisProps {
  repoUrl: string;
}

const STAGES = [
  "Found repository",
  "Retrieved README",
  "Parsed documentation structure",
  "Checking clarity & onboarding flow",
  "Looking for missing setup & usage sections",
  "Finding documentation blindspots",
  "Writing the roast with Gemma",
  "Calculating 7-dimension score",
];

export function LoadingAnalysis({ repoUrl }: LoadingAnalysisProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto my-12 w-full max-w-xl rounded-xl border border-white/[0.1] bg-[#111218] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-3 border-b border-white/[0.08] pb-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
          <Flame className="h-5 w-5 animate-pulse" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            ReadMeRoast is getting to work
          </h2>
          <p className="text-xs font-mono text-zinc-400 truncate max-w-sm mt-0.5">
            Target: {repoUrl}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const isPending = idx > currentStage;

          return (
            <div
              key={stage}
              className={`flex items-center gap-3 text-xs sm:text-sm font-mono transition-all duration-300 ${
                isDone
                  ? "text-zinc-400"
                  : isCurrent
                  ? "text-orange-400 font-semibold"
                  : "text-zinc-600"
              }`}
            >
              <div className="flex h-5 w-5 items-center justify-center flex-shrink-0">
                {isDone ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="h-4 w-4 animate-spin text-orange-400" />
                ) : (
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
                )}
              </div>
              <span className={isCurrent ? "translate-x-0.5 transition-transform" : ""}>
                {stage}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
        <span>Powered by Gemma 2</span>
        <span>Estimated: ~8-12 seconds</span>
      </div>
    </div>
  );
}
