import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query current PREPRAII
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const prepraii = await prisma.prepraii_convocatoria.findFirst({
      where: { activo: { equals: true } }
    });

    status = 200;
    body = prepraii || false;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};
