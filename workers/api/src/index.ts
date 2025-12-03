import { handleCapsulesRequest, Env as CapsulesEnv } from './routes/capsules';

export interface Env extends CapsulesEnv {
    // Extend here if you add more bindings later
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext
    ): Promise<Response> {
        const url = new URL(request.url);
        const pathname = url.pathname;

        if (pathname.startsWith('/capsules')) {
            return handleCapsulesRequest(request, env);
        }

        return new Response(
            JSON.stringify({ error: 'Not found', path: pathname }, null, 2),
            {
                status: 404,
                headers: { 'Content-Type': 'application/json; charset=utf-8' }
            }
        );
    }
};
