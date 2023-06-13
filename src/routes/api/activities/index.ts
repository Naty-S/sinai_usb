import type { RequestHandler } from "@sveltejs/kit";

import type { Ranks } from "$lib/interfaces/activities";
import { handle_error, prisma } from "$api/_api";


/**
 * Query coordinations & divisions for display in Dean dashboard
*/
export const GET: RequestHandler = async function () {

  let status = 500;
  let body = {};

  try {
    const coordinations = await prisma.coordinacion.findMany({
      select: {
        id: true,
        nombre: true
      }
    });

    const divisions = await prisma.division.findMany({
      select: {
        id: true,
        nombre: true
      }
    });

    const entities: Ranks = {
      coordinations,
      divisions
    };

    status = 200;
    body = entities;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    throw new Error(message + ' ' + code);
  };

  return {
    status,
    body
  };
};
