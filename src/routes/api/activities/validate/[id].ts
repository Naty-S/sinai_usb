import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Updates activity as validated.
 * 
 * Fields updated:
 *    - last modification date `fecha_ultima_modificacion`
 *    - validation date `fecha_ultima_modificacion`
 *    - user who validated `validado_por`
 *
 * @returns The code `validated`
*/
export const PATCH: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();

  let status = 500;
  let body = {};

  try {
    const act = await prisma.actividad.update({
      data: {
        fecha_ultima_modificacion: new Date(),
        fecha_validacion: new Date(),
        validado_por: _data.validado_por
      },
      where: {
        id: Number(params.id)
      }
    });
    
    // await prisma.log_operacion_actividad.create({
    //   data: {
    //     actividad: Number(params.id),
    //     usuario: ,
    //     fecha,
    //     hora,
    //     operacion: "Validacion",
    //     sql: e.query,
    //     tabla: kind
    //   }
    // })

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
