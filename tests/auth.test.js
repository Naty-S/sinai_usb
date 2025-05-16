import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { deleteTestUser } from './helpers.js';


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

	/* 	test('1. Intento de login fallido con USB ID incorrecto muestra error específico', async ({ page }) => {
		await page.goto('/sinai/login');
		await page.locator('div.field:has-text("USB ID") >> input').fill('id_incorrecto_conocido_por_no_existir');
		// await page.getByRole('button', { name: 'Iniciar Sesión' }).click();
		// const errorModal = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Error al iniciar sesión/ });
		// await expect(errorModal).toBeVisible();
		// await expect(errorModal).toContainText(/Usuario no encontrado/);
		});
 */

	/* test('2. (Happy Path) Registro completo de nuevo usuario muestra mensaje de éxito', async ({ page }) => {
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
	}); */

	/* 
		test('2.1 Validar mensaje error campo invalido', async ({ page }) => {
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

	/* 
		test('2.2 ', async ({ page }) => {
		 // PEI (Programa de Estímulo a la Innovación e Investigación) - condicional
			// Asumimos que hay un checkbox similar para PEI. Si no, se llenan directamente.
			// await page.getByLabel('¿Pertenece al PEI?').check();
			await page.locator('div.field:has-text("Número del PEI") >> input').fill(faker.string.alphanumeric(6).toUpperCase());
			// Nivel del PEI (select)
			await page.locator('div.field:has-text("Nivel del PEI") >> select').selectOption({ label: 'Candidato A' });
			await page.locator('div.field:has-text("Año de ingreso al PEI") >> input').fill(faker.date.past({ years: 3 }).getFullYear().toString());
		});
	*/
	
	/* 
		test('2.3 ', async ({ page }) => {
		});
			// --- Sección Líneas de Investigación (dinámico, como en research_lines.svelte) ---
		const lineasSection = page.locator('fieldset:has-text("Líneas de Investigación")');
		await lineasSection.getByRole('button', { name: 'Agregar' }).click();
		await lineasSection.locator('input[type="text"]').first().fill('Pruebas E2E con Playwright');
		await lineasSection.getByRole('button', { name: 'Agregar' }).click();
		await lineasSection.locator('input[type="text"]').last().fill('Inteligencia Artificial en Testing');

	*/

	/* test('SP-2.1. (Sad Path) Registro con correo electrónico ya existente', async ({ page }) => {
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
	}); */

	/* test('3. (Happy Path) Acceso a ruta protegida sin autenticación muestra error y enlace a inicio', async ({ page }) => {
		
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
	}); */
});
