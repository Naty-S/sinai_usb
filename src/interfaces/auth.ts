/// <reference types="@sveltejs/kit" />


export interface User {
  email: string;
  is_dean: boolean;
  professor?: {
    id_card: number;
    name1: string;
    name2?: string | null;
    surname1: string;
    surname2?: string | null;
    category: string;
    dedication: string;
    department: {
      id: number;
      name: string;
      coordination: {
        id: number;
        nombre: string;
      };
    };
    groups: Array<string>;
    diploma: string;
    diploma_university: string;
    ppi_number?: number | null;
    ppi_level?: string | null;
    profile: string;
    page?: string | null;
    research_lines: Array<string>;
    is_dep_chief?: boolean;
    is_dep_representative?: boolean;
    coord_chief?: {
      coord_id: number;
      coord_name: string;
    };
    division_chief?: {
      division_id: number;
      division_name: string;
    };
  };
};
