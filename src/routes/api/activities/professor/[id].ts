import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";

import _ from "lodash";

import { handle_error, prisma } from "$api/_api";

import { query_professors_activities, query_recent_activites_logs } from "$lib/server/queries";
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
    const professor_activities = await query_professors_activities([professor.id], [professor.correo]);
    const logs = await query_recent_activites_logs(professor_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = professor_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
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


/**
 * Query filtered professor's activities
 * 
 * @returns Professor activities
 */
export const POST: RequestHandler = async function({ params, request }) {

  const _id = Number(params.id);
  const filters = await request.json();
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({ where: {id: _id} });
    const professor_activities = await query_professors_activities([professor.id], [professor.correo], filters);
    const logs = await query_recent_activites_logs(professor_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = professor_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
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
