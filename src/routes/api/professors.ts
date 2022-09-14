import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const get: RequestHandler = async () => {
  let status = 500;
  let body = {};

  try {
    const p = await prisma.profesor.findUnique({
      where: {
        id: 1168
      }
    });
    console.log(p)
    // TODO: fix some that throws error in lieas_investigacion as NULL
    const professors = await prisma.profesor.findMany({
      select: {
        id: true,
        perfil: true,
        confirmado: true,
        cedula: true,
        activo: true
      }
    });

    status = 200;
    body = professors;

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
    body
  };
};
