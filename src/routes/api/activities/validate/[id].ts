import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const patch: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();

  let status = 500;
  let body = {};

  try {
    await prisma.actividad.update({
      data: {
        fecha_ultima_modificacion: new Date(),
        fecha_validacion: new Date(),
        validado_por: _data.validado_por
      },
      where: {
        id: Number(params.id)
      }
    });

    status = 200;
    body = { code: "validated" };

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
