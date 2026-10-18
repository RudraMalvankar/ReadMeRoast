"use client";

import React, { useState, useImperativeHandle, forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, Download, Loader2, FileCode, Sparkles, ArrowRight } from "lucide-react";
import { AnalysisResponse } from "@/types/analysis";

export interface ImprovedReadmeRef {
  generate: () => void;
  isLoading: boolean;
  isGenerated: boolean;
}

interface ImprovedReadmeProps {
  repoUrl: string;
  analysisData: AnalysisResponse;
  onLoadingChange?: (loading: boolean) => void;
  onGeneratedChange?: (generated: boolean) => void;
}

export const ImprovedReadme = forwardRef<ImprovedReadmeRef, ImprovedReadmeProps>(
  function ImprovedReadme({ repoUrl, analysisData, onLoadingChange, onGeneratedChange }, ref) {
    const [improvedMarkdown, setImprovedMarkdown] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"preview" | "markdown">("preview");
    const [copied, setCopied] = useState(false);

    const handleGenerate = async () => {
      if (loading) return;
      setLoading(true);
      setError(null);
      onLoadingChange?.(true);

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
        onGeneratedChange?.(true);
      } catch (err: any) {
        setError(err.message || "Failed to generate improved README.");
      } finally {
        setLoading(false);
        onLoadingChange?.(false);
      }
    };

    useImperativeHandle(ref, () => ({
      generate: () => {
        handleGenerate();
        const el = document.getElementById("improved-readme");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      },
      isLoading: loading,
      isGenerated: !!improvedMarkdown,
    }));

    // NOTE: Auto-generation is REMOVED to prevent wasting AI tokens.
    // It ONLY generates when the user explicitly clicks "Fix My README".

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

    const markdownLines = improvedMarkdown ? improvedMarkdown.split("\n") : [];

    return (
      <section id="improved-readme" className="w-full space-y-4 pt-1">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              IMPROVED README
            </span>
            <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-mono text-orange-400 border border-orange-500/20">
              On-Demand
            </span>
          </div>

          {improvedMarkdown && (
            <div className="flex items-center gap-3">
              {/* View switcher tabs */}
              <div className="flex items-center rounded-lg border border-white/[0.08] bg-[#12141d] p-1 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`rounded-md px-3 py-1 transition-colors cursor-pointer ${
                    activeTab === "preview"
                      ? "bg-[#f97316]/20 text-orange-400 font-semibold border border-orange-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("markdown")}
                  className={`rounded-md px-3 py-1 transition-colors cursor-pointer ${
                    activeTab === "markdown"
                      ? "bg-[#f97316]/20 text-orange-400 font-semibold border border-orange-500/30"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Markdown
                </button>
              </div>

              {/* Action buttons */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={loading}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#12141d] px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
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
                disabled={loading}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#12141d] px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:border-zinc-700 hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download</span>
              </button>
            </div>
          )}
        </div>

        {/* Content Container */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c0e15] overflow-hidden shadow-2xl">
          {/* Initial State: Prompt user to click and generate (Zero token waste!) */}
          {!improvedMarkdown && !loading && (
            <div className="p-10 sm:p-14 text-center flex flex-col items-center justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="text-base font-bold text-white">
                  Generate Your Fixed README
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Click the button below to have Gemma rewrite this documentation using verified facts from your repo.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="flex items-center gap-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] px-6 py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-all cursor-pointer mt-2"
              >
                <span>Fix My README with Gemma</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <span className="text-[11px] font-mono text-zinc-500">
                Zero hallucination guarantee • Generated on demand
              </span>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center p-16 sm:p-20 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <p className="text-sm font-mono text-zinc-200">
                Gemma is generating your improved README...
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                Structuring sections • Adding quick-start • Fixing documentation gaps
              </p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="p-10 text-center text-rose-400 font-mono text-xs space-y-3">
              <p>{error}</p>
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-600 px-4 py-2 text-white text-xs hover:bg-orange-500 cursor-pointer font-sans"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Generated Editor View */}
          {improvedMarkdown && !loading && (
            <div>
              {/* Desktop Split View: Code editor on left, Rendered Preview on right */}
              <div className="hidden lg:grid lg:grid-cols-2 divide-x divide-white/[0.08]">
                {/* Code Editor View with Line Numbers */}
                <div className="p-4 bg-[#0a0b12] font-mono text-xs text-zinc-300 overflow-x-auto max-h-[580px] overflow-y-auto">
                  <div className="flex items-center gap-2 pb-3 mb-3 border-b border-white/[0.06] text-[11px] text-zinc-500">
                    <FileCode className="h-3.5 w-3.5 text-orange-400" />
                    <span>README.md</span>
                    <span className="text-zinc-700">|</span>
                    <span>{markdownLines.length} lines</span>
                  </div>
                  <table className="w-full border-collapse">
                    <tbody>
                      {markdownLines.map((line, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02]">
                          <td className="w-9 select-none pr-3 text-right text-zinc-600 text-[11px] font-mono align-top">
                            {idx + 1}
                          </td>
                          <td className="whitespace-pre font-mono text-[12px] text-zinc-300">
                            {line.startsWith("#") ? (
                              <span className="text-sky-300 font-bold">{line}</span>
                            ) : line.startsWith("-") || line.startsWith("*") ? (
                              <span className="text-emerald-300">{line}</span>
                            ) : line.startsWith("```") ? (
                              <span className="text-orange-400 font-bold">{line}</span>
                            ) : (
                              line
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Rendered Preview View */}
                <div className="p-6 sm:p-8 bg-[#0d0f18] prose prose-invert max-w-none prose-headings:text-white prose-a:text-orange-400 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-white/[0.08] overflow-y-auto max-h-[580px] text-xs sm:text-sm">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {improvedMarkdown}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Mobile / Tablet View: Tab-based */}
              <div className="lg:hidden p-5 bg-[#0a0b12]">
                {activeTab === "preview" ? (
                  <div className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-orange-400 text-xs sm:text-sm overflow-y-auto max-h-[500px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {improvedMarkdown}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div className="font-mono text-xs text-zinc-300 overflow-x-auto max-h-[500px] overflow-y-auto">
                    <table className="w-full border-collapse">
                      <tbody>
                        {markdownLines.map((line, idx) => (
                          <tr key={idx}>
                            <td className="w-8 select-none pr-3 text-right text-zinc-600 text-[11px] font-mono">
                              {idx + 1}
                            </td>
                            <td className="whitespace-pre font-mono text-[11px] text-zinc-300">
                              {line}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
);
