export interface Env {
  RNG_TOKEN: string;
  RNG_LOG_KV?: KVNamespace;
}

export interface RollMeta {
  campaign?: string;
  session?: string;
  actor?: string;
  label?: string;
  [key: string]: unknown;
}

export interface SingleRollSpec {
  sides: number;
  count?: number;
  label?: string;
  meta?: RollMeta;
}

export interface RollResult {
  sides: number;
  rolls: number[];
  total: number;
  label?: string;
  meta?: RollMeta;
  rollId: string;
  timestamp: string;
}

export interface BatchRollRequest {
  rolls: SingleRollSpec[];
}
