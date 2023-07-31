/// <reference types="@sveltejs/kit" />

import type {
  actividad,
  autor_externo,
  autor_usb,
  articulo_revista,
  capitulo_libro,
  composicion,
  evento,
  exposicion,
  grabacion,
  informe_tecnico,
  libro,
  memoria,
  partitura,
  patente,
  premio,
  premio_bienal,
  proyecto_grado,
  proyecto_investigacion,
  recital
} from "@prisma/client";

import type { Group } from "$lib/interfaces/groups";
import type { ActivityLog } from "$lib/interfaces/logs";


/**
 * Activity data with format to access from the client.
 */
export type Activity = actividad & {
  autores_externos: autor_externo[],
  autores_usb: autor_usb[],
  kind_name: string,
  kind_data: ActivityKind,
  groups: Group[],
  logs: ActivityLog[]
};

/**
 * Activity raw data, contains the data fetched from DB.
 */
export type Actividad = actividad & {
    autores_externos: autor_externo[]
  , autores_usb: autor_usb[]
  , actividades_grupos: {
      Grupo: { id: number, nombre: string }
    }[]
  , articulo_revista: articulo_revista | null
  , capitulo_libro: capitulo_libro | null
  , composicion: composicion | null
  , evento: evento | null
  , exposicion: exposicion | null
  , grabacion: grabacion | null
  , informe_tecnico: informe_tecnico | null
  , libro: libro | null
  , memoria: memoria | null
  , partitura: partitura | null
  , patente: patente | null
  , premio: premio | null
  , premio_bienal: premio_bienal | null
  , proyecto_grado: proyecto_grado | null
  , proyecto_investigacion: proyecto_investigacion | null
  , recital: recital | null
};

/**
 * Each kind of activity data
 */
export type ActivityKind
  = articulo_revista
  | capitulo_libro
  | composicion
  | evento
  | exposicion
  | grabacion
  | informe_tecnico
  | libro
  | memoria
  | partitura
  | patente
  | premio
  | premio_bienal
  | proyecto_grado
  | proyecto_investigacion
  | recital
  | undefined // This means there's no kind data. This shouldn't happen, but it does.
;
