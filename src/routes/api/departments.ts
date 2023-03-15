import type { RequestHandler } from "@sveltejs/kit";

import type { Department } from "$lib/interfaces/departments";
import { handle_error, prisma } from "$api/_api";


export const get: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const departments: Department[] = await prisma.departamento.findMany({
      select: {
        id: true,
        nombre: true
      }
    });

    status = 200;
    body = departments;

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
