import type { ActivityLog } from "$lib/interfaces/logs";
import type { Actividad } from "$lib/types/activities";

import { prisma } from "$api/_api";

import { kinds } from "$lib/constants";


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


/**
 * 
 * @param email 
 * @returns 
 */
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
    include
  });

  return user_activities;
};

/**
 * 
 * @param kind 
 * @param email 
 * @param date 
 * @returns 
 */
export const query_user_activity_kind = async function (
  kind: string,
  email: string,
  date: any
): Promise<Actividad[]> {

  let fecha = "fecha";
  switch (kind) {
    case "articulo_revista": fecha = "fecha_publicacion"; break;
    case "informe_tecnico":
    case "patente":
    case "proyecto_investigacion": fecha = "fecha_inicio"; break;
    case "proyecto_grado": fecha = "fecha_defensa"; break;
    case "recital": fecha = "fecha_evento"; break;
    default: break;
  };

  const activity = await prisma.actividad.findMany({
    where: {
      creada_por: email,
      [kind]: { [fecha]: date }
    },
    include,
    orderBy: { id: "desc" }
  });

  return activity;
}

/**
 * 
 * @param kind 
 * @param id 
 * @param date 
 * @param professor_activities 
 * @returns 
 */
export const query_entity_activity_kind = async function (
  kind: string,
  id: number,
  date: any,
  professor_activities?: Actividad[]
): Promise<{ Actividad: Actividad }[] | { actividades_grupos: { Actividad: Actividad }[] }[]> {

  let fecha = "fecha";
  switch (kind) {
    case "articulo_revista": fecha = "fecha_publicacion"; break;
    case "informe_tecnico":
    case "patente":
    case "proyecto_investigacion": fecha = "fecha_inicio"; break;
    case "proyecto_grado": fecha = "fecha_defensa"; break;
    case "recital": fecha = "fecha_evento"; break;
    default: break;
  };

  let activity: { Actividad: Actividad }[] | { actividades_grupos: { Actividad: Actividad }[] }[] = [];

  if (professor_activities) { // authors

    activity = await prisma.autor_usb.findMany({
      select: { Actividad: { include } },
      where: {
        profesor_id: id,
        actividad: { notIn: professor_activities.map(a => a.id) },
        Actividad: { [kind]: { [fecha]: date } }
      },
      orderBy: { actividad: "asc" }
    });
  } else { // groups

    activity = await prisma.grupo_investigacion.findMany({
      select: {
        actividades_grupos: {
          select: { Actividad: { include } },
          where: { Actividad: { [kind]: { [fecha]: date } } }
        }
      },
      where: { id: id }
    });
  }

  return activity;
}

/**
 * 
 * @param email - 
 * @returns 
 */
export const query_user_activities = async function (email: string, filters?: any): Promise<Actividad[]> {

  const date = filters ? { gte: filters.date_start, lte: filters.date_end } : {};

  const user_activities = (await Promise.all(
    kinds.map(k => query_user_activity_kind(k, email, date))
  )).flat();

  return user_activities;
};

/**
 * 
 * @param id - 
 * @param email - 
 * @returns 
 */
export const query_professor_activities = async function (id: number, email: string, filters?: any)
: Promise<Actividad[]> {

  // Find professor's activities
  const professor_activities = await query_user_activities(email, filters);

  let activities = professor_activities;

  // Find professor's activities where is author
  const date = filters ? { gte: filters.date_start, lte: filters.date_end } : {};

  const author_activities: { Actividad: Actividad }[] = (await Promise.all(
    kinds.map(k => query_entity_activity_kind(k, id, date, professor_activities))
  )).flat();

  activities = professor_activities.concat(author_activities.map(a => a.Actividad));

  return activities;
};

/**
 * 
 * @param id - 
 * @returns 
 */
export const query_group_activities = async function (id: number, filters?: any): Promise<Actividad[]> {
  
  const date = filters ? { gte: filters.date_start, lte: filters.date_end } : {};

  const group: { actividades_grupos: { Actividad: Actividad }[] }[] = (await Promise.all(
    kinds.map(k => query_entity_activity_kind(k, id, date))
  )).flat();

  return group.flatMap(a => a.actividades_grupos).map(a => a.Actividad);
};


/**
 * Query activity last modification log info
 * 
 * @param id - Activity id to get last log
 * @returns 
 */
export const query_activity_last_log = async function (id: number): Promise<ActivityLog | null> {
  
  const last_log = await prisma.log_operacion_actividad.findFirst({
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
      hora: true
    },
    where: { actividad: id, operacion: "Modificacion" },
    orderBy: { id: "desc" }
  });

  return last_log;
};
