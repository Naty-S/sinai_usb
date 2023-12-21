import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Make an PREPRAII request.
 * 
 * @returns The code `prepraii_requested`
*/
export const POST: RequestHandler = async function ({ request }) {

  const { data, pathname } = await request.json();

  const _data = {
    ...data.prepraii_solicitud,
    prepraii_profesores: { create: data.prepraii_profesores }
  };

  let status = 500;
  let body = {};
  let headers = { location: '/' };

  try {

    // Set professor coordinator as default evaluator
    const professor = await prisma.profesor.findUniqueOrThrow({
      select: { departamento: true },
      where: { id: _data.profesor }
    });
    
    const professor_department= await prisma.departamento.findUniqueOrThrow({
      select: { coordinacion: true },
      where: { id: professor.departamento }
    });

    const professor_coordinator = await prisma.coordinacion.findUniqueOrThrow({
      select: { Jefe: { select: {id: true} } },
      where: { id: professor_department.coordinacion }
    })

    _data.evaluador = professor_coordinator.Jefe.id;

    // Set actual prepraii
    _data.convocatoria = (await prisma.prepraii_convocatoria.findFirstOrThrow({
      where: { activo: { equals: true } }
    })).id;
    
    // Make request
    await prisma.prepraii_solicitud.create({ data: _data });

    status = 303;
    headers = { location: `${pathname}?prepraii_requested=true` };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, headers, body };
};

/**
 * 
 * 
 * @returns The code `Exito`
 */
export const PATCH: RequestHandler = async ({ request }) => {

  const { prepraii, data } = await request.json();

  let status = 500;
  let body = {};

  try {
    await prisma.prepraii_solicitud.update({
      data,
      where: { id: Number(prepraii) }
    });

    status = 200;
    body = { code: "Exito" };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};
