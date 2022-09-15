import { goto } from "$app/navigation";


export const submit = function () {
  return async function (data: any) {

    data.professor.departamento = Number(data.professor.departamento);
    data.professor.cedula = Number(data.professor.cedula);

    // register
    const res = await fetch("/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // send email to coord
    const msg = `El Profesor ${data.professor.nombre1} ${data.professor.apellido1}, ha
     solicitado ser validado en el sistema del Sinai para poder ingresar, por favor ingrese
     con el siguiente link para revisar la solicitud.
     https://www.did.usb.ve/sinai/login?validar_profesor=${data.professor.correo}
    `;
    const subject = `Validar Nuevo Profesor,
      ${data.professor.nombre1} ${data.professor.apellido1}, C.I. ${data.professor.cedula}
    `;

    window.location.href = "mailto:12-11250@usb.ve"
      + "?subject=" + encodeURIComponent(subject)
      + "&body=" + encodeURIComponent(msg);

    if (res.ok) {
      goto(res.url);
    };
  };
};
