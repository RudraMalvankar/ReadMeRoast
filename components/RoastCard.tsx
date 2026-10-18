"use client";

import React, { useState } from "react";
import { Flame, Copy, Check } from "lucide-react";

interface RoastCardProps {
  roast: string;
  repoFullName?: string;
  score?: number;
}

export function RoastCard({ roast }: RoastCardProps) {
  const [copiedRoast, setCopiedRoast] = useState(false);

  const handleCopyRoast = () => {
    navigator.clipboard.writeText(roast);
    setCopiedRoast(true);
    setTimeout(() => setCopiedRoast(false), 2000);
  };

  return (
    <div className="h-full rounded-2xl border border-orange-500/30 bg-[#121118] p-6 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-orange-500/20 mb-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-orange-400">
          <Flame className="h-4 w-4 fill-orange-400 text-orange-400" />
          <span>THE ROAST</span>
        </div>

        <button
          type="button"
          onClick={handleCopyRoast}
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-zinc-900/90 px-3 py-1 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
        >
          {copiedRoast ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Quote Body */}
      <div className="flex-1 flex items-center">
        <blockquote className="text-base sm:text-lg text-zinc-200 font-sans leading-relaxed">
          &ldquo;{roast}&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
