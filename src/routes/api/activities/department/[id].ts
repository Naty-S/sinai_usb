import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_professor_activities, query_activity_last_log } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query department activities.
 * 
 * @returns The department activities
*/
export const GET: RequestHandler = async function ({ params }) {
  
  const _id = Number(params.id);

  let status = 500;
  let body = {};

  try {
    const department = await prisma.departamento.findUniqueOrThrow({
      select: { id: true, nombre: true, correo: true },
      where: { id: _id }
    });
    
    const professors = await prisma.profesor.findMany({
      select: { id: true, correo: true },
      where: { departamento: _id }
    });

    const professor_activities = (await Promise.all(
      professors.map(p => (query_professor_activities(p.id, p.correo)))
    )).flat();

    const activities: Activity[] = (await Promise.all(professor_activities.map(async a => {
      const log = await query_activity_last_log(a.id);
      return format_activity(a, log);
    }))).flat();

    const owner_activities: Activities = {
      owner: {
          id: department.id
        , name: department.nombre
        , full_name: `del Departamento de ${department.nombre}`
        , email: department.correo
      }
      , activities
    };

    status = 200;
    body = owner_activities;

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


/**
 * Query filtered department activities.
 * 
 * @returns The department activities
*/
export const POST: RequestHandler = async function ({ params, request }) {
  
  const _id = Number(params.id);
  const data = await request.json();

  let status = 500;
  let body = {};

  try {
    const department = await prisma.departamento.findUniqueOrThrow({
      select: { id: true, nombre: true, correo: true },
      where: { id: _id }
    });
    
    const professors = await prisma.profesor.findMany({
      select: { id: true, correo: true },
      where: { departamento: _id }
    });

    const professor_activities = (await Promise.all(
      professors.map(p => (query_professor_activities(p.id, p.correo, data)))
    )).flat();

    const activities: Activity[] = (await Promise.all(
      professor_activities.map(async a => {
        const log = await query_activity_last_log(a.id);
        return format_activity(a, log, data);
      })
    )).flat().filter(a => a.kind_name != "FILTER");
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: department.id
        , name: department.nombre
        , full_name: `del Departamento de ${department.nombre}`
        , email: department.correo
      }
      , activities
    };

    status = 200;
    body = owner_activities;

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
