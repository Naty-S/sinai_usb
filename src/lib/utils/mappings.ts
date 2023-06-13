import type { ActivityKind } from "$lib/types/activities";
import type {
  articulo_revista,
  evento,
  libro,
  patente,
  proyecto_grado,
  proyecto_investigacion,
} from "@prisma/client";

/**
 * Distincts the kind of the activity by specific conditions
 * 
 * @param {string} kind - The kind of the activity
 * @param {ActivityKind} act - Activity kind info
 * @returns The detailed kind
 */
export const map_to_detailed_kind = function (kind: string, act: ActivityKind): string {

  if (act) {
    switch (kind) {
      case "articulo_revista":
        const _articulo_revista = act as articulo_revista;
  
        const indexes = ["SCI", "SSCI", "SCIENCE CITATION INDEX", "SOCIAL SCIENCES CITATION INDEX"];
        const is_indexed = function (): boolean {
          return indexes.some(i => {
            const index = _articulo_revista.indice;
            if (index) {
              return index.toUpperCase().includes(i)
            };
            return false;
          })
        };
  
        if (is_indexed()) {
          return "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
  
        } else if (_articulo_revista.indice && _articulo_revista.estado === "Publicado") {
          return "Publicaciones en Revistas Indexadas en Otros Indices"
  
          // TODO: No se sabe exactamente que condicion hace falta para diferenciarlo de la anterior.
          // En el codigo viejo al parecer solo se usa en 'sinai/evaluacion_gid.php', pero no hay
          // una clara distincion. No se puede agregar la verificacion del pais
          // } else if () {
          //   // indice is not null & estado=publicado & indice!=todos los anteriores
          //   return "Publicaciones en Revistas Indexadas en Otros Indices Internacional"
  
        } else if (!_articulo_revista.indice && _articulo_revista.estado === "Publicado") {
          return "Publicaciones en Revistas Arbitradas No Indexadas"
  
        } else if (_articulo_revista.estado as string === "Aceptado en Vias de Publicacion") {
          return "Articulos Aceptados en Vías de Publicación"
  
        } else {
          return "Publicaciones en Revistas Arbitradas"
        }
  
      case "capitulo_libro":
        return "Publicaciones de Capitulos de Libros";
  
      case "composicion":
        return "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas";
  
      case "evento":
        const _evento = act as evento;

        if (_evento.modalidad === "Invitada" && _evento.pais === "Venezuela") {
          return "Asistencia a Eventos Nacionales"
  
        } else if (_evento.modalidad === "Invitada" && _evento.pais !== "Venezuela") {
          return "Asistencia a Eventos Internacionales"
  
        } else if (_evento.pais === "Venezuela") {
          return "Eventos en Venezuela"
  
        } else if (_evento.pais !== "Venezuela") {
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
        const _libro = act as libro;

        if (_libro.pais === "Venezuela") {
          return "Libro Nacional"
  
        } else if (_libro.pais !== "Venezuela") {
          return "Libro Internacional"
  
        } else {
          return "Publicaciones de Libros"
        }
  
      case "memoria":
        return "Memorias *Arbitradas* de Congresos";
  
      case "partitura":
        return "Partituras, Video o CD's Publicados en Editoriales Reconocidas";
  
      case "patente":
        const _patente = act as patente;

        if (_patente.pais === "Venezuela") {
          return "Patentes Nacional"
  
        } else if (_patente.pais !== "Venezuela") {
          return "Patentes Internacional"
  
        } else {
          return "Patentes"
        }
  
      case "premio":
        return "Premios";
  
      case "premio_bienal":
        return "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones";
  
      case "proyecto_grado":
        const _proyecto_grado = act as proyecto_grado;

        if (_proyecto_grado.nivel_academico === "Doctorado") {
          return "Tutoria de Tesis Doctorales"
  
        } else if (_proyecto_grado.nivel_academico === "Maestria") {
          return "Tutoria de Trabajos de Grado (Maestrias)"
  
        } else if (_proyecto_grado.nivel_academico === "Especializacion") {
          return "Tutoria de Proyectos de Grado (Especializaciones)"
  
        } else if (_proyecto_grado.nivel_academico === "Postgrado") {
          return "Proyectos de Grado (Postgrados)"
  
        } else if (_proyecto_grado.nivel_academico === "Licencitura") {
          return "Tutoria de Proyectos de Grado (Licencituras)"
  
        } else if (_proyecto_grado.nivel_academico === "Ingenieria") {
          return "Tutoria de Proyectos de Grado (Ingenierias)"
  
        } else if (_proyecto_grado.nivel_academico === "Pasantia_Larga") {
          return "Proyectos de Grado (Pasantias Largas)"
  
        } else {
          return "Proyectos de Grado Dirigidos";
        }
  
      case "proyecto_investigacion":
        const _proyecto_investigacion = act as proyecto_investigacion;

        const start = new Date(_proyecto_investigacion.fecha_inicio);
        start.setMonth(start.getMonth() + _proyecto_investigacion.meses_duracion);
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
    };
  } else {
    return "ACTIVIDAD INVALIDA";
  }
};

