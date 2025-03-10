import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_activity_logs, query_group_activities } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query research group activities.
 * 
 * @returns The research group activities with logs.
*/
export const GET: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const group = await prisma.grupo_investigacion.findUniqueOrThrow({
      select: { id: true, nombre: true },
      where: { id: Number(params.id) }
    });

    const group_activities = await query_group_activities(group.id)
    const activities: Activity[] = (await Promise.all(group_activities.map(async a => {
      const logs = await (query_activity_logs(a.id));
      return format_activity(a, logs);
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
