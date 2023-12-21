import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query active PREPRAII not paid approved requests
*/
export const GET: RequestHandler = async function () {

  let status = 500;
  let body = {};

  try {
    const evals = await prisma.prepraii_solicitud.findMany({
      include: {
        Actividad: { include: {
          articulo_revista: true,
          autores_usb: true,
          autores_externos: true
        }},
        Convocatoria: true,
        Evaluador: { select: {nombre1: true, apellido1: true, correo: true} },
        Profesor: { select: {nombre1: true, apellido1: true, correo: true} },
        prepraii_profesores: { select: {
          contrato_constancia: true,
          Profesor: { select: {nombre1: true, apellido1: true, correo: true} }
        }}
      },
      where: {
        Convocatoria: { activo: {equals: true} },
        estado: { equals: "Aprobado" },
        pagada: { equals: false }
      }
    });

    status = 200;
    body = evals;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};
