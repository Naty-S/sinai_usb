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
export const format_date = (
  date: Date | string,
  day?: boolean,
): string => {

  const _date = typeof date === "string" ? new Date(date) : date;
  const _year = _date.getFullYear().toString();
  let _month = _date.toLocaleDateString('es', { month: "long" });
  _month = _month.charAt(0).toUpperCase() + _month.slice(1);

  if (day) {
    return _date.getDate().toString() + " de " + _month + " del " + _year;
  };

  return _month + ' ' + _year;
};
