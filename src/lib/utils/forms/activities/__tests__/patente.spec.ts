import { describe, it, expect } from 'vitest';
import { patente } from "../validation";
import { omitField } from "/tests/helpers/forms";

describe("patente schema", () => {
  const base = {
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
    numero: "US1234567B2",
    pais: "Venezuela"
  };

  it("valida objeto válido", async () => {
    await expect(patente.isValid(base)).resolves.toBe(true);
  });

  it("requiere todos los campos obligatorios", async () => {
    for (const field of ["fecha_fin", "fecha_inicio", "numero", "pais"]) {
      const data = omitField(base, field);
      // eslint-disable-next-line no-await-in-loop
      await expect(patente.isValid(data)).resolves.toBe(false);
    }
  });

  it("fecha_inicio y fecha_fin deben ser fechas válidas", async () => {
    const data = { ...base, fecha_inicio: "no-fecha" };
    await expect(patente.isValid(data)).resolves.toBe(false);
    const data2 = { ...base, fecha_fin: "no-fecha" };
    await expect(patente.isValid(data2)).resolves.toBe(false);
  });
});
