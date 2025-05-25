import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Actividad, Activity } from "$lib/types/activities";

import _ from "lodash";
import { stringify } from "zipson/lib";

import { handle_error, prisma } from "$api/_api";

import {
    query_recent_activites_logs
  , query_groups_activities
  , query_professors_activities
} from "$lib/server/queries";
import { format_activity } from "$lib/utils/formatting";


/**
 * Query coorditanion activities.
 * 
 * Coordination `4 (Integración e Información)` only manages groups
*/
export const GET: RequestHandler = async function ({ params }) {
  
  let status = 500;
  let body = {};

  try {
    const coordination = await prisma.coordinacion.findUniqueOrThrow({
      select: {
        id: true,
        nombre: true,
        correo: true,
        departamentos: { select: { id: true } }
      },
      where: { id: Number(params.id) }
    });

    let activities: Activity[] = [];
    let actividades: Actividad[] = [];

    if (params.id === '4') {

      const groups = await prisma.grupo_investigacion.findMany({ select: { id: true } });
      actividades = await query_groups_activities(groups.map(g => g.id));

    } else {

      const professors = await prisma.profesor.findMany({
        select: { id: true, correo: true },
        where: { departamento: { in: coordination.departamentos.map(d => d.id) } }
      });

      actividades = await query_professors_activities(professors.map(p => p.id), professors.map(p => p.correo));      
    };

    const logs = await query_recent_activites_logs(actividades.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    activities = actividades.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: coordination.id
        , name: coordination.nombre
        , full_name: `de la Coordinación de ${coordination.nombre}`
        , email: coordination.correo
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
 * Query filtered coorditanion activities.
 * 
 * Coordination `4 (Integración e Información)` only manages groups
*/
export const POST: RequestHandler = async function ({ params, request }) {
  
  const filters = await request.json();

  let status = 500;
  let body = {};

  try {
    const coordination = await prisma.coordinacion.findUniqueOrThrow({
      select: {
        id: true,
        nombre: true,
        correo: true,
        departamentos: { select: { id: true } }
      },
      where: { id: Number(params.id) }
    });

    let activities: Activity[] = [];
    let actividades: Actividad[] = [];

    if (params.id === '4') {

      const groups = await prisma.grupo_investigacion.findMany({ select: { id: true } });
      actividades = await query_groups_activities(groups.map(g => g.id), filters);

    } else {

      const professors = await prisma.profesor.findMany({
        select: { id: true, correo: true },
        where: { departamento: { in: coordination.departamentos.map(d => d.id) } }
      });

      actividades = await query_professors_activities(professors.map(p => p.id), professors.map(p => p.correo), filters);      
    };

    const logs = await query_recent_activites_logs(actividades.map(a => a.id));
    const activities_logs = _.groupBy(logs, 'actividad');
    activities = actividades.map(a => format_activity(a, activities_logs[a.id]?.[0]));
    // console.log("INVALID ACTIVITIES:", activities.filter(a => a.kind_name == "ACTIVIDAD INVÁLIDA").map(a => a.id))

    const owner_activities: Activities = {
      owner: {
          id: coordination.id
        , name: coordination.nombre
        , full_name: `de la Coordinación de ${coordination.nombre}`
        , email: coordination.correo
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
