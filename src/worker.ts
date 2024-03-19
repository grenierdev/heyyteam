import type { Env } from './env';
import { Application } from "@baseless/core/prelude";
import { openapi } from "@baseless/core/plugins/openapi";
import { heyyapp } from './apps/heyy';

const app = new Application()
	.use(openapi())
	.use(heyyapp);

const fetch = await app.build();

export default {
	async fetch(req, env, ctx) {
		return fetch(req);
	}
} satisfies ExportedHandler<Env, unknown>;