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

export type Activity = {
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
  autores_externos:          string[]
  autores_usb:               string[]
  kind_name:                 string
  kind_info:                 ActivityKind
};

export type YearActivities = {
  year: string
  kind_activities: Record<string, Activity[]>
};

export type ActivitiesCounts = {
  link?: string
  kind: string
  counts: number[]
};

export type EntityActivities = {
  entity: string,
  by_year: YearActivities[],
  years_counts: ActivitiesCounts[]
};

export type ProfessorActivities = {
  professor: {
    email: string,
    name: string,
    surname: string
  },
  activities: Activity[]
};

export type GroupActivities = {
  group: {
    id: number,
    name: string
  },
  activities: Activity[]
}

export type DepActivities = {
  department: {
    id: number,
    name: string
  },
  professors_activities: ProfessorActivities[]
};

export type CoordActivities = {
  coordination: {
    id: number,
    name: string
  },
  departments_activities?: DepActivities[]
  groups_activities?: GroupActivities[]
};

export type DivisionActivities = {
  division: {
    id: number,
    name: string
  },
  departments_activities: DepActivities[]
};

export type DeanActivities = {
  coordinations_activities: CoordActivities[],
  divisions_activities: DivisionActivities[]
};
