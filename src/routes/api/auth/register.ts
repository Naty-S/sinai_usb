import type { RequestHandler } from "@sveltejs/kit";

import { prisma, handle_error } from "$api/_api";


export const POST: RequestHandler = async function ({ request }) {

  const _data = await request.json();

  let status = 303;
  let headers = {
    location: '/'
  };

  try {
    const data_usuario = {
      login: _data.professor.correo,
      pass: _data.professor.cedula.toString(), // TODO encriptar
      // padded: 
    };

    await prisma.usuario.create({ data: data_usuario });
    const new_p = await prisma.profesor.create({ data: _data.professor });

    const data_pei = {
      ..._data.pei,
      profesor: new_p.id,
      // activo: 
    };
    await prisma.pei.create({ data: data_pei });

    const coord = await prisma.departamento.findUniqueOrThrow({
      where: { id: _data.professor.departamento },
      select: { jefe: true }
    });

    status = 303;
    headers = {
      location: "/sinai/registro?exito=true&coord=" + coord.jefe
    };
  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code ? "&code=" + error.code : '';

    status = 303;
    headers = {
      location: "/sinai/registro?error=" + message + code
    };
  };

  return {
    status,
    headers
  };
};
