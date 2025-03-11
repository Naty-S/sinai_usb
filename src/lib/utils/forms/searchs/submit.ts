import type { Activities } from "$lib/interfaces/activities";

import * as api from "$lib/api";

import { parse } from "zipson";


export const submit = function () {
  return async function (data: any): Promise<Activities | string> {

    data.date_start = new Date(data.date_start);
    data.date_end = new Date(data.date_end);

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
