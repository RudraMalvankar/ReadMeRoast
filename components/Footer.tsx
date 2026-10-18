import React from "react";
import Link from "next/link";
import { Flame, Heart } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/[0.08] bg-[#07080c] py-12 text-zinc-400 text-xs">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md border border-orange-500/30 bg-orange-500/10 text-orange-400">
              <Flame className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">ReadMeRoast</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400 text-[11px] font-mono">
              Your README is probably bad. Let&apos;s find out.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-500">Hacktoberfest 2026</span>
            <span className="text-zinc-700">/</span>
            <span className="text-zinc-500">MIT License</span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            Open-source developer utility built for the Hacktoberfest AI Challenge (Week 2: Side Hustle).
          </div>
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-zinc-300 font-medium">Gemma 2 Open-Weight AI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
