/// <reference types="@sveltejs/kit" />

import type { grupo_investigacion } from "@prisma/client";


/**
 * User data
 * If the logged in user its the Dean it can't have professor data
 * 
 * - `email`
 * - `pending_professors`
 * - `dean` (optional)
 * - `professor` (optional)
 */
export interface User {
  email: string;
  pending_professors: boolean;
  dean?: string;
  professor?: Professor;
};

/**
 * User data as professor
 */
export interface Professor {
  id: number;
  id_card: number;
  name1: string;
  name2?: string | null;
  surname1: string;
  surname2?: string | null;
  department: {
    id: number;
    name: string;
    coordination: {
      id: number;
      nombre: string;
    };
    division: {
      id: number;
      nombre: string;
    };
  };
  groups: {
    grupos_investigacion: grupo_investigacion[],
    historico_grupos: {
      Grupo: grupo_investigacion;
      inicio: Date;
      fin: Date | null;
    }[]
  };
  pei_number?: string | null;
  pei_level?: string | null;
  ppi_number?: number | null;
  ppi_level?: string | null;
  is_dep_chief: boolean;
  is_dep_representative: boolean;
  coord_chief?: {
    id: number;
    name: string;
    departments: number[];
  };
  division_chief?: {
    id: number;
    name: string;
  };
};
