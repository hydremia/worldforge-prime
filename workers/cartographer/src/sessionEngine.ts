export type MapSessionStatus =
  | "pending_features"
  | "needs_clarification"
  | "building_proposal"
  | "proposal_ready"
  | "pending_archivist"
  | "complete"
  | "aborted";

export interface ClarificationQuestion {
  id: string;
  featureId?: string;
  prompt: string;
}

export interface ClarificationAnswer {
  questionId: string;
  answer: string;
  notes?: string;
}

export interface MapFeature {
  featureId: string;
  kind: string;
  label?: string;
  tags?: string[];
  notes?: string;
}

export interface SessionLogEntry {
  timestamp: string;
  message: string;
}

export interface MapIngestionSessionState {
  schemaVersion: "cartographer.session.v1";
  sessionId: string;
  worldId: string;
  mapName: string;
  sourceType: string;
  description?: string;
  status: MapSessionStatus;
  features: MapFeature[];
  pendingQuestions: ClarificationQuestion[];
  answers: ClarificationAnswer[];
  proposedWSM?: unknown;
  createdAt: string;
  updatedAt: string;
  logs: SessionLogEntry[];
}

const STORAGE_KEY = "session";

/**
 * CartographerSessionDO
 *
 * One DO instance = one map ingestion session.
 * We store a single MapIngestionSessionState object in DO storage.
 */
export class CartographerSessionDO {
  private state: DurableObjectState;
  private env: any;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method.toUpperCase();

    try {
      if (method === "POST" && path === "/session/init") {
        return this.handleInit(request);
      }

      if (method === "POST" && path === "/session/features") {
        return this.handleFeatures(request);
      }

      if (method === "POST" && path === "/session/answers") {
        return this.handleAnswers(request);
      }

      if (method === "GET" && path === "/session/proposal") {
        return this.handleGetProposal();
      }

      if (method === "GET" && path === "/session") {
        return this.handleGetSession();
      }

      return new Response(
        JSON.stringify({ error: "Unknown DO route", path }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    } catch (err: any) {
      return new Response(
        JSON.stringify({
          error: "Session DO error",
          message: err?.message ?? String(err),
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // --- Internal helpers ---

  private async loadSession(): Promise<MapIngestionSessionState | null> {
    const data = await this.state.storage.get<MapIngestionSessionState>(STORAGE_KEY);
    return data ?? null;
  }

  private async saveSession(session: MapIngestionSessionState): Promise<void> {
    session.updatedAt = new Date().toISOString();
    await this.state.storage.put(STORAGE_KEY, session);
  }

  private log(session: MapIngestionSessionState, message: string): void {
    session.logs.push({
      timestamp: new Date().toISOString(),
      message,
    });
  }

  // --- Handlers ---

  private async handleInit(request: Request): Promise<Response> {
    const existing = await this.loadSession();
    if (existing) {
      return new Response(
        JSON.stringify({
          error: "Session already initialized",
          sessionId: existing.sessionId,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const sessionId = (body.sessionId as string) || this.state.id.toString();
    const worldId = String(body.worldId ?? "");
    const mapName = String(body.mapName ?? "");
    const sourceType = String(body.sourceType ?? "");
    const description = body.description ? String(body.description) : undefined;

    if (!worldId || !mapName || !sourceType) {
      return new Response(
        JSON.stringify({ error: "worldId, mapName, and sourceType are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const now = new Date().toISOString();
    const session: MapIngestionSessionState = {
      schemaVersion: "cartographer.session.v1",
      sessionId,
      worldId,
      mapName,
      sourceType,
      description,
      status: "pending_features",
      features: [],
      pendingQuestions: [],
      answers: [],
      proposedWSM: undefined,
      createdAt: now,
      updatedAt: now,
      logs: [],
    };

    this.log(session, "Session initialized");

    await this.saveSession(session);

    return new Response(JSON.stringify(session), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  private async handleFeatures(request: Request): Promise<Response> {
    const session = await this.loadSession();
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session not initialized" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const incoming = Array.isArray(body.features) ? body.features : [];

    const normalized: MapFeature[] = incoming.map((f: any) => ({
      featureId: String(f.featureId ?? crypto.randomUUID()),
      kind: String(f.kind ?? "unknown"),
      label: f.label ? String(f.label) : undefined,
      tags: Array.isArray(f.tags) ? f.tags.map((t: any) => String(t)) : undefined,
      notes: f.notes ? String(f.notes) : undefined,
    }));

    session.features.push(...normalized);

    // For now, keep simple status progression.
    if (session.status === "pending_features") {
      session.status = "needs_clarification";
      this.log(session, `Received ${normalized.length} features; transitioning to needs_clarification.`);
    } else {
      this.log(session, `Received ${normalized.length} additional features.`);
    }

    await this.saveSession(session);

    return new Response(
      JSON.stringify({
        sessionId: session.sessionId,
        status: session.status,
        featureCount: session.features.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  private async handleAnswers(request: Request): Promise<Response> {
    const session = await this.loadSession();
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session not initialized" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const incoming = Array.isArray(body.answers) ? body.answers : [];

    const normalized: ClarificationAnswer[] = incoming.map((a: any) => ({
      questionId: String(a.questionId ?? ""),
      answer: String(a.answer ?? ""),
      notes: a.notes ? String(a.notes) : undefined,
    }));

    session.answers.push(...normalized);
    this.log(session, `Received ${normalized.length} clarification answers.`);

    // For now, assume answers move us toward proposal-building.
    if (session.status === "needs_clarification") {
      session.status = "building_proposal";
      this.log(session, "Transitioning to building_proposal.");
    }

    await this.saveSession(session);

    return new Response(
      JSON.stringify({
        sessionId: session.sessionId,
        status: session.status,
        answerCount: session.answers.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  private async handleGetProposal(): Promise<Response> {
    const session = await this.loadSession();
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session not initialized" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // For now, proposal is just a placeholder built from current session.
    const proposal = session.proposedWSM ?? {
      note: "WSM proposal generation not implemented yet; this is a placeholder.",
      worldId: session.worldId,
      mapName: session.mapName,
      featureCount: session.features.length,
      answerCount: session.answers.length,
    };

    return new Response(
      JSON.stringify({
        sessionId: session.sessionId,
        status: session.status,
        proposal,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  private async handleGetSession(): Promise<Response> {
    const session = await this.loadSession();
    if (!session) {
      return new Response(
        JSON.stringify({ error: "Session not initialized" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
