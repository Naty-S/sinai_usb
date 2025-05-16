import path from 'path'; // Para pruebas de subida de archivos
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { loginAs } from './helpers.js';



// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: DECANO (Algunas pueden superponerse con Coordinador/Jefe si los permisos son similares)
// --------------------------------------------------------------------------------------
// test.describe('Rol: Decano', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'dean');
// 	});

// 	test('D-1 (antes 5, 21). Visualización de "Validación de Nuevos Profesores" y enlace condicional del layout', async ({ page }) => {
// 		// Verificar enlace en layout
// 		await page.goto('/sinai');
// 		const verProfesoresLink = page.getByRole('link', { name: 'Ver Profesores' });
// 		await expect(verProfesoresLink).toBeVisible(); // Asumiendo que el decano de prueba tiene pending_professors
// 		await verProfesoresLink.click();
// 		// Verificar página
// 		await expect(page).toHaveURL(/\/sinai\/validaciones\/nuevos_profesores/);
// 		await expect(page.getByRole('heading', { name: 'Lista de profesores pendientes por validar' })).toBeVisible();
// 	});

// 	test('D-2 (antes 11). Validar un profesor pendiente', async ({ page }) => { /* ... */ });

// 	test('D-3 (antes 33). Rechazar un profesor pendiente', async ({ page }) => { /* ... */ });

// 	test('D-4 (antes 16). Modificar Jefe de Departamento en "Mesa Técnica"', async ({ page }) => { /* ... (y también Rep. de Depto) */ });
// 	// La prueba 16 original podría dividirse en dos: una para Jefe y otra para Representante.

// 	test('D-5. Visualizar resúmenes de actividades por División/Departamento/Coordinación', async ({ page }) => {
// 		await page.goto('/sinai'); // index.svelte de /sinai (el que muestra links a Coordinaciones y Divisiones)
// 		await expect(page.getByRole('heading', { name: 'Coordinaciones' })).toBeVisible();
// 		await expect(page.getByRole('heading', { name: 'Divisiones' })).toBeVisible();

// 		// Probar un enlace a una coordinación
// 		const primeraCoordLink = page.locator('div.ui.cards a[href*="/sinai/actividades/coordinacion/"]').first();
// 		if (await primeraCoordLink.isVisible()) {
// 			await primeraCoordLink.click();
// 			await expect(page.getByRole('heading', { name: /Resumen de Actividades.*Coordinación/ })).toBeVisible();
// 		} else {
// 			console.warn('No hay coordinaciones listadas para probar.');
// 		}
// 	});

// 	test('D-6. Consultar actividades por Profesor, Grupo, Departamento, División, Coordinación (rol Decano)', async ({ page }) => {
// 		await page.goto('/sinai/consultas/actividades');
// 		// Probar un tipo de búsqueda, ej. por Departamento
// 		await page.getByLabel('Departamento', { exact: true }).check();
// 		await page.locator('input[list="options_department_name"]').fill('DECANATO DE INVESTIGACIÓN Y DESARROLLO'); // Nombre de depto. existente
// 		await page.getByRole('button', { name: 'Filtrar' }).click();
// 		await expect(page.getByText(/Resumen de Actividades para Departamento:/i)).toBeVisible();
// 	});

// 	test('D-7. Modificar el período BRA desde el Navbar (modal modify_bra_period.svelte)', async ({ page }) => {
// 		await page.goto('/sinai'); // O cualquier página con el navbar principal
// 		// Asumo que hay un botón/link en el navbar principal (index.svelte de navbar) para esto
// 		const menuAdmin = page.getByRole('button', { name: 'Administración' }); // Botón hipotético en navbar
// 		if (!await menuAdmin.isVisible()) {
// 			console.warn('Botón "Administración" no visible para el Decano, saltando prueba D-7.');
// 			return;
// 		}
// 		await menuAdmin.click();
// 		await page.getByRole('menuitem', { name: 'Modificar Período BRA' }).click(); // Item hipotético

// 		const modalBra = page.locator('div.ui.modal.active').filter({ hasText: 'Modificar Período BRA' });
// 		await expect(modalBra).toBeVisible();
// 		const nuevaFechaInicio = faker.date.recent().toISOString().split('T')[0];
// 		await modalBra.locator('input[name="inicio"]').fill(nuevaFechaInicio);
// 		await modalBra.getByRole('button', { name: 'Guardar' }).click(); // O "Modificar"

