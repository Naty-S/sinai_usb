/// <reference types="@sveltejs/kit" />


/* 
 * 
 * 
 * - 
 * - 
 * - 
 * - 
 * - 
 * - 
 * - 
 * - 
*/
export interface S1_request {
    id: number
  ; Evaluador: {
        nombre1: string
      ; apellido1: string
      ; correo: string
    }
  ; estado: string
  ; comentario: string
  ; proyecto: any
  ; jurado_usb: {
        id: number
      ; Profesor: {
          nombre1: string
        ; apellido1: string
        }
      ; veredicto: any
    }[]
  ; jurado_externo: {
        id: number
      ; nombre: string
      ; veredicto: any
    }[]
};

/**
 * 
*/
export interface S1_eval {
    id: number
  ; estado: "Aprbado" | "En_Revision" | "Rechazado"
  ; Profesor: {
      nombre1: string
    ; apellido1: string
  }
  ; proyecto: any
  ; jurado_usb: {
      Profesor: {
        nombre1: string
      ; apellido1: string
      ; correo: string
    }
  }[]
  ; jurado_externo: {
      nombre: string
    ; correo: string
    ; universidad: string
  }[]
};