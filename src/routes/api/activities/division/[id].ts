import type { RequestHandler } from "@sveltejs/kit";

import type { DepActivities, DivisionActivities } from "$lib/interfaces/activities";
import { handle_error, prisma } from "$api/_api";


export const GET: RequestHandler = async function ({ request, params }) {
  
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
