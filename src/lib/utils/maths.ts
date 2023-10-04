import type { ActivitiesCounts } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { group_by, acts_kinds_by_year } from "$lib/utils/grouping";
import { detailed_kinds } from "$lib/constants";

/**
 * Count kinds of activities by year
 * 
 * @param acts - Activities
 * @returns Activities by kind with count
 */
export const count_acts_kinds_by_year = function (
  acts: Activity[],
  show_invalid: boolean = true
): ActivitiesCounts[] {

  let a: Activity[] = acts.sort((a, b) =>
    new Date(a.fecha_creacion).getFullYear() - new Date(b.fecha_creacion).getFullYear()
  );

  if (!show_invalid) {
    a = a.filter(a => a.kind_name !== "ACTIVIDAD INVALIDA")
  };

  return Object.entries(group_by("kind_name", a))
    .map(([_kind, _acts]) => {

      const years = acts_kinds_by_year(a).map(a => a["year"]);
      const acts_by_year = group_by("fecha_creacion", _acts, false)
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
 * @param acts - Activities
 * @returns Count of each activity kind
 */
export const count_acts_kinds = function (acts: Activity[]): { count: number }[] {

  const acts_by_kind = group_by("kind_name", acts);
  const counts: { count: number }[] = [];

  // count activities by kind
  detailed_kinds.map(k => {
    if (!acts_by_kind[k]) {
      counts.push({ count: 0 });
    } else {
      counts.push({ count: acts_by_kind[k].length });
    };
  });

  return counts;
};
