import * as yup from "yup";

import type { kinds } from "$lib/types/forms";

import { parse_date } from "$lib/utils/formatting";


export const actividad = yup.object().shape({
    titulo: yup.string().required("Requerido")
  , descripcion: yup.string().nullable()
  , fecha_validacion: yup.date().nullable()
  , observaciones: yup.string().nullable()
  , palabras_clave: yup.array(yup.string())
});

export const articulo_revista = yup.object().shape({
    articulo_invitado: yup.boolean().strict().typeError("No es booleano")
  , con_estudiantes: yup.boolean().strict().typeError("No es booleano")
  , estado: yup.string().oneOf(
    ["Aceptado_via_publicacion", "Publicado"],
    "Valor del estado no pertenece a las opciones disponibles"
  )
  , fecha_publicacion: yup.date().transform(parse_date).nullable().when("estado", {
    is: "Publicado",
    then: (s) => s.required("El artículo publicado debe tener fecha"),
    otherwise: (s) => s.notRequired().nullable(),
  })
  , indice: yup.string().nullable()
  , pag_final: yup.string().required("Requerido")
  , pag_inicial: yup.string().required("Requerido")
  , paginas: yup.number().nullable()
    .positive("Ingrese número positivo")
    .integer("Ingrese número entero")
    .min(1, "Minimo 1")
  , revista: yup.string().required("Requerido")
  , volumen: yup.string().required("Requerido")
});

export const capitulo_libro = yup.object().shape({
  aceptado: yup.boolean().strict().typeError("No es booleano")
  , articulo_invitado: yup.boolean().strict().typeError("No es booleano")
  , ciudad: yup.string().required("Requerido")
  , editores: yup.array(yup.string().required("Requerido")).min(1, "Ingrese al menos 1 editor")
  , editorial: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , isbn: yup.string().required("Requerido")
  , pag_final: yup.string().required("Requerido")
  , pag_inicial: yup.string().required("Requerido")
  , pais: yup.string().required("Requerido")
  , titulo_libro: yup.string().required("Requerido")
});

export const composicion = yup.object().shape({
  categoria: yup.string().oneOf(
    ["Composicion", "Arreglo", "Ejecucion"],
    "Valor de la categoría no pertenece a las opciones disponibles"
  )
  , ciudad: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , financiado_por: yup.string().nullable()
  , jurado: yup.string().required("Requerido")
  , nombre_evento: yup.string().required("Requerido")
  , pais: yup.string().required("Requerido")
});

export const evento = yup.object().shape({
  ciudad: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , institucion: yup.string().nullable()
  , internacional: yup.boolean().strict()
  , modalidad: yup.string().oneOf(
    ["Cartel", "Oral", "Invitada"],
    "Valor de la modalidad no pertenece a las opciones disponibles"
  )
  , nombre: yup.string().required("Requerido")
  , pais: yup.string().required("Requerido")
});

export const exposicion = yup.object().shape({
  categoria: yup.string().nullable()
  , ciudad: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , financiado_por: yup.string().nullable()
  , nombre_evento: yup.string().required("Requerido")
  , organizado_por: yup.string().nullable()
  , pais: yup.string().required("Requerido")
});

export const grabacion = yup.object().shape({
  categoria: yup.string().oneOf([
      "Ejecucion_CD_Nacional"
    , "Ejecucion_CD_Internacional"
    , "CD_Completo_Nacional"
    , "CD_Completo_Internacional"
    , "Premio_Nacional_Concurso"
    , "Premio_Internacional_Concurso"
  ], "Valor de la categoría no pertenece a las opciones disponibles")
  , deposito_legal: yup.string().nullable()
  , editorial: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , financiado_por: yup.string().nullable()
  , jurado: yup.string().nullable()
  , nacional: yup.boolean().strict().typeError("No es booleano")
});

export const informe_tecnico = yup.object().shape({
  confidencial: yup.boolean().strict().typeError("No es booleano")
  , evaluacion_did: yup.boolean().strict().typeError("No es booleano")
  , evaluadores: yup.array(yup.string().required("Requerido")).min(1, "Ingrese al menos 1 evaluador")
  , fecha_inicio: yup.date().transform(parse_date).required("Requerido")
  , institucion: yup.string().required("Requerido")
  , meses_duracion: yup.number().required("Requerido")
    .positive("Ingrese número positivo")
    .integer("Ingrese número entero")
    .min(1, "Minimo 1")
});

export const libro = yup.object().shape({
  aceptado: yup.boolean().strict().typeError("No es booleano")
  , ciudad: yup.string().required("Requerido")
  , editorial: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , isbn: yup.string().required("Requerido")
  , pais: yup.string().required("Requerido")
});

