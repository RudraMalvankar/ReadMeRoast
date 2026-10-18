import { callGemmaModel, getAIConfig } from "./client";
import { ReadmeAnalysis } from "@/types/analysis";
import { RepoMetadata, ReadmeData } from "@/lib/github";

const IMPROVE_SYSTEM_PROMPT = `You are ReadMeRoast's Expert Technical Writer.

Your task is to rewrite and dramatically improve a GitHub repository's README based on diagnostic findings.

CRITICAL ZERO-HALLUCINATION RULES:
1. DO NOT invent factual details that are not in the repository metadata or existing README.
2. DO NOT invent fake commands, URLs, environment variables, APIs, ports, or dependencies.
3. If essential information (like installation commands, environment variables, or prerequisites) is missing or unverified, use a clearly marked developer placeholder:
   <!-- [TODO: Add specific setup instructions here] -->
   or
   \`\`\`bash
   # [TODO]: Insert build command here
   \`\`\`
4. Reorganize, clarify, format, and structure the existing verified information using modern developer documentation best practices:
   - Clear Title & Concise Tagline
   - Overview & Value Proposition
   - Key Features (bulleted)
   - Quick Start / Installation (copyable commands)
   - Minimal Usage Example
   - Configuration / Environment (if mentioned in original)
   - Architecture / How It Works (if relevant)
   - Contributing & License
5. Retain all real badges, links, and code snippets from the original README.
6. Return ONLY the raw, complete Markdown document. Do NOT wrap the entire answer in backticks or add introductory commentary.`;

export async function improveReadme(
  metadata: RepoMetadata,
  readme: ReadmeData,
  analysis: ReadmeAnalysis
): Promise<{ improvedMarkdown: string; modelUsed: string }> {
  const config = getAIConfig();

  const userPrompt = `GENERATE_IMPROVED_README
Repository: ${metadata.fullName}
Description: ${metadata.description}
Primary Language: ${metadata.language}
License: ${metadata.license || "Not specified"}

=== DIAGNOSTIC PROBLEMS IDENTIFIED ===
${analysis.problems
  .map(
    (p, i) => `${i + 1}. [${p.severity.toUpperCase()}] ${p.title}: ${p.explanation}. Fix: ${p.recommendation}`
  )
  .join("\n")}

=== PRIORITY RECOMMENDATIONS ===
${analysis.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}

=== ORIGINAL README CONTENT (${readme.filename}) ===
${readme.content}
=== END ORIGINAL README CONTENT ===

Please rewrite this README into a clean, modern, developer-friendly Markdown document following all instructions.`;

  const rawOutput = await callGemmaModel(IMPROVE_SYSTEM_PROMPT, userPrompt, false);

  // Clean if the model wrapped output in ```markdown ... ```
  let cleaned = rawOutput.trim();
  if (cleaned.startsWith("```markdown")) {
    cleaned = cleaned.replace(/^```markdown\s*/i, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```md")) {
    cleaned = cleaned.replace(/^```md\s*/i, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }

  return {
    improvedMarkdown: cleaned,
    modelUsed: config.modelName,
  };
}
