import { z } from "zod";

const envSchema = z.object({
  GEMMA_API_KEY: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  GEMMA_MODEL: z.string().default("gemma-2-27b-it"),
  GROQ_API_KEY: z.string().optional(),
  OPENROUTER_API_KEY: z.string().optional(),
  GEMMA_BASE_URL: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  MONGODB_URI: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

export function getValidatedEnv(): Env {
  if (validatedEnv) return validatedEnv;

  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    console.warn("Environment validation notice:", result.error.format());
    return {
      GEMMA_MODEL: "gemma-2-27b-it",
      NODE_ENV: "development",
    };
  }

  validatedEnv = result.data;
  return validatedEnv;
}
