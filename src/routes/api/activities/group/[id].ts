import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_activity_last_log, query_group_activities } from "$lib/server/queries";
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

    const group_activities = await query_group_activities(group.id);
    const activities: Activity[] = (await Promise.all(group_activities.map(async a => {
      const log = await query_activity_last_log(a.id);
      return format_activity(a, log);
    }))).flat();

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
  
  const data = await request.json();

  let status = 500;
  let body = {};

  try {
    const group = await prisma.grupo_investigacion.findUniqueOrThrow({
      select: { id: true, nombre: true },
      where: { id: Number(params.id) }
    });

    const group_activities = await query_group_activities(group.id, data);
    const activities: Activity[] = (await Promise.all(
      group_activities.map(async a => {
        const log = await query_activity_last_log(a.id);
        return format_activity(a, log, data);
      })
    )).flat().filter(a => a.kind_name != "FILTER");
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
