import type { PrepraiiRequest } from "$lib/interfaces/prepraii";


export const init = function (req?: PrepraiiRequest) {

  return {
      comentario: req?.comentario || "Sin comentarios"
    , estado: "Aprobado"
    , tipo: req?.tipo || 1
    , observaciones_evaluador: req?.observaciones_evaluador || "Sin Observaciones"
  };
};
