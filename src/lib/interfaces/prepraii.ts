/// <reference types="@sveltejs/kit" />
import type {
    actividad
  , articulo_revista
  , autor_usb
  , autor_externo
  , prepraii_convocatoria
  , prepraii_solicitud
} from "@prisma/client";


export type Prepraii = prepraii_convocatoria & {
    solicitudes: (prepraii_solicitud & {
      Actividad: actividad & { articulo_revista?: articulo_revista | null }
    ; Evaluador: {
        nombre1: string
      ; apellido1: string
      ; correo: string
    }
    ; Profesor: {
        nombre1: string
      ; apellido1: string
      ; correo: string
    }
  })[]
};


export type PrepraiiRequest = prepraii_solicitud & {
  Actividad: actividad & {
      articulo_revista?: articulo_revista | null
    ; autores_usb: autor_usb[]
    ; autores_externos: autor_externo[]
  }
  ; Convocatoria: prepraii_convocatoria
  ; Evaluador: {
      nombre1: string
    ; apellido1: string
    ; correo: string
  }
  ; Profesor: {
      nombre1: string
    ; apellido1: string
    ; correo: string
  }
  ; prepraii_profesores: {
      contrato_constancia: string
    ; Profesor: {
        nombre1: string
      ; apellido1: string
      ; correo: string
    }
  }[]
};
