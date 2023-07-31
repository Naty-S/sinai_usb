import type { Profile } from "$lib/interfaces/professors";


export const init = function (p: Profile) {

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
      anio: pei?.anio || 2022,
      nivel: pei?.nivel || "A",
      numero: pei?.numero || '',
    }
  };
};
