import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";

import _ from "lodash";

import { handle_error, prisma } from "$api/_api";

import { query_recent_activites_logs, query_groups_activities } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query research group activities.
 * 
 * @returns The research group activities.
*/
export const GET: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const group = await prisma.grupo_investigacion.findUniqueOrThrow({
      select: { id: true, nombre: true },
      where: { id: Number(params.id) }
    });

    const group_activities = await query_groups_activities([group.id]);
    const logs = await query_recent_activites_logs(group_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = group_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
        id: group.id
        , name: group.nombre
        , full_name: `del Grupo ${group.nombre}`
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
 * Query filtered research group activities.
 * 
 * @returns The research group activities.
*/
export const POST: RequestHandler = async function ({ params, request }) {
  
  const filters = await request.json();

  let status = 500;
  let body = {};

  try {
    const group = await prisma.grupo_investigacion.findUniqueOrThrow({
      select: { id: true, nombre: true },
      where: { id: Number(params.id) }
    });

    const group_activities = await query_groups_activities([group.id], filters);
    const logs = await query_recent_activites_logs(group_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = group_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
        id: group.id
        , name: group.nombre
        , full_name: `del Grupo ${group.nombre}`
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
