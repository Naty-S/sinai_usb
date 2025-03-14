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
    include
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
    },
    include,
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
    select: { Actividad: { include } },
    where: {
      profesor_id: id,
      actividad: { notIn: professor_activities.map(a => a.id) },
      Actividad: {
        fecha_creacion: filters ? { gte: filters.date_start, lte: filters.date_end } : {},
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
      select: { Actividad: { include }},
      where: {
        Actividad: {
          fecha_creacion: filters ? { gte: filters.date_start, lte: filters.date_end } : {},
        }
      }
    }},
    where: { id: id }
  });

  return group.actividades_grupos.map(a => a.Actividad);
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
