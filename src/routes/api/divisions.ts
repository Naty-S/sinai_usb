import type { RequestHandler } from "@sveltejs/kit";

import type { Division } from "$lib/interfaces/divisions";
import { handle_error, prisma } from "$api/_api";


/**
 * Query all divisions
 * 
 * @returns {id: number, nombre: string}
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const divisions: Division[] = await prisma.division.findMany({
      select: {
        id: true,
        nombre: true,
        departamentos: { select: { id: true, nombre: true } }
      }
    });

    status = 200;
    body = divisions;

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
