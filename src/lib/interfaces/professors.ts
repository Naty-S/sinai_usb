/// <reference types="@sveltejs/kit" />

import type {
  pei_nivel_enum,
  ppi_nivel_enum,
  profesor_categoria_enum,
  profesor_dedicacion_enum,
  profesor_diploma_tipo_enum
} from "@prisma/client";
import type { Coordination } from "./coordinations"
import type { Department } from "./departments"
import type { Division } from "./divisions"


/**
 * Raw professor data
 * 
 * - `id`: number
 * - `correo`: string
 * - `activo`: boolean
 * - `cedula`: number
 * - `nombre1`: string
 * - `nombre2`: string | null
 * - `apellido1`: string
 * - `apellido2`: string | null
 * - `perfil`: string
 * - `categoria`: string
 * - `condicion`: string
 * - `dedicacion`: string
 * - `departamento`: number
 * - `diploma_tipo`: string
 * - `diploma_universidad`: string
 * - `lineas_investigacion`: string[]
 * - `url`: string | null
 */
export interface Profesor {
    id: number
  ; correo: string
  ; activo: boolean
  ; cedula: number
  ; nombre1: string
  ; nombre2: string | null
  ; apellido1: string
  ; apellido2: string | null
  ; perfil: string
  ; categoria: string
  ; condicion: string
  ; dedicacion: string
  ; departamento: number
  ; diploma_tipo: string
  ; diploma_universidad: string
  ; lineas_investigacion: string[]
  ; url: string | null
};

/**
 * Professor basic data.
 * 
 * - `id`: number
 * - `email`: string
 * - `name1`: string
 * - `surname1`: string
 * - `name2`: `string` - (optional)
 * - `surname2`: `string` - (optional)
*/
export interface Professor {
    id: number
  ; email: string
  ; name1: string
  ; surname1: string
  ; name2?: string | null
  ; surname2?: string | null
};

/**
 * Professor extended data.
 * 
 * - `id`: number
 * - `email`: string
 * - `name1`: string
 * - `surname1`: string
 * - `name2`: `string` - (optional)
 * - `surname2`: `string` - (optional)
 * - `department`: Department
 * - `coordination`: Coordination
 * - `division`: Division
 */
export interface ProfessorE extends Professor {
    department: Department
  ; coordination: Coordination
  ; division: Division
};

/**
 * Profile data for update.
 * 
 * - `perfil`: string
 * - `categoria`: "Agregado" | "Asistente" | "Asociado" | "Instructor" | "Titular"
 * - `dedicacion`: "Convencional" | "Exclusiva" | "Integral"
 * - `diploma_tipo`: "Lic_" | "Ph_D_" | "Doctor" | "Magister" | "Ing_"
 * - `diploma_universidad`: string
 * - `url`: string | null
 * - `lineas_investigacion`: string[]
 * - `pei`: PEI
 */
export interface Profile {
    perfil: string
  ; categoria: profesor_categoria_enum
  ; dedicacion: profesor_dedicacion_enum
  ; diploma_tipo: profesor_diploma_tipo_enum
  ; diploma_universidad: string
  ; url: string | null
  ; lineas_investigacion: string[]
  ; pei: PEI
};

/**
 * New professor rank PEI
 * 
 * - `anio`: number | null
 * - `nivel`: "A" | "B" | "C" | null
 * - `numero`: string | null
 */
export interface PEI {
    anio: number | null
  ; nivel: pei_nivel_enum | null
  ; numero: string | null
}

/**
 * Old professor rank PPI
 * 
 * - `anio`: number | null
 * - `nivel`: "Candidato" | "Nivel_I" | "Nivel_II" | "Nivel_III" | "Nivel_IV" | null
 * - `numero`: number | null
 */
export interface PPI {
    anio: number | null
  ; nivel: ppi_nivel_enum | null
  ; numero: number | null
}
