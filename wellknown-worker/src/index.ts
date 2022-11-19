/**
 * Welcome to Cloudflare Workers! This is your first worker.
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
	// const username = resource?.replaceAll("acct:", "").split("@")[0];
	// const hostname = url.hostname;

	// if (resource === null) {
	// 	return new Response("No resource provided", { status: 400 });
	// }

	// if (username === "rich") {
	// 	return new Response(JSON.stringify({
	// 		"aliases": [
	// 			"https://fedi.rnorth.org/@rich",
	// 			"https://fedi.rnorth.org/users/rich"
	// 		],
	// 		"links": [
	// 			{
	// 				"href": "https://fedi.rnorth.org/@rich",
	// 				"rel": "http://webfinger.net/rel/profile-page",
	// 				"type": "text/html"
	// 			},
	// 			{
	// 				"href": "https://fedi.rnorth.org/users/rich",
	// 				"rel": "self",
	// 				"type": "application/activity+json"
	// 			}
	// 		],
	// 		"subject": `acct:${username}@${hostname}`
	// 	}),
	// 		{
	// 			headers: { "Content-Type": "application/jrd+json" }
	// 		}
	// 	);
	// } else {
	// 	return new Response("Not found", { status: 404 });
	// }

	return Response.redirect(`https://fedi.rnorth.org/.well-known/webfinger?resource=${resource}`, 302);
}

function hostmeta(url: URL): Response {
	// const protocol = url.protocol;
	// const hostname = url.hostname;

	// return new Response(
	// 	`<?xml version="1.0" encoding="UTF-8"?>
	// 	<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
	// 	  <Link rel="lrdd" template="${protocol}//${hostname}/.well-known/webfinger?resource={uri}"/>
	// 	</XRD>`,
	// 	{
	// 		headers: { "Content-Type": "application/xrd+xml" }
	// 	}
	// )
	return Response.redirect("https://fedi.rnorth.org/.well-known/host-meta", 302);
}

function nodeinfo(url: URL): Response {
	// return new Response(
	// 	JSON.stringify(
	// 		{
	// 			"links": [
	// 				{
	// 					"href": "https://fedi.rnorth.org/nodeinfo/2.0",
	// 					"rel": "http://nodeinfo.diaspora.software/ns/schema/2.0"
	// 				}
	// 			]
	// 		}
	// 	),
	// 	{
	// 		headers: { "Content-Type": "application/json" }
	// 	}
	// );
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
