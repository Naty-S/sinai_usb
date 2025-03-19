import type { GroupActivities, YearActivities } from "$lib/interfaces/activities";
import type { Activity } from "$lib/types/activities";

import { map_to_detailed_kind } from "$lib/utils/mappings";


/**
 * Groups activities by the given prop.
 * Used to group by year, group or kind
 * 
 * @param {any} acts - The activities to group
 * @param {string} prop - The prop to group by
 * @returns The activities grouped by the given prop
 */
export const group_by = function (
  prop: "fecha" | "groups" | "kind_name",
  acts: Activity[],
  detailed: boolean = true
): Record<string, any> {

  return acts.reduce((acc: any, act: Activity) => {
    
    let key: any;

    switch (prop) {
      case "fecha":
        let date = act.fecha_creacion;

        if (act.kind_data) {

          switch (act.kind_name) {
            case "articulo_revista":
              if (act.kind_data.fecha_publicacion) date = act.kind_data.fecha_publicacion;
              break;
            case "capitulo_libro":
            case "composicion":
            case "evento":
            case "exposicion":
            case "grabacion":
            case "libro":
            case "memoria":
            case "partitura":
            case "premio":
            case "premio_bienal": date = act.kind_data.fecha; break;
            case "informe_tecnico":
            case "patente":
            case "proyecto_investigacion": date = act.kind_data.fecha_inicio; break;
            case "proyecto_grado": date = act.kind_data.fecha_defensa; break;
            case "recital": date = act.kind_data.fecha_evento; break;
          };
        };

        key = new Date(date).getFullYear();
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
 * Group activities by kind, then by year.
 * 
 * @param acts - Activities
 * @param detailed - Detail activity's kind
 * @returns Kind activities grouped by year
*/
export const acts_kinds_by_year = function (
  acts: Activity[],
  show_invalid: boolean = true
): YearActivities[] {

  let a: Activity[] = acts.sort((a, b) => a.id - b.id);

  if (!show_invalid) {
    a = a.filter(a => a.kind_name !== "ACTIVIDAD INVÁLIDA")
  };

  const acts_group = Object.entries(group_by("fecha", a, false));
  const year_acts = acts_group.map(([_year, _acts]) => ({
      year: Number(_year)
    , kind_activities: group_by("kind_name", _acts)
  }));

  return year_acts;
};


/**
 * Group activities by kind, then by group.
 * 
 * @param acts - Activities
 * @param detailed - Detail activity's kind
 * @returns Kind activities grouped by group
*/
export const acts_kinds_by_group = function (
  acts: Activity[],
  show_invalid: boolean = true
): GroupActivities[] {

  let a: Activity[] = acts.sort((a, b) => a.id - b.id);

  if (!show_invalid) {
    a = a.filter(a => a.kind_name !== "ACTIVIDAD INVÁLIDA")
  };

  const acts_group = Object.entries(group_by("groups", a, false));
  const group_acts = acts_group.map(([_group, _acts]) => ({
      group: _group
    , kind_activities: group_by("kind_name", _acts)
  }));

  return group_acts;
};
