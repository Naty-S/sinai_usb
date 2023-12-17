import * as yup from "yup";


export const validation = function ()/* : ObjectSchema<M> */ {


  const is_pdf = function (value: any) {
    
    if (value) {
      return ["pdf"].includes(value[0].name.split('.').pop());
    };

    return true;
  };

  return yup.object().shape({
      comentario: yup.string()
    , estado: yup.string().oneOf(["Aprobado", "En_Revision", "Rechazado"])
    , observaciones_evaluador: yup.string()
    , observaciones_profesor: yup.string().required("Por favor ingrese alguna observación")
    , proyecto: yup.mixed().required("Requerido")
        .test("fileFormat", "Adjunte solamente archivos pdf", value => is_pdf(value))
    , soportes: yup.array().of(yup.mixed().required("Requerido")
        .test("fileFormat", "Adjunte solamente archivos pdf", value => is_pdf(value))
      ).min(1, "Adjunte al menos 1 soporte").required("Requerido")
  }).defined(); // TODO: add defined to all validations with shape + return type
};

