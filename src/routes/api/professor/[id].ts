import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const get: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const profesor = await prisma.profesor.findUniqueOrThrow({
      where: { id: Number(params.id) },
      include: {
        ppi: true,
        grupos_investigacion: true,
        historico_grupos: {
          select: {
            Grupo: true,
            inicio: true,
            fin: true,
          }
        }
      }
    });

    const professor_department = await prisma.departamento.findUniqueOrThrow({
      where: {
        id: profesor.departamento
      },
      select: {
        nombre: true
      }
    });

    const professor = {
        name1: profesor.nombre1
      , name2: profesor.nombre2
      , surname1: profesor.apellido1
      , surname2: profesor.apellido2
      , category: profesor.categoria
      , dedication: profesor.dedicacion
      , department: {
          name: professor_department.nombre
      }
      , groups: {
          grupos_investigacion: profesor.grupos_investigacion
        , historico_grupos: profesor.historico_grupos
      }
      , diploma: profesor.diploma_tipo
      , diploma_university: profesor.diploma_universidad
      , ppi_number: profesor.ppi[0].numero
      , ppi_level: profesor.ppi[0].nivel
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
  console.log(_data)
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

    const action = _data.url.pathname.includes("perfil") ? "modificado" : "validado";
    
    status = 303;
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
