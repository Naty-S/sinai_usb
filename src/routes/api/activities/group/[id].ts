import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { Activity, EntityActivities } from "$types/db/activities";

import { format_activity_kind } from "$utils/formatting";
import { acts_kinds_by_year } from "$utils/grouping";
import { count_acts_kinds_by_year } from "$utils/maths";

import { prisma } from "$api/_api";


export const get: RequestHandler = async function ({ request, params }) {
  
  let status = 500;
  let body: EntityActivities = {};

  try {
    const group = await prisma.grupo_investigacion.findUniqueOrThrow({
      where: {
        id: Number(params.id )
      },
      select: {
        nombre: true,
        actividades_grupos: {
          select: {
            Actividad: {
              include: {
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
            }
          }
        }
      }
    });

    const activities: Activity[] = group.actividades_grupos.map(a => format_activity_kind(a.Actividad));

    status = 200;
    body = {
      entity: group.nombre,
      by_year: acts_kinds_by_year(activities, true),
      years_counts: count_acts_kinds_by_year(activities, true)
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
    body
  };
};
