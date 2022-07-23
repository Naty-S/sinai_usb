/**
 * Format the date to 'Month year'
 * 
 * @param {Date | string} date - The date to format
 * @returns {string} The formated date in 'Month year'
 */
export const format_date: (date: Date | string) => string = (date: Date | string) => {
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
 * @returns {string} The display title
 */
export const match_kind_to_title: (kind: string) => string = (kind: string) => {

  switch (kind) {
    case "articulos_revistas":
      /* switch (key) {
        case value:
          // indice=SCI or SSCI or SCIENCE CITATION INDEX or SOCIAL SCIENCES CITATION INDEX
          return "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
      
        case value:
          // indice is not null & estado=publicado & indice!=todos los anteriores
          return "Publicaciones en Revistas Indexadas en Otros Indices Internacional"
      
        case value:
          // indice is not null & estado=publicado & indice!=todos los anteriores & otra cosa
          return "Publicaciones en Revistas Indexadas en Otros Indices"
      
        case value:
          // indice is not null & estado=publicado
          return "Publicaciones en Revistas Arbitradas No Indexadas"
      
        case value:
          // estado=Aceptado en Vías de Publicación
          return "Articulos Aceptados en Vias de Publicacion"
      
        default:
          return "Publicaciones en Revistas Arbitradas"
      } */
      return "Publicaciones en Revistas Arbitradas"
  
    case "capitulos_libros":
      return "Publicaciones de Capotulos de Libros";
  
    case "composiciones":
      return "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas";
  
    case "eventos":
      return "EVENTOS";
  
    case "exposiciones":
      return "Seleccion en Exposiciones, Bienales, Salones o Concursos Arbitrados";
  
    case "grabaciones":
      return "Grabaciones Sonoras Evaluadas Por Arbitros";
  
    case "informes_tecnicos":
      return "Informes Tecnicos";
  
    case "libros":
      /* switch (key) {
        case value:
          return "Libro Nacional"
      
        case value:
          return "Libro Internacional"
      
        case value:
          return "Publicaciones de Libros"
      
        default:
          return "LIBROS"
      } */
      return "LIBROS"
  
    case "memorias":
      return "MEMORIAS";
  
    case "partituras":
      return "Partituras, Video o CD's Publicados en Editoriales Reconocidas";
  
    case "patentes":
      return "PATENTES";
  
    case "premios":
      return "Premios";
  
    case "premios_bienales":
      return "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones";
  
    case "proyectos_grado":
      return "PROYECTOS_GRADO";
  
    case "proyectos_investigacion":
      return "PROYECTOS_INVESTIGACION";
  
    case "recitales":
      return "Recitales o Conciertos Arbitrados";
  
    default:
      return "ERROR kind: " + JSON.stringify(kind);
  }
}
