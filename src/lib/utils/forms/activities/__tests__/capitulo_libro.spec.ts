import { describe, it, expect } from 'vitest';
import { capitulo_libro } from '../validation';
import { omitField } from '/tests/helpers/forms';

const baseData = {
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
};

describe('capitulo_libro activity schema (capitulo_libro) validations', () => {
  it('should validate a correct capitulo_libro object', async () => {
    await expect(capitulo_libro.isValid({ ...baseData })).resolves.toBe(true);
  });

  it('should fail if titulo_libro is missing', async () => {
    const data = omitField(baseData, 'titulo_libro');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if editorial is missing', async () => {
    const data = omitField(baseData, 'editorial');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if fecha is missing', async () => {
    const data = omitField(baseData, 'fecha');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if isbn is missing', async () => {
    const data = omitField(baseData, 'isbn');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if pais is missing', async () => {
    const data = omitField(baseData, 'pais');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if editores is empty', async () => {
    const data = { ...baseData, editores: [] };
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if pag_inicial is missing', async () => {
    const data = omitField(baseData, 'pag_inicial');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if pag_final is missing', async () => {
    const data = omitField(baseData, 'pag_final');
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should fail if ciudad is empty', async () => {
    const data = { ...baseData, ciudad: "" };
    await expect(capitulo_libro.isValid(data)).resolves.toBe(false);
  });

  it('should allow pais distinto a Venezuela', async () => {
    const data = { ...baseData, pais: "Argentina" };
    await expect(capitulo_libro.isValid(data)).resolves.toBe(true);
  });

  it('should allow aceptado and articulo_invitado to be false', async () => {
    const data = { ...baseData, aceptado: false, articulo_invitado: false };
    await expect(capitulo_libro.isValid(data)).resolves.toBe(true);
  });
});