// 		await expect(modalBra.getByText('Período BRA modificado con éxito!!!')).toBeVisible();
// 		await modalBra.getByRole('button', { name: 'Ok' }).click();
// 	});
// });

// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: COORDINADOR (Académico o de Investigación)
// --------------------------------------------------------------------------------------
// test.describe('Rol: Coordinador', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'coordinator'); // Asumiendo un rol 'coordinator'
// 	});

// 	test('C-1 (antes 13). Tomar decisión en "Evaluar PREPRAII" (Aprobar)', async ({ page }) => { /* ... */ });

// 	test('C-2 (antes 18). Asignar Jurado a Solicitud S1 Novel', async ({ page }) => { /* ... */ });

// 	test('C-3. Evaluar Solicitud S1 Novel (tomar decisión con observaciones)', async ({ page }) => {
// 		await page.goto('/sinai/s1_novel/evaluar');
// 		const primeraSolicitud = page.locator('.ui.segment.raised:has-text("Tomar Decisión")').first(); // Que permita tomar decisión
// 		if (!await primeraSolicitud.isVisible()) {
// 			console.warn('No hay solicitudes S1 Novel para tomar decisión.'); return;
// 		}
// 		await primeraSolicitud.getByRole('button', { name: 'Tomar Decisión' }).click();

// 		// En el formulario de decision.svelte (para S1 Novel)
// 		await page.locator('textarea[name="s1_novel.observaciones_evaluador"]').fill('Observaciones del coordinador: proyecto viable.');
// 		// Asumir radios para Veredicto (Aprobado, Rechazado, etc.)
// 		await page.getByLabel('Aprobado por el Coordinador').check(); // Radio hipotético
// 		await page.getByRole('button', { name: 'Tomar Decisión' }).last().click(); // Botón del form de decisión

// 		const modalExito = page.locator('div.ui.modal.active').filter({ hasText: /Evaluación realizada con éxito!!!/ });
// 		await expect(modalExito).toBeVisible();
// 		await modalExito.getByRole('button', { name: 'Ok' }).click();
// 	});

// 	test('C-4 (antes 29). Reasignar Coordinador en Histórico PREPRAII (si el coordinador es el mismo profesor)', async ({ page }) => { /* ... */ });

// 	test('C-5. Visualizar lista de coordinadores y modificar uno (si es un super-coordinador o admin)', async ({ page }) => {
// 		// Esta funcionalidad (index.svelte de /sinai/coordinadores) podría ser más para un rol Admin/Decano.
// 		// Si un Coordinador puede modificar OTROS coordinadores, se prueba aquí.
// 		// Si solo puede ver la lista, se simplifica la prueba.
// 		await page.goto('/sinai/coordinadores');
// 		await expect(page.getByRole('heading', { name: 'Lista de Coordinadores' })).toBeVisible();
// 		// ... (lógica para modificar si aplica al rol) ...
// 	});
// });


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: JEFE o REPRESENTANTE DE DEPARTAMENTO
// --------------------------------------------------------------------------------------
// test.describe('Rol: Jefe/Representante de Departamento', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'departmentHead'); // O 'departmentRep'
// 	});

// 	test('JD-1. Visualizar actividades de su departamento', async ({ page }) => {
// 		// La ruta podría ser /sinai/actividades/departamento/[ID_DEL_DEPARTAMENTO_DEL_JEFE]
// 		// Este ID necesitaría obtenerse después del login o ser parte de los datos del usuario de prueba.
// 		const jefeDeptoId = 'ID_DEPARTAMENTO_DEL_JEFE_DE_PRUEBA'; // Este ID debe ser dinámico o conocido
// 		await page.goto(`/sinai/actividades/departamento/${jefeDeptoId}`);
// 		await expect(page.getByRole('heading', { name: /Resumen de Actividades.*Departamento/ })).toBeVisible();
// 		// Verificar que se muestren actividades (year_activities.svelte o group_activities.svelte)
// 		await expect(page.locator('.activity-item').first()).toBeVisible(); // Asumiendo esta clase
// 	});

// 	test('JD-2. Validar/Desvalidar actividades de profesores de su departamento (si el rol lo permite)', async ({ page }) => {
// 		// Similar a JD-1, ir a la lista de actividades del departamento.
// 		// Encontrar una actividad pendiente de validación.
// 		// Hacer clic en "Validar", confirmar en el modal.
// 		// Verificar el mensaje de "Actividad Validada con Éxito !!!".
// 		// (Lógica de botones y modales de group_activities.svelte)
// 	});

