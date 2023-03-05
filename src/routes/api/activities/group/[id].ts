import type { RequestHandler } from "@sveltejs/kit";

import { format_activity_kind } from "$utils/formatting";
import { acts_kinds_by_year } from "$utils/grouping";
import { count_acts_kinds_by_year } from "$utils/maths";

import { handle_error, prisma } from "$api/_api";


export const get: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

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
            }
          }
        }
      }
    });

    const activities = group.actividades_grupos.map(a => format_activity_kind(a.Actividad));

    status = 200;
    body = {
      entity: `Grupo ${group.nombre}`,
      by_year: acts_kinds_by_year(activities, true),
      years_counts: count_acts_kinds_by_year(activities, true)
    };
    
  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    throw new Error(message + ' ' + code);
  };

  return {
    status,
    body
  };
};
