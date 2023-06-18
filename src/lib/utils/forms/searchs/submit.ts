import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function () {
  return async function (data: { search_type: string, search: number }) {

    const res = await api.get(`/api/activities/${data.search_type}/${data.search}`);

    if (res.ok) {
      return await res.json();
    };

    const { message, code } = await res.json();

    return `Error al buscar ${data.search_type}.\n${code}. ${message}`;
  };
};
