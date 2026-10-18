"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, Link as LinkIcon, ArrowRight, AlertCircle, Sparkles } from "lucide-react";
import { validateAndParseGithubUrl } from "@/lib/validation";

interface RepoInputProps {
  initialUrl?: string;
  onAnalyze?: (url: string) => void;
  isLoading?: boolean;
}

export function RepoInput({ initialUrl = "", onAnalyze, isLoading = false }: RepoInputProps) {
  const router = useRouter();
  const [url, setUrl] = useState(initialUrl);
  const [error, setError] = useState<string | null>(null);

  const sampleRepos = [
    { label: "facebook/react", url: "https://github.com/facebook/react" },
    { label: "expressjs/express", url: "https://github.com/expressjs/express" },
    { label: "tailwindlabs/tailwindcss", url: "https://github.com/tailwindlabs/tailwindcss" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a GitHub repository URL.");
      return;
    }

    const validation = validateAndParseGithubUrl(trimmed);
    if (!validation.success) {
      setError(validation.error);
      return;
    }

    const cleanUrl = validation.data.cleanUrl;

    if (onAnalyze) {
      onAnalyze(cleanUrl);
    } else {
      router.push(`/roast?url=${encodeURIComponent(cleanUrl)}`);
    }
  };

  const handleSelectSample = (sampleUrl: string) => {
    setUrl(sampleUrl);
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-xl border border-white/[0.12] bg-[#12131a] p-1.5 shadow-2xl transition-all focus-within:border-orange-500/50 focus-within:ring-2 focus-within:ring-orange-500/20">
          <div className="flex items-center flex-1 px-3 py-2 sm:py-0">
            <LinkIcon className="h-4 w-4 text-zinc-500 mr-2.5 flex-shrink-0 group-focus-within:text-orange-400 transition-colors" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="https://github.com/user/repository"
              className="w-full bg-transparent text-sm sm:text-base font-mono text-zinc-100 placeholder-zinc-500 focus:outline-none"
              disabled={isLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-md hover:from-orange-500 hover:to-amber-500 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Roasting...</span>
              </>
            ) : (
              <>
                <Flame className="h-4 w-4 text-amber-200 fill-amber-200" />
                <span>Roast My README</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-80" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      {/* Quick sample repositories */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
        <span className="flex items-center gap-1 text-zinc-400 font-mono text-[11px]">
          <Sparkles className="h-3 w-3 text-amber-400" />
          Or try:
        </span>
        {sampleRepos.map((sample) => (
          <button
            key={sample.label}
            type="button"
            onClick={() => handleSelectSample(sample.url)}
            className="rounded border border-white/[0.08] bg-zinc-900/60 px-2 py-0.5 font-mono text-[11px] text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800 hover:text-white transition-colors"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </div>
  );
}
