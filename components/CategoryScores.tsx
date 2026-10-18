import React from "react";
import { CategoryScores as CategoryScoresType } from "@/types/analysis";
import { Sparkles, BookOpen, Wrench, Code2, Layers, Image as ImageIcon, Terminal } from "lucide-react";

interface CategoryScoresProps {
  scores: CategoryScoresType;
}

const CATEGORY_META: Record<
  keyof CategoryScoresType,
  { label: string; icon: React.ComponentType<{ className?: string }>; description: string }
> = {
  clarity: {
    label: "Clarity",
    icon: Sparkles,
    description: "Can a newcomer understand what this project does in 5 seconds?",
  },
  documentation: {
    label: "Documentation",
    icon: BookOpen,
    description: "Completeness of architecture, licensing, and prerequisites.",
  },
  setup: {
    label: "Setup & Install",
    icon: Wrench,
    description: "Clarity and reliability of installation commands.",
  },
  usage: {
    label: "Usage",
    icon: Terminal,
    description: "Ease of executing commands and understanding runtime flags.",
  },
  examples: {
    label: "Examples",
    icon: Code2,
    description: "Quality of minimal, runnable copy-paste snippets.",
  },
  visuals: {
    label: "Visuals",
    icon: ImageIcon,
    description: "Presence of diagrams, screenshots, or formatted previews.",
  },
  developerExperience: {
    label: "Dev Experience",
    icon: Layers,
    description: "Overall adoption friction and onboarding smoothness.",
  },
};

export function CategoryScores({ scores }: CategoryScoresProps) {
  const getProgressColor = (val: number) => {
    if (val >= 80) return "bg-emerald-400";
    if (val >= 60) return "bg-amber-400";
    return "bg-rose-400";
  };

  const getTextColor = (val: number) => {
    if (val >= 80) return "text-emerald-400";
    if (val >= 60) return "text-amber-400";
    return "text-rose-400";
  };

  const categories = Object.keys(CATEGORY_META) as Array<keyof CategoryScoresType>;

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#111218] p-6 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
        <div>
          <h2 className="text-base font-bold text-white">7-Dimension Scorecard</h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Granular evaluation across critical documentation pillars
          </p>
        </div>
        <span className="text-xs font-mono text-zinc-400">Target: 80+ for production</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        {categories.map((key) => {
          const meta = CATEGORY_META[key];
          const val = scores[key] ?? 50;
          const Icon = meta.icon;

          return (
            <div key={key} className="flex flex-col space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-zinc-200">
                  <Icon className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="font-semibold">{meta.label}</span>
                </div>
                <span className={`font-bold ${getTextColor(val)}`}>{val} / 100</span>
              </div>

              {/* Progress track */}
              <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-800/80">
                <div
                  className={`h-full ${getProgressColor(val)} transition-all duration-700 ease-out`}
                  style={{ width: `${Math.max(5, val)}%` }}
                />
              </div>

              <span className="text-[11px] text-zinc-400 leading-tight">
                {meta.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
