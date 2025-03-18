import type { jury } from "$lib/types/forms";

import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (pathname: string) {
  return async function (data: jury) {

    data.jurado_usb = data.jurado_usb.map(j => ({
      
      profesor: Number(j.profesor),
      s1_novel: j.s1_novel
    }))
    const res = await api.post("/api/s1_novel/jury", { data, pathname });

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
