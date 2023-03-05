import type { RequestHandler } from "@sveltejs/kit";

import type { DepActivities } from "$interfaces/activities";
import { handle_error, prisma } from "$api/_api";
import { format_activity_kind } from "$utils/formatting";


export const get: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const department = await prisma.departamento.findUniqueOrThrow({
      where: {
        id: Number(params.id)
      },
      select: {
        id: true,
        nombre: true
      }
    });
    
    const professors: { correo: string }[] = await prisma.profesor.findMany({
      where: {
        departamento: Number(params.id)
      },
      select: {
        correo: true
      }
    });

    const professors_activities = await Promise.all(professors.map(async p => {

      return await prisma.usuario.findUniqueOrThrow({
        where: {
          login: p.correo
        },
        select: {
          profesor: {
            select: {
              correo: true,
              nombre1: true,
              apellido1: true
            }
          },
          actividades: {
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
      });
    }));

    const dep_activities: DepActivities = {
      department: {
        id: department.id,
        name: department.nombre
      },
      professors_activities: professors_activities.map(p => {
        return {
          professor: {
            email: p.profesor.correo,
            name: p.profesor.nombre1,
            surname: p.profesor.apellido1
          },
          activities: p.actividades.map(a => format_activity_kind(a))
        };
      })
    };

    status = 200;
    body = dep_activities;

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
