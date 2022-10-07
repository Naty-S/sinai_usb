import type { profesor } from "@prisma/client";


export const init = function (p: profesor) {
  return {
      perfil: p.perfil
    , categoria: p.categoria
    , dedicacion: p.dedicacion
    , diploma_tipo: p.diploma_tipo
    , diploma_universidad: p.diploma_universidad
    , url: p.url
    , lineas_investigacion: p.lineas_investigacion || ['']
  };
};