export const memoria = yup.object().shape({
  ciudad: yup.string().required("Requerido")
  , con_estudiantes: yup.boolean().strict().typeError("No es booleano")
  , congreso: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , formato: yup.string().oneOf(
    ["CD", "Libro", "Revista"],
    "Valor del formato no pertenece a las opciones disponibles"
  )
  , isbn: yup.string().nullable()
  , medio_publicacion: yup.string().nullable()
  , pag_final: yup.string().nullable()
  , pag_inicial: yup.string().nullable()
  , paginas: yup.number().required("Requerido")
    .positive("Ingrese número positivo")
    .integer("Ingrese número entero")
    .min(1, "Minimo 1")
  , pais: yup.string().required("Requerido")
  , tipo_congreso: yup.string().oneOf(
    ["Nacional", "Internacional"],
    "Valor del tipo de congreso no pertenece a las opciones disponibles"
  )
  , volumen: yup.string().nullable()
});

export const partitura = yup.object().shape({
  categoria: yup.string().oneOf([
      "Ejecucion_CD_Nacional"
    , "Ejecucion_CD_Internacional"
    , "CD_Completo_Nacional"
    , "CD_Completo_Internacional"
    , "Premio_Nacional_Concurso"
    , "Premio_Internacional_Concurso"
    , "Partitura"
  ], "Valor de la categoría no pertenece a las opciones disponibles")
  , deposito_legal: yup.string().nullable()
  , editorial: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , financiado_por: yup.string().nullable()
  , jurado: yup.string().nullable()
  , nacional: yup.boolean().strict().typeError("No es booleano")
});

export const patente = yup.object().shape({
  fecha_fin: yup.date().transform(parse_date).required("Requerido")
    // .min(yup.ref("fecha_inicio"), "La fecha final debe ser mayor que la inicial") // TODO:
  , fecha_inicio: yup.date().transform(parse_date).required("Requerido")
  , numero: yup.string().required("Requerido")
  , pais: yup.string().required("Requerido")
});

export const premio = yup.object().shape({
  fecha: yup.date().transform(parse_date).required("Requerido")
  , institucion: yup.string().required("Requerido")
});

export const premio_bienal = yup.object().shape({
  categoria: yup.string().required("Requerido")
  , ciudad: yup.string().required("Requerido")
  , fecha: yup.date().transform(parse_date).required("Requerido")
  , financiado_por: yup.string().nullable()
  , nombre_evento: yup.string().required("Requerido")
  , organizado_por: yup.string().nullable()
  , pais: yup.string().required("Requerido")
  , titulo_premio: yup.string().required("Requerido")
});

export const tesis_grado = yup.object().shape({
  coordinacion_academica: yup.string().required("Requerido")
  , fecha_defensa: yup.date().transform(parse_date).required("Requerido")
  , nivel_academico: yup.string().oneOf([
    "Doctorado"
    , "Maestria"
    , "Especializacion"
    , "Postgrado"
    , "Licenciatura"
    , "Ingenieria"
    , "Pasantia_Larga"
  ], "Valor del nivel académico no pertenece a las opciones disponibles")
  , titulo_academico: yup.string().required("Requerido")
});

export const proyecto_investigacion = yup.object().shape({
  fecha_inicio: yup.date().transform(parse_date).required("Requerido")
  , institucion: yup.string().required("Requerido")
  , meses_duracion: yup.number().required("Requerido")
    .positive("Ingrese número positivo")
    .integer("Ingrese número entero")
    .min(1, "Minimo 1")
  , moneda: yup.string().oneOf(
    ["$ (USD)", "Bs."],
    "Valor del tipo de moneda no pertenece a las opciones disponibles"
  )
  , monto: yup.number().required("Requerido").min(0, "Ingrese número positivo")
});

export const recital = yup.object().shape({
  ciudad: yup.string().required("Requerido")
  , fecha_evento: yup.date().transform(parse_date).required("Requerido")
  , financiado_por: yup.string().nullable()
  , jurado: yup.string().required("Requerido")
  , nombre_evento: yup.string().required("Requerido")
  , pais: yup.string().required("Requerido")
});

