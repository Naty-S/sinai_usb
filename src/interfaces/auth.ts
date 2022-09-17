/// <reference types="@sveltejs/kit" />

import type { grupo_investigacion } from "@prisma/client";


export interface User {
  email: string;
  dean?: string;
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
    diploma: string;
    diploma_university: string;
    ppi_number?: number | null;
    ppi_level?: string | null;
    profile: string;
    page?: string | null;
    research_lines: Array<string>;
    is_dep_chief: boolean;
    is_dep_representative: boolean;
    coord_chief?: {
      id: number;
      name: string;
    };
    division_chief?: {
      id: number;
      name: string;
    };
  };
};
