import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


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
export const PATCH: RequestHandler = async ({ params }) => {

  let status = 500;
  let body = {};

  try {
    await prisma.actividad.update({
      data: {
        fecha_ultima_modificacion: new Date(),
        fecha_validacion: null,
        validado_por: null
      },
      where: {
        id: Number(params.id)
      }
    });

    status = 200;
    body = { action: "invalidated" };

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
