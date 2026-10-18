"use client";

import React from "react";
import Link from "next/link";
import { Flame, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export function ExampleRoasts() {
  const exampleRepo = "vercel/next.js";
  const exampleUrl = "https://github.com/vercel/next.js";
  const score = 84;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section id="examples" className="py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 sm:p-8 shadow-2xl">
          {/* Header row */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Flame className="h-4 w-4 fill-orange-400 text-orange-400" />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                Example Roast
              </span>
            </div>

            <Link
              href={`/roast?url=${encodeURIComponent(exampleUrl)}`}
              className="group flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Try this repo</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Content columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Left 2 cols: Repo + Quote */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <GithubIcon className="h-4 w-4 text-zinc-400" />
                <span className="text-base font-bold text-white tracking-tight">
                  vercel / next.js
                </span>
              </div>

              <blockquote className="text-base sm:text-lg text-zinc-200 font-mono italic leading-relaxed">
                &ldquo;Your README is actually pretty solid. I came here expecting chaos. Unfortunately, it&apos;s good. Think about what you&apos;ve become.&rdquo;
              </blockquote>
            </div>

            {/* Right col: Circular score badge */}
            <div className="flex flex-col items-center justify-center text-center pl-0 md:pl-6 md:border-l md:border-white/[0.06]">
              <div className="relative flex h-28 w-28 items-center justify-center">
                <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-zinc-800"
                    strokeWidth="7"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="stroke-emerald-400 transition-all duration-1000 ease-out"
                    strokeWidth="7"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-white">{score}</span>
                  <span className="text-[10px] font-mono text-zinc-500">/ 100</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-xs font-bold text-emerald-400">Great README!</div>
                <div className="text-[11px] text-zinc-400">Just a few tweaks.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
