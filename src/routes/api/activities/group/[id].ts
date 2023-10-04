import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_activities_logs, query_group_activities } from "$lib/server/queries";
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
    const logs = await query_activities_logs(group_activities.map(a => a.id));
    const activities: Activity[] = group_activities.map(a => (format_activity(a, logs)));
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
