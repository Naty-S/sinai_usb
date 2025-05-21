import { describe, it, expect } from 'vitest';
import { proyecto_investigacion } from "../validation";
import { omitField } from "/tests/helpers/forms";

describe("proyecto_investigacion schema", () => {
  const base = {
    fecha_inicio: new Date(),
    institucion: "USB",
    meses_duracion: 12,
    moneda: "$ (USD)",
    monto: 10000
  };

  it("valida objeto válido", async () => {
    await expect(proyecto_investigacion.isValid(base)).resolves.toBe(true);
  });

  it("requiere campos obligatorios", async () => {
    for (const field of ["fecha_inicio", "institucion", "meses_duracion", "moneda", "monto"]) {
      const data = omitField(base, field);
      // eslint-disable-next-line no-await-in-loop
      await expect(proyecto_investigacion.isValid(data)).resolves.toBe(false);
    }
  });

  it("fecha_inicio debe ser una fecha válida", async () => {
    const data = { ...base, fecha_inicio: "no-fecha" };
    await expect(proyecto_investigacion.isValid(data)).resolves.toBe(false);
  });

  it("meses_duracion y monto deben ser números positivos", async () => {
    await expect(proyecto_investigacion.isValid({ ...base, meses_duracion: -1 })).resolves.toBe(false);
    await expect(proyecto_investigacion.isValid({ ...base, meses_duracion: 0 })).resolves.toBe(false);
    await expect(proyecto_investigacion.isValid({ ...base, meses_duracion: 2.5 })).resolves.toBe(false);
    await expect(proyecto_investigacion.isValid({ ...base, monto: -1 })).resolves.toBe(false);
  });
});
