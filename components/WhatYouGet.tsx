import React from "react";
import { Flame, AlertTriangle, Wrench, FileText } from "lucide-react";

export function WhatYouGet() {
  const items = [
    {
      customIcon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 font-bold text-sm">
          78
        </div>
      ),
      title: "README",
      subtitle: "score",
    },
    {
      customIcon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400">
          <Flame className="h-5 w-5 fill-orange-400 text-orange-400" />
        </div>
      ),
      title: "AI",
      subtitle: "roast",
    },
    {
      customIcon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400">
          <AlertTriangle className="h-5 w-5" />
        </div>
      ),
      title: "Problems",
      subtitle: "worth fixing",
    },
    {
      customIcon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400">
          <Wrench className="h-5 w-5" />
        </div>
      ),
      title: "Actionable",
      subtitle: "recommendations",
    },
    {
      customIcon: (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <FileText className="h-5 w-5" />
        </div>
      ),
      title: "Improved",
      subtitle: "README",
    },
  ];

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center text-lg font-bold text-white mb-8">
          What you&apos;ll get
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5 sm:gap-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-[#10131c] p-5 text-center shadow-lg transition-transform hover:-translate-y-0.5 hover:border-zinc-700"
            >
              <div className="mb-3">{item.customIcon}</div>
              <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                {item.title}
              </div>
              <div className="text-xs text-zinc-400 leading-tight">
                {item.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
