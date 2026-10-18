import React from "react";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      q: "Does ReadMeRoast store or train on my repository code?",
      a: "No. ReadMeRoast only reads public README files via GitHub's public API to analyze documentation quality. We do not clone repositories or train on your data.",
    },
    {
      q: "What AI model powers the roast and fixes?",
      a: "ReadMeRoast is powered by Google's Gemma 2 open-weight AI model, configured with strict anti-hallucination guidelines.",
    },
    {
      q: "Can I use ReadMeRoast for private repositories?",
      a: "Currently ReadMeRoast only supports public GitHub repositories without requiring GitHub OAuth or personal access tokens.",
    },
    {
      q: "Does 'Fix My README' invent fake features?",
      a: "No. The generator follows a strict zero-hallucination prompt that only restructures verified facts and uses explicit placeholders for missing instructions.",
    },
  ];

  return (
    <section id="faq" className="py-16 border-t border-white/[0.08]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-orange-400">
            Frequently Asked Questions
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Everything you need to know
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-white/[0.08] bg-[#10131c] p-5 space-y-2 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-2.5">
                <HelpCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <h3 className="text-sm font-bold text-white leading-snug">{faq.q}</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-6.5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
