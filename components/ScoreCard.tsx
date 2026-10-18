import React from "react";
import { Award, AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

interface ScoreCardProps {
  score: number;
  verdict: string;
}

export function ScoreCard({ score, verdict }: ScoreCardProps) {
  // Score styling thresholds
  const isHigh = score >= 80;
  const isMedium = score >= 60 && score < 80;
  const isLow = score < 60;

  const colorClass = isHigh
    ? "text-emerald-400 stroke-emerald-400"
    : isMedium
    ? "text-amber-400 stroke-amber-400"
    : "text-rose-400 stroke-rose-400";

  const badgeClass = isHigh
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : isMedium
    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
    : "bg-rose-500/10 text-rose-400 border-rose-500/20";

  const statusLabel = isHigh
    ? "Clean & Developer-Ready"
    : isMedium
    ? "Room for Improvement"
    : "Critical Documentation Gaps";

  // SVG circular gauge math
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 rounded-xl border border-white/[0.08] bg-[#111218] p-6 shadow-xl">
      {/* Circular Gauge */}
      <div className="relative flex h-40 w-40 items-center justify-center flex-shrink-0">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-zinc-800"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            className={`${colorClass} transition-all duration-1000 ease-out`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-black tracking-tight text-white">{score}</span>
          <span className="text-xs font-mono text-zinc-500">/ 100</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">
            SCORE
          </span>
        </div>
      </div>

      {/* Score Verdict & Interpretation */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-medium ${badgeClass}`}>
            {isHigh ? (
              <CheckCircle className="h-3.5 w-3.5" />
            ) : isMedium ? (
              <AlertTriangle className="h-3.5 w-3.5" />
            ) : (
              <ShieldAlert className="h-3.5 w-3.5" />
            )}
            <span>{statusLabel}</span>
          </span>
        </div>

        <h2 className="mt-3 text-lg font-bold text-white">Documentation Health Verdict</h2>
        <p className="mt-1.5 text-sm text-zinc-300 leading-relaxed max-w-xl">
          {verdict}
        </p>
      </div>
    </div>
  );
}
