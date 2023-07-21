import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";

import { ve_date } from "$lib/utils/formatting";


/**
 * Updates activity as invalidated.
 * 
 * Fields updated:
 *    - last modification date `fecha_ultima_modificacion`
 *    - validation date `fecha_ultima_modificacion`
 *    - user who validated `validado_por`
 *
 * @returns The code `invalidated`
*/
export const PATCH: RequestHandler = async ({ params, request }) => {

  const _data = await request.json();
  const data = {
    fecha_ultima_modificacion: ve_date().toISO({ includeOffset: false })?.concat("Z"),
    fecha_validacion: null,
    validado_por: null
  };

  let status = 500;
  let body = {};

  try {
    await prisma.actividad.update({
      data,
      where: {
        id: Number(params.id)
      }
    });

    const date = ve_date().toISO({ includeOffset: false })?.concat("Z");

    await prisma.log_operacion_actividad.create({
      data: {
        actividad: Number(params.id),
        usuario: _data.invalidado_por,
        fecha: date,
        hora: date,
        operacion: "Validacion",
        sql: `UPDATE actividad SET (${JSON.stringify(data)}) WHERE id=${params.id};`,
        tabla: _data.kind
      }
    });

    status = 200;
    body = { code: "invalidated" };

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
