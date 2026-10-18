import { z } from "zod";

export const categoryScoresSchema = z.object({
  clarity: z.number().min(0).max(100),
  documentation: z.number().min(0).max(100),
  setup: z.number().min(0).max(100),
  usage: z.number().min(0).max(100),
  examples: z.number().min(0).max(100),
  visuals: z.number().min(0).max(100),
  developerExperience: z.number().min(0).max(100),
});

export const problemItemSchema = z.object({
  title: z.string().min(1),
  severity: z.enum(["high", "medium", "low"]),
  explanation: z.string().min(1),
  recommendation: z.string().min(1),
});

export const readmeAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100),
  categoryScores: categoryScoresSchema,
  roast: z.string().min(1),
  verdict: z.string().min(1),
  strengths: z.array(z.string().min(1)).min(1),
  problems: z.array(problemItemSchema),
  recommendations: z.array(z.string().min(1)).min(1),
});

export type CategoryScores = z.infer<typeof categoryScoresSchema>;
export type ProblemItem = z.infer<typeof problemItemSchema>;
export type ReadmeAnalysis = z.infer<typeof readmeAnalysisSchema>;

export interface AnalysisResponse {
  analysis: ReadmeAnalysis;
  metadata: {
    name: string;
    owner: string;
    fullName: string;
    description: string;
    stars: number;
    forks: number;
    openIssues: number;
    language: string;
    defaultBranch: string;
    htmlUrl: string;
    license?: string;
    topics?: string[];
    updatedAt?: string;
  };
  readmeStats: {
    rawSize: number;
    isTruncated: boolean;
    truncatedLength: number;
    filename: string;
  };
  modelUsed: string;
  analyzedAt: string;
}

/**
 * Validates, repairs, and clamps raw AI JSON output against the ReadmeAnalysis contract.
 */
export function sanitizeAnalysisJson(raw: any): ReadmeAnalysis {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid analysis payload: expected JSON object.");
  }

  const clamp = (val: any, fallback: number) => {
    const num = typeof val === "number" ? val : Number(val);
    if (isNaN(num)) return fallback;
    return Math.max(0, Math.min(100, Math.round(num)));
  };

  const rawCategories = raw.categoryScores || {};

  const cleanCategories: CategoryScores = {
    clarity: clamp(rawCategories.clarity, 70),
    documentation: clamp(rawCategories.documentation, 65),
    setup: clamp(rawCategories.setup, 60),
    usage: clamp(rawCategories.usage, 65),
    examples: clamp(rawCategories.examples, 55),
    visuals: clamp(rawCategories.visuals, 50),
    developerExperience: clamp(rawCategories.developerExperience, 65),
  };

  // Compute calculated average if overallScore is missing
  const calculatedAvg = Math.round(
    Object.values(cleanCategories).reduce((a, b) => a + b, 0) / Object.keys(cleanCategories).length
  );

  const cleanProblems: ProblemItem[] = Array.isArray(raw.problems)
    ? raw.problems
        .filter((p: any) => p && typeof p === "object")
        .map((p: any) => ({
          title: String(p.title || "Documentation Gap").trim(),
          severity: ["high", "medium", "low"].includes(String(p.severity).toLowerCase())
            ? (String(p.severity).toLowerCase() as "high" | "medium" | "low")
            : "medium",
          explanation: String(p.explanation || "Needs clarification or additional documentation.").trim(),
          recommendation: String(p.recommendation || "Add clear documentation for this area.").trim(),
        }))
    : [];

  const cleanStrengths: string[] = Array.isArray(raw.strengths) && raw.strengths.length > 0
    ? raw.strengths.map((s: any) => String(s).trim()).filter(Boolean)
    : ["Clear repository naming and basic structure present"];

  const cleanRecs: string[] = Array.isArray(raw.recommendations) && raw.recommendations.length > 0
    ? raw.recommendations.map((r: any) => String(r).trim()).filter(Boolean)
    : ["Add a step-by-step Quick Start section", "Include a concrete usage snippet"];

  const candidate = {
    overallScore: clamp(raw.overallScore, calculatedAvg),
    categoryScores: cleanCategories,
    roast: String(raw.roast || "Your README leaves much to the imagination.").trim(),
    verdict: String(raw.verdict || "A functional project that needs tighter documentation to shine.").trim(),
    strengths: cleanStrengths,
    problems: cleanProblems,
    recommendations: cleanRecs,
  };

  return readmeAnalysisSchema.parse(candidate);
}
