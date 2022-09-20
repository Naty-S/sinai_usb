import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const patch: RequestHandler = async ({ params }) => {

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
    body = { action: "Invalidated" };

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
