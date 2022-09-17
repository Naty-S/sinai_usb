import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const post: RequestHandler = async ({ request }) => {

  const _data = await request.json();
  const data_usuario = {
    login: _data.professor.correo,
    pass: _data.cedula, // TODO encriptar
    // padded: 
  };
  const data_ppi = {
    ..._data.ppi,
    profesor: _data.professor.cedula,
    // activo: 
  };

  let status = 303;
  let headers = {
    location: '/'
  };

  try {
    await prisma.usuario.create({ data: data_usuario });
    await prisma.profesor.create({ data: _data.professor });
    await prisma.ppi.create({ data: data_ppi });

    status = 303;
    headers = {
      location: "/registro?exito=true"
    };
  } catch (error) {
    // TODO: 
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === 'P1012') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        );
      };
    };
    throw error;
  };

  return {
    status,
    headers
  };
};
