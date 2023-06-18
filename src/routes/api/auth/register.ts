import type { RequestHandler } from "@sveltejs/kit";

import { prisma, handle_error } from "$api/_api";


/**
 * Register new professor.
 * Manual validation its required to allow login.
 * 
 * @returns Redirects to same page with `exito` and `coord (coodrination chief)`
*/
export const POST: RequestHandler = async function ({ request }) {

  const _data = await request.json();

  let status = 303;
  let body = {};

  try {
    const data_usuario = {
      login: _data.professor.correo,
      pass: _data.professor.cedula.toString(),
    };

    await prisma.usuario.create({ data: data_usuario });
    const new_p = await prisma.profesor.create({ data: _data.professor });

    const data_pei = {
      ..._data.pei,
      profesor: new_p.id,
    };
    await prisma.pei.create({ data: data_pei });

    const coord = await prisma.departamento.findUniqueOrThrow({
      where: { id: _data.professor.departamento },
      select: { jefe: true }
    });

    status = 200;
    body = { coord: coord.jefe };

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
