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
    , orcid_posts: p.orcid_posts || ['']
    , google_schoolar_id: p.google_schoolar_id
    , google_schoolar_profile: p.google_schoolar_profile
    , google_schoolar_posts: p.google_schoolar_posts || ['']
    , research_gate_id: p.research_gate_id
    , research_gate_profile: p.research_gate_profile
    , research_gate_posts: p.research_gate_posts || ['']
    }
    , pei: {
      anio: pei?.anio || 2022,
      nivel: pei?.nivel || "A",
      numero: pei?.numero || '',
    }
  };
};
