import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { Department } from "$interfaces/departments";
import { prisma } from "$api/_api";


export const get: RequestHandler = async ({ request, params }) => {
  let status = 500;
  let body = {};

  try {
    const departments: Department[] = await prisma.departamento.findMany({
      select: {
        id: true,
        nombre: true
      }
    });

    status = 200;
    body = departments;

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
