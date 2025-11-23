// workers/nomina/src/nominaTypes.ts

export type RarityBand = "common" | "uncommon" | "rare";
export type Gender = "male" | "female" | "neutral";
export type RarityBias = "common" | "uncommon" | "rare" | "mixed";
export type UniquenessScope = "batch" | "culture";

export interface NominaTemplatesBlock {
  male: string[];
  female: string[];
  neutral: string[];
  family: string[];
}

export interface NominaPatternSet {
  id: string;
  weight: number;
  syllables: {
    prefix: string[];
    core: string[];
    suffix: string[];
    family_core: string[];
  };
}

export interface NominaTemplate {
  version: string;
  species: string;
  culture: string;
  aliases: string[];
  tags: string[];
  templates: NominaTemplatesBlock;
  patternSets: NominaPatternSet[];
  orthography: {
    caseStyle: "capitalized" | "upper" | "lower";
    allowedDigraphs: string[];
    forbiddenClusters: string[];
    vowelBias: "low" | "medium" | "high";
    notes?: string;
  };
  rarity: {
    common: number;
    uncommon: number;
    rare: number;
  };
  collision: {
    scope: "world" | "species" | "culture";
    maxSimilarPer1000: number;
    similarityThreshold: number;
  };
  isolation: {
    isIsolated: boolean;
    modifier: unknown | null;
  };
  qa: {
    status: "draft" | "qa_passed" | "deprecated";
    notes?: string;
  };
}

export type NominaCultureKey = `${string}:${string}`; // "species:culture"

export interface GenerateRequest {
  species: string;
  culture: string;
  gender: Gender;
  count: number;
  rarityBias: RarityBias;
  uniquenessScope: UniquenessScope;
}

export interface GenerateResult {
  species: string;
  culture: string;
  gender: Gender;
  count: number;
  names: string[];
  rarityBias: RarityBias;
  uniquenessScope: UniquenessScope;
}
