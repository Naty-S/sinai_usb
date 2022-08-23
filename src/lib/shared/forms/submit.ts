import type { actividad_form, kinds } from "$types/forms";


export const submit = function (kind: kinds) {
  return function (data: actividad_form<typeof kind>) {

    switch (kind) {
      case "articulo_revista":
        const con_estudiantes = data.autores_usb?.some(a => a.es_estudiante) ||
                                data.autores_externos?.some(a => a.es_estudiante);

        data.articulo_revista.con_estudiantes = con_estudiantes === undefined ? false : con_estudiantes;
        data.articulo_revista.fecha_publicacion = data.articulo_revista.fecha_publicacion &&
                                                  new Date(data.articulo_revista.fecha_publicacion);
        data.articulo_revista.paginas = Number(data.articulo_revista.paginas);
        break;

      case "recital":
        data.recital.fecha_evento = new Date(data.recital.fecha_evento);
        break;

      default:
        break;
    };

    fetch(`/api/activities/create/${kind}`, {
      method: "POST",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };
}
