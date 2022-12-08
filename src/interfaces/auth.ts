/// <reference types="@sveltejs/kit" />

import type { grupo_investigacion } from "@prisma/client";


export interface User {
  email: string;
  pending_professors: boolean;
  dean?: string;
  professor?: Professor;
};

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
