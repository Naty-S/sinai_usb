import { goto } from "$app/navigation";

import * as api from "$lib/api";

import { file_to_base64 } from "$lib/utils/conversions";


export const submit = function (profesor_id: number, pathname: string) {
  return async function (data: any) {

    data.prepraii_solicitud.profesor = profesor_id;
    data.prepraii_solicitud.actividad = Number(data.prepraii_solicitud.actividad);
    data.prepraii_solicitud.articulo = await file_to_base64(data.prepraii_solicitud.articulo[0]);
    data.prepraii_profesores = await Promise.all(data.prepraii_profesores.map(async (p: any) => {

      p.contrato_constancia = await file_to_base64(p.contrato_constancia[0]);
      return p;
    }));

    const res = await api.post("/api/prepraii/request", {data, pathname});

    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();
      goto(`${pathname}?error=${message}&code=${code}`);
    };
  };
};
