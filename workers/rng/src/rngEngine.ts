import type { Env, SingleRollSpec, RollResult, BatchRollRequest } from "./rngTypes";

function rollDie(sides: number): number {
  if (!Number.isSafeInteger(sides) || sides < 2) {
    throw new Error("Invalid die size");
  }

  const buffer = new Uint32Array(1);
  const maxRandom = 0xffffffff;
  const bucketSize = Math.floor(maxRandom / sides);
  const limit = bucketSize * sides;

  while (true) {
    crypto.getRandomValues(buffer);
    const r = buffer[0];
    if (r < limit) {
      return (r % sides) + 1;
    }
  }
}

export function rollSingle(spec: SingleRollSpec): RollResult {
  const count = spec.count && spec.count > 0 && spec.count <= 1000 ? spec.count : 1;
  const rolls: number[] = [];

  for (let i = 0; i < count; i++) {
    rolls.push(rollDie(spec.sides));
  }

  const total = rolls.reduce((a, b) => a + b, 0);
  const rollId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  return {
    sides: spec.sides,
    rolls,
    total,
    label: spec.label,
    meta: spec.meta,
    rollId,
    timestamp,
  };
}

export async function rollBatch(env: Env, body: BatchRollRequest): Promise<RollResult[]> {
  const specs = body.rolls ?? [];
  if (!Array.isArray(specs) || specs.length === 0) {
    throw new Error("No rolls specified");
  }
  if (specs.length > 100) {
    throw new Error("Too many rolls requested");
  }

  const results: RollResult[] = specs.map((spec) => rollSingle(spec));

  // Optional logging
  if (env.RNG_LOG_KV) {
    const logKey = `batch:${results[0]?.timestamp ?? Date.now()}:${crypto.randomUUID()}`;
    await env.RNG_LOG_KV.put(logKey, JSON.stringify(results));
  }

  return results;
}

export async function logSingle(env: Env, result: RollResult): Promise<void> {
  if (!env.RNG_LOG_KV) return;
  const logKey = `single:${result.timestamp}:${result.rollId}`;
  await env.RNG_LOG_KV.put(logKey, JSON.stringify(result));
}
