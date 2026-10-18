import { NextRequest, NextResponse } from "next/server";
import { validateAndParseGithubUrl } from "@/lib/validation";
import { fetchRepositoryData, FetchRepoError } from "@/lib/github";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const urlParam = searchParams.get("url");

  if (!urlParam) {
    return NextResponse.json(
      { error: "Missing required 'url' query parameter." },
      { status: 400 }
    );
  }

  const validation = validateAndParseGithubUrl(urlParam);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error },
      { status: 400 }
    );
  }

  const { owner, repo } = validation.data;

  try {
    const data = await fetchRepositoryData(owner, repo);
    return NextResponse.json(data);
  } catch (error: any) {
    const status = error.code === "NOT_FOUND" ? 404 : error.code === "NO_README" ? 404 : error.code === "RATE_LIMITED" ? 429 : 500;
    return NextResponse.json(
      {
        error: error.message || "An unexpected error occurred while fetching the repository.",
        code: error.code || "FETCH_ERROR",
      },
      { status }
    );
  }
}
