import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query 
*/
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    const requests = await prisma.s1_novel.findMany({
      select: {
        id: true,
        Evaluador: { select: {
          nombre1: true,
          apellido1: true,
          correo: true
        }},
        estado: true,
        comentario: true,
        proyecto: true,
        jurado_usb: { select: {
          id: true,
          Profesor: { select: {nombre1: true, apellido1: true} },
          veredicto: true
        }},
        jurado_externo: { select: {id: true, nombre: true, veredicto: true} }
      },
      where: { profesor: Number(params.professor) }
    });
    // console.log("back - proy")

    // const p = requests[3].proyecto
    // const n = new Blob([p], { type: "application/pdf" })
    // console.log(p)
    // console.log(n)
    // console.log("text")
    // console.log(p.toJSON())
    // requests[3].proyecto = Buffer.from(p).toString('base64')
    

    status = 200;
    body = requests;

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
