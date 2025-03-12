import type { Activity, Actividad } from "$lib/types/activities";
import type { Group, GroupE } from "$lib/interfaces/groups";
import type { ActivityLog } from "$lib/interfaces/logs";

import { parse, isDate } from "date-fns";
import { DateTime } from "luxon";

import { kinds } from "$lib/constants";
import { Activities } from "$lib/interfaces/activities";
import { Profesor } from "$lib/interfaces/professors";
import { Division } from "$lib/interfaces/divisions";
import { Department } from "$lib/interfaces/departments";


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
 * @param filters - filter kind info
 * @returns Activity data with kind data, groups, and logs
 */
export const format_activity = function (actividad: Actividad, logs: ActivityLog[] = [], filters?: any)
: Activity {

  let kind_name = "ACTIVIDAD INVÁLIDA";
  let kind_data;
  let _kinds = kinds;

  if (filters) { _kinds = kinds.filter(kind => filters[kind]) };

  // Find kind data
  _kinds.map(kind => {
    const _kind = kind as keyof typeof actividad ;
    const _kind_data = actividad[_kind];

    
    if (!_kind_data) { delete actividad[_kind]; }
    // con select algunas las toma como invalidas, si lo pongo en un solo if antes o despues de todo
    // solo me mostrará el ultimo seleccionado, y si pongo como condicion 'filters' al select all no me muestra nada
    else if ( _kinds.length != kinds.length && !_kind_data ) { kind_name = "FILTER" }
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
    , logs
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


/**
 * Initialize the date so it can be displayed in the form
 * 
 * @param date - Date to initialize for display in form
 * @returns Date with format accepted to be displayed in the form
 */
export const init_date = function (date?: Date): Date {
  return date ? format_date(date, "yyyy-MM-dd") as unknown as Date : new Date("yyyy-MM-dd");
};


/**
 * 
 * @param activities - 
 * @param professors_activities - 
 * 
 * @returns 
 */
export const department_rank_activities = function (activities: Activities, profesores: Profesor[], id: string)
: Activities[] {

  const activitys = activities.activities;
  const acts_owners = activitys.map(a => a.creada_por);
  const professors = profesores.filter(p => p.departamento === Number(id));
  const p_with_acts = professors.filter(p => acts_owners.includes(p.correo))
  const p_without_acts = professors.filter(p => !acts_owners.includes(p.correo))

  const professors_with_acts: Activities[] = p_with_acts.map(p => ({
    owner: {
      id: p.id,
      name: p.nombre1 + ", " + p.apellido1,
      full_name: ''
    },
    activities: activitys.filter(a => a.creada_por === p.correo)
  }));

  const professors_without_acts: Activities[] = p_without_acts.map(p => ({
    owner: {
      id: p.id,
      name: p.nombre1 + ", " + p.apellido1,
      full_name: ''
    },
    activities: []
  }));

  const profesor_ficticio: Activities = {
    owner: {
      id: 0,
      name: "profesor ficticio",
      full_name: ''
    },
    activities: activitys.filter(a => a.creada_por === "usuario ficticio")
  };

  const professors_activities = professors_with_acts.concat(professors_without_acts).concat(profesor_ficticio);

  return professors_activities;
};


/**
 * 
 * @param activities - 
 * @param divisions - 
 * @param profesores - 
 * @param id - 
 * @returns 
 */
export const division_rank_activities = function (
  activities: Activities,
  divisions: Division[],
  profesores: Profesor[],
  id: string
): Activities[] {

  const departments = divisions.find(c => c.id === Number(id))?.departamentos || [];
  const deparments_activities: Activities[] = departments.map(d => {

    const dep_profs = profesores.filter(p => p.departamento === d.id).map(p => p.correo);

    return {
      owner: {
        id: d.id,
        name: d.nombre,
        full_name: `del Departamento de ${d.nombre}`
      },
      activities: activities.activities.filter(a => dep_profs.includes(a.creada_por))
    }
  });

  return deparments_activities;
};


export const coordination_rank_activities = function(
  activities: Activities,
  ranks: Department[] | GroupE[],
  profesores: Profesor[],
  id: string
): Activities[] {

  return ranks.map(r => {

    let full_name = '';
    let activitys: Activity[] = [];

    if (Number(id) === 4) {
      full_name = `del Grupo de ${r.nombre}`;
      activitys = activities.activities.filter(a => a.groups.map(g => g.id).includes(r.id))
    } else {
      full_name = `del Departamento de ${r.nombre}`;
      const dep_profs = profesores.filter(p => p.departamento === r.id).map(p => p.correo);
      activitys = activities.activities.filter(a => dep_profs.includes(a.creada_por))
    };

    return {
      owner: {
        id: r.id,
        name: r.nombre,
        full_name
      },
      activities: activitys
    }
  })
};
