/// <reference types="@sveltejs/kit" />

import type { Activity } from "$lib/types/activities"
import type { Group } from "./groups"


/**
 * Professor or group
 * 
 * - `id`
 * - `name`
 */
export interface Entity {
  id: number,
  name: string
};

/**
 * Activities by year
 * 
 * - `year`
 * - `kind_activities`: activities by kind
 */
export interface YearActivities {
  year: number,
  kind_activities: Record<string, Activity[]>
};

/**
 * Count of activity kind by year
 * 
 * - `link` (optional): link to redirect if can be clicked
 * - `kind`
 * - `counts`
 *    + `count`
 *    + `year` (optional)
 */
export interface ActivitiesCounts {
  link?: string,
  kind: string,
  counts: {
    count: number,
    year?: number
  }[]
};

/**
 * Professor's or group's activity data to be displayed
 * 
 * - `entity`: `Decano`, `Profesor` or `Grupo`
 * - `by_year`: activities by year
 * - `years_counts`: count of activity's kind by year
 */
export interface EntityActivities {
  entity: string,
  by_year: YearActivities[],
  years_counts: ActivitiesCounts[]
};

/**
 * Professor data and related activities
 * 
 * - `professor`
 *    + `id`
 *    + `email`
 *    + `name`
 *    + `surname`
 * - `activities`
 */
export interface ProfessorActivities {
  professor: {
    id: number,
    email: string,
    name: string,
    surname: string
  },
  activities: Activity[]
};

/**
 * Group's activities
 * 
 * - `group`
 * - `activities`
 */
export interface GroupActivities {
  group: Group,
  activities: Activity[]
};

/**
 * Department's activities
 * 
 * - `department`
 * - `professors_activities`
 */
export interface DepActivities {
  department: Entity,
  professors_activities: ProfessorActivities[]
};

/**
 * Coordination's activities
 * Can only have departments or groups activities
 * 
 * - `coordination`
 * - `departments_activities` (optional)
 * - `groups_activities` (optional)
 */
export interface CoordActivities {
  coordination: Entity,
  departments_activities?: DepActivities[]
  groups_activities?: GroupActivities[]
};

/**
 * Division's activities
 * 
 * - `division`
 * - `departments_activities`
 */
export interface DivisionActivities {
  division: Entity,
  departments_activities: DepActivities[]
};

/**
 * Coordinations and divisions.
 * 
 * - `coordinations`
 *    + `id`
 *    + `nombre`
 * - `divisions`
 *    + `id`
 *    + `nombre`
 */
export interface Ranks {
  coordinations: {
    id: number,
    nombre: string
  }[],
  divisions: {
    id: number,
    nombre: string
  }[]
};
