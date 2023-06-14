import type { RequestHandler } from "@sveltejs/kit";

import type { EntityActivities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { format_activity_kind } from "$lib/utils/formatting";
import { acts_kinds_by_year } from "$lib/utils/grouping";
import { count_acts_kinds_by_year } from "$lib/utils/maths";

import { handle_error, prisma } from "$api/_api";


/**
 * Query dean's activities
 * 
 * @returns The dean's activities grouped by year and kind
 */
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    // Find dean's activities
    const _acts = await prisma.actividad.findMany({
      where: {
        creada_por: params.email
      },
      include: {
        actividades_grupos: {
          select: {
            Grupo: {
              select: {
                id: true,
                nombre: true
              }
            }
          }
        },
        autores_usb: true,
        autores_externos: true,
        articulo_revista: true,
        capitulo_libro: true,
        composicion: true,
        evento: true,
        exposicion: true,
        grabacion: true,
        informe_tecnico: true,
        libro: true,
        memoria: true,
        partitura: true,
        patente: true,
        premio: true,
        premio_bienal: true,
        proyecto_grado: true,
        proyecto_investigacion: true,
        recital: true
      }
    });

    const user = await prisma.usuario.findUniqueOrThrow({
      where: {
        login: params.email
      },
      include: {
        logs_operaciones_actividades: {
          select: {
            actividad: true,
            Usuario: { select: { login: true } },
            fecha: true,
            hora: true
          },
          where: { operacion: "Modificacion", actividad: { in: _acts.map(a => a.id) } },
          orderBy: [{ fecha: "desc" }, { hora: "desc" }]
        }
      }
    })

    const dean = await prisma.administrador.findUniqueOrThrow({
      where: {
        login: params.email
      }
    })

    const activities: Activity[] = _acts.map(a => format_activity_kind(a, user.logs_operaciones_actividades));
    const entityActivities: EntityActivities = {
      entity: `Decano. ${dean.nombre}`,
      by_year: acts_kinds_by_year(activities, true),
      years_counts: count_acts_kinds_by_year(activities, true)
    };

    status = 200;
    body = entityActivities;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    throw new Error(code + ' ' + message);
  };

  return {
    status,
    body
  };
};
