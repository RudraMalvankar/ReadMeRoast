import { validateAndParseGithubUrl } from "../lib/validation.js";
import { sanitizeAnalysisJson } from "../types/analysis.js";

console.log("🔥 ReadMeRoast Automated Verification Test Suite");
console.log("================================================");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  }
}

// 1. URL Validation Tests
console.log("\n[1] URL Validation Tests:");

const valid1 = validateAndParseGithubUrl("https://github.com/facebook/react");
assert(valid1.success && valid1.data.owner === "facebook" && valid1.data.repo === "react", "Standard HTTPS GitHub repo");

const valid2 = validateAndParseGithubUrl("https://github.com/vercel/next.js.git");
assert(valid2.success && valid2.data.owner === "vercel" && valid2.data.repo === "next.js", "Repo with .git suffix");

const valid3 = validateAndParseGithubUrl("tailwindlabs/tailwindcss");
assert(valid3.success && valid3.data.owner === "tailwindlabs" && valid3.data.repo === "tailwindcss", "Shorthand owner/repo syntax");

const invalid1 = validateAndParseGithubUrl("https://gitlab.com/user/project");
assert(!invalid1.success, "Reject non-GitHub URLs (GitLab)");

const invalid2 = validateAndParseGithubUrl("not-a-valid-url");
assert(!invalid2.success, "Reject malformed text");

const invalid3 = validateAndParseGithubUrl("https://github.com/settings");
assert(!invalid3.success, "Reject reserved non-repo paths (settings)");

// 2. Schema Sanitization Tests
console.log("\n[2] Schema Sanitization & Score Clamping Tests:");

const sampleRaw = {
  overallScore: 72,
  categoryScores: {
    clarity: 78,
    documentation: 70,
    setup: 55,
    usage: 80,
    examples: 60,
    visuals: 40,
    developerExperience: 75,
  },
  roast: "Your README has more badges than installation instructions. Bold strategy.",
  verdict: "Pretty decent. But there is work to do.",
  strengths: ["Clear project purpose", "Usage example is easy to follow"],
  problems: [
    {
      title: "Missing installation instructions",
      severity: "high",
      explanation: "A new contributor cannot clearly determine how to install this.",
      recommendation: "Add a Quick Start section with installation commands.",
    },
  ],
  recommendations: ["Add installation instructions", "Add screenshots"],
};

try {
  const sanitized = sanitizeAnalysisJson(sampleRaw);
  assert(sanitized.overallScore === 72, "Preserves overall score");
  assert(sanitized.categoryScores.clarity === 78, "Preserves category scores");
  assert(sanitized.problems.length === 1 && sanitized.problems[0].severity === "high", "Preserves problem items and severity");
  assert(sanitized.strengths.length === 2, "Preserves strengths list");
} catch (e) {
  assert(false, `Sanitization failed with error: ${e.message}`);
}

// 3. Defensive Clamping Tests
console.log("\n[3] Defensive Clamping & Recovery Tests:");
const malformedRaw = {
  overallScore: 150, // Out of bounds
  categoryScores: {
    clarity: -20, // Negative out of bounds
    documentation: "85", // String coercion
    setup: null, // Null fallback
  },
  roast: "",
  problems: "invalid", // Not an array
};

try {
  const clamped = sanitizeAnalysisJson(malformedRaw);
  assert(clamped.overallScore === 100, "Clamps upper score to 100");
  assert(clamped.categoryScores.clarity === 0, "Clamps negative score to 0");
  assert(clamped.categoryScores.documentation === 85, "Coerces string numbers correctly");
  assert(typeof clamped.categoryScores.setup === "number", "Supplies fallback for null values");
  assert(Array.isArray(clamped.problems), "Recovers non-array problems gracefully");
} catch (e) {
  assert(false, `Defensive recovery failed: ${e.message}`);
}

console.log("\n================================================");
console.log(`Results: ${passed} Passed, ${failed} Failed`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log("🎉 All automated verification tests PASSED!\n");
}