// 	test('JD-3. Visualizar la página BRA departamental', async ({ page }) => {
// 		// /sinai/BRA/departamento/[id].svelte
// 		const jefeDeptoId = 'ID_DEPARTAMENTO_DEL_JEFE_DE_PRUEBA';
// 		await page.goto(`/sinai/BRA/departamento/${jefeDeptoId}`);
// 		await expect(page.getByRole('heading', { name: 'Vista BRA Departamental' })).toBeVisible();
// 		await expect(page.getByText(/Número total de profesores de su departamento registrados/)).toBeVisible();
// 	});
// });


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: JEFE DE DIVISIÓN
// --------------------------------------------------------------------------------------
// test.describe('Rol: Jefe de División', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'divisionHead');
// 	});

// 	test('JV-1. Visualizar actividades de su división', async ({ page }) => {
// 		// La ruta podría ser /sinai/actividades/division/[ID_DE_LA_DIVISION_DEL_JEFE]
// 		const jefeDivisionId = 'ID_DIVISION_DEL_JEFE_DE_PRUEBA';
// 		await page.goto(`/sinai/actividades/division/${jefeDivisionId}`);
// 		await expect(page.getByRole('heading', { name: /Resumen de Actividades.*División/ })).toBeVisible();
// 		await expect(page.locator('.activity-item').first()).toBeVisible();
// 	});

// 	// Otras pruebas podrían ser similares a las de Jefe de Departamento, pero a nivel de División.
// });

// --- PRUEBAS GENERALES DE UI/UX (Pueden correr con cualquier rol logueado que tenga acceso) ---
// test.describe('Funcionalidad General de UI/UX (Usuario Autenticado)', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'professor'); // Un rol genérico para estas pruebas
// 	});

// 	test('G-1 (antes 19). Botón "To Top" aparece al hacer scroll y funciona', async ({ page }) => { /* ... */ });
// 	test('G-2 (antes 20). Paginación en una lista extensa (ej: consulta de actividades)', async ({ page }) => { /* ... */ });
// 	test('G-3 (antes 27). Navegación a través de un submenu del navbar', async ({ page }) => { /* ... */ });
// 	test('G-4 (antes 37). Interacción con modal "Crear Actividad": seleccionar tipo y cancelar', async ({ page }) => { /* ... */ });
// 	test('G-5 (antes 39). "Limpiar" en formulario con campos dinámicos (Autores)', async ({ page }) => { /* ... */ });
// });



// --------------------------------------------------------------------------------------
// ROL: DECANO
// --------------------------------------------------------------------------------------
// test.describe('Rol: Decano', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'dean');
// 	});

// 	test('D-1. (Happy Path) Visualización de "Validación de Nuevos Profesores" y enlace condicional', async ({ page }) => { /* ... */ });
// 	test('D-2. (Happy Path) Validar un profesor pendiente', async ({ page }) => { /* ... */ });
// 	test('D-3. (Happy Path) Rechazar un profesor pendiente', async ({ page }) => { /* ... */ });
// 	test('D-4. (Happy Path) Modificar Jefe de Departamento en "Mesa Técnica"', async ({ page }) => { /* ... */ });

// 	test('SP-D-4.1. (Sad Path) Intentar modificar Jefe de Depto. en Mesa Técnica seleccionando un profesor inválido (o no seleccionando)', async ({ page }) => {
// 		await page.goto('/sinai/mesa_tecnica');
// 		const primerDepartamento = page.locator('.ui.segment', { hasText: /Departamento/ }).first();
// 		await primerDepartamento.getByRole('button', { name: 'Modificar' }).first().click(); // Botón para Jefe

// 		const modalModificar = page.locator('div.ui.modal.active').filter({ hasText: 'Modificar Jefe de Departamento' });
// 		await expect(modalModificar).toBeVisible();
// 		// No seleccionar nada o intentar una opción inválida si es posible
// 		await modalModificar.getByRole('button', { name: 'Si' }).click(); // Intentar guardar sin cambiar/con opción inválida

// 		// ASUNCIÓN: Error en el modal o en la página. El modal puede cerrarse y mostrar notif.
// 		// O un error dentro del modal si la validación es ahí.
// 		const errorModalAccion = page.locator('div.ui.modal.active').filter({ hasText: /Hubo un error al intentar cambiar la mesa técnica/ });
// 		await expect(errorModalAccion).toBeVisible();
// 		await expect(errorModalAccion).toContainText(/Debe seleccionar un profesor válido/); // Mensaje hipotético
// 	});


