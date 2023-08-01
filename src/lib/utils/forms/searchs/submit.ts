import type { Activities } from "$lib/interfaces/activities";

import * as api from "$lib/api";

import { parse } from "zipson";


export const submit = function () {
  return async function (data: { search_type: string, search: number }): Promise<Activities | string> {

    const res = await api.get(`/api/activities/${data.search_type}/${data.search}`);

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
