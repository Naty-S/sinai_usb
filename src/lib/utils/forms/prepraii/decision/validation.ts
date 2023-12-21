import * as yup from "yup";


export const validation = function () {

  const is_pdf = function (value: any) {

    if (value) {
      return ["pdf"].includes(value[0].name.split('.').pop());
    };

    return true;
  };
  return yup.object().shape({
      comentario: yup.string().required("Debe escribir algún comentario")
    , estado: yup.string().oneOf(["Aprobado", "En_Revision", "Rechazado"])
    , tipo: yup.number().oneOf([1, 2])
    , observaciones_evaluador: yup.string().required("Debe escribir alguna obervación")
  }).defined();
};
