import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (email: string, pathname: string) {
  return async function (data: any) {
    
    const res = await api.patch(`/api/professor/${email}`, { new: data, pathname });

    goto(res.url);
  };
};
