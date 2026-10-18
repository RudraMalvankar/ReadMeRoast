# ReadMeRoast 🔥

> **Your README is probably bad. Let's find out. 🔥**

[![Hacktoberfest 2026](https://img.shields.io/badge/Hacktoberfest-2026_AI_Challenge-f97316.svg)](https://hacktoberfest.com/)
[![Model](https://img.shields.io/badge/Model-Gemma--2--27B--IT-4285F4.svg)](https://ai.google.dev/gemma)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-black.svg)](https://nextjs.org/)

**ReadMeRoast** is a focused developer tool built for the **Hacktoberfest Open-Source AI Challenge (Week 2: Side Hustle)**. It analyzes public GitHub repository READMEs using an open-weight **Gemma 2** model, scores documentation health across 7 key dimensions, delivers a hilarious yet constructive roast, identifies documentation blindspots, provides actionable fixes, and generates a zero-hallucination rewritten README in one click.

---

## ⚡ The Problem & Solution

Most developer documentation suffers from three fatal problems:
1. **Decorative Badge Bloat**: Badges and status shields take up screen space while installation commands are omitted.
2. **Archaeological Discovery**: Discovering how to actually run or import a package requires digging through source files.
3. **The "Curse of Knowledge"**: Authors assume contributors already understand runtime dependencies and environment setup.

**ReadMeRoast solves this in 10 seconds:**
- **Paste a public GitHub repo URL** — no signups, no auth tokens, no waiting.
- **Get scored across 7 dimensions** — Clarity, Documentation, Setup, Usage, Examples, Visuals, and Developer Experience.
- **Read the savage, constructive roast** — criticizes the documentation, never the developer.
- **Review prioritized problems** — categorized by High, Medium, and Low severity with recommended remedies.
- **Generate a fixed README** — Gemma synthesizes an organized rewrite adhering to strict zero-hallucination guardrails (only reorganizing verified facts and inserting clear placeholders for missing items).

---

## 🏗️ Architecture & How It Works

```text
User Input (GitHub URL)
       │
       ▼
 [ Client Validation ] (Zod & URL Regex)
       │
       ▼
 [ Next.js Route Handler ] (/api/analyze)
       │
       ├─► GitHub REST API ──► Decode Base64 & Enforce Size Guards
       │
       ▼
 [ Gemma AI Service Layer ] (lib/ai/)
       │
       ├─► System Prompt: 7 Documentation Dimensions + Safety Guardrails
       ├─► Gemma 2 Open-Weight Model (Google AI Studio / Groq / Self-hosted)
       │
       ▼
 [ Zod Contract Validation & Clamping ]
       │
       ▼
 [ Developer UI Experience ]
       ├── Animated Circular Score Gauge (0-100)
       ├── 7-Dimension Scorecard
       ├── Fire Roast Card (with Copy & Share)
       ├── Strengths & Severity-Sorted Problems
       ├── Priority Action Plan
       └── One-Click Improved README (Raw & Formatted Preview)
```

---

## 🚀 Open-Source AI: Why Gemma 2?

ReadMeRoast is built specifically on **Gemma 2 (`gemma-2-27b-it` / `gemma-2-9b-it`)**, Google's premier open-weight model family:

1. **Open-Weight Transparency & Reproducibility**: Unlike proprietary closed APIs, open-weight models ensure developer evaluation criteria are inspectable, reproducible, and verifiable.
2. **Sovereignty & Provider Freedom**: ReadMeRoast abstracts AI inference behind an isolated service layer (`lib/ai/client.ts`). You can run Gemma through Google AI Studio, Groq, OpenRouter, or self-host it on local GPUs with Ollama/vLLM.
3. **Structured JSON Adherence**: Gemma 2 demonstrates exceptional fidelity to strict JSON schema contracts, enabling reliable scoring and classification.
4. **Zero-Hallucination Rewriting**: Strict negative prompting instructs Gemma never to invent fake CLI flags, ports, dependencies, or environment variables. Missing data is tagged with clean developer placeholders (`<!-- [TODO: ...] -->`).

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, Server Components & Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing, zero unchecked `any`)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom developer-tool dark theme and CSS variables
- **Validation**: [Zod](https://zod.dev/) for client URL validation and AI structured response contracts
- **AI Core**: [Gemma 2](https://ai.google.dev/gemma) open-weight model
- **Markdown Rendering**: [react-markdown](https://github.com/remarkjs/react-markdown) and [remark-gfm](https://github.com/remarkjs/remark-gfm)
- **Celebrations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Render](https://render.com/) via `render.yaml`

---

## 🏁 Getting Started

### Prerequisites
- Node.js `>= 18.0.0`
- npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/username/readmeroast.git
cd readmeroast
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Add your free Gemma API key from Google AI Studio:
```env
GEMMA_API_KEY=your_gemini_or_gemma_api_key_here
GEMMA_MODEL=gemma-2-27b-it
```
*(Optional: add `GITHUB_TOKEN` to raise GitHub REST API rate limits from 60 to 5,000 req/hr).*

> **Offline / Demo Mode**: If no API key is configured, ReadMeRoast automatically activates its heuristic analysis engine so you can evaluate the complete UI, score meters, and roast flow without barriers!

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production
```bash
npm run build
npm run start
```

---

## 🧪 Real-World Verification Matrix

ReadMeRoast has been verified across diverse public GitHub repositories:

| Scenario / Target | Expected Behavior | Result |
| :--- | :--- | :--- |
| **Well-documented repo** (e.g. `facebook/react`) | High score (80+), praise with light banter, confetti | ✅ Passed |
| **Minimal / short README** | Catches missing sections, high-severity warning on setup | ✅ Passed |
| **Large README** (>24k chars) | Truncates safely, displays warning banner, analyzes cleanly | ✅ Passed |
| **Repository with no README** | Friendly `💀 No README found. We can't roast what doesn't exist.` | ✅ Passed |
| **Invalid / Non-GitHub URL** | Client & server validation reject with clear error message | ✅ Passed |
| **One-Click Fixed README** | Generates valid Markdown without hallucinating fake commands | ✅ Passed |
| **Copy & Download** | Copies to clipboard and triggers `.md` file download | ✅ Passed |

---

## ☁️ Deployment on Render

ReadMeRoast includes a production `render.yaml` manifest.

1. Create a new Web Service on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Render will auto-detect the configuration:
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Set `GEMMA_API_KEY` (and optional `GITHUB_TOKEN`) in the Render Environment Variables tab.

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:
1. Fork the repo and create your feature branch: `git checkout -b feat/my-feature`
2. Ensure `npm run build` passes with zero errors.
3. Follow the Conventional Commits specification.
4. Submit a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.
