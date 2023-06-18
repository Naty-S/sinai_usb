import type { RequestHandler } from "@sveltejs/kit";

import { env } from "$env/dynamic/private";

import type { CoordActivities, DepActivities, GroupActivities } from "$lib/interfaces/activities";
import { format_activity_kind } from "$lib/utils/formatting";
import { handle_error, prisma } from "$api/_api";


/**
 * Query coorditanion's and asociated deparments or groups activities.
 * 
 * Coordination `4 (Integración e Información)` only manages groups
*/
export const GET: RequestHandler = async function ({ request, params }) {
  
  const origin = env.NODE_ENV == "development" ? "http://localhost:3000" : env.NGINX_PROXY_PASS;

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
        nombre: coordination.nombre
      }
    };

    if (params.id === '4') {
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

          const r = await fetch(`${origin}/api/activities/department/${d.id}`);
          const r_json = await r.json()
          
          if (r.ok) return r_json;
          else throw new Error(r_json.code + '. ' + r_json.message);
        })
      );

      coordination_activities.departments_activities = departments_activities;
    };

    status = 200;
    body = coordination_activities;

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
