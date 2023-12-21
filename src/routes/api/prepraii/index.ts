import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query actual PREPRAII and history
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const prepraii = await prisma.prepraii_convocatoria.findMany({
      include: {
        solicitudes: { include: {
          Actividad: { include: {articulo_revista: true} },
          Evaluador: { select: {nombre1: true, apellido1: true, correo: true} },
          Profesor: { select: {nombre1: true, apellido1: true, correo: true} }
        }
      }},
      orderBy: { id: "asc" }
    });

    status = 200;
    body = prepraii;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};

/**
 * Create new PREPRAII.
 * 
 * @returns The code `prepraii_created`
*/
export const POST: RequestHandler = async function ({ request }) {

  const data = await request.json();

  let status = 500;
  let headers = {};
  let body = {};

  try {

    const actual = await prisma.prepraii_convocatoria.findFirst({
      where: { activo: { equals: true } }
    });

    if (actual) {
      await prisma.prepraii_convocatoria.update({
        data: { activo: false },
        where: { id: actual.id }
      });
    };

    await prisma.prepraii_convocatoria.create({ data });

    status = 200;
    body = { code: "prepraii_created" };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, headers, body };
};

/**
 * Updates PREPRAII.
 * 
 * @returns The code `prepraii_updated`
*/
export const PATCH: RequestHandler = async function ({ request }) {

  const { prepraii_id, data } = await request.json();

  let status = 500;
  let headers = {};
  let body = {};

  try {

    await prisma.prepraii_convocatoria.update({
      data,
      where: { id: prepraii_id }
    });

    status = 200;
    body = { code: "prepraii_updated" };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, headers, body };
};
