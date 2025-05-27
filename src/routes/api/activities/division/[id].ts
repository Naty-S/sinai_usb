import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Actividad, Activity } from "$lib/types/activities";

import _ from "lodash";
import { stringify } from "zipson";

import { handle_error, prisma } from "$api/_api";

import { query_recent_activites_logs, query_professors_activities } from "$lib/server/queries";
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

    const professors_activities = await query_professors_activities(professors.map(p => p.id), professors.map(p => p.correo));

    const logs = await query_recent_activites_logs(professors_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = professors_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

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
  
  const filters = await request.json();

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

    const professors_activities = await query_professors_activities(professors.map(p => p.id), professors.map(p => p.correo), filters);

    const logs = await query_recent_activites_logs(professors_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = professors_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

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
