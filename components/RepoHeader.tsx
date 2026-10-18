"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, GitFork, Share2, Check, ArrowUpRight } from "lucide-react";
import { formatRelativeTime } from "@/lib/time";

interface RepoHeaderProps {
  metadata: {
    name: string;
    owner: string;
    fullName: string;
    description: string;
    stars: number;
    forks: number;
    openIssues: number;
    language: string;
    defaultBranch: string;
    htmlUrl: string;
    license?: string;
    topics?: string[];
    updatedAt?: string;
  };
  readmeStats?: {
    rawSize: number;
    isTruncated: boolean;
    truncatedLength: number;
    filename: string;
  };
  roastQuote?: string;
  score?: number;
}

export function RepoHeader({ metadata, roastQuote, score }: RepoHeaderProps) {
  const [copiedShare, setCopiedShare] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toLocaleString();
  };

  const handleShare = () => {
    const text = `🔥 ReadMeRoast for ${metadata.fullName}: ${roastQuote ? `"${roastQuote}"` : ""}\nScore: ${score ? `${score}/100` : ""}\nCheck it out on ReadMeRoast!`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const relativeTime = formatRelativeTime(metadata.updatedAt);

  return (
    <div className="w-full space-y-5">
      {/* Top action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Analyze another repository</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#12141d] px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors cursor-pointer"
          >
            {copiedShare ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Roast</span>
              </>
            )}
          </button>

          <a
            href={metadata.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-lg border border-orange-500/40 bg-orange-500/10 px-3.5 py-1.5 text-xs font-medium text-orange-400 hover:bg-orange-500/20 transition-colors"
          >
            <span>View on GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Repo Identifier Card */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="h-2.5 w-2.5 rounded-full bg-zinc-400" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            <span className="text-zinc-400 font-normal">{metadata.owner}</span>
            <span className="text-zinc-500 mx-1.5">/</span>
            <span>{metadata.name}</span>
          </h1>
          <span className="rounded-md border border-white/[0.1] bg-zinc-900 px-2 py-0.5 text-[11px] font-mono text-zinc-400">
            Public
          </span>
        </div>

        <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed">
          {metadata.description}
        </p>

        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-zinc-900/60 px-2.5 py-1">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>{formatNumber(metadata.stars)}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-zinc-900/60 px-2.5 py-1">
            <GitFork className="h-3.5 w-3.5 text-zinc-400" />
            <span>{formatNumber(metadata.forks)}</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-zinc-900/60 px-2.5 py-1">
            <span className="h-2 w-2 rounded-full bg-sky-400" />
            <span>{metadata.language}</span>
          </div>

          <span className="text-zinc-600">•</span>
          <span className="text-zinc-500">{relativeTime}</span>
        </div>
      </div>
    </div>
  );
}
