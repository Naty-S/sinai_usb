import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const patch: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();

  let status = 303;
  let headers = {
    location: '/'
  };

  try {

    await prisma.profesor.update({
      data: _data.new,
      where: {
        id: Number(params.id)
      }
    });

    status = 303;
    const action = _data.url.pathname === "/validaciones/nuevos_profesores" ? "validado" : "perfil_modificado";
    headers = {
      location: `${_data.url}?${action}=true`
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

export const del: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();

  let status = 303;
  let headers = {
    location: '/'
  };

  try {

    await prisma.profesor.delete({
      where: {
        id: Number(params.id)
      }
    });

    status = 303;
    headers = {
      location: `${_data.url}?rechazado=true`
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
