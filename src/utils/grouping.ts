import type { YearActivities } from "$interfaces/activities";
import type { Activity } from "$lib/types/activities";

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
    };

    acc[key].push(act);

    return acc;
  }, {});
};


// group kinds of activities by year
export const acts_kinds_by_year = function (acts: Activity[], detailed?: boolean): YearActivities[] {

  const acts_group = Object.entries(group_by("fecha_creacion", acts));
  const year_acts = acts_group.map(([_year, _acts]) => (
    {
      year: Number(_year),
      kind_activities: group_by("kind_name", _acts, detailed)
    }
  ));

  return year_acts.reverse();
};
