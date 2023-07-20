/// <reference types="@sveltejs/kit" />

import type { Professor } from "./professors"


/**
 * Department data
 * 
 * - `id`
 * - `nombre`
 * - `chief`
 * - `rep`
 */
export interface Department {
  id: number
  , nombre: string
  , chief: Professor
  , rep: Professor
};
