/// <reference types="@sveltejs/kit" />

import type { log_operacion_actividad_operacion_enum } from "@prisma/client";


/**
 * Activity data about the action made in it.
 * Actions: create, modify data, validate, invalidate, delete
 * 
 * - `id`: `number` - log id
 * - `actividad`: `number` - Activity id
 * - `Usuario`: The user who domadene the action
 *    + `profesor`: { perfil: string } | null
 *    + `administrador`: { nombre: string } | null
 * - `fecha`: Date | null)
 * - `hora`: Date | null)
 * - `operacion`: "Modificacion" | "Validacion" | "Eliminacion" | "Ingreso
 */
export interface ActivityLog {
    id: number
  ; actividad: number
  ; Usuario: {
      profesor: { perfil: string } | null
    ; administrador: { nombre: string } | null
  }
  ; fecha: Date | null
  ; hora: Date | null
  ; operacion: log_operacion_actividad_operacion_enum
};
