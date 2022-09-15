import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { CoordActivities, DeanActivities, DivisionActivities } from "$interfaces/activities";
import { prisma } from "$api/_api";


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

  } catch (error) {
    // TODO: 
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      // https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === 'P1012') {
        console.log(
          'There is a unique constraint violation, a new user cannot be created with this email'
        );
      };
    };
    throw error;
  };

  return {
    status,
    body
  };
};
