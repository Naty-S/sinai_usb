import type { RequestHandler } from "@sveltejs/kit";
import type { autor_externo, autor_usb } from "@prisma/client";

import { handle_error, prisma } from "$api/_api";

import { format_activity_kind } from "$utils/formatting";


export const get: RequestHandler = async function ({ params }) {

  let status = 500;
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

    const activity = format_activity_kind(act);

    status = 200;
    body = activity;

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

export const patch: RequestHandler = async function ({ request, params }) {

  const _data = await request.json();

  const data = {
    ..._data.actividad
  };

  data[params.kind] = {
    update: _data[params.kind]
  };

  let actividades_grupos_create: { grupo: number }[] = [];
  let actividades_grupos_delete: { actividad: number, grupo: number }[] = [];
  
  _data.actividades_grupos.forEach((group: { old: string, new: string }) => {
    if (group.old !== '?' && group.old !== group.new) {
      
      actividades_grupos_create.push({
        grupo: Number(group.new)
      });
      
      actividades_grupos_delete.push({
        actividad: Number(params.id),
        grupo: Number(group.old)
      });
    };

    if (group.old === '?') {
      actividades_grupos_create.push({
        grupo: Number(group.new)
      });
    };
  });

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

    const actividades_grupos = await prisma.actividad.findUnique({
      where: {
        id: Number(params.id)
      },
      select: {
        actividades_grupos: true
      }
    })

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
          !_data.autores_usb.map((_a: autor_usb) => _a.id).includes(a.id)
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
          !_data.autores_externos.map((_a: autor_externo) => _a.id).includes(a.id)
        )
      }
    };

    data.actividades_grupos = {
      create: actividades_grupos_create,
      delete: actividades_grupos_delete,
      deleteMany: {
        OR: actividades_grupos?.actividades_grupos.filter(ag =>
          !_data.actividades_grupos.map((g: { old: string, new: string }) => Number(g.new)).includes(ag.grupo)
        )
      }
    };

    data.fecha_ultima_modificacion = new Date();

    await prisma.actividad.update({
      where: {
        id: Number(params.id)
      },
      data
    });

    headers = {
      location: `/sinai/actividades/profesor/${data.creada_por}?modificada=true`
    };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code ? "&code=" + error.code : '';

    headers = {
      location: `/sinai/actividades/profesor/${data.creada_por}?error=` + message + code
    };
  };

  return {
    status,
    headers
  };
};
