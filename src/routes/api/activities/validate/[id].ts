import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const post: RequestHandler = async ({ request, params }) => {

  let status = 500;
  let body = {};

  try {

    await prisma.actividad.update({
      data: {
        fecha_validacion: new Date(),
        fecha_ultima_modificacion: new Date(),
        validado_por: "eduardo@usb.ve"
      },
      where: {
        id: Number(params.id)
      }
    });

    status = 200;
    body = { action: "Validated" };

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
