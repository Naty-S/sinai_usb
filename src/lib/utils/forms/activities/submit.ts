import type { actividad_form, kinds } from "$lib/types/forms";
import { goto } from "$app/navigation";

import type { User } from "$lib/interfaces/auth";

import * as api from "$lib/api";


export const submit = function (kind: kinds, user: User, update: boolean = false, id?: string) {
  return async function (data: actividad_form<typeof kind>) {
    
    switch (kind) {
      case "articulo_revista":
        const con_estudiantes = data.autores_usb?.some(a => a.es_estudiante) ||
                                data.autores_externos?.some(a => a.es_estudiante);

        data.articulo_revista.con_estudiantes = con_estudiantes === undefined ? false : con_estudiantes;
        data.articulo_revista.fecha_publicacion = data.articulo_revista.fecha_publicacion &&
                                                  new Date(data.articulo_revista.fecha_publicacion);
        data.articulo_revista.paginas = Number(data.articulo_revista.paginas);
        break;

      case "evento":
        data.evento.internacional = data.evento.pais !== "Venezuela";
        data.evento.fecha = new Date(data.evento.fecha);
        break;

      case "informe_tecnico":
        data.informe_tecnico.fecha_inicio = new Date(data.informe_tecnico.fecha_inicio);
        data.informe_tecnico.meses_duracion = Number(data.informe_tecnico.meses_duracion);
        break;

      case "patente":
        data.patente.fecha_inicio = new Date(data.patente.fecha_inicio);
        data.patente.fecha_fin = new Date(data.patente.fecha_fin);
        break;

      case "proyecto_grado":
        data.proyecto_grado.fecha_defensa = new Date(data.proyecto_grado.fecha_defensa);
        break;

      case "proyecto_investigacion":
        data.proyecto_investigacion.fecha_inicio = new Date(data.proyecto_investigacion.fecha_inicio);
        data.proyecto_investigacion.meses_duracion = Number(data.proyecto_investigacion.meses_duracion);

        // TODO: Remove when fix confusion in db with 'institucion'
        data.proyecto_investigacion.monto = data.proyecto_investigacion.monto.toString();
        break;

      case "recital":
        data.recital.fecha_evento = new Date(data.recital.fecha_evento);
        break;

      default:
        data[kind].fecha = new Date(data[kind].fecha);
        break;
    };

    let res: Response;

    if (update) {

      data.actividad.fecha_ultima_modificacion = new Date();
      res = await api.patch(`/api/activities/modify/${kind}/${id}`, data);

    } else {
      res = await api.post(`/api/activities/create/${kind}`, data);
    };
    
    if (res.ok) {
      goto(res.url);

    } else {
      const { message, code } = await res.json();

      if (user.professor) {
        goto(`/sinai/actividades/profesor/${user.professor?.id}?error=${message}&code=${code}`);
      } else {
        goto(`/sinai/actividades/decano/0?error=${message}&code=${code}`);
      };
    };
  };
}