// 	test('D-5. (Happy Path) Visualizar resúmenes de actividades por División/Coordinación', async ({ page }) => { /* ... */ });
// 	test('D-6. (Happy Path) Consultar actividades por Profesor, Grupo, etc.', async ({ page }) => { /* ... */ });
// 	test('D-7. (Happy Path) Modificar el período BRA desde el Navbar', async ({ page }) => { /* ... */ });

// 	test('SP-D-7.1. (Sad Path) Modificar Período BRA con fechas inválidas (ej: inicio después de fin)', async ({ page }) => {
// 		await page.goto('/sinai');
// 		const menuAdmin = page.getByRole('button', { name: 'Administración' });
// 		if (!await menuAdmin.isVisible()) { console.warn('Botón Admin no visible, saltando SP-D-7.1'); return; }
// 		await menuAdmin.click();
// 		await page.getByRole('menuitem', { name: 'Modificar Período BRA' }).click();

// 		const modalBra = page.locator('div.ui.modal.active').filter({ hasText: 'Modificar Período BRA' });
// 		await modalBra.locator('input[name="inicio"]').fill('2025-12-01');
// 		await modalBra.locator('input[name="fin"]').fill('2025-01-01'); // Fecha fin anterior a inicio
// 		await modalBra.getByRole('button', { name: 'Guardar' }).click();

// 		const errorModalAccion = page.locator('div.ui.modal.active').filter({ hasText: /Hubo un problema al intentar modificar el período BRA/ });
// 		await expect(errorModalAccion).toBeVisible();
// 		await expect(errorModalAccion).toContainText(/La fecha de inicio no puede ser posterior a la fecha de fin/); // Mensaje hipotético
// 	});
// });

// --------------------------------------------------------------------------------------
// ROL: COORDINADOR
// --------------------------------------------------------------------------------------
// test.describe('Rol: Coordinador', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'coordinator');
// 	});

// 	test('C-1. (Happy Path) Tomar decisión en "Evaluar PREPRAII" (Aprobar)', async ({ page }) => { /* ... */ });

// 	test('SP-C-1.1. (Sad Path) Intentar tomar decisión en "Evaluar PREPRAII" sin observaciones o sin seleccionar estado', async ({ page }) => {
// 		await page.goto('/sinai/prepraii/evaluar');
// 		const primeraSolicitud = page.locator('.ui.fluid.styled.accordion .title').first();
// 		await primeraSolicitud.click();
// 		const contenidoExpandido = primeraSolicitud.locator('+ .content.active');
// 		if (!await contenidoExpandido.getByRole('button', { name: 'Tomar Decisión' }).isVisible()) {
// 			console.warn('SP-C-1.1: No hay solicitudes PREPRAII para tomar decisión.'); return;
// 		}
// 		await contenidoExpandido.getByRole('button', { name: 'Tomar Decisión' }).click();

// 		// No llenar observaciones, no seleccionar estado
// 		await page.getByRole('button', { name: 'Tomar Decisión' }).last().click();

// 		// ASUNCIÓN: Errores de validación en el formulario de decisión.
// 		await expect(page.locator('.field.error', { hasText: 'Mis obervaciones' })).toBeVisible();
// 		await expect(page.locator('.field.error:has(select[name="estado_decision"])')).toBeVisible(); // O similar para el select/radios de estado
// 	});

// 	test('C-2. (Happy Path) Asignar Jurado a Solicitud S1 Novel', async ({ page }) => { /* ... */ });

// 	test('SP-C-2.1. (Sad Path) Intentar asignar Jurado a S1 Novel sin seleccionar ningún jurado', async ({ page }) => {
// 		await page.goto('/sinai/s1_novel/evaluar');
// 		const solicitudSinJurado = page.locator('.ui.segment.raised:has-text("Asignar Jurado")').first();
// 		if (!await solicitudSinJurado.isVisible()) { console.warn('SP-C-2.1: No hay S1 Novel sin jurado.'); return; }
// 		await solicitudSinJurado.getByRole('button', { name: 'Asignar Jurado' }).click();

// 		// No agregar ningún jurado
// 		await page.getByRole('button', { name: 'Guardar' }).click(); // Botón de submit del form de jurado

// 		const errorModal = page.locator('div.ui.modal.active').filter({ hasText: 'Error' }); // Modal de error genérico
// 		await expect(errorModal).toBeVisible();
// 		await expect(errorModal).toContainText(/Debe asignar al menos un jurado/i);
// 	});

