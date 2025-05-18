import { describe, it, expect } from "vitest";
import { articulo_revista } from "../validation";


describe("articulo_revista schema", () => {
  it("valida un objeto correcto", async () => {
    const valid = {
      articulo_invitado: false,
      con_estudiantes: true,
      estado: "Publicado",
      fecha_publicacion: "2024-10-01",
      indice: "SCI",
      pag_final: "20",
      pag_inicial: "10",
      paginas: 11,
      revista: "Revista Científica",
      volumen: "42",
    };
    await expect(articulo_revista.isValid(valid)).resolves.toBe(true);
  });

  it("falla si falta un campo requerido", async () => {
    const invalid = {
      articulo_invitado: false,
      con_estudiantes: true,
      estado: "Publicado",
      fecha_publicacion: "2024-10-01",
      indice: "SCI",
      pag_final: "20",
      // pag_inicial: "10", // Falta
      paginas: 11,
      revista: "Revista Científica",
      volumen: "42",
    };
    await expect(articulo_revista.isValid(invalid)).resolves.toBe(false);
  });

  it("falla si paginas no es entero o es negativo", async () => {
    const negative = {
      articulo_invitado: false,
      con_estudiantes: true,
      estado: "Publicado",
      fecha_publicacion: "2024-10-01",
      indice: "SCI",
      pag_final: "20",
      pag_inicial: "10",
      paginas: -5,
      revista: "Revista Científica",
      volumen: "42",
    };
    const decimal = {
      ...negative,
      paginas: 2.5,
    };
    await expect(articulo_revista.isValid(negative)).resolves.toBe(false);
    await expect(articulo_revista.isValid(decimal)).resolves.toBe(false);
  });

  it("falla si estado no es válido", async () => {
    const invalidEstado = {
      articulo_invitado: false,
      con_estudiantes: true,
      estado: "En_revision",
      fecha_publicacion: "2024-10-01",
      indice: "SCI",
      pag_final: "20",
      pag_inicial: "10",
      paginas: 11,
      revista: "Revista Científica",
      volumen: "42",
    };
    await expect(articulo_revista.isValid(invalidEstado)).resolves.toBe(false);
  });

  it("falla si articulo_invitado no es booleano", async () => {
    const notBool = {
      articulo_invitado: 1,
      con_estudiantes: true,
      estado: "Publicado",
      fecha_publicacion: "2024-10-01",
      indice: "SCI",
      pag_final: "20",
      pag_inicial: "10",
      paginas: 11,
      revista: "Revista Científica",
      volumen: "42",
    };
    await expect(articulo_revista.isValid(notBool)).resolves.toBe(false);
  });

  it("permite campos nulos/omitidos donde corresponde", async () => {
    const test = {
      articulo_invitado: false,
      con_estudiantes: false,
      estado: "Aceptado_via_publicacion",
      fecha_publicacion: null,
      indice: null,
      pag_final: "22",
      pag_inicial: "19",
      paginas: null,
      revista: "Otra Revista",
      volumen: "1",
    };
    await expect(articulo_revista.isValid(test)).resolves.toBe(true);
  });
});
