import { init_date } from "$lib/utils/formatting";


export const init = function (search_type: string, search: string, years: number) {

  return {
    search_type,
    search,
    date_start: init_date(new Date(`01-01-1100`)),
    date_end: init_date(),
    articulo_revista: true,
    capitulo_libro: true,
    composicion: true,
    evento: true,
    exposicion: true,
    grabacion: true,
    informe_tecnico: true,
    libro: true,
    memoria: true,
    partitura: true,
    patente: true,
    premio: true,
    premio_bienal: true,
    tesis_grado: true,
    proyecto_investigacion: true,
    recital: true
  };
};
