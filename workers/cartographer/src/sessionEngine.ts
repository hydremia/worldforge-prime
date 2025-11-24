export class CartographerSessionDO {
  state: DurableObjectState;
  env: any;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request): Promise<Response> {
    return new Response(
      JSON.stringify({
        ok: true,
        durableObject: "CartographerSessionDO",
        note: "Durable Object is wired and responding.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}
