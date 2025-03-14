import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_professor_activities, query_activity_last_log } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query professor's activities
 * 
 * @returns Professor activities
 */
export const GET: RequestHandler = async function({ params }) {

  const _id = Number(params.id);
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({ where: {id: _id} });
    const professor_activities = await query_professor_activities(professor.id, professor.correo);
    const activities: Activity[] = (await Promise.all(professor_activities.map(async a => {
      const logs = await query_activity_last_log(a.id);
      return format_activity(a, logs);
    }))).flat();

    const owner_activities: Activities = {
      owner: {
          id: professor.id
        , name: professor.nombre1 + ", " + professor.apellido1
        , full_name: `del Prof. ${professor.apellido1}, ${professor.nombre1}`
        , email: professor.correo
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
 * Query filtered professor's activities
 * 
 * @returns Professor activities
 */
export const POST: RequestHandler = async function({ params, request }) {

  const _id = Number(params.id);
  const data = await request.json();
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({ where: {id: _id} });
    const professor_activities = await query_professor_activities(professor.id, professor.correo, data);
    const activities: Activity[] = (await Promise.all(
      professor_activities.map(async a => {
        const log = await query_activity_last_log(a.id);
        return format_activity(a, log, data);
      })
    )).flat().filter(a => a.kind_name != "FILTER");
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: professor.id
        , name: professor.nombre1 + ", " + professor.apellido1
        , full_name: `del Prof. ${professor.apellido1}, ${professor.nombre1}`
        , email: professor.correo
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