// 	test('C-3. (Happy Path) Evaluar Solicitud S1 Novel (tomar decisión)', async ({ page }) => { /* ... */ });
// 	test('C-4. (Happy Path) Reasignar Coordinador en Histórico PREPRAII', async ({ page }) => { /* ... */ });
// 	test('C-5. (Happy Path) Visualizar lista de coordinadores', async ({ page }) => { /* ... */ });
// });

// --------------------------------------------------------------------------------------
// ROL: JEFE o REPRESENTANTE DE DEPARTAMENTO
// --------------------------------------------------------------------------------------
// test.describe('Rol: Jefe/Representante de Departamento', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'departmentHead');
// 	});

// 	test('JD-1. (Happy Path) Visualizar actividades de su departamento', async ({ page }) => { /* ... */ });
// 	test('JD-2. (Happy Path) Validar/Desvalidar actividades de profesores de su departamento', async ({ page }) => { /* ... */ });

// 	test('SP-JD-2.1. (Sad Path) Intentar validar una actividad ya validada (o desvalidar una no validada)', async ({ page }) => {
// 		const jefeDeptoId = 'ID_DEPARTAMENTO_DEL_JEFE_DE_PRUEBA';
// 		await page.goto(`/sinai/actividades/departamento/${jefeDeptoId}`);
// 		// ASUNCIÓN: Encontrar una actividad que ya esté validada y tenga el botón "Desvalidar"
// 		// O encontrar una no validada y botón "Validar", y luego intentar la acción opuesta sin recargar.
// 		// Esto es más complejo y depende de cómo se actualice la UI.
// 		// Simplificación: forzar un estado donde la acción no debería proceder.
// 		// Podría requerir un mock de API si el botón se deshabilita/oculta correctamente.
// 		// Si el botón está visible pero la acción falla en backend:
// 		const actividadValidada = page.locator('.activity-item:has-text("Validada por")').first(); // Una ya validada
// 		if (await actividadValidada.isVisible()) {
// 			// No hay botón "Validar", pero si intentáramos forzarlo o si el botón "Desvalidar" falla:
// 			// Supongamos que el botón "Desvalidar" está y lo clicamos, pero backend dice "ya está desvalidada"
// 			// await actividadValidada.getByRole('button', { name: 'Desvalidar' }).click();
// 			// await page.locator('div.ui.modal.active button:has-text("Si")').click();
// 			// const errorModal = page.locator('div.ui.modal.active').filter({hasText: /Hubo un problema/});
// 			// await expect(errorModal).toBeVisible();
// 			// await expect(errorModal).toContainText(/La actividad ya se encuentra en el estado deseado/);
// 			console.warn('SP-JD-2.1: Escenario de error para validación/desvalidación es complejo de simular sin control de datos preciso.');
// 		}
// 	});

// 	test('JD-3. (Happy Path) Visualizar la página BRA departamental', async ({ page }) => { /* ... */ });
// });

// --------------------------------------------------------------------------------------
// ROL: JEFE DE DIVISIÓN
// --------------------------------------------------------------------------------------
// test.describe('Rol: Jefe de División', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'divisionHead');
// 	});
// 	test('JV-1. (Happy Path) Visualizar actividades de su división', async ({ page }) => { /* ... */ });
// 	// Pruebas de error para Jefe de División serían similares a las de Jefe de Depto,
// 	// pero aplicadas a las vistas y acciones de nivel de división.
// });


// --------------------------------------------------------------------------------------
// PRUEBAS GENERALES DE UI/UX (Rol genérico)
// --------------------------------------------------------------------------------------
// test.describe('Funcionalidad General de UI/UX (Usuario Autenticado)', () => {
// 	test.beforeEach(async ({ page }) => {
// 		await loginAs(page, 'professor');
// 	});

// 	test('G-1. (Happy Path) Botón "To Top" aparece al hacer scroll y funciona', async ({ page }) => { /* ... */ });
// 	test('G-2. (Happy Path) Paginación en una lista extensa', async ({ page }) => { /* ... */ });
// 	// No hay un "sad path" obvio para la paginación a menos que los datos fallen en cargar
// 	// o los botones estén incorrectamente deshabilitados.

// 	test('G-3. (Happy Path) Navegación a través de un submenu del navbar', async ({ page }) => { /* ... */ });
// 	test('G-4. (Happy Path) Interacción con modal "Crear Actividad": seleccionar tipo y cancelar', async ({ page }) => { /* ... */ });
// 	test('G-5. (Happy Path) "Limpiar" en formulario con campos dinámicos (Autores)', async ({ page }) => { /* ... */ });
// });
