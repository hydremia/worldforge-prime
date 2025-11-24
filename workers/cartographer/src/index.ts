import { routeRequest } from './router';

export interface Env {
  WF_CARTO_NODES: KVNamespace;
  WF_CARTO_WORLD_INDEX: KVNamespace;
  WF_CARTO_ADJACENCY: KVNamespace;
  WF_CARTO_MAP_METADATA: KVNamespace;
  WF_CARTO_SESSIONS_ARCHIVE: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return routeRequest(request, env, ctx);
  }
};

export { CartographerSessionDO } from './sessionEngine';
