import type { PrepraiiRequest } from "$lib/interfaces/prepraii";


export const init = function (req?: PrepraiiRequest) {

  return {
      comentario: req?.comentario || "Sin comentarios"
    , estado: req?.estado == "En_Revision" ? "Aprobado" : req?.estado
    , tipo: req?.tipo || 1
    , observaciones_evaluador: req?.observaciones_evaluador || "Sin Observaciones"
  };
};
