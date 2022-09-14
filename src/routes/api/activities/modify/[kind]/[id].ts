import type { RequestHandler } from "@sveltejs/kit";
import type { autor_externo, autor_usb } from "@prisma/client";
import { Prisma } from "@prisma/client";

import { prisma } from "$api/_api";

import type { Activity } from "$types/activities";

import { format_activity_kind } from "$utils/formatting";


export const get: RequestHandler = async function ({ params }) {

  let status = 303;
  let body = {};

  try {

    const act = await prisma.actividad.findUnique({
      where: {
        id: Number(params.id)
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

    const activity: Activity = format_activity_kind(act);

    status = 200;
    body = activity;

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

export const patch: RequestHandler = async function ({ request, params }) {

  const _data = await request.json();

  const data = {
    ..._data.actividad
  };

  data[params.kind] = {
    update: _data[params.kind]
  };

  if (_data.actividades_grupos[0].old !== _data.actividades_grupos[0].new) {
    const actividades_grupos_create = _data.actividades_grupos.map((g: any) => {
      return {
        grupo: Number(g.new)
      };
    });
    const actividades_grupos_delete = _data.actividades_grupos.map((g: any) => {
      return {
        actividad_grupo: {
          actividad: Number(params.id),
          grupo: Number(g.old)
        }
      };
    });

    data.actividades_grupos = {
      create: actividades_grupos_create,
      delete: actividades_grupos_delete
    }
  };

  let status = 303;
  let headers = {
    location: '/'
  };

  try {
    const autores_usb = await prisma.actividad.findUnique({
      where: {
        id: Number(params.id)
      },
      select: {
        autores_usb: {
          select: { id: true }
        }
      }
    });

    const autores_externos = await prisma.actividad.findUnique({
      where: {
        id: Number(params.id)
      },
      select: {
        autores_externos: {
          select: { id: true }
        }
      }
    });

    data.autores_usb = {
      update: _data.autores_usb.map((a: autor_usb) => {
        if (a.id) {
          delete a["actividad"];
          return { where: { id: a.id }, data: a }
        };
      }),
      create: _data.autores_usb.map((a: autor_usb) => {
        if (!a.id) {
          return a;
        };
      }),
      deleteMany: {
        OR: autores_usb?.autores_usb.filter(a =>
          !_data.autores_usb.map((a: autor_usb) => a.id).includes(a.id)
        )
      }
    };

    data.autores_externos = {
      update: _data.autores_externos.map((a: autor_externo) => {
        if (a.id) {
          delete a["actividad"];
          return { where: { id: a.id }, data: a }
        };
      }),
      create: _data.autores_externos.map((a: autor_externo) => {
        if (!a.id) {
          return a;
        };
      }),
      deleteMany: {
        OR: autores_externos?.autores_externos.filter(a =>
          !_data.autores_externos.map((a: autor_externo) => a.id).includes(a.id)
        )
      }
    };

    await prisma.actividad.update({
      where: {
        id: Number(params.id)
      },
      data
    });

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
