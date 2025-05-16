import { init_date } from "$lib/utils/formatting";


export const init = function () { // TODO: create types for inits, so makes easier in back (api). May change in submit
  
  return {
      comentario: ''
    , fecha_solicitud: init_date()
    , observaciones_evaluador: ''
    , observaciones_profesor: "Sin Observaciones"
    , proyecto: undefined
    , soportes: []
  };
};
