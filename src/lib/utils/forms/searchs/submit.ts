import type { Activities } from "$lib/interfaces/activities";

import * as api from "$lib/api";

import { parse } from "zipson";
import { format_date, ve_date } from "$lib/utils/formatting";


export const submit = function () {
  return async function (data: any): Promise<Activities | string> {

    const date_start = data.date_start.split('-');
    const date_end = data.date_end.split('-');
    data.date_start = new Date(date_start[0], date_start[1]-1, date_start[2]);
    data.date_end = new Date(date_end[0], date_end[1]-1, date_end[2]);

    const res = await api.post(`/api/activities/${data.search_type}/${data.search}`, data);

    if (res.ok) {

      if (data.search_type === "coordination" || data.search_type === "division") {
        return parse(await res.text());
      };

      return await res.json();
    };

    const { message, code } = await res.json();

    return `Error al buscar ${data.search_type}.\n${code}. ${message}`;
  };
};
