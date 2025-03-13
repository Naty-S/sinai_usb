import type { ActivityLog } from "$lib/interfaces/logs";
import type { Actividad } from "$lib/types/activities";

import { prisma } from "$api/_api";


const include = function (filters?: any) { return {
  actividades_grupos: { select: { Grupo: { select: { id: true, nombre: true } } } },
  autores_usb: true,
  autores_externos: true,
  articulo_revista: filters?.articulo_revista ?? true,
  capitulo_libro: filters?.capitulo_libro ?? true,
  composicion: filters?.composicion ?? true,
  evento: filters?.evento ?? true,
  exposicion: filters?.exposicion ?? true,
  grabacion: filters?.grabacion ?? true,
  informe_tecnico: filters?.informe_tecnico ?? true,
  libro: filters?.libro ?? true,
  memoria: filters?.memoria ?? true,
  partitura: filters?.partitura ?? true,
  patente: filters?.patente ?? true,
  premio: filters?.premio ?? true,
  premio_bienal: filters?.premio_bienal ?? true,
  proyecto_grado: filters?.proyecto_grado ?? true,
  proyecto_investigacion: filters?.proyecto_investigacion ?? true,
  recital: filters?.recital ?? true
}};

const null_kinds = {
  articulo_revista: null,
  capitulo_libro: null,
  composicion: null,
  evento: null,
  exposicion: null,
  grabacion: null,
  informe_tecnico: null,
  libro: null,
  memoria: null,
  partitura: null,
  patente: null,
  premio: null,
  premio_bienal: null,
  proyecto_grado: null,
  proyecto_investigacion: null,
  recital: null
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
export const query_activity = async function (id: number, filters?: any): Promise<Actividad> {

  const user_activities = await prisma.actividad.findUniqueOrThrow({
    where: { id: id },
    include: include(filters)
  });

  return user_activities;
};

/**
 * 
 * @param email - 
 * @returns 
 */
export const query_user_activities = async function (email: string, filters?: any): Promise<Actividad[]> {

  const user_activities = await prisma.actividad.findMany({
    where: {
      creada_por: email,
      fecha_creacion: filters ? { gte: filters.date_start, lte: filters.date_end } : {},
      // NOT: [null_kinds]
    },
    include: include(filters),
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
export const query_professor_activities = async function (id: number, email: string, filters?: any)
: Promise<Actividad[]> {

  // Find professor's activities
  const professor_activities = await query_user_activities(email, filters);

  let activities = professor_activities;

  // Find professor's activities where is author
  const author_activities = await prisma.autor_usb.findMany({
    select: { Actividad: { include: include(filters), } },
    where: {
      profesor_id: id,
      actividad: { notIn: professor_activities.map(a => a.id) },
      Actividad: {
        fecha_creacion: filters ? { gte: filters.date_start, lte: filters.date_end } : {},
        // NOT: [null_kinds]
      }
    },
    orderBy: { actividad: "asc" }
  });

  activities = professor_activities.concat(author_activities.map(a => a.Actividad));

  return activities;
};

/**
 * 
 * @param id - 
 * @returns 
 */
export const query_group_activities = async function (id: number, filters?: any): Promise<Actividad[]> {
  
  const group = await prisma.grupo_investigacion.findUniqueOrThrow({
    select: { actividades_grupos: {
      select: { Actividad: { include: include(filters) }},
      where: {
        Actividad: {
          fecha_creacion: filters ? { gte: filters.date_start, lte: filters.date_end } : {},
          // NOT: [null_kinds]
        }
      }
    }},
    where: { id: id }
  });

  return group.actividades_grupos.map(a => a.Actividad);
};


/**
 * 
 * @param id - Activity id to get its logs
 * @returns 
 */
export const query_activity_logs = async function (id: number): Promise<ActivityLog[]> {
  
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
    where: { actividad: id },
    orderBy: { id: "desc" }
  });

  return logs;
};
