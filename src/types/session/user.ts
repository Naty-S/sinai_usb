/// <reference types="@sveltejs/kit" />
import type { Activities } from "$types/db/activities";


export type User = {
  email: string;
  profesor_profile: {
    id: number;
    id_card: number;
    name1: string;
    name2: string;
    surname1: string;
    surname2: string;
    category: string;
    dedication: string;
    department_id: number;
    department_name: string;
    groups: Array<string>;
    diploma: string;
    diploma_university: string;
    ppi_number: number;
    ppi_level: string;
    profile: string;
    page: string;
    research_lines: Array<string>;
  };
  coord_id?: number;
  coord_name?: string;
  division_id?: number;
  division_name?: string;
  is_coord_chief: boolean;
  is_dep_chief: boolean;
  is_dep_representative: boolean;
  is_division_chief: boolean;
  is_dean: boolean;
  activities: {
    profesor_activities?: Activities;
    coord_activities?: {

    };
    dep_activities?: {

    };
    division_activities?: {

    };
  };
};