export const autores_externos = yup.lazy(value => {
  if (value !== undefined) {
    return yup.array().ensure().when("autores_usb", {
      is: (autores_usb: any) => autores_usb.length === 0,
      then: yup.array().of(
        yup.object().shape({
          nombre: yup.string().required("Requerido")
          , universidad: yup.string().required("Requerido")
          , es_estudiante: yup.boolean().strict().typeError("No es booleano")
          , es_ponente: yup.boolean().strict().typeError("No es booleano")
          , es_tutor: yup.boolean().strict().typeError("No es booleano")
          , correo: yup.string().email("Correo inválido").nullable()
          , estudiante_carrera: yup.string().when("es_estudiante", {
            is: true,
            then: yup.string().nullable().required("Requerido"),
            otherwise: yup.string().nullable()
          })
        })
      ).min(1, "Ingrese al menos 1 autor").required("Requerido"),
      otherwise: yup.array().of(
        yup.object().shape({
          nombre: yup.string().required("Requerido")
          , universidad: yup.string().required("Requerido")
          , es_estudiante: yup.boolean().strict().typeError("No es booleano")
          , es_ponente: yup.boolean().strict().typeError("No es booleano")
          , es_tutor: yup.boolean().strict().typeError("No es booleano")
          , correo: yup.string().email("Correo inválido").nullable()
          , estudiante_carrera: yup.string().when("es_estudiante", {
            is: true,
            then: yup.string().nullable().required("Requerido"),
            otherwise: yup.string().nullable()
          })
        })
      )
    });
  };
  return yup.mixed().notRequired();
});

export const autores_usb = yup.lazy(value => {
  if (value !== undefined) {
    return yup.array().ensure().when("autores_externos", {
      is: [],
      then: yup.array().of(
        yup.object().shape({
          nombre: yup.string().required("Requerido")
          , es_estudiante: yup.boolean().strict().typeError("No es booleano")
          , es_ponente: yup.boolean().strict().typeError("No es booleano")
          , es_tutor: yup.boolean().strict().typeError("No es booleano")
          , correo: yup.string().email("Correo inválido").nullable()
          , profesor_id: yup.number().when("es_tutor", {
            is: true,
            then: yup.number().required("Requerido"),
            otherwise: yup.number().nullable()
          })
          , estudiante_carrera: yup.string().when("es_estudiante", {
            is: true,
            then: yup.string().required("Requerido"),
            otherwise: yup.string().nullable()
          })
        })
      ).min(1, "Ingrese al menos 1 autor").required("Requerido"),
      otherwise: yup.array().of(
        yup.object().shape({
          nombre: yup.string().required("Requerido")
          , es_estudiante: yup.boolean().strict().typeError("No es booleano")
          , es_ponente: yup.boolean().strict().typeError("No es booleano")
          , es_tutor: yup.boolean().strict().typeError("No es booleano")
          , correo: yup.string().email("Correo inválido").nullable()
          , profesor_id: yup.number().when("es_tutor", {
            is: true,
            then: yup.number().required("Requerido"),
            otherwise: yup.number().nullable()
          })
          , estudiante_carrera: yup.string().when("es_estudiante", {
            is: true,
            then: yup.string().required("Requerido"),
            otherwise: yup.string().nullable()
          })
        })
      )
    });
  };
  return yup.mixed().notRequired();
});

export const autores: [string, string] = ["autores_usb", "autores_externos"];

export const groups = [
  '?','0','1', '2', '3', '4', '6', '8', '9', "10", "11", "12", "13", "14", "15", "16", "17",
  "19", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "33", "34",
  "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48",
  "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62",
  "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "76", "77",
  "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89"
];
export const actividades_grupos = yup.array().of((yup.object().shape({
  old: yup.string().oneOf(groups, "Valor de grupo no pertenece a las opciones disponibles"),
  new: yup.string().oneOf(groups, "Valor de grupo no pertenece a las opciones disponibles")
})));


export const validation = function (kind: kinds) {
  switch (kind) {
    case "articulo_revista":
      return yup.object().shape({
        actividad
        , articulo_revista
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "capitulo_libro":
      return yup.object().shape({
        actividad
        , capitulo_libro
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "composicion":
      return yup.object().shape({
        actividad
        , composicion
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "evento":
      return yup.object().shape({
        actividad
        , evento
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "exposicion":
      return yup.object().shape({
        actividad
        , exposicion
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "grabacion":
      return yup.object().shape({
        actividad
        , grabacion
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "informe_tecnico":
      return yup.object().shape({
        actividad
        , informe_tecnico
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "libro":
      return yup.object().shape({
        actividad
        , libro
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "memoria":
      return yup.object().shape({
        actividad
        , memoria
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "partitura":
      return yup.object().shape({
        actividad
        , partitura
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "patente":
      return yup.object().shape({
        actividad
        , patente
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "premio":
      return yup.object().shape({
        actividad
        , premio
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "premio_bienal":
      return yup.object().shape({
        actividad
        , premio_bienal
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "tesis_grado":
      return yup.object().shape({
        actividad
        , tesis_grado
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "proyecto_investigacion":
      return yup.object().shape({
        actividad
        , proyecto_investigacion
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);

    case "recital":
      return yup.object().shape({
        actividad
        , recital
        , autores_externos
        , autores_usb
        , actividades_grupos
      }, [autores]);
  };
};
