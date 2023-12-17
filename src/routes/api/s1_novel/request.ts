import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Make an S1 Novel request.
 * 
 * @returns The code `s1_requested`
*/
export const POST: RequestHandler = async function ({ request }) {

  const { data, pathname } = await request.json();
  data.proyecto = Buffer.from(data.proyecto).toString("base64");
  // console.log("back - buffer")
  // console.log(data.proyecto)
  // lo mismo para los soportes
  // data.soportes = data.soportes.map(s => Buffer.from(s).toString("base64"))

  let status = 500;
  let body = {};
  let headers = {
    location: '/'
  };

  try {

    // Set professor coordinator as default evaluator
    const professor = await prisma.profesor.findUniqueOrThrow({
      select: { departamento: true },
      where: { id: data.profesor }
    })
    const professor_department= await prisma.departamento.findUniqueOrThrow({
      select: { coordinacion: true },
      where: { id: professor.departamento }
    });

    const professor_coordinator = await prisma.coordinacion.findUniqueOrThrow({
      select: { Jefe: { select: {id: true} } },
      where: { id: professor_department.coordinacion }
    })

    data.evaluador = professor_coordinator.Jefe.id;
    
    // Make request
    await prisma.s1_novel.create({ data: data });

    status = 303;
    headers = {
      location: `${pathname}?s1_requested=true`
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
