/// <reference types="@sveltejs/kit" />

import type { Department } from "./departments";
import type { Professor } from "./professors";


/**
 * Division basic data
 * 
 * - `id`: number
 * - `nombre`: string
 * - `departamentos`: Department[]
 */
export interface Division {
    id: number
  ; nombre: string
  ; departamentos: Department[]
};

/**
 * Division extended data
 * 
 * - `id`: number
 * - `nombre`: string
 * - `chief`: Professor
 */
export interface DivisionE extends Division {
    chief: Professor
  ;
};
