import { describe, it, expect } from 'vitest';
import { actividad } from "../validation";
import { omitField } from "/tests/helpers/forms";


describe("actividad schema", () => {
  const base = {
    titulo: "Título de actividad",
    descripcion: "desc",
    fecha_validacion: null,
    observaciones: null,
    palabras_clave: ["uno", "dos"]
  };

  it("valida objeto válido", async () => {
    await expect(actividad.isValid(base)).resolves.toBe(true);
  });

  it("requiere titulo", async () => {
    const data = { ...base, titulo: undefined };
    await expect(actividad.isValid(data)).resolves.toBe(false);
  });

  // it("palabras_clave puede ser arreglo vacío o no estar", async () => {
  //   const data = { ...base, palabras_clave: [] };
  //   await expect(actividad.isValid(data)).resolves.toBe(true);
  //   const data2 = { ...base };
  //   const data = omitField(baseData, 'palabras_clave');
  //   delete data2.palabras_clave;
  //   await expect(actividad.isValid(data2)).resolves.toBe(true);
  // });
});




  // it('should fail if autores_usb y autores_externos están ambos vacíos', async () => {
  //   const data = { ...baseData, autores_usb: [], autores_externos: [] };
  //   await expect(schema.validate(data)).rejects.toThrow();
  // });

  // it('should validate si hay al menos un autor externo', async () => {
  //   const data = { ...baseData, autores_usb: [], autores_externos: [{ nombre: "Autor Externo", institucion: "USB", actividad: 1, orden: 1 }] };
  //   await expect(schema.validate(data)).resolves.toBeTruthy();
  // });

