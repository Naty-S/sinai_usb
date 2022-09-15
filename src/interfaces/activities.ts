/// <reference types="@sveltejs/kit" />

import type { Activity } from "$types/activities"
import type { Group } from "./groups"


export interface YearActivities {
  year: string
  kind_activities: Record<string, Activity[]>
};

export interface ActivitiesCounts {
  link?: string
  kind: string
  counts: number[]
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
  department: {
    id: number,
    name: string
  },
  professors_activities: ProfessorActivities[]
};

export interface CoordActivities {
  coordination: {
    id: number,
    name: string
  },
  departments_activities?: DepActivities[]
  groups_activities?: GroupActivities[]
};

export interface DivisionActivities {
  division: {
    id: number,
    name: string
  },
  departments_activities: DepActivities[]
};

export interface DeanActivities {
  coordinations_activities: CoordActivities[],
  divisions_activities: DivisionActivities[]
};
