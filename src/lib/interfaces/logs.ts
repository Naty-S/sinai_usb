/// <reference types="@sveltejs/kit" />

import type { log_operacion_actividad_operacion_enum } from "@prisma/client";


/**
 * Activity data about the action performed in it.
 * Actions: create, modify data, validate, invalidate
 * 
 * - `id`: log id
 * - `actividad`: Activity id
 * - `usuario`: The user who performed the action
 * - `fecha`
 * - `hora`
 * - `operacion`: "Ingreso", "Modificacion", "Validacion", "Eliminacion"
 */
export interface ActivityActionLog {
  id: number;
  actividad: number;
  Usuario: {
    profesor: { perfil: string } | null;
    administrador: { nombre: string } | null
  };
  fecha: Date | null;
  hora: Date | null;
  operacion: log_operacion_actividad_operacion_enum
};
