import { Application, t } from "@baseless/core/prelude";
import { Env } from "../env";

export const roomapp = new Application()
	.get("/hello", () => {
		return Response.json({ hello: "ok" });
	}, {
		detail: {
			tags: ["HEYY"],
		},
		response: {
			200: {
				content: {
					"application/json": {
						schema: t.Object({ kind: t.Literal("agent") }),
					},
				},
			},
		},
	});

export class RoomDurableObject implements DurableObject {
	#fetch!: Awaited<ReturnType<typeof roomapp.build>>;
	constructor(state: DurableObjectState, env: Env) {
		state.blockConcurrencyWhile(async () => {
			this.#fetch = await roomapp.decorate({}).build();
		});
	}
	fetch(request: Request<unknown, CfProperties<unknown>>): Response | Promise<Response> {
		return this.#fetch(request);
	}
	alarm?(): void | Promise<void> {
		throw new Error("Method not implemented.");
	}
	webSocketMessage?(ws: WebSocket, message: string | ArrayBuffer): void | Promise<void> {
		throw new Error("Method not implemented.");
	}
	webSocketClose?(ws: WebSocket, code: number, reason: string, wasClean: boolean): void | Promise<void> {
		throw new Error("Method not implemented.");
	}
	webSocketError?(ws: WebSocket, error: unknown): void | Promise<void> {
		throw new Error("Method not implemented.");
	}

}