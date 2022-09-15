/// <reference types="@sveltejs/kit" />

export interface User {
  email: string;
  is_dean: boolean;
  professor?: {
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
  coord_chief?: {
    coord_id: number;
    coord_name: string;
  };
  division_chief?: {
    division_id: number;
    division_name: string;
  };
  is_dep_chief?: boolean;
  is_dep_representative?: boolean;
};
