import path from 'path'; // Para pruebas de subida de archivos
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { loginAs, routes, testUsers } from './helpers/frontend.js';


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: COORDINADOR (Académico o de Investigación)
// --------------------------------------------------------------------------------------
test.describe('Rol: Coordinador', () => {
  // test.beforeEach(async ({ page }) => {
  //   await loginAs(page, 'coordinator'); // Asumiendo un rol 'coordinator'
  // });

  /* test('C-1 (antes 13). Tomar decisión en "Evaluar PREPRAII" (Aprobar)', async ({ page }) => {
    // ASUNCIÓN: Usuario logueado es evaluador y hay solicitudes PREPRAII pendientes.
    await page.goto('/sinai/prepraii/evaluar');
    const primeraSolicitud = page.locator('.ui.fluid.styled.accordion .title').first();
    await primeraSolicitud.click(); // Expandir

    const contenidoExpandido = primeraSolicitud.locator('+ .uk-accordion-content.uk-open, + .content.active');
    await contenidoExpandido.getByRole('button', { name: 'Tomar Decisión' }).click();

    // Dentro del formulario de decisión (decision.svelte dentro de prepraii/evaluar)
    await expect(page.getByRole('heading', { name: 'Tomar Decisión' })).toBeVisible();
    await page.locator('div.field:has-text("Mis obervaciones") >> input').fill('Evaluación completa, solicitud aprobada.');
    // Seleccionar "Aprobado" (asumiendo un radio o select)
    await page.getByLabel('Aprobado').check(); // Si es un radio
    // await page.locator('select[name="decision_estado"]').selectOption('Aprobado'); // Si es un select

    await page.getByRole('button', { name: 'Tomar Decisión' }).last().click(); // Botón del formulario de decisión

    // Verificar mensaje de éxito
    const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Evaluación realizada con éxito!!!/ });
    await expect(modalExito).toBeVisible();
    await modalExito.getByRole('button', { name: 'Ok' }).click();
  }); */

  /* test('SP-C-1.1. (Sad Path) Intentar tomar decisión en "Evaluar PREPRAII" sin observaciones o sin seleccionar estado', async ({ page }) => {
    await page.goto('/sinai/prepraii/evaluar');
    const primeraSolicitud = page.locator('.ui.fluid.styled.accordion .title').first();
    await primeraSolicitud.click();
    const contenidoExpandido = primeraSolicitud.locator('+ .content.active');
    if (!await contenidoExpandido.getByRole('button', { name: 'Tomar Decisión' }).isVisible()) {
      console.warn('SP-C-1.1: No hay solicitudes PREPRAII para tomar decisión.'); return;
    }
    await contenidoExpandido.getByRole('button', { name: 'Tomar Decisión' }).click();

    // No llenar observaciones, no seleccionar estado
    await page.getByRole('button', { name: 'Tomar Decisión' }).last().click();

    // ASUNCIÓN: Errores de validación en el formulario de decisión.
    await expect(page.locator('.field.error', { hasText: 'Mis obervaciones' })).toBeVisible();
    await expect(page.locator('.field.error:has(select[name="estado_decision"])')).toBeVisible(); // O similar para el select/radios de estado
  }); */

  // test('C-2. Asignar Jurado a Solicitud S1 Novel', async ({ page }) => {
  //   // ASUNCIÓN: Usuario logueado con permisos, y existe una solicitud S1 Novel sin jurado.
  //   await page.goto(routes.evaluar_s1_novel); // Página de evaluación de S1 Novel
  //   await expect(page.getByRole('heading', { name: 'Evaluar S1 Novel' })).toBeVisible();

  //   // Encontrar una solicitud que permita asignar jurado (botón "Asignar Jurado")
  //   const solicitudSinJurado = page.locator('.ui.segment.raised', { hasText: /Asignar Jurado/ }).first(); // Busca un segmento con ese botón
  //   if (await solicitudSinJurado.isVisible()) {
  //     await solicitudSinJurado.getByRole('button', { name: 'Asignar Jurado' }).click();

  //     // Dentro del formulario de asignación de jurado (jury.svelte dentro de s1_novel/evaluar)
  //     await expect(page.getByRole('heading', { name: 'Asignar Jurado' })).toBeVisible();
  //     // Añadir un jurado USB
  //     await page.getByRole('button', { name: 'Agregar Profesor' }).first().click(); // Para USB
  //     await page.locator('.field:has-text("Jurado USB")').getByRole('combobox').fill('Profesor Jurado Uno'); // Ajustar selector
  //     // await page.locator('input[name="jurado_usb[0].nombre"]').fill('Profesor Jurado Uno');

  //     await page.getByRole('button', { name: 'Guardar' }).click(); // O el texto del botón de submit del jurado

  //     // Verificar mensaje de éxito
  //     const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Jurado asignado con éxito!!!/ });
  //     await expect(modalExito).toBeVisible();
  //     await modalExito.getByRole('button', { name: 'Ok' }).click();
  //   } else {
  //     console.log('No hay solicitudes S1 Novel sin jurado para probar.');
  //   }
  // });

  // test('SP-C-2.1. (Sad Path) Intentar asignar Jurado a S1 Novel sin seleccionar ningún jurado', async ({ page }) => {
  //   await page.goto('/sinai/s1_novel/evaluar');
  //   const solicitudSinJurado = page.locator('.ui.segment.raised:has-text("Asignar Jurado")').first();
  //   if (!await solicitudSinJurado.isVisible()) { console.warn('SP-C-2.1: No hay S1 Novel sin jurado.'); return; }
  //   await solicitudSinJurado.getByRole('button', { name: 'Asignar Jurado' }).click();

  //   // No agregar ningún jurado
  //   await page.getByRole('button', { name: 'Guardar' }).click(); // Botón de submit del form de jurado

  //   const errorModal = page.locator('div.ui.modal.active').filter({ hasText: 'Error' }); // Modal de error genérico
  //   await expect(errorModal).toBeVisible();
  //   await expect(errorModal).toContainText(/Debe asignar al menos un jurado/i);
  // });

  // test('C-3. Evaluar Solicitud S1 Novel (tomar decisión con observaciones)', async ({ page }) => {
  //   await page.goto('/sinai/s1_novel/evaluar');
  //   const primeraSolicitud = page.locator('.ui.segment.raised:has-text("Tomar Decisión")').first(); // Que permita tomar decisión
  //   if (!await primeraSolicitud.isVisible()) {
  //     console.warn('No hay solicitudes S1 Novel para tomar decisión.'); return;
  //   }
  //   await primeraSolicitud.getByRole('button', { name: 'Tomar Decisión' }).click();

  //   // En el formulario de decision.svelte (para S1 Novel)
  //   await page.locator('textarea[name="s1_novel.observaciones_evaluador"]').fill('Observaciones del coordinador: proyecto viable.');
  //   // Asumir radios para Veredicto (Aprobado, Rechazado, etc.)
  //   await page.getByLabel('Aprobado por el Coordinador').check(); // Radio hipotético
  //   await page.getByRole('button', { name: 'Tomar Decisión' }).last().click(); // Botón del form de decisión

  //   const modalExito = page.locator('div.ui.modal.active').filter({ hasText: /Evaluación realizada con éxito!!!/ });
  //   await expect(modalExito).toBeVisible();
  //   await modalExito.getByRole('button', { name: 'Ok' }).click();
  // });


  /* test('7. Expandir detalles de una solicitud PREPRAII en la página de evaluación (rol evaluador)', async ({ page }) => {
    // ASUNCIÓN: Usuario logueado es evaluador y hay solicitudes PREPRAII.
    await page.goto('/sinai/prepraii/evaluar');
    await expect(page.getByRole('heading', { name: 'Evaluar PREPRAII' })).toBeVisible();

    // Localizar el primer acordeón/sección de solicitud y hacer clic para expandir
    // El selector dependerá de cómo se generan los IDs o clases para cada solicitud
    const primeraSolicitud = page.locator('.ui.fluid.styled.accordion .title').first();
    await primeraSolicitud.click();

    // Verificar que se muestren detalles dentro del contenido del acordeón expandido
    const contenidoExpandido = primeraSolicitud.locator('+ .uk-accordion-content.uk-open, + .content.active'); // Ajustar si la estructura es diferente
    await expect(contenidoExpandido.getByText(/Observaciones:/)).toBeVisible();
    await expect(contenidoExpandido.getByText(/Artículo: Ver\/Descargar/)).toBeVisible();
  }); */

  // TODO: decano también
  // test('9. Verificar visualización de "Lista de Grupos de Investigación"', async ({ page }) => {
  //   await page.goto('/sinai/grupos'); // Asumiendo que esta es la ruta del `index.svelte` de grupos
  //   await expect(page.getByRole('heading', { name: 'Lista de Grupos de Investigación' })).toBeVisible();
  //   // Podrías verificar la estructura de una "tarjeta" de grupo si hay datos
  //   // const primerGrupo = page.locator('.ui.segments .segment', { hasText: /Jefe:/ }).first();
  //   // await expect(primerGrupo).toBeVisible();
  // });
});
