/// <reference types="@sveltejs/kit" />

import type { Professor } from "./professors";


/**
 * Research group basic data
 * 
 * - `id`: number
 * - `nombre`: string
*/
export interface Group {
    id: number
  ; nombre: string
};

/**
 * Research group extended data
 * 
 * - `id`: number
 * - `nombre`: string
 * - `chief`: Professor
 * - `members`: Professor[]
 * - `n_activities`: number - Number of activities
*/
export interface GroupE extends Group {
    chief: Professor
  ; members: Professor[]
  ; n_activities: number
};
