import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


export const del: RequestHandler = async ({ params }) => {

  let status = 500;
  let body = {};

  try {

    await prisma.actividad.delete({
      where: {
        id: Number(params.id)
      }
    });

    status = 200;
    body = { code: "deleted" };

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
