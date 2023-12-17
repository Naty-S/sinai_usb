

export const init = function (jurado_usb: any[], jurado_externo: any[]) {

  return {
      s1_novel: {
        comentario: "Sin comentarios"
      , estado: "Aprobado"
      , observaciones_evaluador: "Sin Observaciones"
    }
    , jurado_usb
    , jurado_externo
  };
};
