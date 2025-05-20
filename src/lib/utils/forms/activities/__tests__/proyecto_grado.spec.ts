import { describe, it, expect } from 'vitest';
import { proyecto_grado } from "../validation";
import { omitField } from "/tests/helpers/forms";

describe("proyecto_grado schema", () => {
  const base = {
    coordinacion_academica: "Computación",
    fecha_defensa: new Date(),
    nivel_academico: "Doctorado",
    titulo_academico: "Dr. en Ciencias"
  };

  it("valida objeto válido", async () => {
    await expect(proyecto_grado.isValid(base)).resolves.toBe(true);
  });

  it("requiere campos obligatorios", async () => {
    for (const field of ["coordinacion_academica", "fecha_defensa", "nivel_academico", "titulo_academico"]) {
      const data = omitField(base, field);
      // eslint-disable-next-line no-await-in-loop
      await expect(proyecto_grado.isValid(data)).resolves.toBe(false);
    }
  });

  it("nivel_academico solo acepta valores válidos", async () => {
    const data = { ...base, nivel_academico: "Otro" };
    await expect(proyecto_grado.isValid(data)).resolves.toBe(false);
  });

  it("fecha_defensa debe ser una fecha válida", async () => {
    const data = { ...base, fecha_defensa: "no-fecha" };
    await expect(proyecto_grado.isValid(data)).resolves.toBe(false);
  });
});
