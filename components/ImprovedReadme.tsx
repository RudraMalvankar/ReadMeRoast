"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  FileCode2,
  Copy,
  Check,
  Download,
  Eye,
  Code,
  Sparkles,
  Loader2,
  ShieldCheck,
  Flame,
} from "lucide-react";
import { AnalysisResponse } from "@/types/analysis";

interface ImprovedReadmeProps {
  repoUrl: string;
  analysisData: AnalysisResponse;
}

export function ImprovedReadme({ repoUrl, analysisData }: ImprovedReadmeProps) {
  const [improvedMarkdown, setImprovedMarkdown] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: repoUrl,
          analysis: analysisData.analysis,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to generate improved README.");
      }

      setImprovedMarkdown(json.improvedMarkdown);
    } catch (err: any) {
      setError(err.message || "Failed to generate improved README.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!improvedMarkdown) return;
    navigator.clipboard.writeText(improvedMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!improvedMarkdown) return;
    const blob = new Blob([improvedMarkdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "README.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="improved-readme-section" className="scroll-mt-20">
      <div className="rounded-xl border border-white/[0.1] bg-[#111218] shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] bg-zinc-900/60 p-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Improved README Generator</span>
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-400 border border-emerald-500/20">
                  Zero Hallucination
                </span>
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Reorganizes verified information without inventing fake APIs or commands.
              </p>
            </div>
          </div>

          {!improvedMarkdown ? (
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:from-orange-500 hover:to-amber-500 active:scale-95 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing README with Gemma...</span>
                </>
              ) : (
                <>
                  <Flame className="h-4 w-4 text-amber-200 fill-amber-200" />
                  <span>Generate Fixed README</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-white/[0.08] bg-zinc-950 p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
                    activeTab === "preview"
                      ? "bg-zinc-800 text-white font-medium shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("raw")}
                  className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 transition-colors ${
                    activeTab === "raw"
                      ? "bg-zinc-800 text-white font-medium shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Code className="h-3.5 w-3.5" />
                  <span>Raw Markdown</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-mono text-orange-300 hover:bg-orange-500/20 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download .md</span>
              </button>
            </div>
          )}
        </div>

        {/* Error notice if generation failed */}
        {error && (
          <div className="p-4 bg-rose-950/20 border-b border-rose-500/20 text-xs text-rose-300 font-mono">
            {error}
          </div>
        )}

        {/* Editor Body */}
        {!improvedMarkdown && !loading && (
          <div className="p-12 text-center text-zinc-400">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-500 mb-3">
              <FileCode2 className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-zinc-200">
              Ready to generate an improved README
            </h3>
            <p className="mt-1 text-xs text-zinc-400 max-w-sm mx-auto">
              Click &quot;Generate Fixed README&quot; to have Gemma rewrite your documentation according to our priority action plan.
            </p>
          </div>
        )}

        {loading && (
          <div className="p-16 text-center text-zinc-300 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-400" />
            <p className="text-sm font-mono text-zinc-200">
              Gemma is rewriting your documentation...
            </p>
            <p className="text-xs text-zinc-400 font-mono">
              Reorganizing sections • Formatting installation guides • Adding placeholders for missing items
            </p>
          </div>
        )}

        {improvedMarkdown && (
          <div className="bg-[#0b0c10] border-t border-white/[0.04]">
            {/* Editor File Tab Bar */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-zinc-950/70 px-4 py-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <FileCode2 className="h-3.5 w-3.5 text-orange-400" />
                <span className="text-zinc-200 font-medium">README.md</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">{improvedMarkdown.split("\n").length} lines</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500">{improvedMarkdown.length} chars</span>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Verified Clean Output</span>
              </div>
            </div>

            {/* Content Display */}
            {activeTab === "preview" ? (
              <div className="p-6 sm:p-8 prose prose-invert max-w-none prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/[0.08] prose-code:font-mono prose-headings:text-white prose-a:text-orange-400 overflow-x-auto text-sm leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {improvedMarkdown}
                </ReactMarkdown>
              </div>
            ) : (
              <pre className="p-6 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
                {improvedMarkdown}
              </pre>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
