import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Deletes an activity
 * 
 * @returns The code `deleted`
*/
export const DELETE: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();

  let status = 500;
  let body = {};

  try {
    const act = await prisma.actividad.delete({
      where: {
        id: Number(params.id)
      }
    });

    const date = new Date();

    await prisma.log_operacion_actividad.create({
      data: {
        actividad: Number(params.id),
        usuario: _data.user.email,
        fecha: date,
        hora: date,
        operacion: "Eliminacion",
        sql: `DELETE FROM actividad WHERE ${JSON.stringify(act)};`,
        tabla: _data.kind
      }
    })

    status = 200;
    body = { code: "deleted" };

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
