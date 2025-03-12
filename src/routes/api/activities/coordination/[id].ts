import type { RequestHandler } from "@sveltejs/kit";

import type { Activities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { stringify } from "zipson/lib";

import { handle_error, prisma } from "$api/_api";

import {
    query_activity_logs
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
        groups.map(g => (query_group_activities(g.id)))
      )).flat();

      activities = (await Promise.all(groups_activities.map(async a => {
        const logs = await query_activity_logs(a.id);
        return format_activity(a, logs);
      }))).flat();

    } else {

      const professors = await prisma.profesor.findMany({
        select: { id: true, correo: true },
        where: { departamento: { in: coordination.departamentos.map(d => d.id) } }
      });

      const professor_activities = (await Promise.all(
        professors.map(p => (query_professor_activities(p.id, p.correo)))
      )).flat();

      activities = (await Promise.all(professor_activities.map(async a => {
        const logs = await query_activity_logs(a.id);
        return format_activity(a, logs);
      }))).flat();
    };

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
  
  const data = await request.json();

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
        groups.map(g => (query_group_activities(g.id, data)))
      )).flat();

      activities = (await Promise.all(groups_activities.map(async a => {
        const logs = await query_activity_logs(a.id);
        return format_activity(a, logs, data);
      }))).flat();

    } else {

      const professors = await prisma.profesor.findMany({
        select: { id: true, correo: true },
        where: { departamento: { in: coordination.departamentos.map(d => d.id) } }
      });

      const professor_activities = (await Promise.all(
        professors.map(p => (query_professor_activities(p.id, p.correo, data)))
      )).flat();

      activities = (await Promise.all(professor_activities.map(async a => {
        const logs = await query_activity_logs(a.id);
        return format_activity(a, logs, data);
      }))).flat();
    };

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
