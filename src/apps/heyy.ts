import { Application, t } from "@baseless/core/prelude";
import { AuthenticationContext } from "@baseless/core/plugins/authentication/context";
import { agentapp } from "./agent";

export const heyyapp = new Application()
	// .demands<AuthenticationContext>()
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
	.proxy("/agent/{agentid}", agentapp, ({ params }) => {
		return Response.json({ agentid: params.agentid }, { status: 200 });
	});
