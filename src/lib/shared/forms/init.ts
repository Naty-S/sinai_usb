import type { activity, actividad_form, kinds } from "$types/forms";


export const init = function (kind: kinds): actividad_form<typeof kind> {

  const act: activity = {
    actividad: {
      creada_por: "eduardo@usb.ve"
      , titulo: ''
      , cuota: 0
      , fecha_creacion: new Date()
      , fecha_ultima_modificacion: new Date()
      , descripcion: null
      , fecha_validacion: null
      , observaciones: null
      , palabras_clave: []
      , validado_por: null
    }
    , actividades_grupos: ['1']
    , autores_externos: []
    , autores_usb: []
    , creation_success: false
  };

  switch (kind) {
    case "articulo_revista":
      const articulo_revista: actividad_form<"articulo_revista"> = {
        ...act
        , articulo_revista: {
          articulo_invitado: false
          , con_estudiantes: false
          , estado: "Aceptado_via_publicacion"
          , fecha_publicacion: null
          , indice: null
          , pag_final: ''
          , pag_inicial: ''
          , paginas: 1
          , revista: ''
          , volumen: ''
        }
      };

      return articulo_revista;

    case "capitulo_libro":
      const capitulo_libro: actividad_form<"capitulo_libro"> = {
        ...act
        , capitulo_libro: {
          aceptado: false
          , articulo_invitado: false
          , ciudad: ''
          , editores: ['']
          , editorial: ''
          , fecha: new Date("yyyy-MM-dd")
          , isbn: ''
          , pag_final: ''
          , pag_inicial: ''
          , pais: "Venezuela"
          , titulo_libro: ''
        }
      };

      return capitulo_libro;

    case "composicion":
      const composicion: actividad_form<"composicion"> = {
        ...act
        , composicion: {
          categoria: "Arreglo"
          , ciudad: ''
          , fecha: new Date("yyyy-MM-dd")
          , financiado_por: null
          , jurado: ''
          , nombre_evento: ''
          , pais: "Venezuela"
        }
      };

      return composicion;

    case "evento":
      const evento: actividad_form<"evento"> = {
        ...act
        , evento: {
          ciudad: ''
          , fecha: new Date("yyyy-MM-dd")
          , institucion: null
          , internacional: false
          , modalidad: "Cartel"
          , nombre: ''
          , pais: "Venezuela"
        }
      };

      return evento;

    case "exposicion":
      const exposicion: actividad_form<"exposicion"> = {
        ...act
        , exposicion: {
          categoria: null
          , ciudad: ''
          , fecha: new Date("yyyy-MM-dd")
          , financiado_por: null
          , nombre_evento: ''
          , organizado_por: null
          , pais: "Venezuela"
        }
      };

      return exposicion;

    case "grabacion":
      const grabacion: actividad_form<"grabacion"> = {
        ...act
        , grabacion: {
          categoria: "CD_Completo_Internacional"
          , deposito_legal: null
          , editorial: ''
          , fecha: new Date("yyyy-MM-dd")
          , financiado_por: null
          , jurado: null
          , nacional: false
        }
      };

      return grabacion;

    case "informe_tecnico":
      const informe_tecnico: actividad_form<"informe_tecnico"> = {
        ...act
        , informe_tecnico: {
            confidencial: false
          , evaluacion_did: false
          , evaluadores: ['']
          , fecha_inicio: new Date("yyyy-MM-dd")
          , institucion: ''
          , meses_duracion: 1
        }
      };

      return informe_tecnico;

    case "libro":
      const libro: actividad_form<"libro"> = {
        ...act
        , libro: {
          aceptado: false
          , ciudad: ''
          , editorial: ''
          , fecha: new Date("yyyy-MM-dd")
          , isbn: ''
          , pais: "Venezuela"
        }
      };

      return libro;

    case "memoria":
      const memoria: actividad_form<"memoria"> = {
        ...act
        , memoria: {
          ciudad: ''
          , con_estudiantes: false
          , congreso: ''
          , fecha: new Date("yyyy-MM-dd")
          , formato: "CD"
          , isbn: null
          , medio_publicacion: null
          , pag_final: null
          , pag_inicial: null
          , paginas: 1
          , pais: "Venezuela"
          , tipo_congreso: "Internacional"
          , volumen: null
        }
      };

      return memoria;

    case "partitura":
      const partitura: actividad_form<"partitura"> = {
        ...act
        , partitura: {
          categoria: "CD_Completo_Internacional"
          , deposito_legal: null
          , editorial: ''
          , fecha: new Date("yyyy-MM-dd")
          , financiado_por: null
          , jurado: null
          , nacional: false
        }
      };

      return partitura;

    case "patente":
      const patente: actividad_form<"patente"> = {
        ...act
        , patente: {
          fecha_fin: new Date("yyyy-MM-dd")
          , fecha_inicio: new Date("yyyy-MM-dd")
          , numero: ''
          , pais: "Venezuela"
        }
      };

      return patente;

    case "premio":
      const premio: actividad_form<"premio"> = {
        ...act
        , premio: {
          fecha: new Date("yyyy-MM-dd")
          , institucion: ''
        }
      };

      return premio;

    case "premio_bienal":
      const premio_bienal: actividad_form<"premio_bienal"> = {
        ...act
        , premio_bienal: {
          categoria: ''
          , ciudad: ''
          , fecha: new Date("yyyy-MM-dd")
          , financiado_por: null
          , nombre_evento: ''
          , organizado_por: null
          , pais: "Venezuela"
          , titulo_premio: ''
        }
      };

      return premio_bienal;

    case "proyecto_grado":
      const proyecto_grado: actividad_form<"proyecto_grado"> = {
        ...act
        , proyecto_grado: {
          coordinacion_academica: ''
          , fecha_defensa: new Date("yyyy-MM-dd")
          , nivel_academico: "Doctorado"
          , titulo_academico: ''
        }
      };

      return proyecto_grado;

    case "proyecto_investigacion":
      const proyecto_investigacion: actividad_form<"proyecto_investigacion"> = {
        ...act
        , proyecto_investigacion: {
          fecha_inicio: new Date("yyyy-MM-dd")
          , institucion: "Fonacit"
          , meses_duracion: 1
          , moneda: "Bs."
          , monto: '1'
        }
      };

      return proyecto_investigacion;

    case "recital":
      const recital: actividad_form<"recital"> = {
        ...act
        , recital: {
          ciudad: ''
          , fecha_evento: new Date("yyyy-MM-dd")
          , financiado_por: null
          , jurado: ''
          , nombre_evento: ''
          , pais: "Venezuela"
        }
      };

      return recital
  };
};
