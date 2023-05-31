import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Deletes an activity
 * 
 * @returns The code `deleted`
*/
export const DELETE: RequestHandler = async ({ params }) => {

  let status = 500;
  let body = {};

  try {

    await prisma.actividad.delete({
      where: {
        id: Number(params.id)
      }
    });

    const date = new Date();
    const fecha = date;
    const hora = date;

    // await prisma.log_operacion_actividad.create({
    //   data: {
    //     actividad: Number(params.id),
    //     profesor: ,
    //     fecha,
    //     hora,
    //     operacion: "Eliminacion",
    //     sql: e.query,
    //     tabla: kind
    //   }
    // })

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
