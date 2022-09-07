import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";


export const post: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();
  const data = {
    ..._data.actividad,
    autores_usb: {
      create: _data.autores_usb
    },
    autores_externos: {
      create: _data.autores_externos
    },
  };
  data[params.kind] = {
    create: _data[params.kind]
  };

  let status = 303;
  let headers = {
    location: '/'
  };

  try {
    let act = await prisma.actividad.create({ data });

    if (_data.actividades_grupos) {
      act = await prisma.actividad.update({
        where: {
          id: act.id
        },
        data: {
          actividades_grupos: {
            create: _data.actividades_grupos.map((g: string) => {
              return {
                Grupo: {
                  connect: { id: Number(g) }
                }
              }
            })
          }
        }
      })
    };

    status = 303;
    headers = {
      location: `/actividades/profesor/${data.creada_por}`
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
    headers
  };
};
