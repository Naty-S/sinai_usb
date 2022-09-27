import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


// gets the info from the professor that can be modified in the profile.
// Its not in the session info (cookies)
export const get: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const profesor = await prisma.profesor.findUniqueOrThrow({
      where: { correo: params.email }
    });

    const professor = {
        category: profesor.categoria
      , dedication: profesor.dedicacion
      , diploma: profesor.diploma_tipo
      , diploma_university: profesor.diploma_universidad
      , profile: profesor.perfil
      , page: profesor.url
      , research_lines: profesor.lineas_investigacion
    };

    status = 200;
    body = professor;

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

export const patch: RequestHandler = async function ({ request, params }) {

  const _data = await request.json();

  let status = 303;
  let headers = {
    location: '/'
  };

  try {
    await prisma.profesor.update({
      where: { correo: params.email },
      data: _data.new
    });

    const action = _data.pathname.includes("perfil") ? "modificado" : "validado";
    
    status = 303;
    headers = {
      location: `${_data.pathname}?${action}=true`
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
      where: { correo: params.email }
    });

    status = 303;
    headers = {
      location: `${_data.pathname}?rechazado=true`
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
