export type RuntimeTone =
    | 'heroic'
    | 'gritty'
    | 'grounded'
    | 'mythic'
    | 'cozy'
    | 'noir'
    | 'default';

export type RuntimeDensity = 'lean' | 'balanced' | 'lush';
export type RuntimePacing = 'fast' | 'normal' | 'slow';
export type RuntimeCinematic = 'low' | 'medium' | 'high';

export type RuntimeSceneMode =
    | 'exploration'
    | 'combat'
    | 'social'
    | 'downtime'
    | null;

export type RuntimeProjectType =
    | 'campaign'
    | 'world'
    | 'region'
    | 'faction'
    | 'city'
    | 'pantheon'
    | 'npc-set'
    | 'item-set'
    | 'sandbox';

export type RuntimeCreativeFocus =
    | 'none'
    | 'world'
    | 'region'
    | 'city'
    | 'settlement'
    | 'faction'
    | 'culture'
    | 'pantheon'
    | 'npc'
    | 'npc-roster'
    | 'item'
    | 'location'
    | 'misc';

export type RuntimeCreativeDepth = 'broad-strokes' | 'medium' | 'deep-dive';

export type RuntimeCreativeFormat =
    | 'prose'
    | 'bullet-outline'
    | 'mixed'
    | 'schema-oriented';

export type RuntimeCreativeAssetType =
    | null
    | 'world'
    | 'region'
    | 'city'
    | 'settlement'
    | 'faction'
    | 'culture'
    | 'pantheon'
    | 'npc'
    | 'npc-roster'
    | 'item'
    | 'location'
    | 'dungeon'
    | 'document';

export interface RuntimeTravelState {
    region: string | null;
    path: string | null;
    progress: number; // 0–1
}

export interface RuntimePreferences {
    tone: RuntimeTone;
    density: RuntimeDensity;
    pacing: RuntimePacing;
    cinematic: RuntimeCinematic;
    narratorVoice: string | null;
    dmPersona: string | null;

    creativeFocus: RuntimeCreativeFocus;
    creativeDepth: RuntimeCreativeDepth;
    creativeFormat: RuntimeCreativeFormat;
}

export interface RuntimeCampaignMeta {
    id: string;
    name: string;
    system: 'DND5.5E-2024';
    projectType: RuntimeProjectType;
    era: string | null;
    lastActive: string; // ISO 8601
}

export interface RuntimeCreativeContext {
    assetType: RuntimeCreativeAssetType;
    assetId: string | null;
    assetLabel: string | null;
}

export interface RuntimeFlags {
    awaitingChoice: boolean;
    needsSummary: boolean;
    toneShift: boolean;
}

export interface RuntimeCapsule {
    capsuleId: string;
    userId: string;
    campaign: RuntimeCampaignMeta;
    preferences: RuntimePreferences;
    state: {
        activeScene: RuntimeSceneMode;
        pcs: string[];
        npcs: string[];
        locationsVisited: string[];
        questFlags: Record<string, unknown>;
        travel: RuntimeTravelState;
        creativeContext: RuntimeCreativeContext;
    };
    runtimeFlags: RuntimeFlags;
}
