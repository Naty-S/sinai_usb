import type { Actividad, ActivityKind } from "$types/db/actividades";
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
  recital
} from "@prisma/client";


/**
 * Distincts the kind of the activity by specific conditions
 * 
 * @param {string} kind - The kind of the activity
 * @param {ActivityKind} act - Activity kind info
 * @returns {string} The detailed kind
 */
export const get_detailed_kind = function(kind: string, act: ActivityKind): string {

  // 'act_info' can't be 'undefined' because its verified in the parent
  // TODO: make typescript know that's not 'undefined'

  switch (kind) {
    case "articulos_revistas":
      const _act_kind = act as articulo_revista

      if ( ["SCI", "SSCI", "SCIENCE CITATION INDEX", "SOCIAL SCIENCES CITATION INDEX"].
        some( i => _act_kind.indice.toUpperCase().includes(i) ) ) {
        return "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"

      } else if (act.indice && act.estado === "Publicado") {
        return "Publicaciones en Revistas Indexadas en Otros Indices"

        // TODO: No se sabe exactamente que condicion hace falta para diferenciarlo de la anterior.
        // En el codigo viejo al parecer solo se usa en 'sinai/evaluacion_gid.php', pero no hay
        // una clara distincion. No se puede agregar la verificacion del pais
        // } else if () {
        //   // indice is not null & estado=publicado & indice!=todos los anteriores
        //   return "Publicaciones en Revistas Indexadas en Otros Indices Internacional"

      } else if (!act.indice && act.estado === "Publicado") {
        return "Publicaciones en Revistas Arbitradas No Indexadas"

      } else if (act.estado === "Aceptado en Vias de Publicacion") {
        return "Articulos Aceptados en Vías de Publicación"

      } else {
        return "Publicaciones en Revistas Arbitradas"
      }

    case "capitulos_libros":
      return "Publicaciones de Capotulos de Libros";

    case "composiciones":
      return "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas";

    case "eventos":
      if (act.modalidad === "Invitada" && act.pais === "Venezuela") {
        return "Asistencia a Eventos Nacionales"

      } else if (act.modalidad === "Invitada" && act.pais !== "Venezuela") {
        return "Asistencia a Eventos Internacionales"

      } else if (act.pais === "Venezuela") {
        return "Eventos en Venezuela"

      } else if (act.pais !== "Venezuela") {
        return "Eventos en el Exterior"

      } else {
        return "Eventos";
      }

    case "exposiciones":
      return "Seleccion en Exposiciones, Bienales, Salones o Concursos Arbitrados";

    case "grabaciones":
      return "Grabaciones Sonoras Evaluadas Por Arbitros";

    case "informes_tecnicos":
      return "Informes Tecnicos";

    case "libros":
      if (act.pais === "Venezuela") {
        return "Libro Nacional"

      } else if (act.pais !== "Venezuela") {
        return "Libro Internacional"

      } else {
        return "Publicaciones de Libros"
      }

    case "memorias":
      return "Memorias *Arbitradas* de Congresos";

    case "partituras":
      return "Partituras, Video o CD's Publicados en Editoriales Reconocidas";

    case "patentes":
      if (act.pais === "Venezuela") {
        return "Patentes Nacional"

      } else if (act.pais !== "Venezuela") {
        return "Patentes Internacional"

      } else {
        return "Patentes"
      }

    case "premios":
      return "Premios";

    case "premios_bienales":
      return "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones";

    case "proyectos_grado":
      if (act.nivel_academico === "Doctorado") {
        return "Tutoria de Tesis Doctorales"

      } else if (act.nivel_academico === "Maestria") {
        return "Tutoria de Trabajos de Grado (Maestrias)"

      } else if (act.nivel_academico === "Especializacion") {
        return "Tutoria de Proyectos de Grado (Especializaciones)"

      } else if (act.nivel_academico === "Postgrado") {
        return "Proyectos de Grado (Postgrados)"

      } else if (act.nivel_academico === "Licencitura") {
        return "Tutoria de Proyectos de Grado (Licencituras)"

      } else if (act.nivel_academico === "Ingenieria") {
        return "Tutoria de Proyectos de Grado (Ingenierias)"

      } else if (act.nivel_academico === "Pasantia_Larga") {
        return "Proyectos de Grado (Pasantias Largas)"

      } else {
        return "Proyectos de Grado Dirigidos";
      }

    case "proyectos_investigacion":

      const start = new Date(act.fecha_inicio);
      start.setMonth(start.getMonth() + act.meses_duracion);
      const is_active = start >= new Date();

      if (is_active) {
        return "Proyectos de IYD (Vigentes)";

      } else {
        return "Proyectos de IYD";
      }

    case "recitales":
      return "Recitales o Conciertos Arbitrados";

    default:
      return "ERROR kind: " + JSON.stringify(kind);
  }
};

/**
 * Groups activities by the given prop.
 * Used to group by year or kind
 * 
 * @param {any} acts - The activities to group
 * @param {string} prop - The prop to group by
 * @returns {Record<string, any>} The activities grouped by the given prop
 */
export const group_by = function(prop: PropertyKey, acts: any): Record<string, any> {

  return acts.reduce((acc: any, obj: Actividad) => {
    let key = prop === "fecha_creacion" ? obj[prop].getFullYear()
                                        : get_detailed_kind(obj.kind_name, obj.kind_info)

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(obj)

    return acc
  }, {})
};
