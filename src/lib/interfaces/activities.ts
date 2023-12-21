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
 * Activities by year.
 * 
 * - `year`: number
 * - `kind_activities`: `Record<string, Activity[]>` - Activities grouped by kind
 */
export interface YearActivities {
    year: number
  ; kind_activities: Record<string, Activity[]>
};

/**
 * Activities by group.
 * 
 * - `group`: string
 * - `kind_activities`: `Record<string, Activity[]>` - Activities grouped by kind
 */
export interface GroupActivities {
    group: string
  ; kind_activities: Record<string, Activity[]>
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
