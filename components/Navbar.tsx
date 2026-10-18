"use client";

import React from "react";
import Link from "next/link";
import { Flame, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#090a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 group-hover:scale-105 transition-transform duration-200">
            <Flame className="h-5 w-5 fill-orange-400 text-orange-400" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            ReadMeRoast
          </span>
        </Link>

        {/* Center Nav Links & Right Badges */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <a href="#how-it-works" className="hover:text-zinc-200 transition-colors">
              How It Works
            </a>
            <a href="#examples" className="hover:text-zinc-200 transition-colors">
              Examples
            </a>
            <a href="#faq" className="hover:text-zinc-200 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RudraMalvankar/ReadMeRoast"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] bg-zinc-900/80 text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <div className="flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Hacktoberfest 2026</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
