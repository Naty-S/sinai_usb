import * as yup from "yup";


export const validation = function () {

  return yup.object().shape({
    search_type: yup.string().oneOf(["professor","group","department","division","coordination"]),
    search: yup.number().required("Requerido")
  });
};
