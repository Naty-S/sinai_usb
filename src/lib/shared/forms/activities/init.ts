import type { User } from "$interfaces/auth";
import type { Activity } from "$types/activities";
import type { activity, actividad_form, kinds } from "$types/forms";
import type {
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


export const init = function (kind: kinds, user: User, data?: Activity): actividad_form<typeof kind> {

  const act: activity = {
    actividad: {
        creada_por: user.email
      , titulo: data?.titulo || ''
      , cuota: data?.cuota || 0
      , fecha_creacion: data?.fecha_creacion || new Date()
      , fecha_ultima_modificacion: data?.fecha_ultima_modificacion || new Date()
      , descripcion: data?.descripcion || null
      , fecha_validacion: data?.fecha_validacion || null
      , observaciones: data?.observaciones || null
      , palabras_clave: data?.palabras_clave || []
      , validado_por: data?.validado_por || null
    }
    , actividades_grupos:
        data?.groups.map(g => ({ old: g.id.toString(), new: g.id.toString() })) ||
        [{ old: '1', new: '1'}]
    , autores_externos: data?.autores_externos || []
    , autores_usb: data?.autores_usb || []
    , creation_success: false
  };

  let info;

  switch (kind) {
    case "articulo_revista":
      info = data?.kind_info as articulo_revista;

      const articulo_revista: actividad_form<"articulo_revista"> = {
        ...act
        , articulo_revista: {
            articulo_invitado: info?.articulo_invitado || false
          , con_estudiantes: info?.con_estudiantes || false
          , estado: info?.estado || "Aceptado_via_publicacion"
          , fecha_publicacion: info?.fecha_publicacion || null
          , indice: info?.indice || null
          , pag_final: info?.pag_final || ''
          , pag_inicial: info?.pag_inicial || ''
          , paginas: info?.paginas || 1
          , revista: info?.revista || ''
          , volumen: info?.volumen || ''
        }
      };

      return articulo_revista;

    case "capitulo_libro":
      info = data?.kind_info as capitulo_libro;

      const capitulo_libro: actividad_form<"capitulo_libro"> = {
        ...act
        , capitulo_libro: {
            aceptado: info?.aceptado || false
          , articulo_invitado: info?.articulo_invitado || false
          , ciudad: info?.ciudad || ''
          , editores: info?.editores || ['']
          , editorial: info?.editorial || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , isbn: info?.isbn || ''
          , pag_final: info?.pag_final || ''
          , pag_inicial: info?.pag_inicial || ''
          , pais: info?.pais || "Venezuela"
          , titulo_libro: info?.titulo_libro || ''
        }
      };

      return capitulo_libro;

    case "composicion":
      info = data?.kind_info as composicion;

      const composicion: actividad_form<"composicion"> = {
        ...act
        , composicion: {
            categoria: info?.categoria || "Arreglo"
          , ciudad: info?.ciudad || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || ''
          , nombre_evento: info?.nombre_evento || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return composicion;

    case "evento":
      info = data?.kind_info as evento;

      const evento: actividad_form<"evento"> = {
        ...act
        , evento: {
            ciudad: info?.ciudad || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , institucion: info?.institucion || null
          , internacional: info?.internacional || false
          , modalidad: info?.modalidad || "Cartel"
          , nombre: info?.nombre || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return evento;

    case "exposicion":
      info = data?.kind_info as exposicion;

      const exposicion: actividad_form<"exposicion"> = {
        ...act
        , exposicion: {
            categoria: info?.categoria || null
          , ciudad: info?.ciudad || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , financiado_por: info?.financiado_por || null
          , nombre_evento: info?.nombre_evento || ''
          , organizado_por: info?.organizado_por || null
          , pais: info?.pais || "Venezuela"
        }
      };

      return exposicion;

    case "grabacion":
      info = data?.kind_info as grabacion;

      const grabacion: actividad_form<"grabacion"> = {
        ...act
        , grabacion: {
            categoria: info?.categoria || "CD_Completo_Internacional"
          , deposito_legal: info?.deposito_legal || null
          , editorial: info?.editorial || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || null
          , nacional: info?.nacional || false
        }
      };

      return grabacion;

    case "informe_tecnico":
      info = data?.kind_info as informe_tecnico;

      const informe_tecnico: actividad_form<"informe_tecnico"> = {
        ...act
        , informe_tecnico: {
            confidencial: info?.confidencial || false
          , evaluacion_did: info?.evaluacion_did || false
          , evaluadores: info?.evaluadores || ['']
          , fecha_inicio: info?.fecha_inicio || new Date("yyyy-MM-dd")
          , institucion: info?.institucion || ''
          , meses_duracion: info?.meses_duracion || 1
        }
      };

      return informe_tecnico;

    case "libro":
      info = data?.kind_info as libro;

      const libro: actividad_form<"libro"> = {
        ...act
        , libro: {
            aceptado: info?.aceptado || false
          , ciudad: info?.ciudad || ''
          , editorial: info?.editorial || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , isbn: info?.isbn || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return libro;

    case "memoria":
      info = data?.kind_info as memoria;

      const memoria: actividad_form<"memoria"> = {
        ...act
        , memoria: {
            ciudad: info?.ciudad || ''
          , con_estudiantes: info?.con_estudiantes || false
          , congreso: info?.congreso || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , formato: info?.formato || "CD"
          , isbn: info?.isbn || null
          , medio_publicacion: info?.medio_publicacion || null
          , pag_final: info?.pag_final || null
          , pag_inicial: info?.pag_inicial || null
          , paginas: info?.paginas || 1
          , pais: info?.pais || "Venezuela"
          , tipo_congreso: info?.tipo_congreso || "Internacional"
          , volumen: info?.volumen || null
        }
      };

      return memoria;

    case "partitura":
      info = data?.kind_info as partitura;

      const partitura: actividad_form<"partitura"> = {
        ...act
        , partitura: {
            categoria: info?.categoria || "CD_Completo_Internacional"
          , deposito_legal: info?.deposito_legal || null
          , editorial: info?.editorial || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || null
          , nacional: info?.nacional || false
        }
      };

      return partitura;

    case "patente":
      info = data?.kind_info as patente;

      const patente: actividad_form<"patente"> = {
        ...act
        , patente: {
            fecha_fin: info?.fecha_fin || new Date("yyyy-MM-dd")
          , fecha_inicio: info?.fecha_inicio || new Date("yyyy-MM-dd")
          , numero: info?.numero || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return patente;

    case "premio":
      info = data?.kind_info as premio;

      const premio: actividad_form<"premio"> = {
        ...act
        , premio: {
            fecha: info?.fecha || new Date("yyyy-MM-dd")
          , institucion: info?.institucion || ''
        }
      };

      return premio;

    case "premio_bienal":
      info = data?.kind_info as premio_bienal;

      const premio_bienal: actividad_form<"premio_bienal"> = {
        ...act
        , premio_bienal: {
            categoria: info?.categoria || ''
          , ciudad: info?.ciudad || ''
          , fecha: info?.fecha || new Date("yyyy-MM-dd")
          , financiado_por: info?.financiado_por || null
          , nombre_evento: info?.nombre_evento || ''
          , organizado_por: info?.organizado_por || null
          , pais: info?.pais || "Venezuela"
          , titulo_premio: info?.titulo_premio || ''
        }
      };

      return premio_bienal;

    case "proyecto_grado":
      info = data?.kind_info as proyecto_grado;

      const proyecto_grado: actividad_form<"proyecto_grado"> = {
        ...act
        , proyecto_grado: {
            coordinacion_academica: info?.coordinacion_academica || ''
          , fecha_defensa: info?.fecha_defensa || new Date("yyyy-MM-dd")
          , nivel_academico: info?.nivel_academico || "Doctorado"
          , titulo_academico: info?.titulo_academico || ''
        }
      };

      return proyecto_grado;

    case "proyecto_investigacion":
      info = data?.kind_info as proyecto_investigacion;

      const proyecto_investigacion: actividad_form<"proyecto_investigacion"> = {
        ...act
        , proyecto_investigacion: {
            fecha_inicio: info?.fecha_inicio || new Date("yyyy-MM-dd")
          , institucion: info?.institucion || "Fonacit"
          , meses_duracion: info?.meses_duracion || 1
          , moneda: info?.moneda || "Bs."
          , monto: info?.monto || '1'
        }
      };

      return proyecto_investigacion;

    case "recital":
      info = data?.kind_info as recital;

      const recital: actividad_form<"recital"> = {
        ...act
        , recital: {
            ciudad: info?.ciudad || ''
          , fecha_evento: info?.fecha_evento || new Date("yyyy-MM-dd")
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || ''
          , nombre_evento: info?.nombre_evento || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return recital
  };
};
