import * as yup from "yup";


export const validation = function () {

  const mail = /^([a-zA-Z0-9]+[(\.\_\-)]*\w*){1,3}@[a-zA-Z\d]+[\-\_]?[\w]+[\.{1}][a-zA-Z]{2,3}(.\w*)?$/
  
  const jurado_externo = yup.lazy(value => {
    if (value !== undefined) {
      return yup.array().ensure().when("jurado_usb", {
        is: (jurado_usb: any) => jurado_usb.length === 0,
        then: yup.array().of(
          yup.object().shape({
              s1_novel: yup.number().required()
            , correo: yup.string().email("Correo inválido").nullable()
            , nombre: yup.string().required("Requerido")
            , universidad: yup.string().nullable()
          })
        ).min(1, "Ingrese al menos 1 jurado").required("Requerido"),
        otherwise: yup.array().of(
          yup.object().shape({
              s1_novel: yup.number().required()
            , correo: yup.string().email("Correo inválido").nullable()
            , nombre: yup.string().required("Requerido")
            , universidad: yup.string().nullable()
          })
        )
      });
    };
    return yup.mixed().notRequired();
  });

  const jurado_usb = yup.lazy(value => {
    if (value !== undefined) {
      return yup.array().ensure().when("jurado_externo", {
        is: [],
        then: yup.array().of(
          yup.object().shape({
            profesor: yup.number().required("Requerido").typeError("Debe ingresar un número")
            , s1_novel: yup.number().required()
          })
        ).min(1, "Ingrese al menos 1 jurado").required("Requerido"),
        otherwise: yup.array().of(
          yup.object().shape({
            profesor: yup.number().required("Requerido").typeError("Debe ingresar un número")
            , s1_novel: yup.number().required()
          })
        )
      });
    };
    return yup.mixed().notRequired();
  });

  return yup.object().shape({
      jurado_externo
    , jurado_usb
  }, [["jurado_usb", "jurado_externo"]]);
};
