import * as yup from "yup";


export const validation = function () {
  // acentos = À-ÿ
  // ñ = \u00f1
  // Ñ = \u00d1
  const one_word = /^[A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]*[^.\s]$/;
  const cedula = /^\d{8}$/;
  const perfil = /^[A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]+, [A-ZÀ-ÿ\u00d1][a-zÀ-ÿ\u00f1]+$/;
  const url = /^(http|https):\/\/(www\.|[a-z]+)\.([a-z]+\.[a-z]+\.[a-z]+|[a-z]+\.[a-z]+|\2[a-z]+)\/.*$/;
  
  const deps_ids = Array.from({ length: 30 }, (_, i) => (i + 2).toString());
  
  // ppi years from 1997 until current year
  const years_count = new Date().getFullYear() - 1996;
  const pei_years = Array.from({ length: years_count }, (_, i) => (i + 1997).toString());

  const not_req_word = yup.lazy(value => !value ? yup.string().nullable() :
    yup.string().matches(one_word, "Escriba un solo nombre sin espacios")
  )

  return yup.object().shape({
    professor: yup.object().shape({
      nombre1: yup.string().required("Requerido").matches(one_word, "Escriba un solo nombre sin espacios"),
      nombre2: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().matches(one_word, "Escriba un solo nombre sin espacios")
      ),
      apellido1: yup.string().required("Requerido").matches(one_word, "Escriba un solo apellido sin espacios"),
      apellido2: yup.lazy(value => !value ? yup.string().nullable() :
        yup.string().matches(one_word, "Escriba un solo apellido sin espacios")
      ),
      cedula: yup.string().required("Requerido").matches(cedula, "Formato invalido"),
      correo: yup.string().required("Requerido").matches(/^[a-z]+@usb.ve$/, "Formato invalido"),
      sexo: yup.string().oneOf(['F', 'M']),
      categoria: yup.string().oneOf(["Agregado", "Asistente", "Asociado", "Instructor", "Titular"]),
      condicion: yup.string().oneOf(["Contratado", "Ordinario", "Jubilado"]),
      dedicacion: yup.string().oneOf(["Convencional", "Exclusiva", "Integral"]),
      diploma_tipo: yup.string().oneOf(["Lic_", "Ph_D_", "Doctor", "Magister", "Ing_"]),
      diploma_universidad: yup.string().required("Requerido"),
      departamento: yup.string().oneOf(deps_ids),
      perfil: yup.string().required("Requerido").matches(perfil, "Formato ivalido"),
      url: yup.lazy(value => !value ? yup.string().nullable() : 
        yup.string().when("url", {
          is: null,
          then: yup.string().nullable(),
          otherwise: yup.string().matches(url, "Formato invalido")
        })
      ),
      // grupos_investigacion: [],
    }),
    pei: yup.object().shape({
      anio: yup.string().required("Requerido").oneOf(pei_years, "Ingrese un año entre 1997 y el actual"),
      nivel: yup.string().oneOf(["A", "B", "C"]),
      numero: yup.number().required("Requerido"),
    })
  });
};
