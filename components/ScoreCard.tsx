import React from "react";

interface ScoreCardProps {
  score: number;
  verdict: string;
}

export function ScoreCard({ score, verdict }: ScoreCardProps) {
  // SVG circular gauge math
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Ring stroke color based on score
  const strokeColor =
    score >= 80 ? "stroke-emerald-400" : score >= 60 ? "stroke-amber-500" : "stroke-rose-500";

  // Score headline
  const getHeadline = (val: number) => {
    if (val >= 85) return "Exceptional.";
    if (val >= 70) return "Pretty decent.";
    if (val >= 55) return "Needs attention.";
    return "Needs serious work.";
  };

  return (
    <div className="h-full rounded-2xl border border-white/[0.08] bg-[#10131c] p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
      {/* Circular Gauge */}
      <div className="relative flex h-32 w-32 items-center justify-center flex-shrink-0">
        <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            className="stroke-zinc-800"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            className={`${strokeColor} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black tracking-tight text-white">{score}</span>
          <span className="text-[11px] font-mono text-zinc-500">/ 100</span>
        </div>
      </div>

      {/* Score info */}
      <div className="space-y-1.5 flex-1 text-center sm:text-left">
        <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          README SCORE
        </span>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {getHeadline(score)}
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
          {verdict}
        </p>
      </div>
    </div>
  );
}
