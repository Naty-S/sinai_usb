/// <reference types="@sveltejs/kit" />


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
};
