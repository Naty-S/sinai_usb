import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";

/**
 * 
 */
export const get: RequestHandler = async function({ request, params }) {

  let status = 500;
  let headers = { location: '/' };
  let body = {};

  try {
    const _user = await prisma.usuario.findUniqueOrThrow({
      where: {
        login: params.user
      },
      include: {
        administrador: true,
        profesor: {
          include: {
            ppi: true,
            grupos_investigacion: true,
            historico_grupos: true,
            coordinacion: true,
            division: true,
            jefe_departamentos: true,
            representante_departamentos: true,
          }
        }
      }
    });

    const professor = _user.profesor;
    if (professor) {
      
      const coord_chief = professor.coordinacion;
      const division_chief = professor.division;
      const professor_department = await prisma.departamento.findUniqueOrThrow({
        where: {
          id: professor.departamento
        },
        select: {
          nombre: true
        }
      });

      body = {
        email: professor.correo
        , is_dean: false
        , profesor_profile: {
          id_card: professor.cedula
          , name1: professor.nombre1
          , name2: professor.nombre2
          , surname1: professor.apellido1
          , surname2: professor.apellido2
          , category: professor.categoria
          , dedication: professor.dedicacion
          , department_id: professor.departamento
          , department_name: professor_department.nombre
          , groups: ["g1","g2"]
          , diploma: professor.diploma_tipo
          , diploma_university: professor.diploma_universidad
          , ppi_number: professor.ppi[0].numero
          , ppi_level: professor.ppi[0].nivel
          , profile: professor.perfil
          , page: professor.url
          , research_lines: professor.lineas_investigacion
        }
        , coord_chief: coord_chief ? {
          coord_id: coord_chief.id
          , coord_name: coord_chief.nombre
        } : undefined
        , division_chief: division_chief ? {
          division_id: division_chief.id
          , division_name: division_chief.nombre
        } : undefined
        , is_dep_chief: professor.jefe_departamentos.length > 0
        , is_dep_representative: professor.representante_departamentos.length > 0
      };
    } else if (_user.administrador) {
      console.log("Admin, todas las actividades")
    } else {
      console.log("No es profesor ni admin")
    };

    status = 200;
    headers = {
      location: "/actividades/profesor"
    }

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
  }

  return {
    status,
    headers,
    body
  };
};
