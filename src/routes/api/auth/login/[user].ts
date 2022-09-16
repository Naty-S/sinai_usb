import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { User } from "$interfaces/auth";

import { prisma } from "$api/_api";

/**
 * 
 */
export const post: RequestHandler = async function({ request, params }) {

  const _data = await request.json();

  let status = 500;
  let headers = {};
  let body = {};

  try {
    const _user = await prisma.usuario.findUniqueOrThrow({
      where: {
        login: params.user,
        // pass: _data.pass
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
    
    let user: User = {
      email: _user.login,
      is_dean: !_user.administrador
    };
    let jwt = '';

    if (professor) {
      
      const coord_chief = professor.coordinacion ?
        { coord_id: professor.coordinacion.id, coord_name: professor.coordinacion.nombre }
        : undefined
      ;
      const division_chief = professor.division ?
        { division_id: professor.division.id, division_name: professor.division.nombre }
        : undefined
      ;
      const professor_department = await prisma.departamento.findUniqueOrThrow({
        where: {
          id: professor.departamento
        },
        select: {
          nombre: true,
          Coordinacion: {
            select: {
              id: true,
              nombre: true
            }
          }
        }
      });

      user = {
        email: professor.correo
        , is_dean: false
        , professor: {
            id_card: professor.cedula
          , name1: professor.nombre1
          , name2: professor.nombre2
          , surname1: professor.apellido1
          , surname2: professor.apellido2
          , category: professor.categoria
          , dedication: professor.dedicacion
          , department: {
              id: professor.departamento
            , name: professor_department.nombre
            , coordination: professor_department.Coordinacion
          }
          , groups: ["g1","g2"]
          , diploma: professor.diploma_tipo
          , diploma_university: professor.diploma_universidad
          , ppi_number: professor.ppi[0].numero
          , ppi_level: professor.ppi[0].nivel
          , profile: professor.perfil
          , page: professor.url
          , research_lines: professor.lineas_investigacion
          , is_dep_chief: professor.jefe_departamentos.length > 0
          , is_dep_representative: professor.representante_departamentos.length > 0
          , coord_chief
          , division_chief
        }
      };

      jwt = Buffer.from(JSON.stringify(professor)).toString("base64");
      
    } else if (_user.administrador) {
      console.log("Admin, todas las actividades")
      jwt = Buffer.from(JSON.stringify(_user.administrador)).toString("base64");

    } else {
      console.log("No es profesor ni admin")
    };

    status = 200;
    // TODO: Path -> Path=/sinai
    // cookie expires in 24 hours = 86400 seg
    headers = {
      "set-cookie": `jwt=${jwt}; Path=/; HttpOnly; Max-Age=86400`
    };
    body = user;

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
