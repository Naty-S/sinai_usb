import * as yup from "yup";
import { parse, isDate } from "date-fns";


function parseDate(value: any, originalValue: any) {
  const parsedDate = isDate(originalValue) || originalValue === null
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsedDate;
};

const articulo_revista = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      articulo_invitado: yup.boolean().typeError("No es booleano")
      , con_estudiantes: yup.boolean().typeError("No es booleano")
      , estado: yup.string().oneOf(["Aceptado_via_publicacion", "Publicado"])
      , fecha_publicacion: yup.date().transform(parseDate).nullable()
      , indice: yup.string().nullable()
      , pag_final: yup.string().required("Requerido")
      , pag_inicial: yup.string().required("Requerido")
      , paginas: yup.number().nullable()
                    .positive("Ingrese numero positivo")
                    .integer("Ingrese numero entero")
                    .min(1, "Minimo 1")
      , revista: yup.string().required("Requerido")
      , volumen: yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const capitulo_libro = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      aceptado: yup.boolean().typeError("No es booleano")
      , articulo_invitado: yup.boolean().typeError("No es booleano")
      , ciudad: yup.string().required("Requerido")
      , editores: yup.array(yup.string())
      , editorial: yup.string().required("Requerido")
      , fecha: yup.date().transform(parseDate).typeError("Requerido")
      , isbn: yup.string().required("Requerido")
      , pag_final: yup.string().required("Requerido")
      , pag_inicial: yup.string().required("Requerido")
      , pais: yup.string().required("Requerido")
      , titulo_libro: yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const composicion = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      categoria: yup.string().oneOf(["Composicion", "Arreglo", "Ejecucion"])
      , ciudad: yup.string().required("Requerido")
      , fecha: yup.date().transform(parseDate).typeError("Requerido")
      , financiado_por: yup.string().nullable()
      , jurado: yup.string().required("Requerido")
      , nombre_evento: yup.string().required("Requerido")
      , pais: yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const evento = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      ciudad: yup.string().required("Requerido")
      , fecha: yup.date().transform(parseDate).typeError("Requerido")
      , institucion: yup.string().nullable()
      , internacional: yup.boolean() // no esta en el form, se deduce del pais?
      , modalidad: yup.string().oneOf(["Cartel", "Oral", "Invitada"])
      , nombre: yup.string().required("Requerido")
      , pais: yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const exposicion = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      categoria: yup.string().nullable()
      , ciudad: yup.string().required("Requerido")
      , fecha: yup.date().transform(parseDate).typeError("Requerido")
      , financiado_por: yup.string().nullable()
      , nombre_evento: yup.string().required("Requerido")
      , organizado_por: yup.string().nullable()
      , pais: yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const grabacion = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      categoria: yup.string().oneOf([
        "Ejecucion_CD_Nacional"
        , "Ejecucion_CD_Internacional"
        , "CD_Completo_Nacional"
        , "CD_Completo_Internacional"
        , "Premio_Nacional_Concurso"
        , "Premio_Internacional_Concurso"
      ])
      , deposito_legal: yup.string().nullable()
      , editorial      : yup.string().required("Requerido")
      , fecha          : yup.date().transform(parseDate).typeError("Requerido")
      , financiado_por: yup.string().nullable()
      , jurado         : yup.string().required("Requerido")
      , nacional       : yup.boolean().typeError("No es booleano")
    });
  };
  return yup.mixed().notRequired();
});

const informe_tecnico = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      confidencial   : yup.boolean().typeError("No es booleano")
      , evaluacion_did : yup.boolean().typeError("No es booleano")
      , evaluadores    : yup.array(yup.string())
      , fecha_inicio   : yup.date().transform(parseDate).typeError("Requerido")
      , institucion    : yup.string().required("Requerido")
      , meses_duracion : yup.number().required("Requerido")
                                     .positive("Ingrese numero positivo")
                                     .integer("Ingrese numero entero")
                                     .min(1, "Minimo 1")
    });
  };
  return yup.mixed().notRequired();
});

const libro = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      aceptado  : yup.boolean().typeError("No es booleano")
      , ciudad    : yup.string().required("Requerido")
      , editorial : yup.string().required("Requerido")
      , fecha     : yup.date().transform(parseDate).typeError("Requerido")
      , isbn      : yup.string().required("Requerido")
      , pais      : yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const memoria = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      ciudad            : yup.string().required("Requerido")
      , con_estudiantes   : yup.boolean().typeError("No es booleano")
      , congreso          : yup.string().required("Requerido")
      , fecha             : yup.date().transform(parseDate).typeError("Requerido")
      , formato: yup.string().oneOf(["CD", "Libro", "Revista"])
      , isbn             : yup.string().nullable()
      , medio_publicacion: yup.string().nullable()
      , pag_final        : yup.string().nullable()
      , pag_inicial      : yup.string().nullable()
      , paginas           : yup.number().required("Requerido")
                                     .positive("Ingrese numero positivo")
                                     .integer("Ingrese numero entero")
                                     .min(1, "Minimo 1")
      , pais              : yup.string().required("Requerido")
      , tipo_congreso: yup.string().oneOf(["Nacional", "Internacional"])
      , volumen          : yup.string().nullable()
    });
  };
  return yup.mixed().notRequired();
});

