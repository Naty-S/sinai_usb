import type { RequestHandler } from "@sveltejs/kit";

import type { User } from "$lib/interfaces/auth";

import nodeFetch from "node-fetch";
import httpsAgent from "https-agent";

import { handle_error, prisma } from "$api/_api";

import { CAS_BASE_URL, CAS_VALIDATE_URL } from "$lib/api";
import { query_user } from "$lib/server/queries";


/**
 * Login the user.
 * 
 * 1. Verify DST CAS ticket
 * 2. Parse username
 * 3. Find user in database
 * 4. Create User type with info
 * 5. Create cookie with user
 * 
 * If the user is not registered redirects to register page
 * 
 * If the user is registered but not active redirects to register page and notify of status
 */
export const GET: RequestHandler = async function ({ params }) {

  const cas_ticket = params.ticket;
  const origin = params.origin;

  let status = 500;
  let headers = {};
  let body = {};

  try {

    // CAS verification
    const CAS_SERVICE_BASE_URL = `http%3A%2F%2F${origin}%2Fsinai`;
    const CAS_SERVICE_URL = `${CAS_SERVICE_BASE_URL}%2Flogin`;
    const dst_verify = `${CAS_BASE_URL}${CAS_VALIDATE_URL}?service=${CAS_SERVICE_URL}&ticket=${cas_ticket}`;

    const agent = httpsAgent({ rejectUnauthorized: false });
    const cas_verify = await nodeFetch(dst_verify, { agent });

    const cas_username = await cas_verify.text();
    const username = cas_username.split('cas:user')[1].slice(1, -2);

    // Fetch data
    const _user = await query_user(username);

    if (!_user) {
      return {
        status: 302,
        location: "/sinai?no_registro=true",
      }
    }

    if (_user.profesor && !_user.profesor.activo) {
      return {
        status: 302,
        location: "/sinai/registro?no_activo=true",
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
        , coordination: professor_department.Coordinacion // Not used. TODO
        , division: professor_department.Division // Not used. TODO
        , groups: {
          grupos_investigacion: professor.grupos_investigacion
          , historico_grupos: professor.historico_grupos
        }
        , pei: professor.pei[0] || undefined
        , ppi: professor.ppi[0] || undefined
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
