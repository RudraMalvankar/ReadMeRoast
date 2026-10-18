import { NextRequest, NextResponse } from "next/server";
import { validateAndParseGithubUrl } from "@/lib/validation";
import { fetchRepositoryData } from "@/lib/github";
import { improveReadme } from "@/lib/ai/improve-readme";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { url, analysis } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Missing repository URL." },
        { status: 400 }
      );
    }

    if (!analysis || typeof analysis !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid analysis payload." },
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
    const { metadata, readme } = await fetchRepositoryData(owner, repo);

    const { improvedMarkdown, modelUsed } = await improveReadme(
      metadata,
      readme,
      analysis
    );

    return NextResponse.json({
      improvedMarkdown,
      modelUsed,
      generatedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error("Improve README error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate improved README." },
      { status: 500 }
    );
  }
}
