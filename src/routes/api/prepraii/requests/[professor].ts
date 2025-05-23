import type { RequestHandler } from "@sveltejs/kit";

import { handle_error, prisma } from "$api/_api";


/**
 * Handles GET requests to fetch a list of "prepraii_solicitud" records associated with a specific professor.
 * 
 * @param {Object} context - The request context object.
 * @param {Object} context.params - The route parameters.
 * @param {string} context.params.professor - The ID of the professor whose requests are to be fetched.
 * 
 * @returns {Promise<{ status: number, body: any }>} A response object containing the HTTP status code and the response body.
 * 
 * The response body will contain:
 * - On success (status 200): An array of "prepraii_solicitud" records with related data.
 * - On failure (status 500): An object with an error message and an optional error code.
 * 
 * The function queries the database using Prisma to retrieve the records, including related entities such as:
 * - `Actividad` with nested relations (`articulo_revista`, `autores_usb`, `autores_externos`).
 * - `Convocatoria`.
 * - `Evaluador` (selected fields: `nombre1`, `apellido1`, `correo`).
 * - `Profesor` (selected fields: `nombre1`, `apellido1`, `correo`).
 * - `prepraii_profesores` with nested `Profesor` (selected fields: `nombre1`, `apellido1`, `correo`) and `contrato_constancia`.
 * 
 * If an error occurs during the database query, it is handled by the `handle_error` function, and an appropriate error response is returned.
 */
export const GET: RequestHandler = async function ({ params }) {

  let status = 500;
  let body = {};

  try {
    const requests = await prisma.prepraii_solicitud.findMany({
      include: {
        Actividad: { include: {
          articulo_revista: true,
          autores_usb: true,
          autores_externos: true
        }},
        Convocatoria: true,
        Evaluador: { select: {nombre1: true, apellido1: true, correo: true} },
        Profesor: { select: {nombre1: true, apellido1: true, correo: true} },
        prepraii_profesores: { select: {
          contrato_constancia: true,
          Profesor: { select: {nombre1: true, apellido1: true, correo: true} }
        }}
      },
      where: { profesor: Number(params.professor) }
    });    

    status = 200;
    body = requests;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return { status, body };
};
