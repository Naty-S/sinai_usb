import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";

import { ve_date } from "$lib/utils/formatting";


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

  const date = ve_date().toISO({ includeOffset: false })?.concat("Z");
  const data = {
    fecha_ultima_modificacion: date,
    fecha_validacion: date,
    validado_por: _data.validado_por
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
        usuario: _data.validado_por,
        fecha: date,
        hora: date,
        operacion: "Validacion",
        sql: `UPDATE actividad SET (${JSON.stringify(data)}) WHERE id=${params.id};`,
        tabla: _data.kind
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
