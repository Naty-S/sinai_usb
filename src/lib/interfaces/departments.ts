/// <reference types="@sveltejs/kit" />

import type { Professor } from "./professors"


/**
 * Department basic data
 * 
 * - `id`: number
 * - `nombre`: string
 */
export interface Department {
    id: number
  ; nombre: string
};

/**
 * Department extended data
 * 
 * - `id`: number
 * - `nombre`: string
 * - `chief`: Professor
 * - `rep`: Professor
 */
export interface DepartmentE extends Department {
    chief: Professor
  ; rep: Professor
};
