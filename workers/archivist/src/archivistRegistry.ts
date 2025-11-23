import type { Env, CanonEntity } from "./archivistTypes";

export function makeCanonKey(entityType: CanonEntity["entityType"], id: string): string {
  return `canon:${entityType}:${id}`;
}

export function makeConflictKey(conflictId: string): string {
  return `conflicts:${conflictId}`;
}

export async function getCanonEntity(
  env: Env,
  entityType: CanonEntity["entityType"],
  id: string
): Promise<CanonEntity | null> {
  const key = makeCanonKey(entityType, id);
  const json = await env.ARCHIVIST_KV.get(key);
  if (!json) return null;
  return JSON.parse(json) as CanonEntity;
}

export async function putCanonEntity(env: Env, entity: CanonEntity): Promise<string> {
  const key = makeCanonKey(entity.entityType, entity.id);
  await env.ARCHIVIST_KV.put(key, JSON.stringify(entity));
  return key;
}
