import type { YearActivities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { format_date } from "./formatting";
import { acts_kinds_by_year } from "./grouping";
import { map_to_detailed_kind } from "./mappings";


/**
 * 
 * @param activities -
 * @param kind -
 * @param start_date -
 * @param end_date -
 * @param start_pagination -
 * @param end_pagination -
 * @param show_invalid -
 * @returns Filtered and paginated activites by year
 */
export const filter_activities = function (
  activities: Activity[],
  kind: string,
  start_date: string,
  end_date: string,
  start_pagination: number,
  end_pagination: number,
  show_invalid: boolean = true
): YearActivities[] {

  let aa = activities;
  
  if (kind !== '') {
    aa = aa.filter(a => (map_to_detailed_kind(a.kind_name, a.kind_data) === kind));
  };

  if (start_date !== '' && end_date !== '') {

    aa = aa.filter(a => {
      const date = format_date(a.fecha_creacion, "yyyy-MM-dd");
      return start_date <= date && date <= end_date
    });
  } else if (start_date !== '' && end_date === '') {

    aa = aa.filter(a => {
      const date = format_date(a.fecha_creacion, "yyyy-MM-dd");
      return start_date <= date
    });
  } else if (start_date === '' && end_date !== '') {
    
    aa = aa.filter(a => {
      const date = format_date(a.fecha_creacion, "yyyy-MM-dd");
      return date <= end_date
    });
  };

  return acts_kinds_by_year(aa.slice(start_pagination, end_pagination), show_invalid);
};
