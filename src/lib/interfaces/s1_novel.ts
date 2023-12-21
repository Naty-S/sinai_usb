/// <reference types="@sveltejs/kit" />

import type { s1_novel } from "@prisma/client";


/* 
 * 
 * 
 * - 
*/
export type S1Request = s1_novel & {
    Evaluador: {
      nombre1: string
    ; apellido1: string
    ; correo: string
  }
  ; Profesor: {
      nombre1: string
    ; apellido1: string
    ; correo: string
  }
} & Jury;

export type Jury = {
    jurado_usb: {
        id: number
      ; veredicto?: string | null
      ; Profesor: {
          nombre1: string
        ; apellido1: string
        ; correo: string
      }
    }[]
  ; jurado_externo: {
        id: number
      ; correo?: string | null
      ; nombre: string
      ; universidad?: string | null
      ; veredicto?: string | null
    }[]
};
