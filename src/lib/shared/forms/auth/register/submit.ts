import { goto } from "$app/navigation";

import * as api from "$lib/api";


export const submit = function () {
  return async function (data: any) {

    data.professor.departamento = Number(data.professor.departamento);
    data.professor.cedula = Number(data.professor.cedula);
    data.pei.numero = data.pei.numero.toString();

    // register
    const res = await api.post("/api/auth/register", data);

    if (res.url.includes("exito") && res.url.includes("coord")) {
      const coord = res.url.split("=")[3];

      // send email to coord
      const msg = `El Profesor ${data.professor.nombre1} ${data.professor.apellido1}, ha
       solicitado ser validado en el sistema del Sinai para poder ingresar, por favor
       ingrese en el sistema para revisar la solicitud.
      `;
      const subject = `Validar Nuevo Profesor,
        ${data.professor.nombre1} ${data.professor.apellido1}, C.I. ${data.professor.cedula}
      `;
  
      window.location.href = "mailto:" + coord
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(msg);
    };

    goto(res.url);
  };
};
