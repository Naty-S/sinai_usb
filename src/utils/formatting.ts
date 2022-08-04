import type { Activity } from "$types/db/activities";

/**
 * Formats the date to specified format
 *    - `Month` `yyyy` (default)
 *    - `dd` de `Month` del `yyyy`
 * Used to display the activity's description and current date
 * 
 * @param {Date | string} date - The date to format
 * @param {boolean} day - Tell's if include the day in the format
 * @returns {string} The formated date in 'Month year'
 */
export const format_date = function (
  date: Date | string,
  day?: boolean,
): string {

  const _date = typeof date === "string" ? new Date(date) : date;
  const _year = _date.getFullYear().toString();
  let _month = _date.toLocaleDateString('es', { month: "long" });
  _month = _month.charAt(0).toUpperCase() + _month.slice(1);

  if (day) {
    return _date.getDate().toString() + " de " + _month + " del " + _year;
  };

  return _month + ' ' + _year;
};

/**
 * 
 * @param activity 
 * @returns 
 */
export const format_activity_kind = function (activity: any): Activity {
  let kind_name = '';
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

  return {
    ...activity,
    kind_name,
    kind_info
  };
};
