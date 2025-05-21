import { describe, it, expect } from 'vitest';
import { validation } from "../validation";
import { omitField } from "/tests/helpers/forms";


describe("autores_externos schema", () => {
  const base = [
    {
      nombre: "Juan Pérez",
      universidad: "Otra",
      es_estudiante: false,
      es_ponente: true,
      es_tutor: false,
      correo: "juan@gmail.com",
      estudiante_carrera: null,
    }
  ];

  const schema = {
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
    autores_usb: [],
  };

  it("valida un arreglo válido", async () => {
    await expect(validation('articulo_revista').isValid({ ...schema, autores_externos: base })).resolves.toBe(true);
  });

  it("requiere al menos un autor con nombre y universidad", async () => {
    const data = {...schema, autores_externos: [{ ...base[0], nombre: undefined }]};
    await expect(validation('articulo_revista').isValid({ ...data })).resolves.toBe(false);
    const data2 = {...schema, autores_externos: [{ ...base[0], universidad: undefined }]};
    await expect(validation('articulo_revista').isValid({ ...data2 })).resolves.toBe(false);
  });

  it("verifica campos booleanos", async () => {
    const data = {...schema, autores_externos: [{ ...base[0], es_estudiante: "no" }]};
    await expect(validation('articulo_revista').isValid({ ...data })).resolves.toBe(false);
  });

  it("correo debe ser email válido o null", async () => {
    const data = {...schema, autores_externos: [{ ...base[0], correo: "no-email" }]};
    await expect(validation('articulo_revista').isValid({ ...data })).resolves.toBe(false);
    const data2 = {...schema, autores_externos: [{ ...base[0], correo: null }]};
    await expect(validation('articulo_revista').isValid({ ...data2 })).resolves.toBe(true);
  });

  it("si es_estudiante==true, estudiante_carrera es requerido", async () => {
    const data = {...schema, autores_externos: [{ ...base[0], es_estudiante: true, estudiante_carrera: null }]};
    await expect(validation('articulo_revista').isValid({ ...data })).resolves.toBe(false);
    const data2 = {...schema, autores_externos: [{ ...base[0], es_estudiante: true, estudiante_carrera: "Computación" }]};
    await expect(validation('articulo_revista').isValid({ ...data2 })).resolves.toBe(true);
  });
  
  // it('should fail if autores_usb y autores_externos están ambos vacíos', async () => {
  //   const data = { ...baseData, autores_usb: [], autores_externos: [] };
  //   await expect(schema.validate(data)).rejects.toThrow();
  // });

  // it('should validate si hay al menos un autor externo', async () => {
  //   const data = { ...baseData, autores_usb: [], autores_externos: [{ nombre: "Autor Externo", institucion: "USB", actividad: 1, orden: 1 }] };
  //   await expect(schema.validate(data)).resolves.toBeTruthy();
  // });
});
