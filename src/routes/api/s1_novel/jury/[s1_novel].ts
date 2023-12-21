import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * 
*/
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    const jury = await prisma.s1_novel.findUniqueOrThrow({
      select: {
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
      where: { id: Number(params.s1_novel) }
    });

    status = 200;
    body = jury;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};
