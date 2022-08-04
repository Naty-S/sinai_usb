import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "../_api";


/**
 * 
 */
export const get: RequestHandler = async function ({ request, params }) {
  let body = {};
  let status = 500;

  try {
    const dep_name = await prisma.departamento.findUnique({
      where: {
        id: Number(params.id)
      },
      select: {
        nombre: true
      }
    });
    
    const dep_professors = await prisma.profesor.findMany({
      where: {
        departamento: Number(params.id)
      },
      select: {
        correo: true
      }
    });

    const users_acts = await Promise.all(dep_professors.map(async p => {

      return await prisma.usuario.findUnique({
        where: {
          login: p.correo
        },
        select: {
          login: true,
          administrador: {
            select: {
              nombre: true
            }
          },
          profesor: {
            select: {
              id: true,
              nombre1: true,
              apellido1: true
            }
          },
          actividades: {
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
      });
    }));

    status = 200;
    body = {
      dep_name,
      users_acts
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
