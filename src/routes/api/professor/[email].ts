import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Query loged in professor data
*/
export const GET: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({
      where: { correo: params.email },
      include: {
        ppi: { orderBy: { id: "desc" }, take: 1 },
        pei: { orderBy: { id: "desc" }, take: 1 }
      }
    });

    status = 200;
    body = professor;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    throw new Error(code + ' ' + message);
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
 * else the user its the Dean validating a professor register request
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

    _data.new.pei.profesor = p.id;
    await prisma.pei.create({ data: _data.new.pei });

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
