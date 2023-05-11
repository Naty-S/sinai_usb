/**
 * Controls framework behaviour, sets inizializations.
 *
 * For more details see https://kit.svelte.dev/docs/hooks
 */
import type { Handle, GetSession } from "@sveltejs/kit";

import * as cookie from "cookie";


export const handle: Handle = async function ({ event, resolve }) {

	// Sets cookies when login with session info
	const cookies = cookie.parse(event.request.headers.get("cookie") || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, "base64").toString("utf-8");
	
	// set user
	event.locals.user = jwt ? JSON.parse(jwt) : null;

	return await resolve(event);
};


export const getSession: GetSession = function ({ locals }) {
	return {
		user: locals.user
	};
};

