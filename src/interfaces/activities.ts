/// <reference types="@sveltejs/kit" />

import type { Activity } from "$types/activities"
import type { Group } from "./groups"


export interface Entity {
  id: number,
  name: string
};

export interface YearActivities {
  year: number,
  kind_activities: Record<string, Activity[]>
};

export interface ActivitiesCounts {
  link?: string,
  kind: string,
  counts: {
    count: number,
    year?: number
  }[]
};

export interface EntityActivities {
  entity: string,
  by_year: YearActivities[],
  years_counts: ActivitiesCounts[]
};

export interface ProfessorActivities {
  professor: {
    email: string,
    name: string,
    surname: string
  },
  activities: Activity[]
};

export interface GroupActivities {
  group: Group,
  activities: Activity[]
};

export interface DepActivities {
  department: Entity,
  professors_activities: ProfessorActivities[]
};

export interface CoordActivities {
  coordination: Entity,
  departments_activities?: DepActivities[]
  groups_activities?: GroupActivities[]
};

export interface DivisionActivities {
  division: Entity,
  departments_activities: DepActivities[]
};

export interface DeanActivities {
  coordinations: {
    id: number,
    nombre: string
  }[],
  divisions: {
    id: number,
    nombre: string
  }[]
};
