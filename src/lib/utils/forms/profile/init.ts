import type { profesor } from "@prisma/client";


export const init = function (p: profesor) {

  const pei = p.pei;

  return {
    profile: {
      perfil: p.perfil
    , categoria: p.categoria
    , dedicacion: p.dedicacion
    , diploma_tipo: p.diploma_tipo
    , diploma_universidad: p.diploma_universidad
    , url: p.url
    , lineas_investigacion: p.lineas_investigacion || ['']
    , 
    }
    , pei: {
      anio: pei[0]?.anio || 2022,
      nivel: pei[0]?.nivel || "A",
      numero: pei[0]?.numero || '',
    }
  };
};
