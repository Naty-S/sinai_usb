import type { GroupActivities, YearActivities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { map_to_detailed_kind } from "$lib/utils/mappings";
import { ve_date } from "./formatting";


/**
 * 
 * @param acts 
 * @returns 
 */
const sort_by_date = function (acts: Activity[]): Activity[] {

  return acts.sort((a, b) => {

    let date_a = a.fecha_creacion;
    let date_b = b.fecha_creacion;

    if (a.kind_data) {
      switch (a.kind_name) {
        case "articulo_revista":
          if (a.kind_data.fecha_publicacion) date_a = a.kind_data.fecha_publicacion;
          break;
        case "informe_tecnico":
        case "patente":
        case "proyecto_investigacion": date_a = a.kind_data.fecha_inicio; break;
        case "proyecto_grado": date_a = a.kind_data.fecha_defensa; break;
        case "recital": date_a = a.kind_data.fecha_evento; break;
        default: date_a = a.kind_data.fecha; break;
      };
    };

    if (b.kind_data) {
      switch (b.kind_name) {
        case "articulo_revista":
          if (a.kind_data.fecha_publicacion) date_b = b.kind_data.fecha_publicacion;
          break;
        case "informe_tecnico":
        case "patente":
        case "proyecto_investigacion": date_b = b.kind_data.fecha_inicio; break;
        case "proyecto_grado": date_b = b.kind_data.fecha_defensa; break;
        case "recital": date_b = b.kind_data.fecha_evento; break;
        default: date_b = b.kind_data.fecha; break;
      };
    };

    if (date_a < date_b) return -1;
    else if (date_a == date_b) return 0;
    else return 1;
  });
};


/**
 * Groups activities by the given prop.
 * Used to group by year, group or kind
 * 
 * @param {Activity[]} acts - The activities to group
 * @param {"fecha" | "groups" | "kind_name"} prop - The prop to group by
 * @param {boolean} - 
 * @returns The activities grouped by the given prop
 */
export const group_by = function (
  prop: "fecha" | "groups" | "kind_name",
  acts: Activity[],
  detailed: boolean = true
): Record<string, Activity[]> {

  return acts.reduce((acc: Record<string, Activity[]>, act: Activity, i) => {
    
    let key: any;

    switch (prop) {
      case "fecha":
        let date = act.fecha_creacion;

        if (act.kind_data) {

          switch (act.kind_name) {
            case "articulo_revista":
              if (act.kind_data.fecha_publicacion) date = act.kind_data.fecha_publicacion;
              break;
            case "informe_tecnico":
            case "patente":
            case "proyecto_investigacion": date = act.kind_data.fecha_inicio; break;
            case "proyecto_grado": date = act.kind_data.fecha_defensa; break;
            case "recital": date = act.kind_data.fecha_evento; break;
            default: date = act.kind_data.fecha; break;
          };
        };
        key = ve_date(date).year; // year
        break;
    
      case "groups": // take first
        key = act.groups[0]?.nombre;
        break;
    
      default: // "kind_name"
        const kind = detailed ? map_to_detailed_kind(act.kind_name, act.kind_data) : act["kind_name"];
        key = kind as keyof typeof acc
        break;
    }
    
    if (!acc[key]) { acc[key] = [] };
    
    acc[key].push(act);

    return acc;
  }, {});
};


/**
 * Group activities by kind, then by property.
 * 
 * @param acts - Activities
 * @param detailed - Detail activity's kind
 * @returns Kind activities grouped by property
*/
export const acts_kinds_by_prop = function (
  acts: Activity[],
  show_invalid: boolean = true,
  prop: "fecha" | "groups" = "fecha"
): YearActivities[] | GroupActivities[] {

  let a: Activity[] = sort_by_date(acts);

  if (!show_invalid) a = a.filter(a => a.kind_name !== "ACTIVIDAD INVÁLIDA");

  const acts_group = Object.entries(group_by(prop, a, false));

  if (prop == "fecha") {

    return acts_group.map(([_year, _acts]) => ({
        year: Number(_year)
      , kind_activities: group_by("kind_name", _acts)
    }));
  } else {

    return acts_group.map(([_group, _acts]) => ({
      group: _group
      , kind_activities: group_by("kind_name", _acts)
    }));
  };
};


/**
 * 
 * @param acts 
 * @param size 
 * @param show_invalid 
 * @param group 
 * @returns 
 */
export const paginate = function (
  acts: Activity[],
  size: number,
  show_invalid: boolean = true,
  group: "fecha" | "groups" = "fecha"
): YearActivities[][] | GroupActivities[][] {

  let a: Activity[] = sort_by_date(acts);

  if (!show_invalid) a = a.filter(a => a.kind_name !== "ACTIVIDAD INVÁLIDA");

  const paginated_acts: Activity[][] = a.reduce((acc: Activity[][], val, i) => {
    let idx = Math.floor(i / size);
    let page: Activity[] = acc[idx] || (acc[idx] = []);
    
    page.push(val);
    
    return acc;
  }, []);

  return paginated_acts.map(a => {

    const acts_group = Object.entries(group_by(group, a, false));
    const year_acts = acts_group.map(([_year, _acts]) => ({
        year: Number(_year)
      , kind_activities: group_by("kind_name", _acts)
    }));

    return year_acts;
  });
};
