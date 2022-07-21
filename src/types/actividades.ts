/// <reference types="@sveltejs/kit" />

export type Actividad = {
  id:                        number 
  creada_por:                string
  validado_por:              string | null
  cuota:                     number | null
  descripcion:               string | null
  fecha_creacion:            Date 
  fecha_ultima_modificacion: Date 
  fecha_validacion:          Date | null
  observaciones:             string | null
  palabras_clave:            string[]
  titulo:                    string
}

export type Actividades = {
  year: number
  acts: Record<string, Actividad[]>
}
