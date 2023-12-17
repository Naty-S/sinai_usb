import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (s1_novel_id: number, pathname: string) {
  return async function (data: any) {

    data.jurado_usb = await Promise.all(data.jurado_usb.map(async j => {
      
      j.veredicto = await (new Blob(j.veredicto, { type: "application/pdf" })).text();
      
      return j;
    }));
    data.jurado_externo = await Promise.all(data.jurado_externo.map(async j => {
      
      j.veredicto = await (new Blob(j.veredicto, { type: "application/pdf" })).text();

      return j;
    }));

    const res = await api.patch("/api/s1_novel/decision", { s1_novel_id, data, pathname });

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
