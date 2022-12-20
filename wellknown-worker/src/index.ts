/**
*
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

function webfinger(url: URL): Response {
	const resource = url.searchParams.get("resource");
	return Response.redirect(`https://fedi.rnorth.org/.well-known/webfinger?resource=${resource}`, 302);
}

function hostmeta(url: URL): Response {
	return Response.redirect("https://fedi.rnorth.org/.well-known/host-meta", 302);
}

function nodeinfo(url: URL): Response {
	return Response.redirect("https://fedi.rnorth.org/nodeinfo", 302);
}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === "@rich") {
			return Response.redirect("https://fedi.rnorth.org/@rich", 302);
		} else if (url.pathname === "/.well-known/webfinger") {
			return webfinger(url);
		} else if (url.pathname === "/.well-known/host-meta") {
			return hostmeta(url);
		} else if (url.pathname === "/.well-known/nodeinfo") {
			return nodeinfo(url);
		} else {
			return new Response("Not Found", { status: 404 });
		}
	},
};
