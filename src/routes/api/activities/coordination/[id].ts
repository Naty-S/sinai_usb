import type { RequestHandler } from "@sveltejs/kit";

import type { CoordActivities, DepActivities, GroupActivities } from "$interfaces/activities";
import { format_activity_kind } from "$utils/formatting";
import { handle_error, prisma } from "$api/_api";


export const get: RequestHandler = async function ({ request, params }) {
  
  let status = 500;
  let body = {};

  try {
    const coordination = await prisma.coordinacion.findUniqueOrThrow({
      where: {
        id: Number(params.id)
      },
      select: {
        id: true,
        nombre: true,
        departamentos: {
          select: {
            id: true
          }
        }
      }
    });

    let coordination_activities: CoordActivities = {
      coordination: {
        id: coordination.id,
        name: coordination.nombre
      }
    };

    if (params.id === '4') { // Coordination just manages groups "Integración e Información"
      const groups = await prisma.grupo_investigacion.findMany({
        select: {
          id: true,
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

      const groups_activities: GroupActivities[] = groups.map( g => {
        return {
          group: {
            id: g.id,
            nombre: g.nombre
          },
          activities: g.actividades_grupos.map(a => format_activity_kind(a.Actividad))
        }
      });

      coordination_activities.groups_activities = groups_activities;

    } else {
      const departments_activities: DepActivities[] = await Promise.all(
        coordination.departamentos.map(async d =>{
          const r = await fetch(`${new URL(request.url).origin}/api/activities/department/${d.id}`);
          return await r.json();
        })
      );

      coordination_activities.departments_activities = departments_activities;
    };

    status = 200;
    body = coordination_activities;

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
