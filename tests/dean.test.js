import path from 'path'; // Para pruebas de subida de archivos
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { loginAs, routes, testUsers } from './helpers/frontend.js';


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: DECANO (Algunas pueden superponerse con Coordinador/Jefe si los permisos son similares)
// --------------------------------------------------------------------------------------
test.describe('Rol: Decano', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'dean');
  });

  // TODO: add for coord
  test('D-1. Visualización de "Validación de Nuevos Profesores" y enlace condicional del layout', async ({ page }) => {
    // Verificar enlace en layout
    await page.goto('/sinai');
    const verProfesoresLink = page.getByRole('link', { name: 'Ver Profesores' });
    await expect(verProfesoresLink).toBeVisible(); // Asumiendo que el decano de prueba tiene pending_professors
    await verProfesoresLink.click();
    // Verificar página
    await expect(page).toHaveURL(/\/sinai\/validaciones\/nuevos_profesores/);
    await expect(page.getByRole('heading', { name: 'Lista de profesores pendientes por validar' })).toBeVisible();
  });

  // TODO: add for coord
  test('D-2. Validar un profesor pendiente', async ({ page }) => {
    await page.goto('/sinai/validaciones/nuevos_profesores');
    await expect(page.getByRole('heading', { name: 'Lista de profesores pendientes por validar' })).toBeVisible();

    // Localizar el primer profesor pendiente (o uno específico si conoces su correo/perfil)
    const primerProfesorSegment = page.locator('section').first();
    const perfilProfesor = await primerProfesorSegment.locator('div.ten.wide.column').textContent(); // Obtener el perfil para el modal
    const nombreProfesor = perfilProfesor ? perfilProfesor.replace('.', '') : 'Profesor Desconocido';
    // await primerProfesorSegment.locator('div.uk-accordion-title.title').click(); // Expandir el segmento del profesor
    // const emailProfesor = (await primerProfesorSegment.locator('div.item.content', { hasText: /Correo:/ }).textContent())
    //   .replace('Correo: ', '');

    await primerProfesorSegment.getByRole('button', { name: 'Validar' }).click();

    // Confirmar en el modal de validación (de nuevos_profesores.svelte)
    const modalValidacion = page.locator('div.ui.modal.active, div.ui.modal.visible')
      .filter({ hasText: /Está seguro\(a\) que quiere VALIDAR a este Profesor?/ });
    await expect(modalValidacion).toBeVisible();
    await expect(modalValidacion).toContainText(nombreProfesor);
    await modalValidacion.getByRole('button', { name: 'Validar' }).click();

    // Verificar mensaje de éxito
    await expect(page).toHaveURL(/validado=/);
    const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Validado con éxito!!!/ });
    await expect(modalExito).toBeVisible();
    // await expect(modalExito).toContainText(emailProfesor);
    await modalExito.getByRole('button', { name: 'Ok' }).click(); // Asumiendo texto del botón

    // Opcional: verificar que el profesor ya no aparezca como pendiente (requiere que la lista se actualice)
    await expect(page.locator('section', { hasText: nombreProfesor }).first()).not.toBeVisible();
  });

  // TODO: add for coord
  test('D-3. Rechazar un profesor pendiente', async ({ page }) => {
    await page.goto('/sinai/validaciones/nuevos_profesores');

    const primerProfesorSegment = page.locator('section').first();
    const perfilProfesor = await primerProfesorSegment.locator('div.ten.wide.column').textContent(); // Obtener el perfil para el modal
    const nombreProfesor = perfilProfesor ? perfilProfesor.replace('.', '') : 'Profesor Desconocido';
    // await primerProfesorSegment.locator('div.uk-accordion-title.title').click(); // Expandir el segmento del profesor
    // const emailProfesor = (await primerProfesorSegment.locator('div.item.content', { hasText: /Correo:/ }).textContent())
    //   .replace('Correo: ', '');

    await primerProfesorSegment.getByRole('button', { name: 'Rechazar' }).click();

    // Confirmar en el modal de rechazo (de nuevos_profesores.svelte)
    const modalRechazo = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Ésta acción eliminara de forma permanente al Profesor del sistema!!!/ });
    await expect(modalRechazo).toBeVisible();
    await expect(modalRechazo).toContainText(nombreProfesor);
    await modalRechazo.getByRole('button', { name: 'Rechazar' }).click(); // Confirmar rechazo

    // Verificar mensaje de éxito del rechazo
    const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /RECHAZADO!!!/ });
    await expect(modalExito).toBeVisible();
    // await expect(modalExito).toContainText(emailProfesor);
    await modalExito.getByRole('button', { name: 'Ok' }).click(); // Asumiendo texto del botón

    // Opcional: verificar que el profesor ya no aparezca como pendiente (requiere que la lista se actualice)
    await expect(page.locator('section', { hasText: nombreProfesor }).first()).not.toBeVisible();
  });

  test('D-4. Modificar Jefe de Departamento en "Mesa Técnica"', async ({ page }) => {
    // ASUNCIÓN: Usuario logueado con permisos de admin/decano.
    await page.goto('/sinai/mesa_tecnica');
    await expect(page.getByRole('heading', { name: 'Mesa Técnica' })).toBeVisible();

    // Localizar el primer departamento y hacer clic en "Modificar" para el Jefe
    const primerDepartamento = page.locator('.ui.segment', { hasText: /Departamento/ }).first();
    await primerDepartamento.getByRole('button', { name: 'Modificar' }).first().click(); // Botón para Jefe

    // En el modal (de mesa_tecnica.svelte)
    const modalModificar = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Modificar Jefe/ });
    await expect(modalModificar).toBeVisible();
    // Seleccionar un nuevo jefe del select (asumiendo que 'professors' se carga)
    await modalModificar.locator('select').selectOption({ index: 1 }); // Seleccionar el segundo profesor de la lista
    await modalModificar.getByRole('button', { name: 'Modificar' }).click();

    // Verificar mensaje de éxito
    const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Jefe modificado con éxito!!!/ });
    await expect(modalExito).toBeVisible();
    await modalExito.getByRole('button', { name: 'Ok' }).click();
    // Opcional: verificar que el nombre del jefe haya cambiado en la lista.
  });

  // test('SP-D-4.1. (Sad Path) Intentar modificar Jefe de Depto. en Mesa Técnica seleccionando un profesor inválido (o no seleccionando)', async ({ page }) => {
  //   await page.goto('/sinai/mesa_tecnica');
  //   const primerDepartamento = page.locator('.ui.segment', { hasText: /Departamento/ }).first();
  //   await primerDepartamento.getByRole('button', { name: 'Modificar' }).first().click(); // Botón para Jefe

  //   const modalModificar = page.locator('div.ui.modal.active').filter({ hasText: 'Modificar Jefe' });
  //   await expect(modalModificar).toBeVisible();
  //   // No seleccionar nada o intentar una opción inválida si es posible
  //   await modalModificar.locator('select').selectOption({ value: '-1' });
  //   await modalModificar.getByRole('button', { name: 'Modifical' }).click();

  //   // ASUNCIÓN: Error en el modal o en la página. El modal puede cerrarse y mostrar notif.
  //   // O un error dentro del modal si la validación es ahí.
  //   const errorModalAccion = page.locator('div.ui.modal.active').filter({ hasText: /Error/ });
  //   await expect(errorModalAccion).toBeVisible();
  //   await expect(errorModalAccion).toContainText(/Hubo un error al intentar cambiar la mesa técnica/);
  // });

  test('D-5. Visualizar resúmenes de actividades por División/Departamento/Coordinación', async ({ page }) => {
    await page.goto('/sinai'); // index.svelte de /sinai (el que muestra links a Coordinaciones y Divisiones)
    await expect(page.getByRole('heading', { name: 'Coordinaciones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Divisiones' })).toBeVisible();

    // Probar un enlace a una coordinación
    const primeraCoordLink = page.getByRole('button', { name: 'Ver resumen de actividades' }).first();
    if (await primeraCoordLink.isVisible()) {
      await primeraCoordLink.click();
      await expect(page).toHaveURL(/\/sinai\/actividades\/coordinacion/);
      await expect(page.getByRole('heading', { name: /Actividades en el sistema de la Coordinación/ })).toBeVisible();
    } else {
      console.warn('No hay coordinaciones listadas para probar.');
    }
  });


  // test('D-6. Modificar el período BRA desde el Navbar (modal modify_bra_period.svelte)', async ({ page }) => {
  //   await page.goto('/sinai'); // O cualquier página con el navbar principal
  //   // Asumo que hay un botón/link en el navbar principal (index.svelte de navbar) para esto
  //   const menuAdmin = page.getByRole('button', { name: 'Administración' }); // Botón hipotético en navbar
  //   if (!await menuAdmin.isVisible()) {
  //     console.warn('Botón "Administración" no visible para el Decano, saltando prueba D-7.');
  //     return;
  //   }
  //   await menuAdmin.click();
  //   await page.getByRole('menuitem', { name: 'Modificar Período BRA' }).click(); // Item hipotético

  //   const modalBra = page.locator('div.ui.modal.active').filter({ hasText: 'Modificar Período BRA' });
  //   await expect(modalBra).toBeVisible();
  //   const nuevaFechaInicio = faker.date.recent().toISOString().split('T')[0];
  //   await modalBra.locator('input[name="inicio"]').fill(nuevaFechaInicio);
  //   await modalBra.getByRole('button', { name: 'Guardar' }).click(); // O "Modificar"

  //   await expect(modalBra.getByText('Período BRA modificado con éxito!!!')).toBeVisible();
  //   await modalBra.getByRole('button', { name: 'Ok' }).click();
  // });

  // test('SP-D-6.1. (Sad Path) Modificar Período BRA con fechas inválidas (ej: inicio después de fin)', async ({ page }) => {
  //   await page.goto('/sinai');
  //   const menuAdmin = page.getByRole('button', { name: 'Administración' });
  //   if (!await menuAdmin.isVisible()) { console.warn('Botón Admin no visible, saltando SP-D-7.1'); return; }
  //   await menuAdmin.click();
  //   await page.getByRole('menuitem', { name: 'Modificar Período BRA' }).click();

  //   const modalBra = page.locator('div.ui.modal.active').filter({ hasText: 'Modificar Período BRA' });
  //   await modalBra.locator('input[name="inicio"]').fill('2025-12-01');
  //   await modalBra.locator('input[name="fin"]').fill('2025-01-01'); // Fecha fin anterior a inicio
  //   await modalBra.getByRole('button', { name: 'Guardar' }).click();

  //   const errorModalAccion = page.locator('div.ui.modal.active').filter({ hasText: /Hubo un problema al intentar modificar el período BRA/ });
  //   await expect(errorModalAccion).toBeVisible();
  //   await expect(errorModalAccion).toContainText(/La fecha de inicio no puede ser posterior a la fecha de fin/); // Mensaje hipotético
  // });

  /* test('D-7 (antes 29). Reasignar Coordinador en Histórico PREPRAII (si el coordinador es el mismo profesor)', async ({ page }) => {
    // ASUNCIÓN: Usuario con permisos, existe una solicitud PREPRAII donde el evaluador es el mismo que el profesor.
    await page.goto('/sinai/prepraii'); // index.svelte de PREPRAII
    await expect(page.getByText('Convocatoria Actual')).toBeVisible();

    // Encontrar una solicitud que tenga el botón "Reasignar Coordinador"
    // Esto ocurre si s.Evaluador.correo == s.Profesor.correo
    const botonReasignar = page.locator('button:has-text("Reasignar Coordinador")').first();
    if (await botonReasignar.isVisible()) {
      await botonReasignar.click();

      // En el modal de reasignación (de reasign.svelte)
      const modalReasignar = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Reasignar Coordinador/ });
      await expect(modalReasignar).toBeVisible();
      // Seleccionar un nuevo coordinador de la lista (select)
      await modalReasignar.locator('select').selectOption({ index: 1 }); // Elegir el segundo de la lista (asumiendo que no es el mismo)
      await modalReasignar.getByRole('button', { name: 'Si' }).click();

      // Verificar mensaje de éxito
      const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Coordinador reasignado con éxito!!!/ });
      await expect(modalExito).toBeVisible();
      await modalExito.getByRole('button', { name: 'Ok' }).click();
      // Opcional: Verificar que el evaluador haya cambiado en la solicitud.
    } else {
      console.warn('No se encontró botón "Reasignar Coordinador" para probar.');
    }
  }); */

  /* test('15. Visualizar y expandir detalles en "Histórico PREPRAII"', async ({ page }) => {
    // ASUNCIÓN: Usuario logueado.
    await page.goto('/sinai/prepraii'); // index.svelte de prepraii
    await expect(page.getByRole('heading', { name: 'Histórico PREPRAII' })).toBeVisible();

    // Verificar la sección "Convocatoria Actual" y "Convocatorias Anteriores"
    await expect(page.getByText('Convocatoria Actual')).toBeVisible();
    await expect(page.getByText('Convocatorias Anteriores')).toBeVisible();

    // Expandir una solicitud de una convocatoria anterior
    const primeraConvocatoriaAnterior = page.locator('.ui.fluid.styled.accordion', { hasText: 'Convocatorias Anteriores' }).first();
    const primeraSolicitudAnterior = primeraConvocatoriaAnterior.locator('.title').first();
    if (await primeraSolicitudAnterior.isVisible()) {
      await primeraSolicitudAnterior.click();
      const contenido = primeraSolicitudAnterior.locator('+ .uk-accordion-content.uk-open, + .content.active');
      await expect(contenido.getByText(/Profesor solicitante:/)).toBeVisible();
      await expect(contenido.getByText(/Titulo del artículo:/)).toBeVisible();
    } else {
      console.log('No hay convocatorias anteriores con solicitudes para probar expansión.');
    }
  }); */

  /* test('17. Pagar una solicitud PREPRAII aprobada y pendiente de pago', async ({ page }) => {
    // ASUNCIÓN: Usuario con permisos para pagar y existe una solicitud aprobada y no pagada.
    await page.goto('/sinai/prepraii/pagos');
    await expect(page.getByRole('heading', { name: 'Pagos PREPRAII' })).toBeVisible();

    // Localizar una solicitud con estado "Aprobado" y botón "Pagar"
    const solicitudAPagar = page.locator('.ui.segment.raised', { hasText: 'Aprobado' }).locator('button:has-text("Pagar")').first();
    if (await solicitudAPagar.isVisible()) {
      const tituloArticulo = await page.locator('.ui.segment.raised', { hasText: 'Aprobado' }).first().locator('h4', { hasText: /Titulo del artículo:/ }).textContent();
      await solicitudAPagar.click();

      // En el modal de confirmación de pago (de pay.svelte)
      const modalPago = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /¿Esá seguro que desea pagar esta solicitud?/ });
      await expect(modalPago).toBeVisible();
      if (tituloArticulo) await expect(modalPago).toContainText(tituloArticulo.replace('Titulo del artículo:', '').trim());
      await modalPago.getByRole('button', { name: 'Si' }).click();

      // Verificar mensaje de éxito
      const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Solicitud pagada con éxito!!!/ });
      await expect(modalExito).toBeVisible();
      await modalExito.getByRole('button', { name: 'Ok' }).click();
      // Opcional: Verificar que la solicitud ya no aparezca como "Pagar" o cambie su estado.
    } else {
      console.log('No hay solicitudes PREPRAII pendientes de pago para probar.');
    }
  }); */

  // test('D-8. Visualizar lista de coordinadores y modificar uno', async ({ page }) => {
  //   // Esta funcionalidad (index.svelte de /sinai/coordinadores) podría ser más para un rol Admin/Decano.
  //   // Si un Coordinador puede modificar OTROS coordinadores, se prueba aquí.
  //   // Si solo puede ver la lista, se simplifica la prueba.
  //   await page.goto('/sinai/coordinadores');
  //   await expect(page.getByRole('heading', { name: 'Lista de Coordinadores' })).toBeVisible();
  //   // ... (lógica para modificar si aplica al rol) ...
  // });
});
