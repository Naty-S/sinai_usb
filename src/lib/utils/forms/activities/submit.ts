import type { actividad_form, kinds } from "$lib/types/forms";
import { goto } from "$app/navigation";

import type { User } from "$lib/interfaces/auth";

import * as api from "$lib/api";


export const submit = function (kind: kinds, user: User, update: boolean = false, id?: string) {
  return async function (data: actividad_form<typeof kind>) {
    
    let date = data[kind].fecha && data[kind].fecha.split('-');

    switch (kind) {
      case "articulo_revista":
        const con_estudiantes = data.autores_usb?.some(a => a.es_estudiante) ||
                                data.autores_externos?.some(a => a.es_estudiante);
        
        data.articulo_revista.con_estudiantes = con_estudiantes === undefined ? false : con_estudiantes;
        data.articulo_revista.paginas = Number(data.articulo_revista.paginas);

        if (data.articulo_revista.fecha_publicacion) {
          date = data.articulo_revista.fecha_publicacion.split('-');
          data.articulo_revista.fecha_publicacion = new Date(date[0], date[1] - 1, date[2]);
        };

        break;

      case "evento":
        data.evento.internacional = data.evento.pais.toLowerCase() !== "venezuela";
        data.evento.fecha = new Date(date[0], date[1] - 1, date[2]);
        break;

      case "informe_tecnico":
        date = data.informe_tecnico.fecha_inicio.split('-');
        data.informe_tecnico.fecha_inicio = new Date(date[0], date[1] - 1, date[2]);
        data.informe_tecnico.meses_duracion = Number(data.informe_tecnico.meses_duracion);
        break;

      case "patente":
        date = data.patente.fecha_inicio.split('-');
        data.patente.fecha_inicio = new Date(date[0], date[1] - 1, date[2]);
        date = data.patente.fecha_fin.split('-');
        data.patente.fecha_fin = new Date(date[0], date[1] - 1, date[2]);
        break;

      case "proyecto_grado":
        date = data.proyecto_grado.fecha_defensa.split('-');
        data.proyecto_grado.fecha_defensa = new Date(date[0], date[1] - 1, date[2]);
        break;

      case "proyecto_investigacion":
        date = data.proyecto_investigacion.fecha_inicio.split('-');
        data.proyecto_investigacion.fecha_inicio = new Date(date[0], date[1] - 1, date[2]);
        data.proyecto_investigacion.meses_duracion = Number(data.proyecto_investigacion.meses_duracion);

        // TODO: Remove when fix confusion in db with 'institucion'
        data.proyecto_investigacion.monto = data.proyecto_investigacion.monto.toString();
        break;

      case "recital":
        date = data.recital.fecha_evento.split('-');
        data.recital.fecha_evento = new Date(date[0], date[1] - 1, date[2]);
        break;

      default:
        data[kind].fecha = new Date(date[0], date[1] - 1, date[2]);
        break;
    };

    let res: Response;

    if (update) {

      res = await api.patch(`/api/activities/modify/${kind}/${id}`, data);

    } else {
      res = await api.post(`/api/activities/create/${kind}`, data);
    };
    
    goto(res.url);
  };
};
