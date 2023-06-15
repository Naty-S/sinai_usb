import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (email: string, pathname: string) {
  return async function (data: any) {
    
    data.pei.numero = String(data.pei.numero)
    const res = await api.patch(`/api/professor/${email}`, { new: data, pathname });

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
