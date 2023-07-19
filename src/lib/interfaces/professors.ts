/// <reference types="@sveltejs/kit" />

import type { Coordination } from "./coordinations"
import type { Department } from "./departments"
import type { Division } from "./divisions"


/**
 * Professor data
 * 
 * - `id`
 * - `email`
 * - `name`
 * - `surname`
 * - `department`
 * - `coordination`
 * - `division`
*/
export interface Professor {
    id: number
  , email: string
  , name: string
  , surname: string
  , department: Department
  , coordination: Coordination
  , division: Division
};
