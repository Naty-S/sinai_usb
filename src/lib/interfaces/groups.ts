/// <reference types="@sveltejs/kit" />

import type { Professor } from "./professors";


/**
 * Activity group data
 * 
 * - `id`
 * - `name`
 * - `chief`
 * - `members`
 * - `n_activities` (number of activities)
*/
export interface Group {
  id: number
  , name: string
  , chief: Professor
  , members: Professor[]
  , n_activities: number
};
