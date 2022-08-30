import type { ActivitiesCounts } from "$interfaces/activities";
import type { Activity } from "$types/activities";

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
      const counts: number[] = []

      // count activities by year
      years.map(y => {
        if (!acts_by_year[y]) {
          counts.push(0);
        } else {
          counts.push(acts_by_year[y].length)
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
export const count_acts_kinds = function (acts: Activity[], detailed?: boolean): number[] {

  // TODO: global var
  const kinds = [
    "ACTIVIDAD INVALIDA"
    , "articulo_revista"
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
  const counts: number[] = [];

  // count activities by kind
  kinds.map(k => {
    if (!acts_by_kind[k]) {
      counts.push(0);
    } else {
      counts.push(acts_by_kind[k].length)
    };
  });

  return counts;
};
