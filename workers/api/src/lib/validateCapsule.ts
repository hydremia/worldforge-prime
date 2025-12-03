import type { RuntimeCapsule } from '../types/RuntimeCapsule';

/**
 * Very lightweight runtime validation for RuntimeCapsule.
 * We’re not enforcing the full JSON Schema here because
 * Ajv's codegen is blocked in the Workers runtime.
 */
export function assertValidCapsule(candidate: unknown): RuntimeCapsule {
    if (!candidate || typeof candidate !== 'object') {
        throw new Error('RuntimeCapsule must be an object');
    }

    const data = candidate as any;

    const must = (field: string, ok: boolean) => {
        if (!ok) {
            throw new Error(`Invalid RuntimeCapsule: ${field} is missing or invalid`);
        }
    };

    // Top-level fields
    must('capsuleId', typeof data.capsuleId === 'string');
    must('userId', typeof data.userId === 'string');

    // campaign
    must('campaign', data.campaign && typeof data.campaign === 'object');
    must('campaign.id', typeof data.campaign?.id === 'string');
    must('campaign.name', typeof data.campaign?.name === 'string');
    must('campaign.system', typeof data.campaign?.system === 'string');
    must('campaign.projectType', typeof data.campaign?.projectType === 'string');
    must('campaign.lastActive', typeof data.campaign?.lastActive === 'string');

    // preferences
    must('preferences', data.preferences && typeof data.preferences === 'object');
    must('preferences.tone', typeof data.preferences?.tone === 'string');
    must('preferences.density', typeof data.preferences?.density === 'string');
    must('preferences.pacing', typeof data.preferences?.pacing === 'string');
    must('preferences.cinematic', typeof data.preferences?.cinematic === 'string');

    // state
    must('state', data.state && typeof data.state === 'object');
    must('state.travel', data.state.travel && typeof data.state.travel === 'object');
    must(
        'state.travel.progress',
        typeof data.state.travel?.progress === 'number'
    );

    // runtimeFlags
    must(
        'runtimeFlags',
        data.runtimeFlags && typeof data.runtimeFlags === 'object'
    );
    must(
        'runtimeFlags.awaitingChoice',
        typeof data.runtimeFlags?.awaitingChoice === 'boolean'
    );
    must(
        'runtimeFlags.needsSummary',
        typeof data.runtimeFlags?.needsSummary === 'boolean'
    );
    must(
        'runtimeFlags.toneShift',
        typeof data.runtimeFlags?.toneShift === 'boolean'
    );

    return data as RuntimeCapsule;
}
