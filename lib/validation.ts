import { z } from "zod";

export interface ParsedGithubRepo {
  owner: string;
  repo: string;
  cleanUrl: string;
}

export type ValidationResult =
  | { success: true; data: ParsedGithubRepo }
  | { success: false; error: string };

const GITHUB_REPO_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?(?:\/.*)?$/;

const SHORTHAND_REPO_REGEX = /^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+?)(?:\.git)?$/;

export const repoUrlSchema = z
  .string()
  .trim()
  .min(1, "Please enter a GitHub repository URL.")
  .max(500, "Repository URL is too long.");

/**
 * Validates and extracts owner and repository name from a given GitHub URL or shorthand.
 */
export function validateAndParseGithubUrl(input: string): ValidationResult {
  const parseCheck = repoUrlSchema.safeParse(input);
  if (!parseCheck.success) {
    return {
      success: false,
      error: parseCheck.error.issues[0]?.message || "Please enter a valid GitHub repository URL.",
    };
  }

  const raw = parseCheck.data.trim();

  // Try standard GitHub URL
  const urlMatch = raw.match(GITHUB_REPO_REGEX);
  if (urlMatch) {
    const owner = urlMatch[1];
    const repo = urlMatch[2];
    if (isValidSegment(owner) && isValidSegment(repo)) {
      return {
        success: true,
        data: {
          owner,
          repo,
          cleanUrl: `https://github.com/${owner}/${repo}`,
        },
      };
    }
  }

  // Try shorthand owner/repo
  const shortMatch = raw.match(SHORTHAND_REPO_REGEX);
  if (shortMatch && !raw.includes(":") && !raw.startsWith("http")) {
    const owner = shortMatch[1];
    const repo = shortMatch[2];
    if (isValidSegment(owner) && isValidSegment(repo)) {
      return {
        success: true,
        data: {
          owner,
          repo,
          cleanUrl: `https://github.com/${owner}/${repo}`,
        },
      };
    }
  }

  return {
    success: false,
    error: "Please enter a valid public GitHub repository URL (e.g. https://github.com/facebook/react).",
  };
}

function isValidSegment(str: string): boolean {
  if (!str || str.length > 100) return false;
  // Disallow common invalid segments or path traversals
  if (["settings", "organizations", "explore", "trending", "stars", "issues", "pulls"].includes(str.toLowerCase())) {
    return false;
  }
  return /^[a-zA-Z0-9_.-]+$/.test(str);
}
