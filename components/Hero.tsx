import React from "react";
import { RepoInput } from "./RepoInput";
import { Flame, Sparkles, ShieldCheck } from "lucide-react";
import { HeroPreview } from "./HeroPreview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/10 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center">
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-medium text-orange-400 mb-6">
          <Flame className="h-3.5 w-3.5 text-orange-400 fill-orange-400" />
          <span>Automated Documentation Roasting & Fixing</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-3xl mx-auto leading-[1.1]">
          Your README is probably bad.{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">
            Let&apos;s find out. 🔥
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Paste a public GitHub repository. We&apos;ll score your README, roast it with Gemma open-weight AI,
          and tell you exactly what to fix.
        </p>

        {/* Main Input Form */}
        <div className="mt-8">
          <RepoInput />
        </div>

        {/* Small Supporting Text */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Public GitHub repositories
          </span>
          <span>•</span>
          <span>Powered by Gemma 2</span>
          <span>•</span>
          <span>No signup required</span>
        </div>

        {/* Interactive Preview Teaser */}
        <HeroPreview />
      </div>
    </section>
  );
}
