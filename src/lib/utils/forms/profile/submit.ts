import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function (email: string, pathname: string) {
  return async function (data: any) {
    
    data.profile.orcid_id = Number(data.profile.orcid_id);
    data.profile.google_schoolar_id = Number(data.profile.google_schoolar_id);
    data.profile.research_gate_id = Number(data.profile.research_gate_id);

    const res = await api.patch(`/api/professor/${email}`, { new: data, pathname });

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
