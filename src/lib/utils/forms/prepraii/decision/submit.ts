import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (prepraii_id: number, pathname: string) {
  return async function (data: any) {

    data.tipo = Number(data.tipo);
    
    const res = await api.patch("/api/prepraii/decision", { prepraii_id, data, pathname });

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
