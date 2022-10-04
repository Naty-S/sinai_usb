import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const get: RequestHandler = async function () {
  let status = 500;
  let body = {};

  try {
    const period = await prisma.periodo_bra.findUniqueOrThrow({
      where: { id: 0 }
    });

    status = 200;
    body = period;

  } catch (error) {
    // TODO: 
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("error: ", error)
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

export const patch: RequestHandler = async function ({ request }) {

  const data = await request.json();
  data.activo = Boolean(data.activo);
  console.log("patch",data)

  let status = 500;
  let body = {};

  try {
    await prisma.periodo_bra.update({
      data,
      where: { id: 0 }
    });

    status = 200;
    body = { action: "BRA Modified" };

  } catch (error) {
    // TODO: 
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("error: ", error)
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