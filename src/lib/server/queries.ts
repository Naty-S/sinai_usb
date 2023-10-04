import type { ActivityLog } from "$lib/interfaces/logs";
import type { Actividad } from "$lib/types/activities";

import { prisma } from "$api/_api";


const include = {
  actividades_grupos: { select: { Grupo: { select: { id: true, nombre: true } } } },
  autores_usb: true,
  autores_externos: true,
  articulo_revista: true,
  capitulo_libro: true,
  composicion: true,
  evento: true,
  exposicion: true,
  grabacion: true,
  informe_tecnico: true,
  libro: true,
  memoria: true,
  partitura: true,
  patente: true,
  premio: true,
  premio_bienal: true,
  proyecto_grado: true,
  proyecto_investigacion: true,
  recital: true
};

export const query_user = async function (email: string) {

  const user = await prisma.usuario.findUnique({
    where: { login: email + "@usb.ve"},
    include: {
      administrador: true,
      profesor: {
        include: {
          pei: { select: {anio: true, nivel: true, numero: true}, orderBy: {id: "desc"}, take: 1 },
          ppi: { select: {anio: true, nivel: true, numero: true}, orderBy: {id: "desc"}, take: 1 },
          grupos_investigacion: true,
          historico_grupos: {
            select: {
              Grupo: true,
              inicio: true,
              fin: true,
            },
            where: { fin: { equals: null } }
          },
          coordinacion: { select: {id: true, nombre: true, departamentos: {select: {id: true, nombre: true}}} },
          division: { select: { id: true, nombre: true, departamentos: { select: { id: true, nombre: true } } } },
          _count: {
            select: {
              jefe_departamentos: true,
              representante_departamentos: true,
            }
          },
        }
      }
    }
  });

  return user;
};

/**
 * 
 * @param id - 
 * @returns 
 */
export const query_activity = async function (id: number): Promise<Actividad> {

  const user_activities = await prisma.actividad.findUniqueOrThrow({
    where: { id: id },
    include: include
  });

  return user_activities;
};

/**
 * 
 * @param email - 
 * @returns 
 */
export const query_user_activities = async function (email: string): Promise<Actividad[]> {

  const user_activities = await prisma.actividad.findMany({
    where: { creada_por: email },
    include: include,
    orderBy: { fecha_creacion: "desc" }
  });

  return user_activities;
};

/**
 * 
 * @param id - 
 * @param email - 
 * @returns 
 */
export const query_professor_activities = async function (id: number, email: string)
: Promise<Actividad[]> {

  // Find professor's activities
  const professor_activities = await query_user_activities(email);

  let activities = professor_activities;

  // Find professor's activities where is author
  const author_activities_ids = await prisma.autor_usb.findMany({
    select: { actividad: true },
    where: {
      profesor_id: id,
      actividad: { notIn: professor_activities.map(a => a.id) }
    },
    orderBy: { actividad: "asc" }
  });

  if (author_activities_ids.length > 0) {

    const author_activities = await Promise.all(
      author_activities_ids.map(async a => await query_activity(a.actividad))
    );

    activities = professor_activities.concat(author_activities);
  };

  return activities;
};

/**
 * 
 * @param id - 
 * @returns 
 */
export const query_group_activities = async function (id: number): Promise<Actividad[]> {
  
  const group = await prisma.grupo_investigacion.findUniqueOrThrow({
    select: { actividades_grupos: { select: { Actividad: { include: include } } } },
    where: { id: id }
  });

  return group.actividades_grupos.map(a => a.Actividad);
};


/**
 * 
 * @param ids - Activities ids in which to look for the logs
 * @returns 
 */
export const query_activities_logs = async function (ids: number[]): Promise<ActivityLog[]> {
  
  const logs = await prisma.log_operacion_actividad.findMany({
    select: {
      id: true,
      actividad: true,
      Usuario: {
        select: {
          profesor: { select: { perfil: true } },
          administrador: { select: { nombre: true } }
        }
      },
      fecha: true,
      hora: true,
      operacion: true
    },
    where: { actividad: { in: ids } },
    orderBy: { id: "desc" }
  });

  return logs;
};
