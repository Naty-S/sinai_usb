/// <reference types="@sveltejs/kit" />

import type { Department } from "./departments";
import type { Professor } from "./professors";


/**
 * Coordination basic data
 * 
 * - `id`: number
 * - `nombre`: string
 * - `departamentos`: Department[]
 */
export interface Coordination {
    id: number
  ; nombre: string
  ; departamentos: Department[]
};

/**
 * Coordination extended data
 * 
 * - `id`: number
 * - `nombre`: string
 * - `chief`: Professor
 */
export interface CoordinationE extends Coordination {
    chief: Professor
  ;
};
