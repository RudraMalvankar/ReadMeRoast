"use client";

import React, { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LoadingAnalysis } from "@/components/LoadingAnalysis";
import { RepoHeader } from "@/components/RepoHeader";
import { ScoreCard } from "@/components/ScoreCard";
import { CategoryScores } from "@/components/CategoryScores";
import { RoastCard } from "@/components/RoastCard";
import { Strengths } from "@/components/Strengths";
import { Problems } from "@/components/Problems";
import { Recommendations } from "@/components/Recommendations";
import { FixMyReadmeCard } from "@/components/FixMyReadmeCard";
import { ImprovedReadme, ImprovedReadmeRef } from "@/components/ImprovedReadme";
import { AnalysisResponse } from "@/types/analysis";
import { AlertCircle, ArrowLeft, RefreshCw, Skull } from "lucide-react";

function RoastContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlParam = searchParams.get("url");

  const [data, setData] = useState<AnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ message: string; code?: string } | null>(null);

  const improvedReadmeRef = useRef<ImprovedReadmeRef>(null);

  const fetchAnalysis = async (targetUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: targetUrl }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError({
          message: json.error || "An error occurred while analyzing the README.",
          code: json.code,
        });
        setLoading(false);
        return;
      }

      setData(json);
      setLoading(false);

      // Trigger celebratory confetti if score is great
      if (json.analysis.overallScore >= 80) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#10b981", "#f97316", "#fbbf24"],
        });
      }
    } catch (err: any) {
      setError({
        message: err.message || "Failed to reach ReadMeRoast analysis service.",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!urlParam) {
      router.push("/");
      return;
    }
    fetchAnalysis(urlParam);
  }, [urlParam]);

  if (loading) {
    return (
      <div className="flex-1 px-4 sm:px-6 py-12">
        <LoadingAnalysis repoUrl={urlParam || ""} />
      </div>
    );
  }

  if (error) {
    const isNoReadme = error.code === "NO_README" || error.message.includes("No README");
    return (
      <div className="flex-1 mx-auto my-16 max-w-lg px-4 text-center">
        <div className="rounded-2xl border border-white/[0.1] bg-[#10131c] p-8 shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-4">
            {isNoReadme ? <Skull className="h-7 w-7" /> : <AlertCircle className="h-7 w-7" />}
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            {isNoReadme ? "💀 No README found." : "Unable to Analyze Repository"}
          </h2>

          <p className="mt-3 text-sm text-zinc-300 leading-relaxed font-mono">
            {error.message}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-lg bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-orange-500 transition-colors w-full sm:w-auto"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Try another repository</span>
            </Link>

            {urlParam && (
              <button
                type="button"
                onClick={() => fetchAnalysis(urlParam)}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors w-full sm:w-auto"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retry</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 space-y-6 flex-1 w-full">
      {/* 1. Repository Header with Top Action Bar */}
      <RepoHeader
        metadata={data.metadata}
        readmeStats={data.readmeStats}
        roastQuote={data.analysis.roast}
        score={data.analysis.overallScore}
      />

      {/* 2. Top 2-Column Section: ScoreCard (Left) & RoastCard (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-5">
          <ScoreCard
            score={data.analysis.overallScore}
            verdict={data.analysis.verdict}
          />
        </div>
        <div className="lg:col-span-7">
          <RoastCard
            roast={data.analysis.roast}
            repoFullName={data.metadata.fullName}
            score={data.analysis.overallScore}
          />
        </div>
      </div>

      {/* 3. Middle 3-Column Section: README Health, What's Good, What Needs Fixing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        <CategoryScores scores={data.analysis.categoryScores} />
        <Strengths strengths={data.analysis.strengths} />
        <Problems problems={data.analysis.problems} />
      </div>

      {/* 4. Bottom-Middle 2-Column Section: Recommendations & Fix My README Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7">
          <Recommendations recommendations={data.analysis.recommendations} />
        </div>
        <div className="lg:col-span-5">
          <FixMyReadmeCard
            onTriggerFix={() => {
              if (improvedReadmeRef.current) {
                improvedReadmeRef.current.generate();
              }
            }}
          />
        </div>
      </div>

      {/* 5. Full Width Bottom Section: Improved README Split Editor */}
      <ImprovedReadme
        ref={improvedReadmeRef}
        repoUrl={urlParam || ""}
        analysisData={data}
      />
    </div>
  );
}

export default function RoastPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090a0f] text-zinc-100 selection:bg-orange-500/30 selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Suspense
          fallback={
            <div className="flex-1 px-4 sm:px-6 py-12">
              <LoadingAnalysis repoUrl="Loading..." />
            </div>
          }
        >
          <RoastContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
