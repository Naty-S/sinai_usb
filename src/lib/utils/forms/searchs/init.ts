import { init_date } from "$lib/utils/formatting";


export const init = function (years: number) {

  const current_year = (new Date()).getFullYear();

  return {
    search_type: "professor",
    search: 614,
    date_start: init_date(new Date(`01-01-${current_year-years}`)),
    date_end: init_date(new Date(`01-01-${current_year}`)),
    articulo_revista: true,
    capitulo_libro: false,
    composicion: false,
    evento: false,
    exposicion: false,
    grabacion: false,
    informe_tecnico: false,
    libro: false,
    memoria: false,
    partitura: false,
    patente: false,
    premio: false,
    premio_bienal: false,
    proyecto_grado: false,
    proyecto_investigacion: false,
    recital: false
  };
};
