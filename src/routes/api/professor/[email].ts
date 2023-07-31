import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";
import type { Profile } from "$lib/interfaces/professors";


/**
 * Query professor prfile data
*/
export const GET: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({
      where: { correo: params.email },
      include: {
        pei: { orderBy: { id: "desc" }, take: 1 }
      }
    });

    const pei = professor.pei[0];
    const profile: Profile = {
        perfil: professor.perfil
      , categoria: professor.categoria
      , dedicacion: professor.dedicacion
      , diploma_tipo: professor.diploma_tipo
      , diploma_universidad: professor.diploma_universidad
      , url: professor.url
      , lineas_investigacion: professor.lineas_investigacion
      , pei: {
          anio: pei.anio
        , nivel: pei.nivel
        , numero: pei.numero
      }
    };

    status = 200;
    body = profile;

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

/**
 * Updates professor data
 * 
 * If the user its the professor means profile modified,
 * else the user its the Coordinator or Dean validating a professor register request.
 * 
 * @returns Redirects the user to the same page with `action` executed `modificado` or `validado`
*/
export const PATCH: RequestHandler = async function ({ request, params }) {

  const _data = await request.json();

  let status = 500;
  let headers = {};
  let body = {};

  try {
    const p = await prisma.profesor.update({
      data: _data.new.profile,
      where: { correo: params.email },
    });

    const pei = _data.new.pei;
    if (pei) { // Its professor

      pei.profesor = p.id;
      await prisma.pei.create({ data: pei });

      // Update professor's profile name as author
      await prisma.autor_usb.updateMany({
        data: { nombre: p.perfil },
        where: { profesor_id: p.id }
      });
    };

    const action = _data.pathname.includes("perfil") ? "modificado" : "validado";
    
    status = 303;
    headers = {
      location: `${_data.pathname}?${action}=${params.email}`
    };

  } catch (error: any) {

    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };


  return {
    status,
    headers,
    body
  };
};

/**
 * Rejects professor register request. Deletes professor data entry.
 * 
 * @returns The code `rejected` and professor email as `professor`
*/
export const DELETE: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    await prisma.usuario.delete({ where: { login: params.email } });

    status = 200;
    body = { code: "rejected", professor: params.email };

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
