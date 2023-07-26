import type { ActivitiesCounts } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { group_by, acts_kinds_by_year } from "$lib/utils/grouping";
import { detailed_kinds } from "$lib/constants";

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

  const acts_by_kind = group_by("kind_name", acts, detailed);
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
