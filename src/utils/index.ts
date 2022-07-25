import type { ActivityKind } from "$types/db/actividades";

/**
 * Format the date to 'Month year'
 * 
 * @param {Date | string} date - The date to format
 * @returns {string} The formated date in 'Month year'
 */
export const format_date = (date: Date | string): string => {
  
  const _date = typeof date === "string" ? new Date(date) : date;
  const month = _date.toLocaleDateString('es', { month: "long" });
  const year = _date.getFullYear();

  return month.charAt(0).toUpperCase() + month.slice(1) + ' ' + year.toString()
};

/**
 * Matches the kind of the activity with the display title.
 * for the display of the activities by year
 * 
 * @param {string} kind - The kind of the activity
 * @param {ActivityKind} act_kind - Activity kind info
 * @returns {string} The display title
 */
export const match_kind_to_title = (kind: string, act_kind: ActivityKind): string => {

  // 'act_info' can't be 'undefined' because its verified in the parent
  // TODO: make typescript know that's not 'undefined'

  switch (kind) {
    case "articulos_revistas":
    
      if ( ["SCI", "SSCI", "SCIENCE CITATION INDEX", "SOCIAL SCIENCES CITATION INDEX"].
            some(i => act_kind.indice.toUpperCase().includes(i)) ) {
        return "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
    
      } else if (act_kind.indice && act_kind.estado === "Publicado") {
        return "Publicaciones en Revistas Indexadas en Otros Indices"
      
      // TODO: No se sabe exactamente que condicion hace falta para diferenciarlo de la anterior.
      // En el codigo viejo al parecer solo se usa en 'sinai/evaluacion_gid.php', pero no hay
      // una clara distincion. No se puede agregar la verificacion del pais
      // } else if () {
      //   // indice is not null & estado=publicado & indice!=todos los anteriores
      //   return "Publicaciones en Revistas Indexadas en Otros Indices Internacional"
    
      } else if (!act_kind.indice && act_kind.estado === "Publicado") {
        return "Publicaciones en Revistas Arbitradas No Indexadas"
    
      } else if (act_kind.estado === "Aceptado en Vias de Publicacion") {
        return "Articulos Aceptados en Vías de Publicación"
    
      } else {
        return "Publicaciones en Revistas Arbitradas"
      }
  
    case "capitulos_libros":
      return "Publicaciones de Capotulos de Libros";
  
    case "composiciones":
      return "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas";
  
    case "eventos":
      if (act_kind.modalidad === "Invitada" && act_kind.pais === "Venezuela") {
        return "Asistencia a Eventos Nacionales"
        
      } else if (act_kind.modalidad === "Invitada" && act_kind.pais !== "Venezuela") {
        return "Asistencia a Eventos Internacionales"

      } else if (act_kind.pais === "Venezuela") {
        return "Eventos en Venezuela"
        
      } else if (act_kind.pais !== "Venezuela") {
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
      if (act_kind.pais === "Venezuela") {
        return "Libro Nacional"

      } else if (act_kind.pais !== "Venezuela") {
        return "Libro Internacional"

      } else {
        return "Publicaciones de Libros"
      }
  
    case "memorias":
      return "Memorias *Arbitradas* de Congresos";
  
    case "partituras":
      return "Partituras, Video o CD's Publicados en Editoriales Reconocidas";
  
    case "patentes":
      if (act_kind.pais === "Venezuela") {
        return "Patentes Nacional"

      } else if (act_kind.pais !== "Venezuela") {
        return "Patentes Internacional"

      } else {
        return "Patentes"
      }

    case "premios":
      return "Premios";
  
    case "premios_bienales":
      return "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones";
  
    case "proyectos_grado":
      if (act_kind.nivel_academico === "Doctorado") {
        return "Tutoria de Tesis Doctorales"

      } else if (act_kind.nivel_academico === "Maestria") {
        return "Tutoria de Trabajos de Grado (Maestrias)"

      } else if (act_kind.nivel_academico === "Especializacion") {
        return "Tutoria de Proyectos de Grado (Especializaciones)"

      } else if (act_kind.nivel_academico === "Postgrado") {
        return "Proyectos de Grado (Postgrados)"

      } else if (act_kind.nivel_academico === "Licencitura") {
        return "Tutoria de Proyectos de Grado (Licencituras)"

      } else if (act_kind.nivel_academico === "Ingenieria") {
        return "Tutoria de Proyectos de Grado (Ingenierias)"

      } else if (act_kind.nivel_academico === "Pasantia_Larga") {
        return "Proyectos de Grado (Pasantias Largas)"

      } else {
        return "Proyectos de Grado Dirigidos";
      }
  
    case "proyectos_investigacion":

      const start = new Date(act_kind.fecha_inicio);
      start.setMonth(start.getMonth() + act_kind.meses_duracion);
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
}
