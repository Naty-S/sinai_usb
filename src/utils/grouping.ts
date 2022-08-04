import type { Activity, YearActivities, ActivitiesCounts } from "$types/db/activities";
import { map_to_detailed_kind } from "$utils/mappings";

/**
 * Groups activities by the given prop.
 * Used to group by year or kind
 * 
 * @param {any} acts - The activities to group
 * @param {string} prop - The prop to group by
 * @returns {Record<string, any>} The activities grouped by the given prop
 */
export const group_by = function (prop: string, acts: Activity[], detailed?: boolean): Record<string, any> {
  
  return acts.reduce((acc: any, act: Activity) => {
    
    const _prop = prop as keyof Activity;
    const kind = detailed ? map_to_detailed_kind(act.kind_name, act.kind_info) : act[_prop];
    const key = prop === "fecha_creacion" ? new Date(act[prop]).getFullYear() : kind as keyof typeof acc;

    if (!acc[key]) {
      acc[key] = []
    }

    acc[key].push(act)

    return acc
  }, {})
};

// group kinds of activities by year
export const acts_kinds_by_year = function (acts: Activity[], detailed?: boolean): YearActivities[] {

  return Object.entries(group_by("fecha_creacion", acts))
    .map(([_year, _acts]) => {
      return {
        year: _year,
        acts: group_by("kind_name", _acts, detailed)
      };
    });
}

// count kinds of activities by year
export const acts_years_counts = function (acts: Activity[], detailed?: boolean): ActivitiesCounts[] {
  
  return Object.entries(group_by("kind_name", acts, detailed))
    .map(([_kind, _acts]) => {

      const years = acts_kinds_by_year(acts, detailed).map(a => a["year"]);
      const acts_by_year = group_by("fecha_creacion", _acts)
      const counts: number[] = []

      // fill empty years without activities
      years.map(y => {
        if (!acts_by_year[y]) {
          acts_by_year[y] = [];
        };
      });

      // count activities by year
      Object.entries(acts_by_year).map( ([_, arr]) => counts.push(arr.length) );

      return {
        kind: _kind,
        counts: counts
      };
    });
};

export const acts_kinds_counts = function (acts: Activity[], detailed?: boolean): number[] {

  const kinds = [
    "articulo_revista"
    , "capitulo_libro"
    , "composicion"
    , "evento"
    , "exposicion"
    , "grabacion"
    , "informe_tecnico"
    , "libro"
    , "memoria"
    , "partitura"
    , "patente"
    , "premio"
    , "premio_bienal"
    , "proyecto_grado"
    , "proyecto_investigacion"
    , "recital"
  ];
  const acts_by_kind = group_by("kind_name", acts, detailed);
  const counts: number[] = []

  // fill empty kinds without activities
  kinds.map(k => {
    if (!acts_by_kind[k]) {
      acts_by_kind[k] = [];
    };
  });

  // count activities by kind
  Object.entries(acts_by_kind).map(([_, arr]) => counts.push(arr.length));

  return counts;
};
