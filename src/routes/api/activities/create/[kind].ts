import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Creates an activity
 * 
 * @returns Redirects to professor's or dean's dashboard with `creada`
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
    const act = await prisma.actividad.create({ data });

    const date = new Date();

    await prisma.log_operacion_actividad.create({
      data: {
        actividad: act.id,
        usuario: data.user.email,
        fecha: date,
        hora: date,
        operacion: "Ingreso",
        sql: `INSERT INTO actividad VALUES (${JSON.stringify(data.actividad)});
              INSERT INTO ${params.kind} VALUES (${JSON.stringify(data[params.kind])});
              INSERT INTO actividad_grupo_investigacion VALUES (${JSON.stringify(data.actividades_grupos)});
              INSERT INTO autor_usb VALUES (${JSON.stringify(data.autores_usb)});
              INSERT INTO autor_externo VALUES (${JSON.stringify(data.autores_externos)});`,
        tabla: params.kind
      }
    })

    if (data.user_rank == "professor") {
      headers = {
        location: `/sinai/actividades/profesor/${data.user.professor.id}?creada=true`
      };
    } else {
      headers = {
        location: "/sinai/actividades/decano/0?creada=true"
      };
    };
    
  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code ? "&code=" + error.code : '';

    if (data.user_rank == "professor") {
      headers = {
        location: `/sinai/actividades/profesor/${data.user.professor.id}?error=` + message + code
      };
    } else {
      headers = {
        location: "/sinai/actividades/decano/0?error=" + message + code
      };
    };
  };

  return {
    status,
    headers
  };
};
