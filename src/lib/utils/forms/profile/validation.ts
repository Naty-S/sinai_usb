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
    , categoria: yup.string().oneOf(
      ["Agregado", "Asistente", "Asociado", "Instructor", "Titular"],
      "Valor de la categoría no pertenece a las opciones disponibles"
    )
    , dedicacion: yup.string().oneOf(
      ["Convencional", "Exclusiva", "Integral"],
      "Valor de dedicación no pertenece a las opciones disponibles"
    )
    , diploma_tipo: yup.string().oneOf(
      ["Lic_", "Ph_D_", "Doctor", "Magister", "Ing_"],
      "Valor del tipo de tutoría no pertenece a las opciones disponibles"
    )
    , diploma_universidad: yup.string().required("Requerido")
    , url: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().when("url", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato inválido. http://www.example.com")
        })
    )
    , orcid_id: yup.number().nullable()
    , orcid_profile: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().when("orcid_profile", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato inválido. http://www.example.com")
        })
    )
    , google_schoolar_id: yup.number().nullable()
    , google_schoolar_profile: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().when("google_schoolar_profile", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato inválido. http://www.example.com")
        })
    )
    , research_gate_id: yup.number().nullable()
    , research_gate_profile: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().when("research_gate_profile", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato inválido. http://www.example.com")
        })
    )
    , lineas_investigacion: yup.array(yup.string())
    })
    , pei: yup.object().shape({
      anio: yup.lazy(value => !value ? yup.string().nullable() : yup.string().when("anio", {
        is: null,
        then: yup.string().nullable(),
        otherwise: yup.string().oneOf(pei_years, "Ingrese un año entre 1997 y el actual"),
      })),
      nivel: yup.lazy(value => !value ? yup.string().nullable() : yup.string().when("nivel", {
        is: null,
        then: yup.string().nullable(),
        otherwise: yup.string().oneOf(
          ["A", "B", "C"], "Valor del nivel no pertenece a las opciones disponibles"
        ),
      })),
      numero: yup.string().nullable(),
    })
  });
};
