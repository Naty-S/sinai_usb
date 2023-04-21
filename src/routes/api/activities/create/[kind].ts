import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const POST: RequestHandler = async ({ request, params }) => {

  const _data = await request.json();
  const data = {
    ..._data.actividad,
    actividades_grupos: {
      create: _data.actividades_grupos.map((g: any) => {
        return {
          grupo: Number(g.new)
        };
      })
    },
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
    await prisma.actividad.create({ data });

    headers = {
      location: `/sinai/actividades/profesor/${data.creada_por}?creada=true`
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
