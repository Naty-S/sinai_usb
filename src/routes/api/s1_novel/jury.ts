import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 *  
 * @returns Redidercts . The code `jury_assingned`
*/
export const POST: RequestHandler = async function ({ request }) {

  const { data, pathname } = await request.json();

  let status = 500;
  let body = {};
  let headers = { location: '/' };

  try {
    await prisma.s1_novel_jurado_usb.createMany({ data: (data.jurado_usb) });
    await prisma.s1_novel_jurado_externo.createMany({ data: (data.jurado_externo) });

    status = 303;
    headers = { location: `${pathname}?jury_assingned=true` };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, headers, body };
};
