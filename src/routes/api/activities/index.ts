import type { RequestHandler } from "@sveltejs/kit";

import type { DeanActivities } from "$lib/interfaces/activities";
import { handle_error, prisma } from "$api/_api";


export const GET: RequestHandler = async ({ request, locals }) => {

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

    const entities: DeanActivities = {
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
