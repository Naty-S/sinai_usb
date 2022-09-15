import type { RequestHandler } from "@sveltejs/kit";
import { Prisma } from "@prisma/client";

import type { DepActivities, DivisionActivities } from "$interfaces/activities";
import { prisma } from "$api/_api";


export const get: RequestHandler = async function ({ request, params }) {
  
  let status = 500;
  let body = {};

  try {
    const division = await prisma.division.findUniqueOrThrow({
      where: {
        id: Number(params.id)
      },
      select: {
        id: true,
        nombre: true,
        departamentos: {
          select: {
            id: true
          }
        }
      }
    });

    const departments_activities: DepActivities[] = await Promise.all(
      division.departamentos.map(async d =>{
        const r = await fetch(`${new URL(request.url).origin}/api/activities/department/${d.id}`);
        return await r.json();
      })
    );

    const division_activities: DivisionActivities = {
      division: {
        id: division.id,
        name: division.nombre
      },
      departments_activities
    };

    status = 200;
    body = division_activities;
    
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
