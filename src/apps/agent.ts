import { Application, t } from "@baseless/core/prelude";

export const agentapp = new Application()
	.get("", () => {
		return Response.json({ kind: "agent" }, { status: 200 });
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
