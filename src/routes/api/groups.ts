import type { RequestHandler } from "@sveltejs/kit";

import type { Group } from "$lib/interfaces/groups";
import { handle_error, prisma } from "$api/_api";


/**
 * Query all research groups
 * 
 * @returns {id: number, nombre: string}
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const grupos = await prisma.grupo_investigacion.findMany({
      select: {
        id: true,
        nombre: true,
        Responsable: {
          select: { id: true, correo: true, nombre1: true, apellido1: true }
        },
        historico_profesores_grupos: {
          select: {
            Profesor: {
              select: { id: true, correo: true, nombre1: true, apellido1: true }
            }
          },
          where: { fin: { equals: null } }
        },
        actividades_grupos: { select: { actividad: true } }
      },
      where: { id: { not: { equals: 0 } } }
    });

    const groups: Group[] = grupos.map(g => ({
      id: g.id,
      name: g.nombre,
      chief: {
        id: g.Responsable.id,
        email: g.Responsable.correo,
        name: g.Responsable.nombre1,
        surname: g.Responsable.apellido1
      },
      members: g.historico_profesores_grupos.map(p => ({
        id: p.Profesor.id,
        email: p.Profesor.correo,
        name: p.Profesor.nombre1,
        surname: p.Profesor.apellido1
      })),
      n_activities: g.actividades_grupos.length
    }));

    status = 200;
    body = groups;

  } catch (error: any) {

    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return {
    status,
    body
  };
};
