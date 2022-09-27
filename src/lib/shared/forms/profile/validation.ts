import * as yup from "yup";


export const validation = function () {

  const perfil = /^[A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]+, [A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]+$/;
  const url = /^(http|https):\/\/(www\.|[a-z]+)\.([a-z]+\.[a-z]+\.[a-z]+|[a-z]+\.[a-z]+|\2[a-z]+)\/.*$/;

  return yup.object().shape({
      perfil: yup.string().required("Requerido").matches(perfil, "Formato ivalido")
    , categoria: yup.string().oneOf(["Agregado", "Asistente", "Asociado", "Instructor", "Titular"])
    , dedicacion: yup.string().oneOf(["Convencional", "Exclusiva", "Integral"])
    , diploma_tipo: yup.string().oneOf(["Lic_", "Ph_D_", "Doctor", "Magister", "Ing_"])
    , diploma_universidad: yup.string().required("Requerido")
    , url: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().when("url", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato invalido")
        })
    )
    , lineas_investigacion: yup.array(yup.string())
  });
};
