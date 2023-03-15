import type { ActivitiesCounts } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { group_by, acts_kinds_by_year } from "$utils/grouping";

/**
 * count kinds of activities by year
 * 
 * @param acts 
 * @param detailed 
 * @returns 
 */
export const count_acts_kinds_by_year = function (acts: Activity[], detailed?: boolean): ActivitiesCounts[] {

  return Object.entries(group_by("kind_name", acts, detailed))
    .map(([_kind, _acts]) => {

      const years = acts_kinds_by_year(acts, detailed).map(a => a["year"]);
      const acts_by_year = group_by("fecha_creacion", _acts)
      const counts: { count: number, year: number }[] = []

      // count activities by year
      years.map(y => {
        if (!acts_by_year[y]) {
          counts.push({ count: 0, year: Number(y) });
        } else {
          counts.push({ count: acts_by_year[y].length, year: Number(y) });
        };
      });

      return {
        kind: _kind,
        counts: counts
      };
    });
};

/**
 * Count activities kinds
 * 
 * @param acts 
 * @param detailed 
 * @returns 
 */
export const count_acts_kinds = function (acts: Activity[], detailed?: boolean): { count: number }[] {

  // TODO: global var
  const kinds = [
    "ACTIVIDAD INVALIDA"
    , "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
    , "Publicaciones en Revistas Indexadas en Otros Indices"
    , "Publicaciones en Revistas Arbitradas No Indexadas"
    , "Articulos Aceptados en Vías de Publicación"
    , "Publicaciones en Revistas Arbitradas"
    , "Publicaciones de Capitulos de Libros"
    , "Composiciones Solicitadas por Orquestas Sinfonicas o Agrupaciones Reconocidas"
    , "Asistencia a Eventos Internacionales"
    , "Asistencia a Eventos Nacionales"
    , "Eventos en Venezuela"
    , "Eventos en el Exterior"
    , "Eventos"
    , "Seleccion en Exposiciones, Bienales, Salones o Concursos Arbitrados"
    , "Grabaciones Sonoras Evaluadas Por Arbitros"
    , "Informes Tecnicos"
    , "Libro Nacional"
    , "Libro Internacional"
    , "Publicaciones de Libros"
    , "Memorias *Arbitradas* de Congresos"
    , "Partituras, Video o CD's Publicados en Editoriales Reconocidas"
    , "Patentes Nacional"
    , "Patentes Internacional"
    , "Patentes"
    , "Premios"
    , "Trabajos Reconocidos o Premiados En Bienales, Salones, Concursos o Exposiciones"
    , "Tutoria de Tesis Doctorales"
    , "Tutoria de Trabajos de Grado (Maestrias)"
    , "Tutoria de Proyectos de Grado (Especializaciones)"
    , "Proyectos de Grado (Postgrados)"
    , "Tutoria de Proyectos de Grado (Licencituras)"
    , "Tutoria de Proyectos de Grado (Ingenierias)"
    , "Proyectos de Grado (Pasantias Largas)"
    , "Proyectos de Grado Dirigidos"
    , "Proyectos de IYD (Vigentes)"
    , "Proyectos de IYD"
    , "Recitales o Conciertos Arbitrados"
  ];
  const acts_by_kind = group_by("kind_name", acts, detailed);
  const counts: { count: number }[] = [];

  // count activities by kind
  kinds.map(k => {
    if (!acts_by_kind[k]) {
      counts.push({ count: 0 });
    } else {
      counts.push({ count: acts_by_kind[k].length });
    };
  });

  return counts;
};
