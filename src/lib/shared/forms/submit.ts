import type { actividad_form, kinds } from "$types/forms";
import { goto } from "$app/navigation";


export const submit = function (kind: kinds) {
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

      case "informe_tecnico":
        data.informe_tecnico.fecha_inicio = new Date(data.informe_tecnico.fecha_inicio);
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

    const res = await fetch(`/api/activities/create/${kind}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      console.log("redirect: ", res.headers)
      goto(`/actividades/profesor/${data.actividad.creada_por}`);
    }
  };
}
