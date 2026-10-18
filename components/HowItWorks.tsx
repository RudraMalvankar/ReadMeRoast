import React from "react";
import { Link2, Flame, Sparkles } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Link2,
      title: "Paste your repo",
      desc: "Drop in any public GitHub repository URL. No auth tokens or signups needed.",
    },
    {
      step: "02",
      icon: Flame,
      title: "Get roasted",
      desc: "Gemma analyzes clarity, setup steps, examples, and visuals with a savage yet constructive review.",
    },
    {
      step: "03",
      icon: Sparkles,
      title: "Fix your README",
      desc: "Get an evidence-based markdown rewrite that improves structure without inventing fake details.",
    },
  ];

  return (
    <section className="py-16 border-t border-white/[0.08] relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
            Simple 3-Step Flow
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            How ReadMeRoast Works
          </h2>
          <p className="mt-2 text-sm text-zinc-400 max-w-lg mx-auto">
            From an unread, confusing README to clear, developer-friendly documentation in under 15 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-xl border border-white/[0.08] bg-[#111218]/60 p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-black text-zinc-600">
                      {item.step}
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-white/[0.08] text-orange-400">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
