import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Creates an activity
 * 
 * @returns Redirects to professor's dashboard with `creada`
*/
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

    // await prisma.log_operacion_actividad.create({
    //   data: {
    //     actividad: Number(params.id),
    //     profesor: ,
    //     fecha,
    //     hora,
    //     operacion: "Ingreso",
    //     sql: e.query,
    //     tabla: kind
    //   }
    // })

    if (data.user_rank == "professor") {
      headers = {
        location: `/sinai/actividades/profesor/${data.creada_por}?creada=true`
      };
    } else {
      headers = {
        location: `/sinai/actividades/decano/${data.creada_por}?creada=true`
      };
    };
    
  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code ? "&code=" + error.code : '';

    if (data.user_rank == "professor") {
      headers = {
        location: `/sinai/actividades/profesor/${data.creada_por}?error=` + message + code
      };
    } else {
      headers = {
        location: `/sinai/actividades/decano/${data.creada_por}?error=` + message + code
      };
    };
  };

  return {
    status,
    headers
  };
};
