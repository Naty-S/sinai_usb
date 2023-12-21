import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query 
*/
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    const evals = await prisma.s1_novel.findMany({
      include: {
        Evaluador: { select: {nombre1: true, apellido1: true, correo: true} },
        Profesor: { select: {nombre1: true, apellido1: true, correo: true} },
        jurado_usb: { select: {
          id: true,
          veredicto: true,
          Profesor: { select: {nombre1: true, apellido1: true, correo: true} }
        }},
        jurado_externo: { select: {
          id: true,
          correo: true,
          nombre: true,
          universidad: true,
          veredicto: true
        }}
      },
      where: { evaluador: Number(params.coord) }
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
