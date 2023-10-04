import type { RequestHandler } from "@sveltejs/kit";

import type { User } from "$lib/interfaces/auth";

import { handle_error, prisma } from "$api/_api";

import { query_user } from "$lib/server/queries";


/**
 * Login the user in dev mode.
 * 
 */
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let headers = {};
  let body = {};

  try {

    const _user = await query_user(params.email);

    if (!_user) {
      return {
        status,
        headers,
        body: { message: "Usuario no encontrado." }
      }
    }

    if (_user.profesor && !_user.profesor.activo) {
      return {
        status,
        headers,
        body: { message: "El usuario no se encuentra activo." }
      }
    }

    const pending_professor = await prisma.profesor.findFirst({
      where: { activo: { equals: false } }
    });

    const professor = _user.profesor;

    const user: User = {
      email: _user.login,
      pending_professors: pending_professor !== null
    };

    if (professor) {

      const professor_department = await prisma.departamento.findUniqueOrThrow({
        select: {
          nombre: true,
          Coordinacion: { select: { id: true, nombre: true } },
          Division: { select: { id: true, nombre: true } }
        },
        where: { id: professor.departamento }
      });
      const coord_chief = professor.coordinacion ?
        {
            id: professor.coordinacion.id
          , nombre: professor.coordinacion.nombre
          , departamentos: professor.coordinacion.departamentos
        } : undefined
        ;

      user.professor = {
          id: professor.id
        , id_card: professor.cedula
        , email: _user.login
        , name1: professor.nombre1
        , name2: professor.nombre2
        , surname1: professor.apellido1
        , surname2: professor.apellido2
        , department: {
            id: professor.departamento
          , nombre: professor_department.nombre
        }
        , coordination: professor_department.Coordinacion
        , division: professor_department.Division
        , groups: {
            grupos_investigacion: professor.grupos_investigacion
          , historico_grupos: professor.historico_grupos
        }
        , pei: professor.pei[0] || null
        , ppi: professor.ppi[0] || null
        , is_dep_chief: professor._count.jefe_departamentos > 0
        , is_dep_representative: professor._count.representante_departamentos > 0
        , coord_chief
        , division_chief: professor.division || undefined
      };
    } else {
      user.dean = _user.administrador?.nombre || '';
    };

    const jwt = Buffer.from(JSON.stringify(user)).toString("base64");

    status = 200;
    // cookie expires in 24 hours = 86400 seg
    // must specify Domain so the cookie is propagated to subdomains
    headers = {
      "set-cookie": `jwt=${jwt}; Path=/sinai; HttpOnly; Max-Age=86400;`// Domain=/sinai;`
    };
    body = user;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return {
    status,
    headers,
    body
  };
};
