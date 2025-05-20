import { describe, it, expect } from 'vitest';
import { evento } from '../validation';
import { omitField } from '/tests/helpers/forms';

const baseData = {
  ciudad: "Caracas",
  fecha: "2024-01-01",
  institucion: "USB",
  internacional: false,
  modalidad: "Cartel",
  nombre: "Nombre del evento",
  pais: "Venezuela"
};

describe('evento activity schema (evento) validations', () => {
  it('should validate a correct evento object', async () => {
    await expect(evento.isValid({ ...baseData })).resolves.toBe(true);
  });

  it('should fail if nombre is missing', async () => {
    const data = omitField(baseData, 'nombre');
    await expect(evento.isValid(data)).resolves.toBe(false);
  });

  it('should fail if fecha is missing', async () => {
    const data = omitField(baseData, 'fecha');
    await expect(evento.isValid(data)).resolves.toBe(false);
  });

  it('should allow institucion to be null', async () => {
    const data = { ...baseData, institucion: null };
    await expect(evento.isValid(data)).resolves.toBe(true);
  });

  it('should allow internacional to be true or false', async () => {
    const dataTrue = { ...baseData, internacional: true };
    const dataFalse = { ...baseData, internacional: false };
    await expect(evento.isValid(dataTrue)).resolves.toBe(true);
    await expect(evento.isValid(dataFalse)).resolves.toBe(true);
  });

  it('should allow modalidad to be "Cartel" or another valid value', async () => {
    const data = { ...baseData, modalidad: "Oral" };
    await expect(evento.isValid(data)).resolves.toBe(true);
  });

  it('should allow pais distinto a Venezuela', async () => {
    const data = { ...baseData, pais: "Argentina" };
    await expect(evento.isValid(data)).resolves.toBe(true);
  });

  it('should fail if ciudad is empty', async () => {
    const data = { ...baseData, ciudad: "" };
    await expect(evento.isValid(data)).resolves.toBe(false);
  });
});
