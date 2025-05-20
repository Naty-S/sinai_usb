import unset from 'lodash.unset';


export const baseData = {
  actividad: {
    titulo: "Actividad de ejemplo",
    descripcion: "Descripción opcional",
    fecha_validacion: null,
    observaciones: null,
    palabras_clave: []
  },
  articulo_revista: {
    articulo_invitado: false,
    con_estudiantes: true,
    estado: "Publicado",
    fecha_publicacion: "2024-10-01",
    indice: "SCI",
    pag_final: "20",
    pag_inicial: "10",
    paginas: 11,
    revista: "Revista Científica",
    volumen: "42",
  },
  capitulo_libro: {
    aceptado: true,
    articulo_invitado: false,
    ciudad: "Caracas",
    editores: ["Editor Uno", "Editor Dos"],
    editorial: "Editorial Ejemplo",
    fecha: "2024-01-01",
    isbn: "123-45678-9012-3",
    pag_final: "120",
    pag_inicial: "100",
    pais: "Venezuela",
    titulo_libro: "Libro de Ejemplo"
  },
  evento: {
    ciudad: "Caracas",
    fecha: "2024-01-01",
    institucion: "USB",
    internacional: false,
    modalidad: "Cartel",
    nombre: "Nombre del evento",
    pais: "Venezuela"
  },
  autores_externos: [],
  autores_usb: [{ profesor_id: 1, actividad: 1, orden: 1 }],
  actividades_grupos: []
};


// Utilidad para clonar y modificar objetos
export function clone(obj: any) {
  return JSON.parse(JSON.stringify(obj));
}

export function omitField(obj: any, path: string) {
  const clone = JSON.parse(JSON.stringify(obj));
  unset(clone, path);
  return clone;
}

