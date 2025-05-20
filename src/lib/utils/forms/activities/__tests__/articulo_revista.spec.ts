import { describe, it, expect } from 'vitest';
import { articulo_revista } from '../validation';
import { omitField } from '/tests/helpers/forms';

const base = {
  articulo_invitado: true,
  con_estudiantes: false,
  estado: "Publicado",
  fecha_publicacion: new Date(),
  indice: "WOS",
  pag_final: "15",
  pag_inicial: "10",
  paginas: 6,
  revista: "Revista de Ejemplo",
  volumen: "5"
};

describe('articulo_revista schema', () => {
  it('valida un objeto completo y válido', async () => {
    await expect(articulo_revista.isValid(base)).resolves.toBe(true);
  });

  it('requiere campos obligatorios', async () => {
    for (const field of ['articulo_invitado', 'con_estudiantes', 'estado', 'pag_final', 'pag_inicial', 'revista', 'volumen']) {
      const data = omitField(base, field);
      // eslint-disable-next-line no-await-in-loop
      await expect(articulo_revista.isValid(data)).resolves.toBe(false);
    }
  });

  it('requiere fecha_publicacion si estado es "Publicado"', async () => {
    const sinFecha = omitField(base, 'fecha_publicacion');
    await expect(articulo_revista.isValid(sinFecha)).resolves.toBe(false);
  });

  it('no requiere fecha_publicacion si estado es "Aceptado_via_publicacion"', async () => {
    const data = { ...base, estado: "Aceptado_via_publicacion" };
    const sinFecha = omitField(data, 'fecha_publicacion');
    await expect(articulo_revista.isValid(sinFecha)).resolves.toBe(true);
  });

  it('solo acepta valores válidos para estado', async () => {
    const data = { ...base, estado: "En revisión" };
    await expect(articulo_revista.isValid(data)).resolves.toBe(false);
  });

  it('articulo_invitado y con_estudiantes deben ser booleanos estrictos', async () => {
    const data1 = { ...base, articulo_invitado: "sí" };
    const data2 = { ...base, con_estudiantes: 1 };
    await expect(articulo_revista.isValid(data1)).resolves.toBe(false);
    await expect(articulo_revista.isValid(data2)).resolves.toBe(false);
  });

  it('paginas debe ser null o un entero positivo mayor a 0', async () => {
    const dataNull = { ...base, paginas: null };
    const dataNeg = { ...base, paginas: -2 };
    const dataDecimal = { ...base, paginas: 2.5 };
    const dataCero = { ...base, paginas: 0 };
    await expect(articulo_revista.isValid(dataNull)).resolves.toBe(true);
    await expect(articulo_revista.isValid(dataNeg)).resolves.toBe(false);
    await expect(articulo_revista.isValid(dataDecimal)).resolves.toBe(false);
    await expect(articulo_revista.isValid(dataCero)).resolves.toBe(false);
  });

  it('indice puede ser null', async () => {
    const data = { ...base, indice: null };
    await expect(articulo_revista.isValid(data)).resolves.toBe(true);
  });
});
