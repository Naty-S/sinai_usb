import type { Activities } from "$lib/interfaces/activities";

import * as api from "$lib/api";

import { parse } from "zipson";
import { parse_date, format_date } from "$lib/utils/formatting";


export const submit = function () {
  return async function (data: any): Promise<Activities | string> {

    const date_start = format_date(parse_date('', data.date_start), "yyyy-MM-dd").split('-');
    const date_end = format_date(parse_date('', data.date_end), "yyyy-MM-dd").split('-');
    data.date_start = new Date(Number(date_start[0]), Number(date_start[1])-1, Number(date_start[2]));
    data.date_end = new Date(Number(date_end[0]), Number(date_end[1])-1, Number(date_end[2]));

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
