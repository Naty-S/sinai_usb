import type { Activity } from "$lib/types/activities";
import type { ActivityActionLog } from "$lib/interfaces/logs";
import type { Group } from "$lib/interfaces/groups";

import { parse, isDate } from "date-fns";


/**
 * Formats the date to specified format
 *    - `Month` `yyyy` (default)
 *    - `dd` de `Month` del `yyyy`
 *    - yyyy-MM-dd
 * Used to display the activity's description and current date
 * 
 * @param {Date | string} date - The date to format
 * @param {string} format - 
 * @returns {string} The formated date
 */
export const format_date = function (date: Date | string, format: string = "long"): string {

  const _date = typeof date === "string" ? new Date(date) : date;

  if (_date) {
    switch (format) {
      case "long-day":
        return _date.toLocaleDateString("es", { year: "numeric", month: "long", day: "2-digit" });
    
      case "yyyy-MM-dd":
        return _date.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
    
      default: // "long"
        return _date.toLocaleDateString("es", { year: "numeric", month: "long" });
    };
  };

  return "Por definir";
};

/**
 * 
 * @param activity - 
 * @returns {Activity} - 
 */
export const format_activity_kind = function (activity: any, logs?: any): Activity {
  let kind_name = "ACTIVIDAD INVALIDA";
  let kind_info;

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

  // removes null's activities kinds
  kinds.map(kind => {
    const _kind = kind as keyof typeof activity ;
    
    if (!activity[_kind]) {
      delete activity[_kind];

    } else {
      kind_name = kind;
      kind_info = activity[_kind];
    };
  });

  const groups: Group[] = activity.actividades_grupos.map((g: any) => {
    return {
      id: g.Grupo.id,
      nombre: g.Grupo.nombre
    }
  });

  let actions_log: ActivityActionLog[] = [];

  if (logs?.length > 0) {
    actions_log = logs.map((l: any) => ({
      professor: l.Profesor.correo,
      date: l.fecha,
      time: l.hora
    }));
  };

  delete activity["actividades_grupos"];

  const act: Activity = {
    ...activity,
    groups,
    kind_name,
    kind_info,
    actions_log
  };

  return act;
};

export const parse_date = function (value: any, originalValue: any) {
  const parsed_date = isDate(originalValue) || originalValue === null
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsed_date;
};
