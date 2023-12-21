/// <reference types="@sveltejs/kit" />

import type { Writable } from "svelte/store";
import type {
  actividad,
  autor_externo,
  autor_usb,
  articulo_revista,
  capitulo_libro,
  composicion,
  evento,
  exposicion,
  grabacion,
  informe_tecnico,
  libro,
  memoria,
  partitura,
  patente,
  premio,
  premio_bienal,
  proyecto_grado,
  proyecto_investigacion,
  recital,
} from "@prisma/client";
import type { User } from "$lib/interfaces/auth";


//
// Activities
//

/**
 * Kinds of activities
 */
export type kinds
  = "articulo_revista"
  | "capitulo_libro"
  | "composicion"
  | "evento"
  | "exposicion"
  | "grabacion"
  | "informe_tecnico"
  | "libro"
  | "memoria"
  | "partitura"
  | "patente"
  | "premio"
  | "premio_bienal"
  | "proyecto_grado"
  | "proyecto_investigacion"
  | "recital"
;

// Types used in the activity's form. Id field `actividad` not needed.
type articulo_revista_form = Omit<articulo_revista, "actividad">;
type capitulo_libro_form = Omit<capitulo_libro, "actividad">;
type composicion_form = Omit<composicion, "actividad">;
type evento_form = Omit<evento, "actividad">;
type exposicion_form = Omit<exposicion, "actividad">;
type grabacion_form = Omit<grabacion, "actividad">;
type informe_tecnico_form = Omit<informe_tecnico, "actividad">;
type libro_form = Omit<libro, "actividad">;
type memoria_form = Omit<memoria, "actividad">;
type partitura_form = Omit<partitura, "actividad">;
type patente_form = Omit<patente, "actividad">;
type premio_form = Omit<premio, "actividad">;
type premio_bienal_form = Omit<premio_bienal, "actividad">;
type proyecto_grado_form = Omit<proyecto_grado, "actividad">;
type proyecto_investigacion_form = Omit<proyecto_investigacion, "actividad">;
type recital_form = Omit<recital, "actividad">;

// 
type actividades_form = {
    articulo_revista: articulo_revista_form
  , capitulo_libro: capitulo_libro_form
  , composicion: composicion_form
  , evento: evento_form
  , exposicion: exposicion_form
  , grabacion: grabacion_form
  , informe_tecnico: informe_tecnico_form
  , libro: libro_form
  , memoria: memoria_form
  , partitura: partitura_form
  , patente: patente_form
  , premio: premio_form
  , premio_bienal: premio_bienal_form
  , proyecto_grado: proyecto_grado_form
  , proyecto_investigacion: proyecto_investigacion_form
  , recital: recital_form
};

/**
 * Activity data to be stored in the DB
 */
export type activity = {
  actividad: Omit<actividad, "id">
  , autores_externos: Omit<autor_externo, "id" | "actividad">[]
  , autores_usb: Omit<autor_usb, "id" | "actividad">[]
  , actividades_grupos: {
    old: string,
    new: string
  }[]
  , user_rank: "professor" | "dean"
  , user: User
  , kind: kinds
};

/**
 * Activity form data
 */
export type actividad_form<kind extends kinds> = activity & Pick<actividades_form, kind>;


//
// S1 Novel
//

export type s1_novel_form = {

};

/**
 * 
 */
export type jury = {
    jurado_usb: {
      profesor: number
    , s1_novel: number
    , veredicto?: FileList | null
  }[]
  , jurado_externo: {
      s1_novel: number
    , correo?: String | null
    , nombre: String
    , universidad?: String | null
    , veredicto?: FileList | null
  }[]
}

//
// PREPRAII
//

export type prepraii_form = {
  prepraii_solicitud: {
      actividad: number
    , articulo: FileList
    , comentario: string
    , indice: string
    , observaciones_evaluador: string
    , observaciones_profesor: string
  }
  , prepraii_profesores: {
      profesor: number
    , contrato_constancia: FileList
  }[]
};

export type prepraii = {
  prepraii_solicitud: {
      actividad: number
    , articulo: string
    , profesor: number
    , comentario: string
    , indice: string
    , observaciones_evaluador: string
    , observaciones_profesor: string
  }
  , prepraii_profesores: {
      profesor: number
    , contrato_constancia: string
  }[]
};

//
// Context
//

/**
 * Form context, propagates form data across components
 * 
 * TODO: Make select & input more general. ctx it's in login and register(research lines) too
 */
export type activity_form_ctx<kind extends kinds> = {
  form: Writable<actividad_form<kind>>,
  errors: Writable<actividad_form<kind>>,
  handleChange: (event: Event) => any,
};
