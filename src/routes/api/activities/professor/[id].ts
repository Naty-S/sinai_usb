import type { RequestHandler } from "@sveltejs/kit";

import type { Activity } from "$lib/types/activities";

import { handle_error, prisma } from "$api/_api";

import { query_professor_activities, query_activities_logs } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query professor's activities
 * 
 * @returns Professor activities with logs
 */
export const GET: RequestHandler = async function({ params }) {

  const _id = Number(params.id);
  
  let status = 500;
  let body = {};

  try {
    const professor = await prisma.profesor.findUniqueOrThrow({ where: {id: _id} });
    const professor_activities = await query_professor_activities(professor.id, professor.correo);
    const logs = await query_activities_logs(professor_activities.map(a => a.id));
    const activities: Activity[] = professor_activities.map(a => (format_activity(a, logs)));

    status = 200;
    body = {
        owner: `del Prof. ${professor.apellido1}, ${professor.nombre1}`
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
