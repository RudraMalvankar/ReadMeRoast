import React from "react";
import { Flame, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";

export function HeroPreview() {
  return (
    <div className="relative mx-auto mt-12 w-full max-w-3xl">
      {/* Background glow accent */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-rose-500/10 blur-xl opacity-50" />

      {/* Main Preview Container */}
      <div className="relative rounded-xl border border-white/[0.1] bg-[#111218] p-6 shadow-2xl">
        {/* Mock Window Top Bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-5 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-zinc-300">sample / demo-toolkit</span>
          </div>
          <span className="rounded bg-orange-500/10 px-2 py-0.5 text-orange-400 font-medium text-[11px] border border-orange-500/20">
            Preview Output
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Score Circle Left */}
          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-lg bg-zinc-900/60 border border-white/[0.06] text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">
              README SCORE
            </span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-5xl font-black tracking-tight text-white">72</span>
              <span className="text-sm font-semibold text-zinc-400">/ 100</span>
            </div>
            <span className="mt-2 text-xs font-medium text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
              Room for improvement
            </span>
            <span className="mt-2 text-[11px] text-zinc-400 leading-tight">
              Good foundation, but critical onboarding gaps detected.
            </span>
          </div>

          {/* Roast & Diagnostics Right */}
          <div className="md:col-span-8 flex flex-col space-y-4">
            <div className="rounded-lg border border-orange-500/20 bg-orange-950/20 p-4">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-orange-400 uppercase tracking-wide font-mono">
                <Flame className="h-3.5 w-3.5" />
                <span>The Roast</span>
              </div>
              <p className="mt-1.5 text-sm text-zinc-200 italic font-mono leading-relaxed">
                &ldquo;Your README has more decorative CI badges than actual installation instructions. Bold strategy for an onboarding page.&rdquo;
              </p>
            </div>

            {/* Quick Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2 rounded-md bg-emerald-950/20 border border-emerald-500/20 px-3 py-2 text-emerald-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span><strong>4</strong> strengths</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-amber-950/20 border border-amber-500/20 px-3 py-2 text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                <span><strong>3</strong> problems</span>
              </div>
              <div className="flex items-center gap-2 rounded-md bg-zinc-900 border border-white/[0.08] px-3 py-2 text-zinc-300">
                <ArrowRight className="h-4 w-4 text-orange-400 flex-shrink-0" />
                <span><strong>5</strong> fixes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
