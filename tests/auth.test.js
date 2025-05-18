import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { loginAs, routes, deleteTestUser } from './helpers.js';
import { groups } from "$lib/utils/forms/activities/validation.ts";


// playwright.config.ts Debería estar configurado para usar tu auth.setup.ts si lo tienes.
// Ejemplo:
// projects: [
//   { name: 'setup', testMatch: /.*\.setup\.ts/ },
//   {
//     name: 'chromium',
//     use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/user.json' },
//     dependencies: ['setup'],
//   },
// ]


// --------------------------------------------------------------------------------------
// PRUEBAS DE AUTENTICACIÓN Y ACCESO PÚBLICO
// --------------------------------------------------------------------------------------
test.describe('Flujos de Autenticación y Acceso Público', () => {
	
	test.afterEach(async ({ page }) => {
		// Código para limpiar después de cada test
		// Ejemplo: cerrar sesión, borrar cookies, limpiar datos locales, etc.
		await page.context().clearCookies();
		await page.evaluate(() => localStorage.clear());
	});

	/* 	test('A-1. Intento de login fallido con USB ID incorrecto muestra error específico', async ({ page }) => {
		await page.goto('/sinai/login');
		await page.locator('div.field:has-text("USB ID") >> input').fill('id_incorrecto_conocido_por_no_existir');
		// await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
		// const errorModal = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Error al iniciar sesión/ });
		// await expect(errorModal).toBeVisible();
		// await expect(errorModal).toContainText(/Usuario no encontrado/);
		});
 */

	test('A-2. Registro completo de nuevo usuario muestra mensaje de éxito', async ({ page }) => {
		await page.goto('/sinai/registro');

		const cedula = `${faker.number.int({ min: 10000000, max: 30000000 })}`;
		const firstName = 'Playwright';
		const lastName = `Tester`;
		const email = `tester@usb.ve`;
		const perfil = `${lastName}, ${firstName}`;
		const dep = `${faker.number.int({ min: 2, max: 30 })}`;

		// --- Sección Datos Personales ---
		await page.locator('div.field:has-text("Cédula") >> input').fill(cedula);
		await page.locator('div.field:has-text("Primer Nombre") >> input').fill(firstName);
		await page.locator('div.field:has-text("Primer Apellido") >> input').fill(lastName);
		await page.locator('div.field:has-text("Perfil (sus artículos aparecerán con este nombre en el sistema)") >> input').fill(perfil);
		await page.locator('div.field:has-text("Sexo") >> select').selectOption({ label: 'F' });

		// --- Sección Datos de Contacto ---
		await page.locator('div.field:has-text("Correo") >> input').fill(email);

		// --- Sección Datos Académicos (del componente registro.svelte) ---
		// Para los selects, el valor exacto de la opción es importante.
		// Si los labels de las opciones son los mismos que los valores: { label: '...' }
		// Si los valores son diferentes (ej: IDs numéricos): { value: '...' }

		await page.locator('div.field:has-text("Categoría") >> select').selectOption({ label: 'Agregado' });
		await page.locator('div.field:has-text("Condición") >> select').selectOption({ label: 'Ordinario' });
		await page.locator('div.field:has-text("Dedicación") >> select').selectOption({ label: 'Convencional' });

		// Último Diploma Obtenido
		await page.locator('div.field:has-text("Último Diploma") >> select').selectOption({ label: 'Doctor' });
		await page.locator('div.field:has-text("Universidad donde lo obtuvo") >> input').fill(faker.company.name() + ' University');

		// Departamento
		await page.locator('div.field:has-text("Departamento") >> select').selectOption({ value: dep });

		// Enviar el formulario
		await page.getByRole('button', { name: 'Registrarse' }).click();

		// Verificar mensaje de registro exitoso
		await expect(page.getByText('Se ha registrado de forma exitosa en el sistema del SINAI.')).toBeVisible({ timeout: 10000 });

		//Verificar que el formulario ya no esté visible
		await expect(page.locator('div.field:has-text("Primer Nombre") >> input')).not.toBeVisible();
		
		// Eliminar usuario de prueba
		await deleteTestUser(page, email);
	});

	/* test('2.1 Validar mensaje error campo invalido', async ({ page }) => {
				// --- Sección Perfiles de Investigación (Orcid, Google Scholar, Research Gate) ---
			// Asumiendo que son inputs simples
			await page.locator('div.field:has-text("ID (Orcid)") >> input').fill(faker.string.uuid().substring(0, 19)); // Formato ORCID
			await page.locator('div.field:has-text("Link del Perfil (Orcid)") >> input').fill(`https://orcid.org/${faker.string.alphanumeric(4)}-${faker.string.alphanumeric(4)}-${faker.string.alphanumeric(4)}-${faker.string.alphanumeric(4)}`);
	
			await page.locator('div.field:has-text("ID (Google Schoolar)") >> input').fill(faker.string.alphanumeric(12));
			await page.locator('div.field:has-text("Link del Perfil (Google Schoolar)") >> input').fill(`https://scholar.google.com/citations?user=${faker.string.alphanumeric(12)}`);
	
			await page.locator('div.field:has-text("ID (Research Gate)") >> input').fill(faker.person.fullName().replace(' ', '_'));
			await page.locator('div.field:has-text("Link del Perfil (Research Gate)") >> input').fill(`https://www.researchgate.net/profile/${faker.person.fullName().replace(' ', '_')}`);
	
			await expect(page.getByLabel('USB ID')).toHaveAttribute('aria-invalid', 'true'); // O una clase de error
		});
	*/

	/* test('2.2 ', async ({ page }) => {
		 // PEI (Programa de Estímulo a la Innovación e Investigación) - condicional
			// Asumimos que hay un checkbox similar para PEI. Si no, se llenan directamente.
			// await page.getByLabel('¿Pertenece al PEI?').check();
			await page.locator('div.field:has-text("Número del PEI") >> input').fill(faker.string.alphanumeric(6).toUpperCase());
			// Nivel del PEI (select)
			await page.locator('div.field:has-text("Nivel del PEI") >> select').selectOption({ label: 'Candidato A' });
			await page.locator('div.field:has-text("Año de ingreso al PEI") >> input').fill(faker.date.past({ years: 3 }).getFullYear().toString());
		});
	*/
	
	/* test('2.3 ', async ({ page }) => {
		});
			// --- Sección Líneas de Investigación (dinámico, como en research_lines.svelte) ---
		const lineasSection = page.locator('fieldset:has-text("Líneas de Investigación")');
		await lineasSection.getByRole('button', { name: 'Agregar' }).click();
		await lineasSection.locator('input[type="text"]').first().fill('Pruebas E2E con Playwright');
		await lineasSection.getByRole('button', { name: 'Agregar' }).click();
		await lineasSection.locator('input[type="text"]').last().fill('Inteligencia Artificial en Testing');

	*/

	test('SP-A-2.1. (Sad Path) Registro con correo electrónico ya existente', async ({ page }) => {
		await page.goto('/sinai/registro');

		const cedula = `${faker.number.int({ min: 10000000, max: 30000000 })}`;
		const firstName = 'Playwright';
		const lastName = `Tester`;
		const perfil = `${lastName}, ${firstName}`;
		const dep = `${faker.number.int({ min: 2, max: 30 })}`;

		// Llenar todos los campos con datos válidos, EXCEPTO el email que ya existe
		await page.locator('div.field:has-text("Cédula") >> input').fill(cedula);
		await page.locator('div.field:has-text("Primer Nombre") >> input').fill(firstName);
		await page.locator('div.field:has-text("Primer Apellido") >> input').fill(lastName);
		await page.locator('div.field:has-text("Perfil (sus artículos aparecerán con este nombre en el sistema)") >> input').fill(perfil);
		await page.locator('div.field:has-text("Sexo") >> select').selectOption({ label: 'F' });

		// --- Sección Datos de Contacto ---
		await page.locator('div.field:has-text("Correo") >> input').fill('fflaviani@usb.ve');

		// --- Sección Datos Académicos (del componente registro.svelte) ---
		await page.locator('div.field:has-text("Categoría") >> select').selectOption({ label: 'Agregado' });
		await page.locator('div.field:has-text("Condición") >> select').selectOption({ label: 'Ordinario' });
		await page.locator('div.field:has-text("Dedicación") >> select').selectOption({ label: 'Convencional' });

		// Último Diploma Obtenido
		await page.locator('div.field:has-text("Último Diploma") >> select').selectOption({ label: 'Doctor' });
		await page.locator('div.field:has-text("Universidad donde lo obtuvo") >> input').fill(faker.company.name() + ' University');

		// Departamento
		await page.locator('div.field:has-text("Departamento") >> select').selectOption({ value: dep });

		// Enviar el formulario
		await page.getByRole('button', { name: 'Registrarse' }).click();

		const errorModal = page.locator('div.ui.modal.active, div.ui.modal.visible');
		await expect(errorModal).toBeVisible({ timeout: 10000 });
		await expect(errorModal.getByText('Error. P2002')).toBeVisible();
		await expect(errorModal.getByText('Hubo un problema al cargar el formulario o registro')).toBeVisible();
		await expect(errorModal.getByText('Ya se encuentra un registro con los datos proporcionados')).toBeVisible();
	});

	test('A-3. Acceso a ruta protegida sin autenticación muestra error y enlace a inicio', async ({ page }) => {
		
		// 1. Navegar a una ruta protegida de ejemplo
		await page.goto('/sinai/perfil');

		// 2. Verificar que NO se redirige a /sinai/login (la URL debe ser la ruta protegida)
		await expect(page).toHaveURL('/sinai/perfil');

		// 3. Verificar que se muestre el mensaje de error esperado.
		await expect(page.getByText('401')).toBeVisible();
		// await expect(page.getByText('Acceso denegado. Inicie sesión como profesor.')).toBeVisible();

		// 4. Verificar que el botón/enlace para "Volver a la página principal" esté visible.
		const volverButton = page.getByRole('button', { name: 'Volver a la página principal' });
		await expect(volverButton).toBeVisible();

		// 5. Verificar que no se muestren elementos del dashboard/ruta protegida.
		await expect(page.getByRole('heading', { name: 'Datos Personales' })).not.toBeVisible();

		// 6. Hacer clic en el botón y verificar que lleva a la página principal.
		await volverButton.click();
		await expect(page).toHaveURL('/sinai');
	});

	test('A-4. Verificar el contenido estático de la página informativa "SINAI" (sinai.svelte)', async ({ page }) => {
		// Este es el sinai.svelte de `lib/components/sinai.svelte`, que se usa en el index de la app.
		await page.goto('/sinai'); // Página de inicio de la app que usa el componente

		const sinaiComponent = page.locator('div.ui.segment');
		await expect(sinaiComponent.getByText(/El Decanato de Investigación y Desarrollo/)).toBeVisible();
		await expect(sinaiComponent.getByRole('link', { name: 'https://www.did.usb.ve' })).toHaveAttribute('href', 'https://www.did.usb.ve');
		await expect(sinaiComponent.getByRole('link', { name: 'https://www.usb.ve' })).toHaveAttribute('href', 'https://www.usb.ve');
		await expect(sinaiComponent.getByText(/Esta aplicación tiene como objetivo recopilar y reportar información/)).toBeVisible();
	});

	test('A-5. Filtrar actividades en "Consulta de Actividades"', async ({ page }) => {

		await page.goto('/sinai');
		await expect(page.getByRole('heading', { name: 'Consulta de Actividades' })).toBeVisible();

		const form = page.locator('form.ui.form'); // El formulario principal de consulta
		
		await form.getByLabel('Departamento', { exact: true }).check(); // Seleccionar tipo de búsqueda
		
		const depInput = form.locator('select');
		await depInput.selectOption({ value: '2' });
		
		// Llenar campos del filtro
		await page.locator('input[name="date_start"]').fill('2013-01-01');
		await page.locator('input[name="date_end"]').fill('2025-12-31');
		await page.locator('input[name="proyecto_grado"]').check();

		await form.getByRole('button', { name: 'Buscar' }).click();

		// Verificar que el resumen de actividades (resume_rank.svelte) se muestre para el departamento
		await expect(page.getByText(/Resumen de Actividades del Departamento/i)).toBeVisible();
		await expect(page.getByText(/Revistas/i).first()).toBeVisible();
		await expect(page.getByText(/Proyectos de Grado/i).first()).toBeVisible();


		// Aquí una aserción más específica sería verificar que una actividad conocida dentro del rango aparezca.
	});
});


