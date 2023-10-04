import * as yup from "yup";


export const validation = function () {

  // Regular expressions validation
  // acentos = À-ÿ
  // ñ = \u00f1
  // Ñ = \u00d1
  const perfil = /^[A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]+, [A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]+$/;
  const url = /^(http|https):\/\/(www\.|[a-z]+)\.([a-z]+\.[a-z]+\.[a-z]+|[a-z]+\.[a-z]+|\2[a-z]+)\/.*$/;

  // pei years from 1997 until current year
  const years_count = new Date().getFullYear() - 1996;
  const pei_years = Array.from({ length: years_count }, (_, i) => (i + 1997).toString());

  return yup.object().shape({
    profile: yup.object().shape({
      perfil: yup.string().required("Requerido").matches(perfil, "Formato inválido. Escriba su primer Apellido, Nombre")
    , categoria: yup.string().oneOf(["Agregado", "Asistente", "Asociado", "Instructor", "Titular"])
    , dedicacion: yup.string().oneOf(["Convencional", "Exclusiva", "Integral"])
    , diploma_tipo: yup.string().oneOf(["Lic_", "Ph_D_", "Doctor", "Magister", "Ing_"])
    , diploma_universidad: yup.string().required("Requerido")
    , url: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().when("url", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato inválido. http://www.example.com")
        })
    )
    , lineas_investigacion: yup.array(yup.string())
    })
    , pei: yup.object().shape({
      anio: yup.string().required("Requerido").oneOf(pei_years, "Ingrese un año entre 1997 y el actual"),
      nivel: yup.string().oneOf(["A", "B", "C"]),
      numero: yup.string().required("Requerido"),
    })
  });
};
