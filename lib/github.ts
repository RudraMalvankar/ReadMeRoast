export interface RepoMetadata {
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
  topics: string[];
  license?: string;
  updatedAt?: string;
}

export interface ReadmeData {
  content: string;
  rawSize: number;
  isTruncated: boolean;
  truncatedLength: number;
  filename: string;
}

export interface FetchRepoResult {
  metadata: RepoMetadata;
  readme: ReadmeData;
}

export type FetchRepoError =
  | { code: "NOT_FOUND"; message: string }
  | { code: "NO_README"; message: string }
  | { code: "RATE_LIMITED"; message: string }
  | { code: "FETCH_FAILED"; message: string };

const MAX_README_CHARS = 24000;

/**
 * Builds request headers, optionally attaching GITHUB_TOKEN if available in env.
 */
function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "ReadMeRoast-App",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token && token.trim().length > 0) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }

  return headers;
}

/**
 * Fetches repository metadata from GitHub REST API.
 */
export async function fetchRepoMetadata(owner: string, repo: string): Promise<RepoMetadata> {
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const response = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    throw {
      code: "NOT_FOUND",
      message: `Repository "${owner}/${repo}" was not found or is private. ReadMeRoast only analyzes public repositories.`,
    };
  }

  if (response.status === 403) {
    const rateRemaining = response.headers.get("x-ratelimit-remaining");
    if (rateRemaining === "0") {
      throw {
        code: "RATE_LIMITED",
        message: "GitHub API rate limit exceeded. Please wait a few moments or set GITHUB_TOKEN in your environment.",
      };
    }
  }

  if (!response.ok) {
    throw {
      code: "FETCH_FAILED",
      message: `GitHub returned status ${response.status} when looking up the repository.`,
    };
  }

  const data = await response.json();

  return {
    name: data.name,
    owner: data.owner?.login || owner,
    fullName: data.full_name || `${owner}/${repo}`,
    description: data.description || "No description provided.",
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    openIssues: data.open_issues_count ?? 0,
    language: data.language || "Markdown",
    defaultBranch: data.default_branch || "main",
    htmlUrl: data.html_url || `https://github.com/${owner}/${repo}`,
    topics: Array.isArray(data.topics) ? data.topics : [],
    license: data.license?.spdx_id || data.license?.name || undefined,
    updatedAt: data.pushed_at || data.updated_at || undefined,
  };
}

/**
 * Fetches the default README from GitHub REST API and decodes Base64 safely.
 */
export async function fetchRepoReadme(owner: string, repo: string): Promise<ReadmeData> {
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;
  const response = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    throw {
      code: "NO_README",
      message: "💀 No README found. We can't roast what doesn't exist.",
    };
  }

  if (response.status === 403) {
    const rateRemaining = response.headers.get("x-ratelimit-remaining");
    if (rateRemaining === "0") {
      throw {
        code: "RATE_LIMITED",
        message: "GitHub API rate limit exceeded. Please wait a moment or configure GITHUB_TOKEN.",
      };
    }
  }

  if (!response.ok) {
    throw {
      code: "FETCH_FAILED",
      message: `Unable to retrieve README from GitHub (Status: ${response.status}).`,
    };
  }

  const data = await response.json();
  const filename = data.name || "README.md";

  if (!data.content || typeof data.content !== "string") {
    throw {
      code: "NO_README",
      message: "💀 The README in this repository is empty. There is nothing to roast.",
    };
  }

  // Decode GitHub Base64 content
  let decoded = "";
  try {
    const cleanedBase64 = data.content.replace(/\s/g, "");
    decoded = Buffer.from(cleanedBase64, "base64").toString("utf-8");
  } catch (err) {
    throw {
      code: "FETCH_FAILED",
      message: "Failed to decode README content from GitHub.",
    };
  }

  const rawSize = decoded.length;
  if (rawSize === 0) {
    throw {
      code: "NO_README",
      message: "💀 The README is completely empty. We can't roast what doesn't exist.",
    };
  }

  let isTruncated = false;
  let content = decoded;
  if (decoded.length > MAX_README_CHARS) {
    isTruncated = true;
    content = decoded.slice(0, MAX_README_CHARS);
  }

  return {
    content,
    rawSize,
    isTruncated,
    truncatedLength: content.length,
    filename,
  };
}

/**
 * Convenience helper to fetch both metadata and README concurrently.
 */
export async function fetchRepositoryData(owner: string, repo: string): Promise<FetchRepoResult> {
  const [metadata, readme] = await Promise.all([
    fetchRepoMetadata(owner, repo),
    fetchRepoReadme(owner, repo),
  ]);

  return { metadata, readme };
}