// --------------------------------------------------------------------------------------
// PRUEBAS GENERALES DE UI/UX (Rol genérico)
// --------------------------------------------------------------------------------------

test.describe('Funcionalidad General de UI/UX (Usuario Autenticado)', () => {
	test.beforeEach(async ({ page }) => {
		await loginAs(page, 'professor');
	});

	test.afterEach(async ({ page }) => {
		// Código para limpiar después de cada test
		// Ejemplo: cerrar sesión, borrar cookies, limpiar datos locales, etc.
		await page.context().clearCookies();
		await page.evaluate(() => localStorage.clear());
	});

	test('G-1. Botón "To Top" aparece al hacer scroll y funciona', async ({ page }) => {

		await page.goto(routes.actividades_profesor);

		const toTopButton = page.locator('div.back-to-top');
		await expect(toTopButton).not.toBeVisible();

		// Hacer scroll hacia abajo
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await expect(toTopButton).toBeVisible(); // Ahora debería ser visible
		await toTopButton.click();

		// Verificar que la página haya hecho scroll hacia arriba
		await page.waitForFunction(() => window.scrollY === 0);
		expect(await page.evaluate(() => window.scrollY)).toBe(0);
	});

	test('G-2. Paginación en una lista extensa (consulta de actividades)', async ({ page }) => {

		await page.goto('/sinai/consultas/actividades');

		await page.getByLabel('Profesor', { exact: true }).check();
		await page.locator('select').selectOption({ label: 'Cardinale, Yudith' });
		await page.getByRole('button', { name: 'Buscar' }).click();
		await page.waitForSelector('#resume_table', { timeout: 10000 }); // Esperar que los resultados cargue

		const paginationControls = page.locator('#pagination');
		const siguienteButton = paginationControls.getByRole('button', { name: 'Siguiente' }).first();
		const atrasButton = paginationControls.getByRole('button', { name: 'Atrás' }).first();
		const indicadorPagina = paginationControls.locator('button.ui.button.green').nth(1); // El que muestra "start - end"

		if (await siguienteButton.isEnabled()) {
			const textoPaginaInicial = await indicadorPagina.textContent();
			await siguienteButton.click();
			await page.waitForTimeout(500); // Esperar recarga de datos
			const textoPaginaNueva = await indicadorPagina.textContent();

			expect(textoPaginaNueva).not.toBe(textoPaginaInicial); // El indicador de página debe cambiar

			await atrasButton.click();
			await page.waitForTimeout(500);
			expect(await indicadorPagina.textContent()).toBe(textoPaginaInicial); // Debería volver al estado inicial
		} else {
			console.warn('La paginación no tiene botón "Siguiente" habilitado, no se puede probar a fondo.');
		}
	});
	// No hay un "sad path" obvio para la paginación a menos que los datos fallen en cargar
	// o los botones estén incorrectamente deshabilitados.

	test('G-3. Navegación a través de un submenu del navbar (Consultas)', async ({ page }) => {
	  await page.goto(routes.actividades_profesor); // Página principal o dashboard

		await page.locator('#menu').hover();
		await page.getByRole('link', { name: 'Consultas', exact: true }).click();
		await page.getByRole('link', { name: 'Públicas' }).click();

	  await expect(page).toHaveURL('/sinai/consultas/actividades');
	  await expect(page.getByRole('heading', { name: 'Consulta de Actividades' })).toBeVisible();
	});

	test('G-4. Interacción con modal "Crear Actividad": seleccionar tipo y cancelar', async ({ page }) => {
		await page.goto(routes.actividades_profesor);
		await page.locator('#menu').hover();
		await page.getByRole('link', { name: 'Actividades', exact: true }).click();
		await page.getByRole('link', { name: 'Ingresar Nueva Actividad' }).click();

		const modalCrear = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Ingresar nueva actividad/ });
		await expect(modalCrear).toBeVisible();
		await expect(modalCrear.getByRole('link', { name: 'Artículos en Revistas' })).toBeVisible();

		await modalCrear.getByRole('button', { name: 'Cancelar' }).click();

		await expect(modalCrear).not.toBeVisible();
		await expect(page).toHaveURL(/\/sinai\/actividades/); // Debería seguir en la misma página
	});

	test('G-5. "Limpiar" en formulario con campos dinámicos (Autores)', async ({ page }) => {
		await page.goto('/sinai/actividades/crear/articulo_revista');

		const autoresUsbSection = page.locator('#usb_authors');
		await autoresUsbSection.getByRole('button', { name: 'Agregar Profesor' }).click();
		await autoresUsbSection.locator('div.field:has-text("Nombre Profesor") >> input').last().fill('Profesor A Limpiar 1');
		await autoresUsbSection.getByRole('button', { name: 'Agregar Estudiante' }).click();
		await autoresUsbSection.locator('div.field:has-text("Nombre Estudiante") >> input').fill('Estudiante A Limpiar 1');

		expect(await autoresUsbSection.locator('button:has-text("Elminar")').count()).toBe(3);

		await autoresUsbSection.getByRole('button', { name: 'Limpiar' }).click();
		expect(await autoresUsbSection.locator('button:has-text("Elminar")').count()).toBe(0);
		expect(await autoresUsbSection.locator('div.field:has-text("Nombre Profesor") >> input').count()).toBe(0);
	});

	// test('G-6. Visualización de la página de error personalizada (__error.svelte) ante un error de servidor', async ({ page }) => {
	//   // Para probar esto de forma fiable, necesitaríamos forzar un error del servidor.
	//   // Una forma es interceptar una petición API crítica y hacerla fallar.
	//   // O si tienes una ruta de prueba que deliberadamente lanza un error en su 'load' function.

	//   // Escenario: Interceptar una llamada a la API de actividades y simular un error 500.
	//   await page.route('**/api/activities/profesor/**', async route => { // Ajustar el patrón según la API real
	//     await route.fulfill({
	//     status: 500,
	//     contentType: 'application/json',
	//     body: JSON.stringify({ message: 'Error interno del servidor simulado' }),
	//     });
	//   });

	//   await page.goto(routes.actividades_profesor);

	//   // Verificar elementos de __error.svelte
	//   await expect(page.getByText('500')).toBeVisible(); // El status
	//   await expect(page.getByText('Error interno del servidor simulado')).toBeVisible(); // El error.message
	//   const volverButton = page.getByRole('button', { name: 'Volver a la página principal' });
	//   await expect(volverButton).toBeVisible();
	//   await volverButton.click();
	//   await expect(page).toHaveURL('/sinai');
	// });

	test('G-7. Buscar actividades por "Grupo" en "Consulta de Actividades"', async ({ page }) => {
		await page.goto('/sinai/consultas/actividades');
		await expect(page.getByRole('heading', { name: 'Consulta de Actividades' })).toBeVisible();

		const form = page.locator('form.ui.form'); // El formulario principal de consulta

		await form.getByLabel('Grupo', { exact: true }).check(); // Seleccionar tipo de búsqueda "Grupo"

		// Seleccionar un grupo del datalist/select (asumiendo que los grupos se cargan)
		const grupoInput = form.locator('select');
		const group = faker.number.int({ min: 2, max: groups.length });
		await grupoInput.selectOption({ value: groups[group] });

		await form.getByRole('button', { name: 'Buscar' }).click();

		// Verificar que el resumen de actividades (resume_rank.svelte) se muestre para el grupo
		await expect(page.getByText(/Resumen de Actividades del Grupo/i)).toBeVisible();
	});
});
