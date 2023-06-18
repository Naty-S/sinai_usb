import type { RequestHandler } from "@sveltejs/kit";

import type { Coordination } from "$lib/interfaces/coordinations";
import { handle_error, prisma } from "$api/_api";


/**
 * Query all coordinations
 * 
 * @returns {id: number, nombre: string}
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const coordinations: Coordination[] = await prisma.coordinacion.findMany({
      select: {
        id: true,
        nombre: true
      }
    });

    status = 200;
    body = coordinations;

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
