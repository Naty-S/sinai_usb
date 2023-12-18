import { goto } from "$app/navigation";

import * as api from "$lib/api";

import { file_to_base64 } from "$lib/utils/conversions";


export const submit = function (s1_novel_id: number, pathname: string) {
  return async function (data: any) {

    data.jurado_usb = await Promise.all(data.jurado_usb.map(async ju => {
      
      ju.veredicto = await file_to_base64(ju.veredicto[0]);
      
      return ju;
    }));
    data.jurado_externo = await Promise.all(data.jurado_externo.map(async je => {
      
      je.veredicto = await file_to_base64(je.veredicto[0]);

      return je;
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
