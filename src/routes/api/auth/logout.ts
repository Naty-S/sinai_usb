import type { RequestHandler } from "@sveltejs/kit";


/**
 * Logout user. Delete cookie.
*/
export const POST: RequestHandler = async ({ request }) => {
  const jwt = await request.json()
  console.log("-------------------------------------------------------------------------_______________________________________")
  console.log("Logout jwt:", jwt)

  return {
    headers: {
      "set-cookie": `jwt=${jwt}; Path=/sinai; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    },
    body: {
      ok: true
    }
  };
};
