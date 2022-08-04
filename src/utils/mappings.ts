import type { ActivityKind } from "$types/db/activities";
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
export const map_to_detailed_kind = function (kind: string, act: ActivityKind): string {

  // 'act_info' can't be 'undefined' because its verified in the parent
  // TODO: make typescript know that's not 'undefined'

  switch (kind) {
    case "articulo_revista":
      const _act_kind = act as articulo_revista

      const indexes = ["SCI", "SSCI", "SCIENCE CITATION INDEX", "SOCIAL SCIENCES CITATION INDEX"];
      const is_indexed = function (): boolean {
        return indexes.some(i => {
          const index = _act_kind.indice;
          if (index) {
            return index.toUpperCase().includes(i)
          };
          return false;
        })
      };

      if (is_indexed()) {
        return "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"

      } else if (_act_kind.indice && _act_kind.estado === "Publicado") {
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

    case "capitulo_libro":
      return "Publicaciones de Capotulos de Libros";

    case "composicion":
      return "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas";

    case "evento":
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

    case "exposicion":
      return "Seleccion en Exposiciones, Bienales, Salones o Concursos Arbitrados";

    case "grabacion":
      return "Grabaciones Sonoras Evaluadas Por Arbitros";

    case "informe_tecnico":
      return "Informes Tecnicos";

    case "libro":
      if (act.pais === "Venezuela") {
        return "Libro Nacional"

      } else if (act.pais !== "Venezuela") {
        return "Libro Internacional"

      } else {
        return "Publicaciones de Libros"
      }

    case "memoria":
      return "Memorias *Arbitradas* de Congresos";

    case "partitura":
      return "Partituras, Video o CD's Publicados en Editoriales Reconocidas";

    case "patente":
      if (act.pais === "Venezuela") {
        return "Patentes Nacional"

      } else if (act.pais !== "Venezuela") {
        return "Patentes Internacional"

      } else {
        return "Patentes"
      }

    case "premio":
      return "Premios";

    case "premio_bienal":
      return "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones";

    case "proyecto_grado":
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

    case "proyecto_investigacion":

      const start = new Date(act.fecha_inicio);
      start.setMonth(start.getMonth() + act.meses_duracion);
      const is_active = start >= new Date();

      if (is_active) {
        return "Proyectos de IYD (Vigentes)";

      } else {
        return "Proyectos de IYD";
      }

    case "recital":
      return "Recitales o Conciertos Arbitrados";

    default:
      return "ACTIVIDAD INVALIDA";
  }
};

