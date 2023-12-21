

export const init = function (jurado_usb, jurado_externo) {

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
