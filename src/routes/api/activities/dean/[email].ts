import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_activity_logs, query_user_activities } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query dean activities.
 * 
 * @returns Dean activities with logs.
 */
export const GET: RequestHandler = async function ({ params }) {

  const _email = params.email;

  let status = 500;
  let body = {};

  try {
    const dean = await prisma.administrador.findUniqueOrThrow({ where: { login: _email } });
    const dean_activities = await query_user_activities(_email);
    const activities: Activity[] = (await Promise.all(dean_activities.map(async a => {
      const logs = await (query_activity_logs(a.id));
      return format_activity(a, logs);
    }))).flat();

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
