import type { Activity, Actividad } from "$lib/types/activities";
import type { Group } from "$lib/interfaces/groups";
import type { ActivityLog } from "$lib/interfaces/logs";

import { parse, isDate } from "date-fns";
import { DateTime } from "luxon";

import { kinds } from "$lib/constants";


/**
 * Creates or convert a date into VE timezone.
 * 
 * @param date - (optional) date to convert
 * @returns Date in VE timezone
 */
export const ve_date = function (date?: Date | string | null): DateTime {
  
  if (date) {

    if (typeof date === "string") {
      return DateTime.fromISO(date.slice(0, date.length - 2), {zone: "America/Caracas"});
    } else {
      return DateTime.fromJSDate(date, {zone: "America/Caracas"});
    }
  };

  return DateTime.fromJSDate(new Date(), {zone: "America/Caracas"});
};


/**
 * Formats the date to specified format
 *    - `long`: `Month` `yyyy` (default)
 *    - `long-day`: `dd` de `Month` del `yyyy`
 *    - `yyyy-MM-dd`
 *    - `time`: `hours`:`minutes`:`seconds`
 * 
 * Used to display the activity's description and current date
 * 
 * @param date - The date to format
 * @param format - `long` (default), `yyyy-MM-dd`, `long-day`, `time`
 * @returns The formated date
 */
export const format_date = function (date: Date | string | null, format: string = "long")
: string {

  const _date = ve_date(date);

  if (_date) {
    switch (format) {

      case "long-day":
        return _date.toFormat("dd 'de' MMMM 'del' yyyy", { locale: "es" });
    
      case "yyyy-MM-dd": // to format date picker inputs
        return _date.toFormat("yyyy-MM-dd");;
    
      case "time": // for activities logs
        return _date.toFormat("tt");
    
      default: // "long"
        return _date.toFormat("MMMM yyyy", { locale: "es" });
    };
  };

  return "Por definir";
};

/**
 * Format the raw activity data into the actual data to display in client.
 * 
 * @param actividad - Raw activity data
 * @param logs - Log info
 * @returns Activity data with kind data, groups, and logs
 */
export const format_activity = function (actividad: Actividad, logs: ActivityLog[] = [])
: Activity {

  let kind_name = "ACTIVIDAD INVALIDA";
  let kind_data;

  // Find kind data
  kinds.map(kind => {
    
    const _kind = kind as keyof typeof actividad ;
    const _kind_data = actividad[_kind];
    
    if (!_kind_data) { delete actividad[_kind]; /* console.log("no data:",actividad) */}
    else {
      kind_name = kind;
      kind_data = _kind_data;
    };
  });

  const groups: Group[] = actividad.actividades_grupos.map((g: any) => ({
    id: g.Grupo.id,
    nombre: g.Grupo.nombre
  }));

  // Omit "actividades_grupos"
  const { actividades_grupos, ..._actividad } = actividad;

  const activity: Activity = {
    ..._actividad
    , kind_name
    , kind_data
    , groups
    , logs: logs.filter(l => l.actividad === actividad.id).sort((a, b) => b.id - a.id)
  };

  return activity;
};


/**
 * Parse date to check for validation in activities forms.
 * 
 * @param value Not used, needed for the function that uses this function.
 * @param originalValue - Original date value.
 * @returns Parsed date for validation.
 */
export const parse_date = function (value: any, originalValue: any) {
  const parsed_date = isDate(originalValue) || originalValue === null
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());

  return parsed_date;
};
