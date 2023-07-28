import type { RequestHandler } from "@sveltejs/kit";

import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_activities_logs, query_user_activities } from "$lib/server/queries";
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
    const logs = await query_activities_logs(dean_activities.map(a => a.id));
    const activities: Activity[] = dean_activities.map(a => (format_activity(a, logs)));

    status = 200;
    body = {
        owner: `del Decano. ${dean.nombre}`
      , activities
    };

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
