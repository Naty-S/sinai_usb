import type { Activities } from "$lib/interfaces/activities";

import * as api from "$lib/api";

import { parse } from "zipson";
import { parse_date, format_date } from "$lib/utils/formatting";


export const submit = function () {
  return async function (data: any): Promise<Activities | string> {

    const date_start = format_date(parse_date('', data.date_start), "yyyy-MM-dd").split('-');
    const date_end = format_date(parse_date('', data.date_end), "yyyy-MM-dd").split('-');
    const filters = {
      date_range: {
        gte: new Date(Number(date_start[0]), Number(date_start[1]) - 1, Number(date_start[2])),
        lte: new Date(Number(date_end[0]), Number(date_end[1]) - 1, Number(date_end[2]))
      },
      articulo_revista: data.articulo_revista,
      capitulo_libro: data.capitulo_libro,
      composicion: data.composicion,
      evento: data.evento,
      exposicion: data.exposicion,
      grabacion: data.grabacion,
      informe_tecnico: data.informe_tecnico,
      libro: data.libro,
      memoria: data.memoria,
      partitura: data.partitura,
      patente: data.patente,
      premio: data.premio,
      premio_bienal: data.premio_bienal,
      tesis_grado: data.tesis_grado,
      proyecto_investigacion: data.proyecto_investigacion,
      recital: data.recital
    };

    const res = await api.post(`/api/activities/${data.search_type}/${data.search}`, filters);

    if (res.ok) {

      if (data.search_type === "coordination" || data.search_type === "division") {
        return parse(await res.text());
      };

      return await res.json();
    };

    const { message, code } = await res.json();

    return `Error al buscar ${data.search_type}.\n${code}. ${message}`;
  };
};
