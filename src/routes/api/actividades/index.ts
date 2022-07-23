import type { Request } from "@sveltejs/kit";

export const get: RequestHandler = async ({ request, params }) => {
  console.log(params)
  let body = {};
  let status = 500;

  // Redirect
  return {
    status: 303,
    headers: {
      location: "/actividades"
    }
  }
}
