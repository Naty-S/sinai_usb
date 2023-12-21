import { goto } from "$app/navigation";

import * as api from "$lib/api";

import { file_to_base64 } from "$lib/utils/conversions";


export const submit = function (profesor_id: number, pathname: string) {
  return async function (data: any) {
    
    data.profesor = profesor_id;
    data.proyecto = await file_to_base64(data.proyecto[0]);
    data.soportes = await Promise.all(
      data.soportes.map(async (s: FileList) => await file_to_base64(s[0]))
    );

    const res = await api.post("/api/s1_novel/request", { data, pathname });

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
