import type { prepraii_form } from "$lib/types/forms";


export const init = function () {
  
  return {
    prepraii_solicitud: {
        actividad: -1
      , articulo: []
      , comentario: ''
      , indice: ''
      , observaciones_evaluador: ''
      , observaciones_profesor: "Sin Observaciones"
    }
    , prepraii_profesores: [{
        profesor: 0
      , contrato_constancia: []
    }]
  };
};
