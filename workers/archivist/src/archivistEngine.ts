import type { Env, CanonEntity, ConflictRecord, ReviewRequest } from "./archivistTypes";
import { getCanonEntity, makeConflictKey } from "./archivistRegistry";

export async function detectConflict(
  env: Env,
  review: ReviewRequest
): Promise<{ status: "new" | "no_change" | "conflict"; conflictRecord?: ConflictRecord }> {
  const incoming = review.entity;
  const existing = await getCanonEntity(env, incoming.entityType, incoming.id);

  if (!existing) {
    return { status: "new" };
  }

  const conflictFields: string[] = [];

  if (existing.name !== incoming.name) conflictFields.push("name");
  if (existing.summary !== incoming.summary) conflictFields.push("summary");
  if (existing.body !== incoming.body) conflictFields.push("body");

  if (existing.timeline?.year !== incoming.timeline?.year) {
    conflictFields.push("timeline.year");
  }
  if (existing.timeline?.era !== incoming.timeline?.era) {
    conflictFields.push("timeline.era");
  }

  if (conflictFields.length === 0) {
    return { status: "no_change" };
  }

  const conflictId = crypto.randomUUID();
  const now = new Date().toISOString();

  const conflictRecord: ConflictRecord = {
    conflictId,
    entityId: incoming.id,
    entityType: incoming.entityType,
    existing,
    incoming,
    conflictFields,
    status: "open",
    createdAt: now,
    updatedAt: now,
  };

  const key = makeConflictKey(conflictId);
  await env.ARCHIVIST_KV.put(key, JSON.stringify(conflictRecord));

  return { status: "conflict", conflictRecord };
}
