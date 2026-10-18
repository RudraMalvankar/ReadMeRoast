import React from "react";
import Link from "next/link";
import { ArrowLeft, Star, GitFork, CircleDot, ExternalLink, Shield, AlertCircle } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";

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
  };
  readmeStats?: {
    rawSize: number;
    isTruncated: boolean;
    truncatedLength: number;
    filename: string;
  };
}

export function RepoHeader({ metadata, readmeStats }: RepoHeaderProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toLocaleString();
  };

  return (
    <div className="w-full pb-6 border-b border-white/[0.08]">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Analyze another repository</span>
        </Link>

        <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-orange-400 border border-orange-500/20">
          🔥 README ROAST
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
            <a
              href={metadata.htmlUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:underline flex items-center gap-2 group"
            >
              <span>{metadata.fullName}</span>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
            </a>
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400 max-w-2xl leading-relaxed">
            {metadata.description}
          </p>
        </div>

        {/* Repository stats badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1 text-zinc-300">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span>{formatNumber(metadata.stars)}</span>
          </div>

          <div className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1 text-zinc-300">
            <GitFork className="h-3.5 w-3.5 text-zinc-400" />
            <span>{formatNumber(metadata.forks)}</span>
          </div>

          <div className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1 text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            <span>{metadata.language}</span>
          </div>

          <a
            href={metadata.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-md border border-white/[0.08] bg-zinc-900/80 px-2.5 py-1 text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>View Repo</span>
          </a>
        </div>
      </div>

      {readmeStats?.isTruncated && (
        <div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-950/20 px-3.5 py-2 text-xs text-amber-300 font-mono">
          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span>
            This README is unusually large ({Math.round(readmeStats.rawSize / 1024)} KB). ReadMeRoast analyzed the first {Math.round(readmeStats.truncatedLength / 1024)} KB to keep analysis reliable.
          </span>
        </div>
      )}
    </div>
  );
}
