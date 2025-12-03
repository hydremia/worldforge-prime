import { assertValidCapsule } from '../lib/validateCapsule';
import type { RuntimeCapsule } from '../types/RuntimeCapsule';

export interface Env {
    CAPSULES: KVNamespace;
}

function jsonResponse(body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body, null, 2), {
        status,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
}

async function readJson<T = any>(request: Request): Promise<T> {
    const text = await request.text();
    if (!text) return {} as T;
    try {
        return JSON.parse(text);
    } catch {
        throw new Error('Invalid JSON body');
    }
}

function makeCapsuleKey(capsuleId: string): string {
    return `capsule:${capsuleId}`;
}

export async function handleCapsulesRequest(
    request: Request,
    env: Env
): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const segments = pathname.split('/').filter(Boolean);

    // GET /capsules?userId=...
    if (request.method === 'GET' && segments.length === 1) {
        const userId = url.searchParams.get('userId');
        if (!userId) {
            return jsonResponse({ error: 'userId query param is required' }, 400);
        }
        return listCapsulesForUser(env, userId);
    }

    // POST /capsules
    if (request.method === 'POST' && segments.length === 1) {
        return createCapsule(request, env);
    }

    // /capsules/:capsuleId
    if (segments.length === 2) {
        const capsuleId = segments[1];

        if (request.method === 'GET') {
            return getCapsule(env, capsuleId);
        }

        if (request.method === 'PUT') {
            return putCapsule(request, env, capsuleId);
        }

        if (request.method === 'PATCH') {
            return patchCapsuleState(request, env, capsuleId);
        }
    }

    return jsonResponse({ error: 'Not found' }, 404);
}

async function listCapsulesForUser(env: Env, userId: string): Promise<Response> {
    const list = await env.CAPSULES.list({ prefix: 'capsule:' });
    const capsules: any[] = [];

    for (const key of list.keys) {
        const raw = await env.CAPSULES.get(key.name);
        if (!raw) continue;
        try {
            const capsule = JSON.parse(raw) as RuntimeCapsule;
            if (capsule.userId !== userId) continue;

            capsules.push({
                capsuleId: capsule.capsuleId,
                userId: capsule.userId,
                campaign: capsule.campaign,
                preferences: {
                    tone: capsule.preferences.tone,
                    density: capsule.preferences.density,
                    pacing: capsule.preferences.pacing,
                    cinematic: capsule.preferences.cinematic
                }
            });
        } catch {
            // skip invalid
        }
    }

    return jsonResponse(capsules);
}

async function createCapsule(request: Request, env: Env): Promise<Response> {
    const now = new Date().toISOString();
    const body = await readJson<any>(request);

    if (!body.userId || !body.campaign) {
        return jsonResponse(
            { error: 'userId and campaign are required in request body' },
            400
        );
    }

    const capsuleId: string =
        body.capsuleId && typeof body.capsuleId === 'string'
            ? body.capsuleId
            : (crypto as any).randomUUID
                ? (crypto as any).randomUUID()
                : `cap_${Date.now()}`;

    const candidate: RuntimeCapsule = {
        capsuleId,
        userId: body.userId,
        campaign: {
            id: body.campaign.id,
            name: body.campaign.name,
            system: body.campaign.system ?? 'DND5.5E-2024',
            projectType: body.campaign.projectType ?? 'campaign',
            era: body.campaign.era ?? null,
            lastActive: now
        },
        preferences: {
            tone: body.preferences?.tone ?? 'default',
            density: body.preferences?.density ?? 'balanced',
            pacing: body.preferences?.pacing ?? 'normal',
            cinematic: body.preferences?.cinematic ?? 'medium',
            narratorVoice: body.preferences?.narratorVoice ?? null,
            dmPersona: body.preferences?.dmPersona ?? null,
            creativeFocus: body.preferences?.creativeFocus ?? 'none',
            creativeDepth: body.preferences?.creativeDepth ?? 'medium',
            creativeFormat: body.preferences?.creativeFormat ?? 'mixed'
        },
        state: {
            activeScene: body.state?.activeScene ?? null,
            pcs: body.state?.pcs ?? [],
            npcs: body.state?.npcs ?? [],
            locationsVisited: body.state?.locationsVisited ?? [],
            questFlags: body.state?.questFlags ?? {},
            travel: {
                region: body.state?.travel?.region ?? null,
                path: body.state?.travel?.path ?? null,
                progress: body.state?.travel?.progress ?? 0
            },
            creativeContext: {
                assetType: body.state?.creativeContext?.assetType ?? null,
                assetId: body.state?.creativeContext?.assetId ?? null,
                assetLabel: body.state?.creativeContext?.assetLabel ?? null
            }
        },
        runtimeFlags: {
            awaitingChoice: body.runtimeFlags?.awaitingChoice ?? false,
            needsSummary: body.runtimeFlags?.needsSummary ?? false,
            toneShift: body.runtimeFlags?.toneShift ?? false
        }
    };

    let valid: RuntimeCapsule;
    try {
        valid = assertValidCapsule(candidate);
    } catch (err: any) {
        return jsonResponse({ error: err.message ?? String(err) }, 400);
    }

    await env.CAPSULES.put(makeCapsuleKey(valid.capsuleId), JSON.stringify(valid));

    return jsonResponse(valid, 201);
}

