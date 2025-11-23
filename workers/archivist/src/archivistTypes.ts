export interface Env {
  ARCHIVIST_KV: KVNamespace;
  ARCHIVIST_TOKEN: string;
}

export type CanonEntityType =
  | "npc"
  | "location"
  | "faction"
  | "item"
  | "event"
  | "rule"
  | "other";

export interface CanonEntity {
  id: string;
  entityType: CanonEntityType;
  name: string;
  summary: string;
  body: string;
  tags: string[];
  timeline?: {
    era?: string;
    year?: number;
    relative?: string;
  };
  metadata: {
    source: "user" | "import" | "generated";
    sourceRef?: string;
    createdAt: string;
    updatedAt: string;
    version: string;
  };
}

export interface ReviewRequest {
  draftId?: string;
  entity: CanonEntity;
  context?: string;
}

export interface ConflictRecord {
  conflictId: string;
  entityId: string;
  entityType: CanonEntityType;
  existing: CanonEntity;
  incoming: CanonEntity;
  conflictFields: string[];
  status: "open" | "resolved" | "discarded";
  resolutionNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResolveRequest {
  conflictId: string;
  chosenVersion: "existing" | "incoming" | "merged";
  mergedEntity?: CanonEntity;
  resolutionNote?: string;
}
