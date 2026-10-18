import React from "react";
import { Gauge, Flame, AlertCircle, ListChecks, FileCode2 } from "lucide-react";

export function WhatYouGet() {
  const features = [
    {
      icon: Gauge,
      title: "7-Dimension Score",
      desc: "Granular evaluation across Clarity, Setup, Usage, Examples, Visuals, and Developer Experience.",
    },
    {
      icon: Flame,
      title: "The Constructive Roast",
      desc: "Unvarnished honesty that calls out badge bloat, missing commands, and documentation archaeology.",
    },
    {
      icon: AlertCircle,
      title: "Categorized Problems",
      desc: "Problems tagged by High, Medium, or Low severity with specific explanations and recommended fixes.",
    },
    {
      icon: ListChecks,
      title: "Priority Recommendations",
      desc: "Actionable, numbered steps so you know exactly which improvements have the highest ROI.",
    },
    {
      icon: FileCode2,
      title: "One-Click Fixed README",
      desc: "Zero hallucination guarantee. Reorganizes existing facts and leaves clear placeholders for missing details.",
    },
  ];

  return (
    <section className="py-16 border-t border-white/[0.08] bg-zinc-950/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
            Comprehensive Analysis
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            What You Get in Every Review
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
            Not just a generic score — a complete documentation health audit and turnkey replacement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-xl border border-white/[0.08] bg-[#111218] p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-4">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{feat.title}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
