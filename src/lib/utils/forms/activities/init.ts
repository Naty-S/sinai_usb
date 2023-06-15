import type { User } from "$lib/interfaces/auth";
import type { Activity } from "$lib/types/activities";
import type { activity, actividad_form, kinds } from "$lib/types/forms";
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

import { format_date } from "$lib/utils/formatting";


export const init = function (kind: kinds, user?: User, data?: Activity): actividad_form<typeof kind> {

  const act: activity = {
    actividad: {
        creada_por: (data ? (user?.dean ? data.creada_por : user?.email) : user?.email) || "usuario ficticio"
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
        [{ old: '?', new: '1'}]
    , autores_externos: data?.autores_externos || []
    , autores_usb: data?.autores_usb || []
    , user_rank: user?.dean ? "dean" : "professor"
    , user: user || {email: "usuario ficticio", pending_professors: false}
    , kind
  };
  console.log("data.user_rank: ", act.user_rank)
  console.log("user:", user)

  /**
   * Initialize the date so it can be displayed in the form
   * 
   * @param date - Date to initialize for display in form
   * @returns Date with format accepted to be displayed in the form
   */
  const init_date = function (date?: Date): Date {
    return date ? format_date(date, "yyyy-MM-dd") as unknown as Date : new Date("yyyy-MM-dd");
  };

  let info;

  switch (kind) {
    case "articulo_revista":
      info = data?.kind_data as articulo_revista;

      const articulo_revista: actividad_form<"articulo_revista"> = {
        ...act
        , articulo_revista: {
            articulo_invitado: info?.articulo_invitado || false
          , con_estudiantes: info?.con_estudiantes || false
          , estado: info?.estado || "Aceptado_via_publicacion"
          , fecha_publicacion: info?.fecha_publicacion
              ? format_date(info.fecha_publicacion, "yyyy-MM-dd") as unknown as Date
              : null
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
      info = data?.kind_data as capitulo_libro;

      const capitulo_libro: actividad_form<"capitulo_libro"> = {
        ...act
        , capitulo_libro: {
            aceptado: info?.aceptado || false
          , articulo_invitado: info?.articulo_invitado || false
          , ciudad: info?.ciudad || ''
          , editores: info?.editores || ['']
          , editorial: info?.editorial || ''
          , fecha: init_date(info?.fecha)
          , isbn: info?.isbn || ''
          , pag_final: info?.pag_final || ''
          , pag_inicial: info?.pag_inicial || ''
          , pais: info?.pais || "Venezuela"
          , titulo_libro: info?.titulo_libro || ''
        }
      };

      return capitulo_libro;

    case "composicion":
      info = data?.kind_data as composicion;

      const composicion: actividad_form<"composicion"> = {
        ...act
        , composicion: {
            categoria: info?.categoria || "Arreglo"
          , ciudad: info?.ciudad || ''
          , fecha: init_date(info?.fecha)
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || ''
          , nombre_evento: info?.nombre_evento || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return composicion;

    case "evento":
      info = data?.kind_data as evento;

      const evento: actividad_form<"evento"> = {
        ...act
        , evento: {
            ciudad: info?.ciudad || ''
          , fecha: init_date(info?.fecha)
          , institucion: info?.institucion || null
          , internacional: info?.internacional || false
          , modalidad: info?.modalidad || "Cartel"
          , nombre: info?.nombre || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return evento;

    case "exposicion":
      info = data?.kind_data as exposicion;

      const exposicion: actividad_form<"exposicion"> = {
        ...act
        , exposicion: {
            categoria: info?.categoria || null
          , ciudad: info?.ciudad || ''
          , fecha: init_date(info?.fecha)
          , financiado_por: info?.financiado_por || null
          , nombre_evento: info?.nombre_evento || ''
          , organizado_por: info?.organizado_por || null
          , pais: info?.pais || "Venezuela"
        }
      };

      return exposicion;

    case "grabacion":
      info = data?.kind_data as grabacion;

      const grabacion: actividad_form<"grabacion"> = {
        ...act
        , grabacion: {
            categoria: info?.categoria || "CD_Completo_Internacional"
          , deposito_legal: info?.deposito_legal || null
          , editorial: info?.editorial || ''
          , fecha: init_date(info?.fecha)
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || null
          , nacional: info?.nacional || false
        }
      };

      return grabacion;

    case "informe_tecnico":
      info = data?.kind_data as informe_tecnico;

      const informe_tecnico: actividad_form<"informe_tecnico"> = {
        ...act
        , informe_tecnico: {
            confidencial: info?.confidencial || false
          , evaluacion_did: info?.evaluacion_did || false
          , evaluadores: info?.evaluadores || ['']
          , fecha_inicio: init_date(info?.fecha_inicio)
          , institucion: info?.institucion || ''
          , meses_duracion: info?.meses_duracion || 1
        }
      };

      return informe_tecnico;

    case "libro":
      info = data?.kind_data as libro;

      const libro: actividad_form<"libro"> = {
        ...act
        , libro: {
            aceptado: info?.aceptado || false
          , ciudad: info?.ciudad || ''
          , editorial: info?.editorial || ''
          , fecha: init_date(info?.fecha)
          , isbn: info?.isbn || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return libro;

    case "memoria":
      info = data?.kind_data as memoria;

      const memoria: actividad_form<"memoria"> = {
        ...act
        , memoria: {
            ciudad: info?.ciudad || ''
          , con_estudiantes: info?.con_estudiantes || false
          , congreso: info?.congreso || ''
          , fecha: init_date(info?.fecha)
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
      info = data?.kind_data as partitura;

      const partitura: actividad_form<"partitura"> = {
        ...act
        , partitura: {
            categoria: info?.categoria || "CD_Completo_Internacional"
          , deposito_legal: info?.deposito_legal || null
          , editorial: info?.editorial || ''
          , fecha: init_date(info?.fecha)
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || null
          , nacional: info?.nacional || false
        }
      };

      return partitura;

    case "patente":
      info = data?.kind_data as patente;

      const patente: actividad_form<"patente"> = {
        ...act
        , patente: {
            fecha_fin: init_date(info?.fecha_fin)
          , fecha_inicio: init_date(info?.fecha_inicio)
          , numero: info?.numero || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return patente;

    case "premio":
      info = data?.kind_data as premio;

      const premio: actividad_form<"premio"> = {
        ...act
        , premio: {
            fecha: init_date(info?.fecha)
          , institucion: info?.institucion || ''
        }
      };

      return premio;

    case "premio_bienal":
      info = data?.kind_data as premio_bienal;

      const premio_bienal: actividad_form<"premio_bienal"> = {
        ...act
        , premio_bienal: {
            categoria: info?.categoria || ''
          , ciudad: info?.ciudad || ''
          , fecha: init_date(info?.fecha)
          , financiado_por: info?.financiado_por || null
          , nombre_evento: info?.nombre_evento || ''
          , organizado_por: info?.organizado_por || null
          , pais: info?.pais || "Venezuela"
          , titulo_premio: info?.titulo_premio || ''
        }
      };

      return premio_bienal;

    case "proyecto_grado":
      info = data?.kind_data as proyecto_grado;

      const proyecto_grado: actividad_form<"proyecto_grado"> = {
        ...act
        , proyecto_grado: {
            coordinacion_academica: info?.coordinacion_academica || ''
          , fecha_defensa: init_date(info?.fecha_defensa)
          , nivel_academico: info?.nivel_academico || "Doctorado"
          , titulo_academico: info?.titulo_academico || ''
        }
      };

      return proyecto_grado;

    case "proyecto_investigacion":
      info = data?.kind_data as proyecto_investigacion;

      const proyecto_investigacion: actividad_form<"proyecto_investigacion"> = {
        ...act
        , proyecto_investigacion: {
            fecha_inicio: init_date(info?.fecha_inicio)
          , institucion: info?.institucion || "Fonacit"
          , meses_duracion: info?.meses_duracion || 1
          , moneda: info?.moneda || "Bs."
          , monto: info?.monto || '1'
        }
      };

      return proyecto_investigacion;

    case "recital":
      info = data?.kind_data as recital;

      const recital: actividad_form<"recital"> = {
        ...act
        , recital: {
            ciudad: info?.ciudad || ''
          , fecha_evento: init_date(info?.fecha_evento)
          , financiado_por: info?.financiado_por || null
          , jurado: info?.jurado || ''
          , nombre_evento: info?.nombre_evento || ''
          , pais: info?.pais || "Venezuela"
        }
      };

      return recital;
  };
};
