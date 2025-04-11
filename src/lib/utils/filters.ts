import type { Activity } from "$lib/types/activities";

import { format_date } from "./formatting";
import { map_to_detailed_kind } from "./mappings";


/**
 * 
 * @param activities -
 * @param kind -
 * @param start_date -
 * @param end_date -
 * @param start_pagination -
 * @param end_pagination -
 * @param by_group -
 * @param show_invalid -
 * @returns Filtered activites
 */
export const filter_activities = function (
  activities: Activity[],
  kind: string,
  start_date: string,
  end_date: string,
): Activity[] {

  let aa = activities;
  const date_att = function(act: Activity) {
    switch (act.kind_name) {
      case "articulo_revista": return "fecha_publicacion";
      case "capitulo_libro":
      case "composicion":
      case "evento":
      case "exposicion":
      case "grabacion":
      case "libro":
      case "memoria":
      case "partitura":
      case "premio":
      case "premio_bienal": return "fecha";
      case "informe_tecnico":
      case "patente":
      case "proyecto_investigacion": return "fecha_inicio";
      case "proyecto_grado": return "fecha_defensa";
      case "recital": return "fecha_evento";
      default: return "fecha_creacion"
    };
  };
  
  if (kind !== '') {
    aa = aa.filter(a => (map_to_detailed_kind(a.kind_name, a.kind_data) === kind));
  };

  if (start_date !== '' && end_date !== '') {

    aa = aa.filter(a => {
      const att = date_att(a);
      const date = format_date(a.kind_data[att] || a[att], "yyyy-MM-dd");
      return start_date <= date && date <= end_date
    });
  } else if (start_date !== '' && end_date === '') {

    aa = aa.filter(a => {
      const att = date_att(a);
      const date = format_date(a.kind_data[att] || a[att], "yyyy-MM-dd");
      return start_date <= date
    });
  } else if (start_date === '' && end_date !== '') {
    
    aa = aa.filter(a => {
      const att = date_att(a);
      const date = format_date(a.kind_data[att] || a[att], "yyyy-MM-dd");
      return date <= end_date
    });
  };

  return aa;
};
