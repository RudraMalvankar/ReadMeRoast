import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhatYouGet } from "@/components/WhatYouGet";
import { ExampleRoasts } from "@/components/ExampleRoasts";
import { OpenSourceAi } from "@/components/OpenSourceAi";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#090a0f] text-zinc-100 selection:bg-orange-500/30 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <WhatYouGet />
        <ExampleRoasts />
        <OpenSourceAi />
      </main>
      <Footer />
    </div>
  );
}
