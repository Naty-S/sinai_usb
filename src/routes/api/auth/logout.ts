import type { RequestHandler } from "@sveltejs/kit";


/**
 * Logout user. Delete cookie.
*/
export const POST: RequestHandler = async () => {
  return {
    headers: {
      "set-cookie": "jwt=deleted; Path=/sinai; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    },
    body: {
      ok: true
    }
  };
};