const partitura = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      categoria: yup.string().oneOf([
        "Ejecucion_CD_Nacional"
        , "Ejecucion_CD_Internacional"
        , "CD_Completo_Nacional"
        , "CD_Completo_Internacional"
        , "Premio_Nacional_Concurso"
        , "Premio_Internacional_Concurso"
        , "Partitura"
      ])
      , deposito_legal: yup.string().nullable()
      , editorial      : yup.string().required("Requerido")
      , fecha          : yup.date().transform(parseDate).typeError("Requerido")
      , financiado_por: yup.string().nullable()
      , jurado        : yup.string().nullable()
      , nacional       : yup.boolean().typeError("No es booleano")
    });
  };
  return yup.mixed().notRequired();
});

const patente = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      fecha_fin    : yup.date().transform(parseDate).typeError("Requerido")
                        .min(yup.ref("fecha_inicio"), "La fecha final debe ser mayor que la inicial")
      , fecha_inicio : yup.date().transform(parseDate).typeError("Requerido")
      , numero       : yup.string().required("Requerido")
      , pais         : yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const premio = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      fecha       : yup.date().transform(parseDate).typeError("Requerido")
      , institucion : yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const premio_bienal = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      categoria      : yup.string().required("Requerido")
      , ciudad         : yup.string().required("Requerido")
      , fecha          : yup.date().transform(parseDate).typeError("Requerido")
      , financiado_por: yup.string().nullable()
      , nombre_evento  : yup.string().required("Requerido")
      , organizado_por: yup.string().nullable()
      , pais           : yup.string().required("Requerido")
      , titulo_premio  : yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const proyecto_grado = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      coordinacion_academica : yup.string().required("Requerido")
      , fecha_defensa          : yup.date().transform(parseDate).typeError("Requerido")
      , nivel_academico: yup.string().oneOf([
        "Doctorado"
        , "Maestria"
        , "Especializacion"
        , "Postgrado"
        , "Licencitura"
        , "Ingenieria"
        , "Pasantia_Larga"
      ])
      , titulo_academico       : yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const proyecto_investigacion = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      fecha_inicio   : yup.date().transform(parseDate).typeError("Requerido")
      , institucion    : yup.string().required("Requerido")
      , meses_duracion : yup.number().required("Requerido")
                                     .positive("Ingrese numero positivo")
                                     .integer("Ingrese numero entero")
                                     .min(1, "Minimo 1")
      , moneda         : yup.string().required("Requerido")
      , monto          : yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const recital = yup.lazy(value => {
  if (value !== undefined) {
    return yup.object().shape({
      ciudad: yup.string().required("Requerido")
      , fecha_evento: yup.date().transform(parseDate).typeError("Requerido")
      , financiado_por: yup.string().nullable()
      , jurado: yup.string().required("Requerido")
      , nombre_evento: yup.string().required("Requerido")
      , pais: yup.string().required("Requerido")
    });
  };
  return yup.mixed().notRequired();
});

const autores_externos = yup.lazy(value => {
  if (value !== undefined) {
    return  yup.array().ensure().when("autores_usb", {
      is: (autores_usb: any) => autores_usb.length === 0,
      then: yup.array().of(
        yup.object().shape({
          nombre: yup.string().required("Requerido")
          , universidad: yup.string().required("Requerido")
          , es_estudiante: yup.boolean().typeError("No es booleano")
          , es_ponente: yup.boolean().typeError("No es booleano")
          , es_tutor: yup.boolean().typeError("No es booleano")
          , correo: yup.string().email("Correo invalido").nullable()
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
          , es_estudiante: yup.boolean().typeError("No es booleano")
          , es_ponente: yup.boolean().typeError("No es booleano")
          , es_tutor: yup.boolean().typeError("No es booleano")
          , correo: yup.string().email("Correo invalido").nullable()
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

const autores_usb = yup.lazy(value => {
  if (value !== undefined) {
    return yup.array().ensure().when("autores_externos", {
      is: [],
      then: yup.array().of(
        yup.object().shape({
          nombre: yup.string().required("Requerido")
          , es_estudiante: yup.boolean().typeError("No es booleano")
          , es_ponente: yup.boolean().typeError("No es booleano")
          , es_tutor: yup.boolean().typeError("No es booleano")
          , correo: yup.string().email("Correo invalido").nullable()
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
          , es_estudiante: yup.boolean().typeError("No es booleano")
          , es_ponente: yup.boolean().typeError("No es booleano")
          , es_tutor: yup.boolean().typeError("No es booleano")
          , correo: yup.string().email("Correo invalido").nullable()
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

const actividades_grupos = yup.lazy(value => {
  if (value) {
    return yup.array(yup.string().oneOf([
        '1', '2', '3', '4', '6', '8', '9', "10", "11", "12", "13", "14", "15", "16", "17",
        "19", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "33", "34",
        "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48",
        "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62",
        "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "76", "77",
        "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89"
      ], "El grupo es invalido")
    );
  };
  return yup.mixed().notRequired();
});

export const validationSchema = yup.object().shape({
  actividad: yup.object().shape({
    titulo: yup.string().required("Requerido")
    , descripcion: yup.string().nullable()
    , fecha_validacion: yup.date().nullable()
    , observaciones: yup.string().nullable()
    , palabras_clave: yup.array(yup.string()).nullable()
  })
  , articulo_revista
  , capitulo_libro
  , composicion
  , evento
  , exposicion
  , grabacion
  , informe_tecnico
  , libro
  , memoria
  , partitura
  , patente
  , premio
  , premio_bienal
  , proyecto_grado
  , proyecto_investigacion
  , recital
  , autores_externos
  , autores_usb
  , actividades_grupos
}, [
  ["autores_usb", "autores_externos"]
]);
