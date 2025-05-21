import { describe, it, expect } from 'vitest';
import { premio } from "../validation";
import { omitField } from "/tests/helpers/forms";

describe("premio schema", () => {
  const base = {
    fecha: new Date(),
    institucion: "USB"
  };

  it("valida objeto válido", async () => {
    await expect(premio.isValid(base)).resolves.toBe(true);
  });

  it("requiere campos obligatorios", async () => {
    for (const field of ["fecha", "institucion"]) {
      const data = omitField(base, field);
      // eslint-disable-next-line no-await-in-loop
      await expect(premio.isValid(data)).resolves.toBe(false);
    }
  });

  it("fecha debe ser una fecha válida", async () => {
    const data = { ...base, fecha: "no-fecha" };
    await expect(premio.isValid(data)).resolves.toBe(false);
  });
});
