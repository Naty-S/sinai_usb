import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { stringify } from "zipson/lib";

import { handle_error, prisma } from "$api/_api";

import {
    query_activities_logs
  , query_group_activities
  , query_professor_activities
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

    let activities: Activity[];

    if (params.id === '4') {

      const groups = await prisma.grupo_investigacion.findMany({ select: { id: true } });

      const groups_activities = (await Promise.all(
        groups.map(async g => (await query_group_activities(g.id)))
      )).flat()
      
      const logs = await query_activities_logs(groups_activities.map(a => a.id));

      activities = groups_activities.map(a => (format_activity(a, logs)));

    } else {

      const professors = await prisma.profesor.findMany({
        select: { id: true, correo: true },
        where: { departamento: { in: coordination.departamentos.map(d => d.id) } }
      });

      const professor_activities = (await Promise.all(
        professors.map(async p => (await query_professor_activities(p.id, p.correo)))
      )).flat();

      const logs = await query_activities_logs(professor_activities.map(a => a.id));

      activities = professor_activities.map(a => (format_activity(a, logs)));
    };
    const owner_activities: Activities = {
      owner: {
          id: coordination.id
        , name: coordination.nombre
        , full_name: `de la Coordinación de ${coordination.nombre}`
        , email: coordination.correo
      }
      , activities
    }

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
