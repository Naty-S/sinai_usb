import type { RequestHandler } from "@sveltejs/kit";

import type { User } from "$interfaces/auth";

import f from "node-fetch";
import https from "https"
import { CAS_BASE_URL, CAS_VALIDATE_URL } from "$lib/api";
import { handle_error, prisma } from "$api/_api";


/**
 * 
 */
export const GET: RequestHandler = async function({ params }) {

  const cas_ticket = params.ticket;
  const origin = params.origin;

  let status = 500;
  let headers = {};
  let body = {};

  try {

    const CAS_SERVICE_BASE_URL = `http%3A%2F%2F${origin}%2Fsinai`;
    const CAS_SERVICE_URL = `${CAS_SERVICE_BASE_URL}%2Flogin`;
    const dst_verify = `${CAS_BASE_URL}${CAS_VALIDATE_URL}?service=${CAS_SERVICE_URL}&ticket=${cas_ticket}`;

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const cas_verify = await f(dst_verify, { agent: httpsAgent });

    const cas_username = await cas_verify.text();
    const username = cas_username.split('cas:user')[1].slice(1, -2);

    const _user = await prisma.usuario.findUniqueOrThrow({
      where: { login: username },
      include: {
        administrador: true,
        profesor: {
          include: {
            pei: { orderBy: { anio: "desc" }, take: 1 },
            ppi: { orderBy: { anio: "desc" }, take: 1 },
            grupos_investigacion: true,
            historico_grupos: {
              select: {
                Grupo: true,
                inicio: true,
                fin: true,
              },
              where: { fin: { equals: null } }
            },
            coordinacion: {
              include: {
                departamentos: true
              }
            },
            division: true,
            _count: {
              select: {
                jefe_departamentos: true,
                representante_departamentos: true,
              }
            },
          }
        }
      }
    });

    const pending_professor = await prisma.profesor.findFirst({
      where: {
        activo: { equals: false }
      }
    });

    const professor = _user.profesor;
    
    const user: User = {
      email: _user.login,
      pending_professors: pending_professor !== null
    };

    if (professor) {
      
      const coord_chief = professor.coordinacion ?
        { id: professor.coordinacion.id
        , name: professor.coordinacion.nombre
        , departments: professor.coordinacion.departamentos.map(d => d.id)
        } : undefined
      ;
      const division_chief = professor.division ?
        { id: professor.division.id, name: professor.division.nombre }
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
          },
          Division: {
            select: {
              id: true,
              nombre: true
            }
          }
        }
      });

      user.professor = {
          id: professor.id
        , id_card: professor.cedula
        , name1: professor.nombre1
        , name2: professor.nombre2
        , surname1: professor.apellido1
        , surname2: professor.apellido2
        , department: {
            id: professor.departamento
          , name: professor_department.nombre
          , coordination: professor_department.Coordinacion
          , division: professor_department.Division
        }
        , groups: {
            grupos_investigacion: professor.grupos_investigacion
          , historico_grupos: professor.historico_grupos
        }
        , pei_number: professor.pei[0].numero
        , pei_level: professor.pei[0].nivel
        , ppi_number: professor.ppi[0].numero
        , ppi_level: professor.ppi[0].nivel
        , is_dep_chief: professor._count.jefe_departamentos > 0
        , is_dep_representative: professor._count.representante_departamentos > 0
        , coord_chief
        , division_chief
      };

    } else {
      user.dean = _user.administrador?.nombre || "Dean";
    };

    const jwt = Buffer.from(JSON.stringify(user)).toString("base64");
    
    status = 200;
    // cookie expires in 24 hours = 86400 seg
    // must specify Domain so the cookie is propagated to subdomains
    headers = {
      "set-cookie": `jwt=${jwt}; Path=/sinai; HttpOnly; Max-Age=86400;`// TODO Domain=/sinai;`
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