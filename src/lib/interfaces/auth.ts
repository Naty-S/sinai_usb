/// <reference types="@sveltejs/kit" />

import type { grupo_investigacion } from "@prisma/client";
import type { Coordination } from "./coordinations";
import type { Division } from "./divisions";
import type { PEI, PPI, ProfessorE } from "./professors";


/**
 * User data
 * If the logged in user its the Dean it can't have professor data
 * 
 * - `email`: string
 * - `pending_professors`: boolean
 * - `dean`: `string` - (optional)
 * - `professor`: `ProfessorU` - (optional)
 */
export interface User {
  email: string;
  pending_professors: boolean;
  dean?: string;
  professor?: ProfessorU;
};

/**
 * Professor user data
 * 
 * - `id`: number
 * - `email`: string
 * - `name1`: string
 * - `surname1`: string
 * - `profile`: string
 * - `name2`: `string` - (optional)
 * - `surname2`: `string` - (optional)
 * - `department`: Department
 * - `coordination`: Coordination
 * - `division`: Division
 * - `id_card`: number
 * - `groups`:
 *    + `grupos_investigacion`: grupo_investigacion[]
 *    + `historico_grupos`:
 *      * `Grupo`: grupo_investigacion
 *      * `inicio`: Date
 *      * `fin`: Date | null
 * - `pei?`: PEI | undefined
 * - `ppi?`: PPI | undefined
 * - `is_dep_chief`: boolean
 * - `is_dep_representative`: boolean
 * - `coord_chief?`: Coordination & { departamentos`: number[] } | undefined
 * - `division_chief?`: Division | null | undefined
 */
export interface ProfessorU extends ProfessorE {
    id_card: number
  ; groups: {
      grupos_investigacion: grupo_investigacion[]
    ; historico_grupos: {
        Grupo: grupo_investigacion
      ; inicio: Date
      ; fin: Date | null
    }[]
  }
  ; pei?: PEI
  ; ppi?: PPI
  ; is_dep_chief: boolean
  ; is_dep_representative: boolean
  ; coord_chief?: Coordination
  ; division_chief?: Division | null
};
