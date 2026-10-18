import { NextRequest, NextResponse } from "next/server";
import { validateAndParseGithubUrl } from "@/lib/validation";
import { fetchRepositoryData } from "@/lib/github";
import { analyzeReadme } from "@/lib/ai/analyze-readme";
import { AnalysisResponse } from "@/types/analysis";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please enter a valid GitHub repository URL." },
        { status: 400 }
      );
    }

    const validation = validateAndParseGithubUrl(url);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { owner, repo } = validation.data;

    // Fetch repository and README
    const { metadata, readme } = await fetchRepositoryData(owner, repo);

    // Analyze with Gemma
    const { analysis, modelUsed } = await analyzeReadme(metadata, readme);

    const responsePayload: AnalysisResponse = {
      analysis,
      metadata: {
        name: metadata.name,
        owner: metadata.owner,
        fullName: metadata.fullName,
        description: metadata.description,
        stars: metadata.stars,
        forks: metadata.forks,
        openIssues: metadata.openIssues,
        language: metadata.language,
        defaultBranch: metadata.defaultBranch,
        htmlUrl: metadata.htmlUrl,
        license: metadata.license,
        topics: metadata.topics,
        updatedAt: metadata.updatedAt,
      },
      readmeStats: {
        rawSize: readme.rawSize,
        isTruncated: readme.isTruncated,
        truncatedLength: readme.truncatedLength,
        filename: readme.filename,
      },
      modelUsed,
      analyzedAt: new Date().toISOString(),
    };

    return NextResponse.json(responsePayload);
  } catch (err: any) {
    console.error("Analysis pipeline error:", err);

    let status = 500;
    let message = err?.message || "Failed to analyze repository.";

    if (err?.code === "NOT_FOUND" || err?.code === "NO_README") {
      status = 404;
    } else if (err?.code === "RATE_LIMITED") {
      status = 429;
    }

    return NextResponse.json(
      { error: message, code: err?.code || "ANALYSIS_FAILED" },
      { status }
    );
  }
}
