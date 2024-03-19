import { Application, t } from "@baseless/core/prelude";
import { AuthenticationContext } from "@baseless/core/plugins/authentication/context";
import { agentapp } from "./agent";

export const heyyapp = new Application()
	.demands<{ agent: DurableObjectNamespace }>()
	.demands<{ room: DurableObjectNamespace }>()
	.get("/api/health", () => {
		return Response.json({ status: "up" }, { status: 200 });
	}, {
		detail: {
			summary: "Health check",
			description: "Check if the application is healthy.",
			tags: ["HEYY"],
		},
		response: {
			200: {
				description: "The application is health status.",
				content: {
					"application/json": {
						schema: t.Union([t.Literal("up"), t.Literal("down")]),
					},
				},
			},
		},
	})
	.proxy("/api/agent/{agentid}", agentapp, ({ request, params, agent }) => {
		const id = agent.idFromName(params.agentid);
		const stub = agent.get(id);
		const url = new URL(request.url);
		url.pathname = url.pathname.split("/").slice(4).join("/");
		request = new Request(url, request);
		return stub.fetch(request);
	})
	.proxy("/api/room/{roomid}", agentapp, ({ request, params, room }) => {
		const id = room.idFromName(params.roomid);
		const stub = room.get(id);
		const url = new URL(request.url);
		url.pathname = url.pathname.split("/").slice(4).join("/");
		request = new Request(url, request);
		return stub.fetch(request);
	});
