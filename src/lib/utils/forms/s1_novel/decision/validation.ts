import * as yup from "yup";


export const validation = function () {

  const is_pdf = function (value: any) {

    if (value) {
      return ["pdf"].includes(value[0].name.split('.').pop());
    };

    return true;
  };
  return yup.object().shape({
      s1_novel: yup.object().shape({
        comentario: yup.string().required("Debe escribir algún comentario")
      , estado: yup.string().oneOf(["Aprobado", "En_Revision", "Rechazado"])
      , observaciones_evaluador: yup.string().required("Debe escribir alguna obervación")
    })
    , jurado_usb: yup.array().of(
      yup.object().shape({
        veredicto: yup.mixed().required("Requerido")
          .test("fileFormat", "Adjunte solamente archivos pdf", value => is_pdf(value))
      })
    )
    , jurado_externo: yup.array().of(
      yup.object().shape({
        veredicto: yup.mixed().required("Requerido")
          .test("fileFormat", "Adjunte solamente archivos pdf", value => is_pdf(value))
      })
    )
  }).defined();
};
