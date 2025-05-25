import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";

import _ from "lodash";

import { handle_error, prisma } from "$api/_api";

import { query_recent_activites_logs, query_users_activities } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query dean activities.
 * 
 * @returns Dean activities.
 */
export const GET: RequestHandler = async function ({ params }) {

  const _email = params.email;

  let status = 500;
  let body = {};

  try {
    const dean = await prisma.administrador.findUniqueOrThrow({ where: { login: _email } });
    const dean_activities = await query_users_activities([_email]);
    const logs = await query_recent_activites_logs(dean_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = dean_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: 0
        , name: dean.nombre
        , full_name: `del Decano. ${dean.nombre}`
        , email: _email
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
