import * as yup from "yup";

import { parse_date } from "$lib/utils/formatting";


export const searchSchema = yup.object().shape({
  search_type: yup.string().oneOf(
    ["professor", "group", "department", "division", "coordination"],
    "Valor del tipo de búsqueda no pertenece a las opciones disponibles"
  ),
  search: yup.string().required("Requerido"),
  date_start: yup.date().transform(parse_date).required("Requerido"),
  date_end: yup.date().transform(parse_date).required("Requerido"),
  articulo_revista: yup.boolean().strict().typeError("No es booleano"),
  capitulo_libro: yup.boolean().strict().typeError("No es booleano"),
  composicion: yup.boolean().strict().typeError("No es booleano"),
  evento: yup.boolean().strict().typeError("No es booleano"),
  exposicion: yup.boolean().strict().typeError("No es booleano"),
  grabacion: yup.boolean().strict().typeError("No es booleano"),
  informe_tecnico: yup.boolean().strict().typeError("No es booleano"),
  libro: yup.boolean().strict().typeError("No es booleano"),
  memoria: yup.boolean().strict().typeError("No es booleano"),
  partitura: yup.boolean().strict().typeError("No es booleano"),
  patente: yup.boolean().strict().typeError("No es booleano"),
  premio: yup.boolean().strict().typeError("No es booleano"),
  premio_bienal: yup.boolean().strict().typeError("No es booleano"),
  proyecto_grado: yup.boolean().strict().typeError("No es booleano"),
  proyecto_investigacion: yup.boolean().strict().typeError("No es booleano"),
  recital: yup.boolean().strict().typeError("No es booleano")
});

export const validation = function () {

  return searchSchema
};
