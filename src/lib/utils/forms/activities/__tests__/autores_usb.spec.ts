import { describe, it, expect } from 'vitest';
import { autores_usb } from "../validation";
import { omitField } from "/tests/helpers/forms";

describe("autores_usb schema", () => {
  const base = [
    {
      nombre: "Pedro Pérez",
      es_estudiante: false,
      es_ponente: true,
      es_tutor: true,
      correo: "pedro@usb.ve",
      profesor_id: 10,
      estudiante_carrera: null,
    }
  ];

  it("valida arreglo válido", async () => {
    await expect(autores_usb.isValid(base)).resolves.toBe(true);
  });

  it("requiere nombre", async () => {
    const data = [{ ...base[0], nombre: undefined }];
    await expect(autores_usb.isValid(data)).resolves.toBe(false);
  });

  it("campos booleanos deben ser estrictos", async () => {
    const data = [{ ...base[0], es_estudiante: "no" }];
    await expect(autores_usb.isValid(data)).resolves.toBe(false);
  });

  it("correo debe ser email válido", async () => {
    const data = [{ ...base[0], correo: "notanemail" }];
    await expect(autores_usb.isValid(data)).resolves.toBe(false);
  });

  it("si es_tutor==true, profesor_id es requerido", async () => {
    const data = [{ ...base[0], es_tutor: true, profesor_id: null }];
    await expect(autores_usb.isValid(data)).resolves.toBe(false);
    const data2 = [{ ...base[0], es_tutor: true, profesor_id: 10 }];
    await expect(autores_usb.isValid(data2)).resolves.toBe(true);
  });

  it("si es_estudiante==true, estudiante_carrera es requerido", async () => {
    const data = [{ ...base[0], es_estudiante: true, estudiante_carrera: null }];
    await expect(autores_usb.isValid(data)).resolves.toBe(false);
    const data2 = [{ ...base[0], es_estudiante: true, estudiante_carrera: "Computación" }];
    await expect(autores_usb.isValid(data2)).resolves.toBe(true);
  });
});
