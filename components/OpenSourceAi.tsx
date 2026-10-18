import React from "react";
import { Cpu, Lock, CheckCircle, Shield, Award } from "lucide-react";

export function OpenSourceAi() {
  const points = [
    {
      title: "Gemma 2 Open-Weight AI",
      desc: "Powered by Google's state-of-the-art open-weight Gemma architecture, ensuring complete reproducibility and inspectability.",
    },
    {
      title: "Zero Closed-Box Lock-in",
      desc: "Our AI service layer is designed for sovereign execution. Run it via Google AI Studio, Groq, or self-host on your own GPU.",
    },
    {
      title: "Strict JSON Schema Enforcement",
      desc: "Evaluations are strictly validated through Zod runtime contracts to eliminate parsing failures and guarantee deterministic output.",
    },
  ];

  return (
    <section className="py-16 border-t border-white/[0.08] bg-[#0c0d13]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-[#14151e] to-[#0f1017] p-8 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400">
                <Cpu className="h-4 w-4" />
                <span>Open-Source AI Challenge</span>
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Powered by Open-Weight Gemma
              </h2>
              <p className="mt-2 text-sm text-zinc-400 max-w-xl">
                ReadMeRoast is built specifically for Hacktoberfest 2026 Week 2: Side Hustle.
                We believe core developer tools should run on transparent, open-weight intelligence.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-zinc-900/90 border border-white/[0.08] px-4 py-3 self-start md:self-center">
              <Award className="h-6 w-6 text-amber-400 flex-shrink-0" />
              <div className="text-left font-mono">
                <div className="text-xs text-zinc-400">Target Model</div>
                <div className="text-sm font-bold text-white">Gemma-2-27B-IT</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {points.map((pt) => (
              <div key={pt.title} className="flex flex-col">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span>{pt.title}</span>
                </div>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">{pt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
