import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { DepActivities, GroupActivities } from "$types/db/activities";
import { prisma } from "$api/_api";
import { format_activity_kind } from "$utils/formatting";


export const get: RequestHandler = async function ({ request, params }) {
  let body = {};
  let status = 500;

  try {
    const coordination = await prisma.coordinacion.findUniqueOrThrow({
      where: {
        id: Number(params.id)
      },
      select: {
        nombre: true,
        departamentos: {
          select: {
            id: true
          }
        }
      }
    });

    if (params.id === '4') { // Coordination just manages groups "Integración e Información"
      const groups = await prisma.grupo_investigacion.findMany({
        select: {
          id: true,
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

      const groups_activities: GroupActivities[] = groups.map( g => {
        return {
          group: {
            name: g.nombre,
            id: g.id
          },
          activities: g.actividades_grupos.map(a => format_activity_kind(a.Actividad))
        }
      });

      status = 200;
      body = {
        coordination: coordination.nombre,
        groups_activities
      }

    } else {
      const departments_activities: DepActivities[] = await Promise.all(
        coordination.departamentos.map(async d =>{
          const r = await fetch(`${new URL(request.url).origin}/api/activities/department/${d.id}`);
          return await r.json();
        })
      );

      status = 200;
      body = {
        coordination: coordination.nombre,
        departments_activities
      }
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
  }

  return {
    status,
    body
  };
};
