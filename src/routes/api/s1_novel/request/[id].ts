import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";

import { ve_date } from "$lib/utils/formatting";


/**
 * Deletes a S1 Novel request
 * 
 * @returns The code `s1_deleted`
*/
export const DELETE: RequestHandler = async ({ request, params }) => {

  let status = 500;
  let body = {};

  try {
    await prisma.s1_novel.delete({ where: { id: Number(params.id) } });

    status = 200;
    body = { code: "s1_deleted" };

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