async function getCapsule(env: Env, capsuleId: string): Promise<Response> {
    const raw = await env.CAPSULES.get(makeCapsuleKey(capsuleId));
    if (!raw) {
        return jsonResponse({ error: 'Capsule not found' }, 404);
    }
    return jsonResponse(JSON.parse(raw));
}

async function putCapsule(
    request: Request,
    env: Env,
    capsuleId: string
): Promise<Response> {
    const body = await readJson<RuntimeCapsule>(request);

    if (body.capsuleId && body.capsuleId !== capsuleId) {
        return jsonResponse(
            { error: 'capsuleId in URL and body must match (or body omit capsuleId)' },
            400
        );
    }

    const candidate: RuntimeCapsule = {
        ...body,
        capsuleId,
        campaign: {
            ...body.campaign,
            lastActive: new Date().toISOString()
        }
    };

    let valid: RuntimeCapsule;
    try {
        valid = assertValidCapsule(candidate);
    } catch (err: any) {
        return jsonResponse({ error: err.message ?? String(err) }, 400);
    }

    await env.CAPSULES.put(makeCapsuleKey(valid.capsuleId), JSON.stringify(valid));
    return jsonResponse(valid);
}

async function patchCapsuleState(
    request: Request,
    env: Env,
    capsuleId: string
): Promise<Response> {
    const existingRaw = await env.CAPSULES.get(makeCapsuleKey(capsuleId));
    if (!existingRaw) {
        return jsonResponse({ error: 'Capsule not found' }, 404);
    }

    const existing = JSON.parse(existingRaw) as RuntimeCapsule;
    const patch = await readJson<
        Partial<Pick<RuntimeCapsule, 'state' | 'runtimeFlags'>>
    >(request);

    const merged: RuntimeCapsule = {
        ...existing,
        campaign: {
            ...existing.campaign,
            lastActive: new Date().toISOString()
        },
        state: {
            ...existing.state,
            ...(patch.state || {}),
            travel: {
                ...existing.state.travel,
                ...(patch.state?.travel || {})
            },
            creativeContext: {
                ...existing.state.creativeContext,
                ...(patch.state?.creativeContext || {})
            }
        },
        runtimeFlags: {
            ...existing.runtimeFlags,
            ...(patch.runtimeFlags || {})
        }
    };

    let valid: RuntimeCapsule;
    try {
        valid = assertValidCapsule(merged);
    } catch (err: any) {
        return jsonResponse({ error: err.message ?? String(err) }, 400);
    }

    await env.CAPSULES.put(makeCapsuleKey(valid.capsuleId), JSON.stringify(valid));
    return jsonResponse(valid);
}
