import React from "react";
import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-500/30 bg-orange-500/10 text-orange-400 group-hover:scale-105 transition-transform duration-200">
            <Flame className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              ReadMeRoast
              <span className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-orange-400 border border-orange-500/20">
                v1.0
              </span>
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Hacktoberfest 2026 AI Challenge</span>
          </div>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
