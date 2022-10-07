import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const patch: RequestHandler = async ({ params }) => {

  let status = 500;
  let body = {};

  try {
    await prisma.actividad.update({
      data: {
        fecha_ultima_modificacion: new Date(),
        fecha_validacion: null,
        validado_por: null
      },
      where: {
        id: Number(params.id)
      }
    });

    status = 200;
    body = { action: "invalidated" };

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
