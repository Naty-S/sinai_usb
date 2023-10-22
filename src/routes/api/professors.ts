import type { RequestHandler } from "@sveltejs/kit";

import type { Profesor } from "$lib/interfaces/professors";

import { handle_error, prisma } from "$api/_api";


/**
 * Query all professors
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const professors: Profesor[] = await prisma.profesor.findMany({
      select: {
        id: true ,
        correo: true,
        activo: true,
        cedula: true,
        nombre1: true,
        nombre2: true,
        apellido1: true,
        apellido2: true,
        perfil: true,
        categoria: true,
        condicion: true,
        dedicacion: true,
        departamento: true,
        diploma_tipo: true,
        diploma_universidad: true,
        lineas_investigacion: true,
        url: true,
        orcid_id: true,
        orcid_profile: true,
        orcid_posts: true,
        google_schoolar_id: true,
        google_schoolar_profile: true,
        google_schoolar_posts: true,
        research_gate_id: true,
        research_gate_profile: true,
        research_gate_posts: true,
      },
      where: { id: {not: { equals: 0}} },
      orderBy: { apellido1: "asc" }
    });

    status = 200;
    body = professors;

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
