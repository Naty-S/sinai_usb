import type { RequestHandler } from "@sveltejs/kit";

import type { Group } from "$lib/interfaces/groups";
import { handle_error, prisma } from "$api/_api";


/**
 * Query all research groups
 * 
 * @returns {id: number, nombre: string}
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const groups: Group[] = await prisma.grupo_investigacion.findMany({
      select: {
        id: true,
        nombre: true
      }
    });

    status = 200;
    body = groups;

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
