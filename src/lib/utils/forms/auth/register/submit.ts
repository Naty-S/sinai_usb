import * as api from "$lib/api";


export const submit = function () {
  return async function (data: any) {

    data.professor.departamento = Number(data.professor.departamento);
    data.professor.cedula = Number(data.professor.cedula);
    data.professor.orcid_id = Number(data.professor.orcid_id);
    data.professor.google_schoolar_id = Number(data.professor.google_schoolar_id);
    data.professor.research_gate_id = Number(data.professor.research_gate_id);

    // register
    const res = await api.post("/api/auth/register", data);

    if (res.ok) {

      const { coord } = await res.json();

      // send email to coord
      const msg = `El Profesor ${data.professor.nombre1} ${data.professor.apellido1}, ha
       solicitado ser validado en el sistema del SINAI para poder ingresar, por favor
       ingrese en el sistema para revisar la solicitud.

       www.sinai.did.usb.ve
      `;
      const subject = `Validar Nuevo Profesor,
        ${data.professor.nombre1} ${data.professor.apellido1}, C.I. ${data.professor.cedula}
      `;

      window.location.href = "mailto:" + coord
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(msg);

      return true;

    } else {
      return await res.json();
    };
  };
};
