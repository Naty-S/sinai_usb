import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";

import _ from "lodash";

import { handle_error, prisma } from "$api/_api";

import { query_professors_activities, query_recent_activites_logs } from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query department activities.
 * 
 * @returns The department activities
*/
export const GET: RequestHandler = async function ({ params }) {
  
  const _id = Number(params.id);

  let status = 500;
  let body = {};

  try {
    const department = await prisma.departamento.findUniqueOrThrow({
      select: { id: true, nombre: true, correo: true },
      where: { id: _id }
    });
    
    const professors = await prisma.profesor.findMany({
      select: { id: true, correo: true },
      where: { departamento: _id }
    });

    const professors_activities = await query_professors_activities(professors.map(p => p.id), professors.map(p => p.correo));

    const logs = await query_recent_activites_logs(professors_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = professors_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: department.id
        , name: department.nombre
        , full_name: `del Departamento de ${department.nombre}`
        , email: department.correo
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


/**
 * Query filtered department activities.
 * 
 * @returns The department activities
*/
export const POST: RequestHandler = async function ({ params, request }) {
  
  const _id = Number(params.id);
  const filters = await request.json();

  let status = 500;
  let body = {};

  try {
    const department = await prisma.departamento.findUniqueOrThrow({
      select: { id: true, nombre: true, correo: true },
      where: { id: _id }
    });
    
    const professors = await prisma.profesor.findMany({
      select: { id: true, correo: true },
      where: { departamento: _id }
    });

    const professors_activities = await query_professors_activities(professors.map(p => p.id), professors.map(p => p.correo), filters);

    const logs = await query_recent_activites_logs(professors_activities.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    const activities = professors_activities.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: department.id
        , name: department.nombre
        , full_name: `del Departamento de ${department.nombre}`
        , email: department.correo
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
