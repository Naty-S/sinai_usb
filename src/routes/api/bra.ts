import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const get: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const period = await prisma.periodo_bra.findUniqueOrThrow({
      where: { id: 0 }
    });

    status = 200;
    body = period;

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

export const patch: RequestHandler = async function ({ request }) {

  const data = await request.json();
  data.activo = Boolean(data.activo);

  let status = 500;
  let headers = {};
  let body = {};

  try {
    await prisma.periodo_bra.update({
      data,
      where: { id: 0 }
    });

    status = 200;
    body = { code: "BRA Modified" };

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
