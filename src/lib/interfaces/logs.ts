/// <reference types="@sveltejs/kit" />

import type { log_operacion_actividad_operacion_enum } from "@prisma/client";


/**
 * Activity data about the action performed in it.
 * Actions: create, modify data, validate, invalidate
 * 
 * - `user`: The user who performed the action
 * - `date`
 * - `time`
 * - `action`: "Ingreso", "Modificacion", "Validacion", "Eliminacion"
 */
export interface ActivityActionLog {
  user: string;
  date: Date;
  time: Date;
  action: log_operacion_actividad_operacion_enum;
};
