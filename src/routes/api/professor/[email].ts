import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const get: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({
      where: { correo: params.email }
    });

    status = 200;
    body = professor;

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

export const patch: RequestHandler = async function ({ request, params }) {

  const _data = await request.json();

  let status = 500;
  let headers = {};
  let body = {};

  try {
    await prisma.profesor.update({ data: _data.new, where: { correo: params.email } });

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

export const del: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    await prisma.usuario.delete({ where: { login: params.email } });

    status = 200;
    body = { action: "rejected", professor: params.email };

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
