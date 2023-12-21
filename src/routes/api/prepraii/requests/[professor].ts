import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query 
*/
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    const requests = await prisma.prepraii_solicitud.findMany({
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
      where: { profesor: Number(params.professor) }
    });    

    status = 200;
    body = requests;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};
