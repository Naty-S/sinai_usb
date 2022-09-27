import type { User } from "$interfaces/auth";


export const init = function (data: any) {
  return {
      perfil: data.profile
    , categoria: data.category
    , dedicacion: data.dedication
    , diploma_tipo: data.diploma
    , diploma_universidad: data.diploma_university
    , url: data.page
    , lineas_investigacion: data.research_lines || ['']
  };
};
