import { test, expect } from '@playwright/test';

import { loginAs, routes } from './helpers/frontend.js';


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: JEFE o REPRESENTANTE DE DEPARTAMENTO
// --------------------------------------------------------------------------------------
test.describe('Rol: Jefe/Representante de Departamento', () => {
  // test.beforeEach(async ({ page }) => {
  //   await loginAs(page, 'dep_chief');
  // });
  
  // test('JD-1. Debe mostrar resumen de actividades por año y tipo', async ({ page }) => {
  //   await page.goto(routes.actividades_departamento_chief);
  //   // Busca la tabla de resumen (ResumeRank)
  //   await expect(page.locator('#resume_table')).toBeVisible();
  //   // Verifica columnas de año y tipo de actividad
  //   await expect(page.getByText(/Actividad/)).toBeVisible();
  //   // Verifica que muestra el total
  //   await expect(page.getByText(/Total/)).toBeVisible();
  // });

  // test('JD-2. Validar/Desvalidar actividades de profesores de su departamento (si el rol lo permite)', async ({ page }) => {
  //   // Similar a JD-1, ir a la lista de actividades del departamento.
  //   // Encontrar una actividad pendiente de validación.
  //   // Hacer clic en "Validar", confirmar en el modal.
  //   // Verificar el mensaje de "Actividad Validada con Éxito !!!".
  //   // (Lógica de botones y modales de group_activities.svelte)
  // });

  // test('SP-JD-2.1. (Sad Path) Intentar validar una actividad ya validada (o desvalidar una no validada)', async ({ page }) => {
  //   const jefeDeptoId = 'ID_DEPARTAMENTO_DEL_JEFE_DE_PRUEBA';
  //   await page.goto(`/sinai/actividades/departamento/${jefeDeptoId}`);
  //   // ASUNCIÓN: Encontrar una actividad que ya esté validada y tenga el botón "Desvalidar"
  //   // O encontrar una no validada y botón "Validar", y luego intentar la acción opuesta sin recargar.
  //   // Esto es más complejo y depende de cómo se actualice la UI.
  //   // Simplificación: forzar un estado donde la acción no debería proceder.
  //   // Podría requerir un mock de API si el botón se deshabilita/oculta correctamente.
  //   // Si el botón está visible pero la acción falla en backend:
  //   const actividadValidada = page.locator('.activity-item:has-text("Validada por")').first(); // Una ya validada
  //   if (await actividadValidada.isVisible()) {
  //     // No hay botón "Validar", pero si intentáramos forzarlo o si el botón "Desvalidar" falla:
  //     // Supongamos que el botón "Desvalidar" está y lo clicamos, pero backend dice "ya está desvalidada"
  //     // await actividadValidada.getByRole('button', { name: 'Desvalidar' }).click();
  //     // await page.locator('div.ui.modal.active button:has-text("Si")').click();
  //     // const errorModal = page.locator('div.ui.modal.active').filter({hasText: /Hubo un problema/});
  //     // await expect(errorModal).toBeVisible();
  //     // await expect(errorModal).toContainText(/La actividad ya se encuentra en el estado deseado/);
  //     console.warn('SP-JD-2.1: Escenario de error para validación/desvalidación es complejo de simular sin control de datos preciso.');
  //   }
  // });

  // test('JD-3. Visualizar lista de "Profesores sin Actividades" (entity_without_acts.svelte)', async ({ page }) => {
  //   // ASUNCIÓN: Hay profesores registrados que no tienen ninguna actividad.
  //   // La ruta donde se usa este componente puede variar.
  //   // Podría ser parte de una página de estadísticas o reportes para administradores.
  //   // Supongamos que existe una ruta /sinai/reportes/profesores-sin-actividades
  //   await page.goto('/sinai/reportes/profesores-sin-actividades'); // RUTA HIPOTÉTICA

  //   // entity_without_acts.svelte muestra:
  //   // "{entity == "grupo" ? "Grupos" : "Profesores"} sin Actividades ({entities_without_acts.length})"
  //   const tituloSeccion = page.getByRole('heading', { name: /Profesores sin Actividades \(\d+\)/ });
  //   await expect(tituloSeccion).toBeVisible();

  //   // Si la lista no está vacía, se debería ver al menos un nombre de profesor.
  //   const countMatch = (await tituloSeccion.textContent())?.match(/\((\d+)\)/);
  //   const count = countMatch ? parseInt(countMatch[1]) : 0;

  //   if (count > 0) {
  //     // Se espera que haya elementos <ListItem> o similar dentro de una lista
  //     expect(await page.locator('ul > li').count()).toBeGreaterThan(0); // Ajustar selector si la lista es diferente
  //   } else {
  //     console.warn('No hay profesores sin actividades para listar, la prueba puede ser menos efectiva.');
  //     // Se podría esperar un mensaje de "No hay profesores sin actividades."
  //     await expect(page.getByText(/No hay profesores sin actividades para mostrar/i)).toBeVisible(); // Mensaje hipotético
  //   }
  // });
  // test('Debe mostrar resumen de actividades por profesor', async ({ page }) => {
  //   // Verifica que hay enlaces a los profesores
  //   const profLinks = await page.locator('a.profesor-link').all();
  //   expect(profLinks.length).toBeGreaterThan(0);
  //   // Verifica que muestran cantidad de actividades por profesor
  //   for (const link of profLinks) {
  //     await link.click();
  //     await expect(page.getByRole('table', { name: /actividades del profesor/i })).toBeVisible();
  //     await page.goBack();
  //   }
  // });

  // test('JD-4. Visualizar "Profesores con Actividades" y verificar formato de tabla (resume_table.svelte)', async ({ page }) => {
  //   // ASUNCIÓN: Hay profesores con actividades.
  //   // La ruta puede ser /sinai/consultas/actividades o similar donde se use entity_with_acts.svelte y resume_table.svelte
  //   // Supongamos que vamos a una consulta de departamento que muestra esto.
  //   await page.goto('/sinai/actividades/departamento/ID_DEPARTAMENTO_CON_ACTIVIDADES'); // Ruta hipotética

  //   // entity_with_acts.svelte muestra:
  //   // {entity == "grupo" ? "Grupos" : "Profesores"} con Actividades ({entities_with_acts.length})
  //   await expect(page.getByRole('heading', { name: /Profesores con Actividades \(\d+\)/ })).toBeVisible();

  //   // Verificar encabezados de resume_table.svelte
  //   const tablaResumen = page.locator('table.ui.celled.table.resumen'); // Asumiendo clase de la tabla
  //   await expect(tablaResumen.locator('th', { hasText: 'Profesor' })).toBeVisible(); // O el primer header
  //   await expect(tablaResumen.locator('th', { hasText: 'Artículo en Revista' })).toBeVisible(); // Un tipo de actividad
  //   await expect(tablaResumen.locator('th', { hasText: 'Total' })).toBeVisible(); // El total por fila

  //   // Verificar que haya filas de datos y que los totales se calculen (al menos que existan)
  //   const primeraFilaDatos = tablaResumen.locator('tbody tr').first();
  //   await expect(primeraFilaDatos.locator('td').nth(0)).not.toBeEmpty(); // Nombre del profesor
  //   await expect(primeraFilaDatos.locator('td').last()).not.toBeEmpty(); // Total de la fila

  //   // Verificar fila de totales de columna
  //   await expect(tablaResumen.locator('tfoot tr td', { hasText: 'Total' }).first()).toBeVisible();
  //   await expect(tablaResumen.locator('tfoot tr td').last()).not.toBeEmpty(); // Gran total
  // });
});
