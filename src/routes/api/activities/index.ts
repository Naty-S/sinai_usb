import type { RequestHandler } from "@sveltejs/kit";

import type { CoordActivities, DeanActivities, DivisionActivities } from "$lib/interfaces/activities";
import { handle_error, prisma } from "$api/_api";


export const get: RequestHandler = async ({ request, params }) => {

  let status = 500;
  let body = {};

  try {
    const coordinations = await prisma.coordinacion.findMany({
      select: {
        id: true
      }
    });

    const divisions = await prisma.division.findMany({
      select: {
        id: true
      }
    });

    const coordinations_activities: CoordActivities[] = await Promise.all(
      coordinations.map(async c => {
        const r = await fetch(`${new URL(request.url).origin}/api/activities/coordination/${c.id}`);
        return await r.json();
      })
    );

    const divisions_activities: DivisionActivities[] = await Promise.all(
      divisions.map(async d => {
        const r = await fetch(`${new URL(request.url).origin}/api/activities/division/${d.id}`);
        return await r.json();
      })
    );

    const activities: DeanActivities = {
      coordinations_activities,
      divisions_activities
    };

    status = 200;
    body = activities;

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    throw new Error(message + ' ' + code);
  };

  return {
    status,
    body
  };
};
