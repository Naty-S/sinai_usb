import { describe, it, expect } from 'vitest';
import { libro } from '../validation';
import { omitField } from '/tests/helpers/forms';

const baseData = {
  aceptado: false,
  ciudad: "Caracas",
  editorial: "Editorial Ejemplo",
  fecha: "2024-01-01",
  isbn: "123-45678-9012-3",
  pais: "Venezuela",
};

describe('libro activity schema (libro) validations', () => {
  it('should validate a correct libro object', async () => {
    await expect(libro.isValid({ ...baseData })).resolves.toBe(true);
  });

  it('should fail if titulo is not boolean', async () => {
    const dataTrue = { ...baseData, aceptado: 'no bool' };
    await expect(libro.isValid(dataTrue)).resolves.toBe(false);
  });

  it('should allow aceptado to be true or false', async () => {
    const dataTrue = { ...baseData, aceptado: true };
    const dataFalse = { ...baseData, aceptado: false };
    await expect(libro.isValid(dataTrue)).resolves.toBe(true);
    await expect(libro.isValid(dataFalse)).resolves.toBe(true);
  });

  it('should fail if editorial is missing', async () => {
    const data = omitField(baseData, 'editorial');
    await expect(libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if fecha is missing', async () => {
    const data = omitField(baseData, 'fecha');
    await expect(libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if isbn is missing', async () => {
    const data = omitField(baseData, 'isbn');
    await expect(libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if pais is missing', async () => {
    const data = omitField(baseData, 'pais');
    await expect(libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail id ciudad is empty', async () => {
    const data = { ...baseData, ciudad: "" };
    await expect(libro.isValid(data)).resolves.toBe(false);
  });

  it('should allow pais distinto a Venezuela', async () => {
    const data = { ...baseData, pais: "Argentina" };
    await expect(libro.isValid(data)).resolves.toBe(true);
  });
});
