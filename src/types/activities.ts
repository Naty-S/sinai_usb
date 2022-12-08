/// <reference types="@sveltejs/kit" />

import type { Group } from "$interfaces/groups";
import type { ActivityActionLog } from "$interfaces/logs";
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


export type Activity = actividad & {
  autores_externos: autor_externo[],
  autores_usb: autor_usb[],
  groups: Group[],
  kind_name: string,
  kind_info: ActivityKind,
  actions_log: ActivityActionLog[]
};

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
  | undefined // This means there's no kind asociated to the activity. This shouldn't happen
;
