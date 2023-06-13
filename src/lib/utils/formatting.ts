import type { Activity } from "$lib/types/activities";
import type { ActivityActionLog } from "$lib/interfaces/logs";
import type { Group } from "$lib/interfaces/groups";

import { parse, isDate } from "date-fns";


/**
 * Formats the date to specified format
 *    - `long`: `Month` `yyyy` (default)
 *    - `long-day`: `dd` de `Month` del `yyyy`
 *    - `yyyy-MM-dd`
 *    - `time`: hours:minutes:seconds
 * 
 * Used to display the activity's description and current date
 * 
 * @param {Date | string} date - The date to format
 * @param {string} format - `long` (default), `yyyy-MM-dd`, `long-day`, `time`
 * @returns The formated date
 */
export const format_date = function (date: Date | string, format: string = "long"): string {

  const _date = typeof date === "string" ? new Date(date) : date;

  if (_date) {
    switch (format) {
      case "long-day":
        return _date.toLocaleDateString("es", { year: "numeric", month: "long", day: "2-digit" });
    
      case "yyyy-MM-dd":
        return _date.toLocaleDateString("fr-CA", { year: "numeric", month: "2-digit", day: "2-digit" });
    
      case "time":
        return _date.toLocaleTimeString("en-GB");
    
      default: // "long"
        return _date.toLocaleDateString("es", { year: "numeric", month: "long" });
    };
  };

  return "Por definir";
};

/**
 * Format the raw activity data into the actual data to display
 * 
 * @param activity - Raw activity data
 * @param logs - Log info, CRUD operations executed in activities by professors
 * @returns Activity data with groups, kinds and logs info
 */
export const format_activity_kind = function (activity: any, logs?: any): Activity {
  let kind_name = "ACTIVIDAD INVALIDA";
  let kind_data;

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
      kind_data = activity[_kind];
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
      user: l.Usuario.login,
      date: l.fecha,
      time: l.hora
    }));
  };

  delete activity["actividades_grupos"];

  const act: Activity = {
    ...activity,
    groups,
    kind_name,
    kind_data,
    actions_log
  };

  return act;
};


/**
 * Parse date to check for validation in activities forms
 * 
 * @param value Not used, needed for the function that uses this function
 * @param originalValue - Original date value
 * @returns Parsed date for validation in activities forms
 */
export const parse_date = function (value: any, originalValue: any) {
  const parsed_date = isDate(originalValue) || originalValue === null
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsed_date;
};
