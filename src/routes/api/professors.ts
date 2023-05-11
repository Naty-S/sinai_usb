import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const professors = await prisma.profesor.findMany({
      include: {
        Departamento: { select: { nombre: true } }
      }
    });

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
