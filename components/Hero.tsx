"use client";

import React from "react";
import { RepoInput } from "./RepoInput";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-20">
      {/* Background subtle radial gradient */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-orange-500/10 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
        {/* Main Headline Container with Handwritten Annotation */}
        <div className="relative inline-block mx-auto mb-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08]">
            <span className="block">Your README</span>
            <span className="block text-[#f97316]">is probably bad.</span>
            <span className="block">Let&apos;s find out.</span>
          </h1>

          {/* Handwritten Annotation on the right (only when there's ample room) */}
          <div className="hidden xl:block absolute -right-52 top-8 text-left transform rotate-2 select-none pointer-events-none">
            <div className="font-handwritten text-2xl text-amber-500/90 leading-tight space-y-0.5 whitespace-nowrap">
              <div>Better documentation</div>
              <div>More contributors</div>
              <div>Happier you</div>
            </div>
            {/* Hand-drawn curved arrow pointing down toward input */}
            <div className="relative left-6 mt-2">
              <svg
                width="65"
                height="75"
                viewBox="0 0 65 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-amber-500/80 stroke-current"
              >
                <path
                  d="M40 4C35 22 28 42 14 58C11 62 8 66 6 68"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 58C3 63 6 68 6 68C8 67 15 63 18 60"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
          Paste a public GitHub repository and we&apos;ll score your README, roast it with Gemma, and tell you exactly what to fix.
        </p>

        {/* Main Input Form */}
        <div className="mb-4">
          <RepoInput />
        </div>

        {/* Subtext info */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-zinc-500 font-mono">
          <span>Public GitHub repositories only</span>
          <span>•</span>
          <span>No signup required</span>
          <span>•</span>
          <span>Powered by Gemma 2</span>
        </div>
      </div>
    </section>
  );
}
