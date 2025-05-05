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
    , estado: yup.string().oneOf(
      ["Aprobado", "Rechazado"], "Valor de la decisión no pertenece a las opciones disponibles"
    )
    , tipo: yup.number().oneOf(
      [1, 2],
      "Valor del tipo no pertenece a las opciones disponibles"
    )
    , observaciones_evaluador: yup.string().required("Debe escribir alguna obervación")
  }).defined();
};
