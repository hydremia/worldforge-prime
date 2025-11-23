// workers/nomina/src/nominaRegistry.ts
import type { NominaTemplate } from "./nominaTypes";

export interface Env {
  NOMINA_KV: KVNamespace;
  NOMINA_TOKEN: string;
}

export async function loadTemplate(
  env: Env,
  species: string,
  culture: string
): Promise<NominaTemplate | null> {
  const key = `template:${species}:${culture}`;
  const raw = await env.NOMINA_KV.get(key);
  if (!raw) return null;
  return JSON.parse(raw) as NominaTemplate;
}

export async function loadSeeds(
  env: Env,
  species: string,
  culture: string
): Promise<string[]> {
  const key = `seeds:${species}:${culture}`;
  const raw = await env.NOMINA_KV.get(key);
  if (!raw) return [];

  const trimmed = raw.trim();

  // Support both JSONL (preferred) and JSON array (legacy /nomina/seed/add)
  if (trimmed.startsWith("[")) {
    try {
      const arr = JSON.parse(trimmed);
      if (Array.isArray(arr)) {
        return arr.map((v) => String(v).trim()).filter((v) => v.length > 0);
      }
    } catch {
      // fall through to line-based best-effort parsing
    }
  }

  // Fallback: treat as newline-delimited
  return trimmed
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}
