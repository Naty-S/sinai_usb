import type { ActivityLog } from "$lib/interfaces/logs";
import type { ActivitiesFilters } from "$lib/interfaces/activities";
import type { Actividad } from "$lib/types/activities";

import { prisma } from "$api/_api";

import { kinds } from "$lib/constants";


const include = {
  actividades_grupos: { select: { Grupo: { select: { id: true, nombre: true } } } },
  autores_usb: true,
  autores_externos: true,
};

const includeKind = (kind: string) => ({ ...include, [kind]: true });

/**
 * 
 * @param usbid 
 * @returns 
 */
export const query_user = async function (usbid: string) {

  const user = await prisma.usuario.findUnique({
    where: { login: usbid + "@usb.ve"},
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
 * Get activity for modify
 * 
 * @param id - 
 * @returns 
 */
export const query_activity = async function (id: number): Promise<Actividad> {

  const activity = await prisma.actividad.findUniqueOrThrow({
    where: { id: id },
    include: {
      ...include,
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
      tesis_grado: true,
      proyecto_investigacion: true,
      recital: true
    }
  });

  return activity;
};

/**
 * Kind activities between date range for user(s)
 * 
 * @param kind 
 * @param emails 
 * @param date_range 
 * @returns 
 */
const query_users_activities_kind = async function (
  kind: string,
  emails: string[],
  date_range: { gte: Date, lte: Date } | {} = {}
): Promise<Actividad[]> {

  let fecha = "fecha";
  switch (kind) {
    case "articulo_revista": fecha = "fecha_publicacion"; break;
    case "informe_tecnico":
    case "patente":
    case "proyecto_investigacion": fecha = "fecha_inicio"; break;
    case "tesis_grado": fecha = "fecha_defensa"; break;
    case "recital": fecha = "fecha_evento"; break;
    default: break;
  };

  const activity = await prisma.actividad.findMany({
    where: {
      creada_por: { in: emails },
      [kind]: { [fecha]: date_range }
    },
    include: includeKind(kind),
    orderBy: { id: "desc" }
  });

  return activity;
}

/**
 * Dean & Professors
 * @param emails - 
 * @returns 
 */
export const query_users_activities = async function (
  emails: string[],
  filters?: ActivitiesFilters
): Promise<Actividad[]> {

  const filter_kinds = filters ? kinds.filter(kind => filters[kind as keyof ActivitiesFilters]) : kinds;
  const users_activities = (await Promise.all(
    filter_kinds.map(k => query_users_activities_kind(k, emails, filters?.date_range)
  ))).flat();

  return users_activities;
};

/**
 * Professors & groups
 * 
 * @param kind 
 * @param ids 
 * @param date_range 
 * @param professors_activities 
 * @returns 
 */
const query_entities_activities_kind = async function (
  kind: string,
  ids: number[],
  date_range: { gte: Date, lte: Date } | {} = {},
  professors_activities?: number[]
): Promise<Actividad[]> {

  let fecha = "fecha";
  switch (kind) {
    case "articulo_revista": fecha = "fecha_publicacion"; break;
    case "informe_tecnico":
    case "patente":
    case "proyecto_investigacion": fecha = "fecha_inicio"; break;
    case "tesis_grado": fecha = "fecha_defensa"; break;
    case "recital": fecha = "fecha_evento"; break;
    default: break;
  };

  let activity: Actividad[] = [];

  if (professors_activities) { // authors

    const authors_activities = (await prisma.autor_usb.findMany({
      select: { Actividad: { include: includeKind(kind) } },
      where: {
      profesor_id: { in: ids },
      actividad: { notIn: professors_activities },
      Actividad: { [kind]: { [fecha]: date_range } }
      },
      orderBy: { actividad: "asc" }
    })).map(a => a.Actividad);

    const unique_activities = new Map(
      authors_activities
      .filter(a => !professors_activities.includes(a.id))
      .map(a => [a.id, a])
    );

    activity = Array.from(unique_activities.values());
    
  } else { // groups

    activity = (await prisma.grupo_investigacion.findMany({
      select: {
        actividades_grupos: {
          select: { Actividad: { include: includeKind(kind) } },
          where: { Actividad: { [kind]: { [fecha]: date_range } } }
        }
      },
      where: { id: { in: ids } }
    })).flatMap(a => a.actividades_grupos).map(a => a.Actividad);
  }

  return activity;
}

/**
 * Created by professors & as authors
 * @param ids - 
 * @param emails - 
 * @returns 
 */
export const query_professors_activities = async function (
  ids: number[],
  emails: string[],
  filters?: ActivitiesFilters
): Promise<Actividad[]> {

  // Find professor's activities
  const professors_activities = await query_users_activities(emails, filters);

  let activities = professors_activities;

  // Find professor's activities where is author
  const filter_kinds = filters ? kinds.filter(kind => filters[kind as keyof ActivitiesFilters]) : kinds;
  const authors_activities = (await Promise.all(filter_kinds.map(k => 
    query_entities_activities_kind(k, ids, filters?.date_range, professors_activities.map(a => a.id))
  ))).flat();
  
  activities = professors_activities.concat(authors_activities);

  return activities;
};

/**
 * 
 * @param ids - 
 * @returns 
 */
export const query_groups_activities = async function (
  ids: number[],
  filters?: ActivitiesFilters
): Promise<Actividad[]> {
  
  const filter_kinds = filters ? kinds.filter(kind => filters[kind as keyof ActivitiesFilters]) : kinds;
  const group = (await Promise.all(
    filter_kinds.map(k => query_entities_activities_kind(k, ids, filters?.date_range))
  )).flat();

  return group;
};


/**
 * Query activities last modification logs info
 * 
 * @param ids - Activities ids to get last logs
 * @returns 
 */
export const query_recent_activites_logs = async function (ids: number[]): Promise<ActivityLog[] | null> {
  
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
      hora: true
    },
    where: { actividad: { in: ids }, operacion: "Modificacion" },
    orderBy: { id: "desc" }
  });

  return logs;
};
