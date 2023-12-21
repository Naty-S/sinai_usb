import * as yup from "yup";


export const validation = function ()/* : ObjectSchema<M> */ {


  const is_pdf = function (value: any) {
    
    if (value) {
      return ["pdf"].includes(value[0].name.split('.').pop());
    };

    return true;
  };

  return yup.object().shape({

    prepraii_solicitud: yup.object().shape({
        actividad: yup.number().required("Requerido")
      , indice: yup.string().required("Requerido")
      , articulo: yup.mixed().required("Requerido")
          .test("fileFormat", "Adjunte solamente archivos pdf", value => is_pdf(value))
      , observaciones_profesor: yup.string().required("Requerido")
    })
    , prepraii_profesores: yup.array().of(yup.object().shape({
        profesor: yup.number().required("Requerido")
      , contrato_constancia: yup.mixed().required("Requerido")
          .test("fileFormat", "Adjunte solamente archivos pdf", value => is_pdf(value))
    }))
  }).defined(); // TODO: add defined to all validations with shape + return type
};

