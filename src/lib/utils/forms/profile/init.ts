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
    , lineas_investigacion: p.lineas_investigacion || ['']
    , url: p.url
    , orcid_id: p.orcid_id
    , orcid_profile: p.orcid_profile
    , google_schoolar_id: p.google_schoolar_id
    , google_schoolar_profile: p.google_schoolar_profile
    , research_gate_id: p.research_gate_id
    , research_gate_profile: p.research_gate_profile
    }
    , pei: {
      anio: pei?.anio || null,
      nivel: pei?.nivel || null,
      numero: pei?.numero || null,
    }
  };
};
