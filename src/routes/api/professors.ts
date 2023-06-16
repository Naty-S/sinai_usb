import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query all professors
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const professors = await prisma.profesor.findMany({ orderBy: { apellido1: "asc" } });

    status = 200;
    body = professors;

  } catch (error: any) {
    
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return {
    status,
    body
  };
};
