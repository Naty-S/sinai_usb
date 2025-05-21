import { describe, it, expect } from 'vitest';
import { memoria } from '../validation';
import { omitField } from '/tests/helpers/forms';

const base = {
  ciudad: "Caracas",
  con_estudiantes: true,
  congreso: "Congreso Venezolano de Ciencia",
  fecha: new Date(),
  formato: "CD",
  isbn: "978-3-16-148410-0",
  medio_publicacion: "En línea",
  pag_final: "100",
  pag_inicial: "90",
  paginas: 10,
  pais: "Venezuela",
  tipo_congreso: "Nacional",
  volumen: "IV"
};

describe('memoria schema', () => {

  it('valida un objeto completo y válido', async () => {
    await expect(memoria.isValid(base)).resolves.toBe(true);
  });

  it('requiere campos obligatorios', async () => {
    for (const field of [
      'ciudad',
      'con_estudiantes',
      'congreso',
      'fecha',
      'formato',
      'paginas',
      'pais',
      'tipo_congreso'
    ]) {
      const data = omitField(base, field);
      // eslint-disable-next-line no-await-in-loop
      await expect(memoria.isValid(data)).resolves.toBe(false);
    }
  });

  it('con_estudiantes debe ser booleano estricto', async () => {
    const data = { ...base, con_estudiantes: "sí" };
    await expect(memoria.isValid(data)).resolves.toBe(false);
  });

  it('formato solo acepta valores válidos', async () => {
    const data = { ...base, formato: "Impreso" };
    await expect(memoria.isValid(data)).resolves.toBe(false);
  });

  it('tipo_congreso solo acepta valores válidos', async () => {
    const data = { ...base, tipo_congreso: "Regional" };
    await expect(memoria.isValid(data)).resolves.toBe(false);
  });

  it('fecha debe ser un objeto Date válido', async () => {
    const data = { ...base, fecha: "no-fecha" };
    await expect(memoria.isValid(data)).resolves.toBe(false);
  });

  it('paginas debe ser entero positivo mayor a 0', async () => {
    const dataNeg = { ...base, paginas: -1 };
    const dataCero = { ...base, paginas: 0 };
    const dataDecimal = { ...base, paginas: 10.5 };
    await expect(memoria.isValid(dataNeg)).resolves.toBe(false);
    await expect(memoria.isValid(dataCero)).resolves.toBe(false);
    await expect(memoria.isValid(dataDecimal)).resolves.toBe(false);
  });

  it('isbn, medio_publicacion, pag_final, pag_inicial, volumen pueden ser null', async () => {
    const data = {
      ...base,
      isbn: null,
      medio_publicacion: null,
      pag_final: null,
      pag_inicial: null,
      volumen: null
    };
    await expect(memoria.isValid(data)).resolves.toBe(true);
  });
});
