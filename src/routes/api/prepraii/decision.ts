import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Updates .
 * 
 * @returns Redidercts . The code `decision_made`
*/
export const PATCH: RequestHandler = async function ({ request }) {

  const { prepraii_id, data, pathname } = await request.json();

  let status = 500;
  let body = {};
  let headers = { location: '/' };

  try {

    const convocatoria = await prisma.prepraii_convocatoria.findFirstOrThrow({
      where: { activo: { equals: true } }
    });

    const req = await prisma.prepraii_solicitud.findUniqueOrThrow({
      select: {
        Actividad: {select: {autores_usb: true, autores_externos: true}}
      },
      where: { id: prepraii_id }
    });

    const n_autores = req.Actividad.autores_usb.length + req.Actividad.autores_externos.length;

    data.monto = data.tipo == 1 ? convocatoria.monto_tipo1 : convocatoria.monto_tipo2;
    
    if (n_autores > 1) { data.monto = (data.monto * 2) / n_autores;
    } else if (n_autores <= 0) {
      throw new Error("No authors in the article selected. Should not happen.");
    };

    await prisma.prepraii_solicitud.update({ data, where: { id: prepraii_id } });

    status = 303;
    headers = { location: `${pathname}?decision_made=true` };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, headers, body };
};
