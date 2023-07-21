import type { ActivitiesCounts } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { group_by, acts_kinds_by_year } from "$lib/utils/grouping";

/**
 * Count kinds of activities by year
 * 
 * @param {Activity[]} acts - Activities
 * @param {boolean} detailed - Detailed kind
 * @returns Activities by kind with count
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
 * @param {Activity[]} acts - Activities
 * @param {boolean} detailed - Detailed kind
 * @returns Count of each activity kind
 */
export const count_acts_kinds = function (acts: Activity[], detailed?: boolean): { count: number }[] {

  const kinds = [
    "ACTIVIDAD INVALIDA"
    , "Publicaciones en Revistas Indexadas en el SCI-SSCI-ARTS"
    , "Publicaciones en Revistas Indexadas en Otros Indices"
    , "Publicaciones en Revistas Arbitradas No Indexadas"
    , "Articulos Aceptados en Vías de Publicación"
    , "Publicaciones en Revistas Arbitradas"
    , "Publicaciones de Capítulos de Libros"
    , "Composiciones Solicitadas por Orquestas Sinfónicas o Agrupaciones Reconocidas"
    , "Asistencia a Eventos Internacionales"
    , "Asistencia a Eventos Nacionales"
    , "Eventos en Venezuela"
    , "Eventos en el Exterior"
    , "Eventos"
    , "Selección en Exposiciones, Bienales, Salones o Concursos Arbitrados"
    , "Grabaciones Sonoras Evaluadas Por Árbitros"
    , "Informes Técnicos"
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
    , "Tutoría de Tesis Doctorales"
    , "Tutoría de Trabajos de Grado (Mestrías)"
    , "Tutoría de Proyectos de Grado (Especializaciones)"
    , "Proyectos de Grado (Postgrados)"
    , "Tutoría de Proyectos de Grado (Licencituras)"
    , "Tutoría de Proyectos de Grado (Ingenierias)"
    , "Proyectos de Grado (Pasantías Largas)"
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
