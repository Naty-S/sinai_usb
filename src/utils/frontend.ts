/**
 * Formats the date to 'Month year'
 * Used to display the activity's description
 * 
 * @param {Date | string} date - The date to format
 * @returns {string} The formated date in 'Month year'
 */
export const format_date = (date: Date | string): string => {

  const _date = typeof date === "string" ? new Date(date) : date;
  const month = _date.toLocaleDateString('es', { month: "long" });
  const year = _date.getFullYear();

  return month.charAt(0).toUpperCase() + month.slice(1) + ' ' + year.toString()
};
