/**
 * Controls framework behaviour, sets inizializations.
 *
 * For more details see https://kit.svelte.dev/docs/hooks
 */
import type { Handle, GetSession } from "@sveltejs/kit";

import * as cookie from "cookie";


export const handle: Handle = async function ({ event, resolve }) {
	
	// console.log("-------------------------------------------------------------------------_______________________________________")
	// console.log("Hook, event.request")
	// Sets cookies when login with session info
	const cookies = cookie.parse(event.request.headers.get("cookie") || '');
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, "base64").toString("utf-8");
	// console.log("-------------------------------------------------------------------------")
	// console.log("Hook, cookies:", cookies)
	// console.log("Hook, jwt:", jwt)
	
	// set user
	event.locals.user = jwt ? JSON.parse(jwt) : null;
	const res = await resolve(event);
	// console.log("-------------------------------------------------------------------------")
	// console.log("Hook, res:", res)
	// console.log("-------------------------------------------------------------------------")
	// console.log("Hook, user after resolve:", event.locals.user)

	return res;
};


export const getSession: GetSession = function ({ locals }) {
	return {
		user: locals.user
	};
};

