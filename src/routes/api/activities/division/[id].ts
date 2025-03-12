import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { stringify } from "zipson";

import { handle_error, prisma } from "$api/_api";

import { query_activity_logs, query_professor_activities } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query division activities.
*/
export const GET: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const division = await prisma.division.findUniqueOrThrow({
      select: {
        id: true,
        nombre: true,
        departamentos: { select: { id: true } }
      },
      where: { id: Number(params.id) }
    });

    const professors = await prisma.profesor.findMany({
      select: { id: true, correo: true },
      where: { departamento: { in: division.departamentos.map(d => d.id) } }
    });

    const professor_activities = (await Promise.all(professors.map(p => (
      query_professor_activities(p.id, p.correo)
    )))).flat();

    const activities: Activity[] = (await Promise.all(professor_activities.map(async a => {
      const logs = await query_activity_logs(a.id);
      return format_activity(a, logs);
    }))).flat();

    const owner_activities: Activities = {
      owner: {
          id: division.id
        , name: division.nombre
        , full_name: `de la División de ${division.nombre}`
      }
      , activities
    };

    status = 200;
    body = stringify(owner_activities);
    
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


/**
 * Query filtered division activities.
*/
export const POST: RequestHandler = async function ({ params, request }) {
  
  const data = await request.json();

  let status = 500;
  let body = {};

  try {
    const division = await prisma.division.findUniqueOrThrow({
      select: {
        id: true,
        nombre: true,
        departamentos: { select: { id: true } }
      },
      where: { id: Number(params.id) }
    });

    const professors = await prisma.profesor.findMany({
      select: { id: true, correo: true },
      where: { departamento: { in: division.departamentos.map(d => d.id) } }
    });

    const professor_activities = (await Promise.all(professors.map(p => (
      query_professor_activities(p.id, p.correo, data)
    )))).flat();

    const activities: Activity[] = (await Promise.all(professor_activities.map(async a => {
      const logs = await query_activity_logs(a.id);
      return format_activity(a, logs, data);
    }))).flat();

    const owner_activities: Activities = {
      owner: {
          id: division.id
        , name: division.nombre
        , full_name: `de la División de ${division.nombre}`
      }
      , activities
    };

    status = 200;
    body = stringify(owner_activities);
    
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
