/// <reference types="@sveltejs/kit" />
import type {
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


export type Actividad = {
  id:                        number 
  creada_por:                string
  validado_por:              string | null
  cuota:                     number | null
  descripcion:               string | null
  fecha_creacion:            Date 
  fecha_ultima_modificacion: Date 
  fecha_validacion:          Date | null
  observaciones:             string | null
  palabras_clave:            string[]
  titulo:                    string
  kind_name:                 string
  kind_info:                 ActivityKind
};

export type YearActivities = {
  year: string
  acts: Record<string, Actividad[]>
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
