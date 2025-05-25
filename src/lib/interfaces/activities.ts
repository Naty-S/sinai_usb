/// <reference types="@sveltejs/kit" />

import type { Activity } from "$lib/types/activities"
import type { Division } from "./divisions"
import type { Coordination } from "./coordinations"


/**
 * List of activities belonging to owner:
 * (Professor, Group, Department, Coordination, Division).
 * 
 * - `owner`:
 *    + `id`: string
 *    + `name`: string
 *    + `full_name`: string
 *    + `email`: `string` - (optional)
 * - `activities`: `Activity[]`
 */
export interface Activities {
  owner: {
      id: number
    ; name: string
    ; full_name: string
    ; email?: string
  }
  ; activities: Activity[]
};

/**
 * Activities by property: year or group.
 * 
 * - `prop`: string
 * - `kind_activities`: `Record<string, Activity[]>` - Activities grouped by kind
 */
export interface PropActivities {
    prop: string
  ; kind_activities: KindActivities
};

/**
 * Activities grouped by kind.
 * 
 * - `key`: Activity[]. This key is the kind name of the activity, detailed or not
 */
export interface KindActivities {
  [key:string]: Activity[]
};

/**
 * Count of activity kind by year.
 * 
 * - `kind`: string
 * - `counts`
 *    + `count`: number
 *    + `year`: number - (optional)
 * - `link`: `string` (optional) - Link to the kind in the resume table
 */
export interface ActivitiesCounts {
    kind: string
  ; counts: {
      count: number
    ; year?: number
  }[]
  ; link?: string
};

/**
 * Coordinations and divisions basic data.
 * 
 * - `coordinations`: Coordination[]
 * - `divisions`: Division[]
 */
export interface Ranks {
    coordinations: Coordination[]
  ; divisions: Division[]
};


export interface ActivitiesFilters {
    date_range: { gte: any; lte: any }
  ; articulo_revista: boolean
  ; capitulo_libro: boolean
  ; composicion: boolean
  ; evento: boolean
  ; exposicion: boolean
  ; grabacion: boolean
  ; informe_tecnico: boolean
  ; libro: boolean
  ; memoria: boolean
  ; partitura: boolean
  ; patente: boolean
  ; premio: boolean
  ; premio_bienal: boolean
  ; tesis_grado: boolean
  ; proyecto_investigacion: boolean
  ; recital: boolean
};
