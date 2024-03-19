import type { Env } from './env';
import { Application } from "@baseless/core/prelude";
import { openapi } from "@baseless/core/plugins/openapi";
import { heyyapp } from './apps/heyy';
export { AgentDurableObject } from "./apps/agent";
export { RoomDurableObject } from "./apps/room";

const app = new Application()
	.decorate({ agent: {} as DurableObjectNamespace })
	.decorate({ room: {} as DurableObjectNamespace })
	.use(openapi())
	.use(heyyapp);

let appfetch: undefined | Awaited<ReturnType<typeof app.build>>;

export default {
	async fetch(req, env, ctx) {
		if (!appfetch) {
			appfetch = await app.decorate({ agent: env.AGENT, room: env.ROOM }).build();
		}
		return appfetch(req);
	}
} satisfies ExportedHandler<Env, unknown>;