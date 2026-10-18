"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Flame, ArrowRight, AlertCircle } from "lucide-react";
import { GithubIcon } from "@/components/GithubIcon";
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="group relative flex flex-col sm:flex-row items-stretch sm:items-center rounded-2xl border border-white/[0.12] bg-[#0e1017] p-1.5 sm:p-2 shadow-2xl transition-all focus-within:border-orange-500/60 focus-within:ring-2 focus-within:ring-orange-500/20">
          <div className="flex items-center flex-1 px-3 py-2 sm:py-0">
            <GithubIcon className="h-5 w-5 text-zinc-400 mr-3 flex-shrink-0 group-focus-within:text-orange-400 transition-colors" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="https://github.com/username/repository"
              className="w-full bg-transparent text-sm sm:text-base font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none"
              disabled={isLoading}
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-6 py-3 sm:py-3.5 text-sm font-bold text-white shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex-shrink-0 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Roasting...</span>
              </>
            ) : (
              <>
                <Flame className="h-4 w-4 fill-white text-white" />
                <span>Roast My README</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-rose-400 font-medium justify-center">
            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>
    </div>
  );
}
