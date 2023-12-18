import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Updates .
 * 
 * @returns Redidercts . The code `decision_made`
*/
export const PATCH: RequestHandler = async function ({ request }) {

  const { s1_novel_id, data, pathname } = await request.json();

  const jurado_usb = data.jurado_usb.map(ju => ({
    data: { veredicto: ju.veredicto },
    where: { id: ju.id }
  }));
  const jurado_externo = data.jurado_externo.map(je => ({
    data: { veredicto: je.veredicto },
    where: { id: je.id }
  }));
  const s1_novel = {
    ...data.s1_novel,
    jurado_usb: { update: jurado_usb },
    jurado_externo: { update: jurado_externo }
  };

  let status = 500;
  let body = {};
  let headers = { location: '/' };

  try {
    await prisma.s1_novel.update({ data: s1_novel, where: { id: s1_novel_id } });

    status = 303;
    headers = { location: `${pathname}?decision_made=true` };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, headers, body };
};
