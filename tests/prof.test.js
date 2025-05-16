import path from 'path'; // Para pruebas de subida de archivos
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { loginAs, testUsers } from './helpers.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: PROFESOR
// --------------------------------------------------------------------------------------
test.describe('Rol: Profesor', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'professor'); // Loguea como profesor antes de cada prueba en este bloque
  });

  /* test('P-1. Login exitoso y visualización del layout de profesor', async ({ page }) => {
  	await page.goto(`/sinai/actividades/profesor/${testUsers.professor.id}`);
  	const menuButton = page.locator('nav').getByText(/Menu/i);
  	await expect(menuButton).toBeVisible();
  	await menuButton.click();
  	await expect(page.getByRole('button', { name: 'Salir' })).toBeVisible();
  	// Verificar que NO se vea el enlace "Ver Profesores" si el profesor no es decano/coord.
  	await expect(page.getByRole('link', { name: 'Ver Profesores' })).not.toBeVisible();
  }); */

  /* test('P-2. Iniciar flujo de "Nueva Solicitud S1 Novel" y ver formulario', async ({ page }) => {
    await page.goto('/sinai/s1_novel/solicitud');

    await expect(page.getByRole('heading', { name: 'Solicitar S1 Novel' })).toBeVisible();
    // Hacer clic en el botón para mostrar el formulario
    await page.getByRole('button', { name: 'Nueva solicitud' }).click();

    // Verificar que campos clave del formulario S1 Novel sean visibles
    await page.getByText('Obervaciones').waitFor({ state: 'attached' });
    await expect(page.getByText('Obervaciones')).toBeVisible();
    await expect(page.getByText('Soportes')).toBeVisible();
    await expect(page.getByText('Archivo de especificación del Proyecto')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Solicitar' })).toBeVisible();
  }); */

  /* test('SP-P-2.1. (Sad Path) Intentar enviar Solicitud S1 Novel con campos requeridos vacíos', async ({ page }) => {
    await page.goto('/sinai/s1_novel/solicitud');
    await page.getByRole('button', { name: 'Nueva solicitud' }).click();
    await page.getByText('Obervaciones').waitFor({ state: 'attached' });
    await page.getByRole('button', { name: 'Solicitar' }).click();
    await expect(page.locator('.field.error', { hasText: 'Requerido' })).toBeVisible();
  }); */

  /* test('P-3. Modificar información en "Datos Personales" del Perfil', async ({ page }) => {
    await page.goto('/sinai/perfil');
    await expect(page.getByRole('heading', { name: 'Datos Personales' })).toBeVisible();

    const perfil = page.getByRole('textbox', { name: 'Apellido, Nombre' });
    const perfilOriginal = await perfil.inputValue();
    const nuevoPerfil = `Pruebas ${perfilOriginal}`;

    await perfil.fill(nuevoPerfil);
    await page.getByRole('button', { name: 'Modificar' }).click();

    // Verificar mensaje de éxito y recarga
    await page.waitForURL(`/sinai/perfil?modificado=${testUsers.professor.email}@usb.ve`);
    await expect(page.getByText('Perfil modificado con éxito!!!')).toBeVisible();
    await page.getByRole('button', { name: 'Ok' }).click();

    // Verificar que el cambio persista después de la recarga
    await expect(page.getByRole('textbox', { name: 'Apellido, Nombre' })).toHaveValue(nuevoPerfil);
  }); */

  /* test('P-4. Crear un "Artículo en Revista" (actividad) con autores', async ({ page }) => {
    await page.goto('/sinai/actividades/crear/articulo_revista');

    const titulo = faker.commerce.productName();
    // Llenar formulario articulo_revista.svelte y authors.svelte
    await page.locator('div.field:has-text("Título del Artículo") >> input').fill(titulo);
    await page.locator('div.field:has-text("Nombre de la Revista Arbitrada") >> input').fill(faker.company.name());
    await page.locator('div.field:has-text("Volumen") >> input').fill(faker.string.uuid());
    await page.locator('div.field:has-text("Cantidad de Páginas") >> input').fill('2');
    await page.locator('div.field:has-text("Página Inicial") >> input').fill('4');
    await page.locator('div.field:has-text("Página Final") >> input').fill('6');
    await page.locator('[id="articulo_revista\\.estado-Aceptado_via_publicacion"]').check();

    // Añadir autor USB (Profesor)
    await page.getByRole('button', { name: 'Agregar Profesor' }).first().click();
    await page.locator('input[name="autores_usb\\[1\\]\\.nombre"]').fill('Abad-Mota, S');

    // Añadir autor Externo
    await page.getByRole('button', { name: 'Agregar Profesor' }).last().click();
    await page.locator('input[name="autores_externos\\[0\\]\\.nombre"]').fill(`Dr. ${faker.person.fullName()}`);
    await page.locator('input[name="autores_externos\\[0\\]\\.universidad"]').fill('Universidad Internacional');

    await page.getByRole('button', { name: 'Crear' }).click();

    // Verificar mensaje de éxito y/o redirección
    await page.waitForURL(`/sinai/actividades/profesor/${testUsers.professor.id}?creada=true`);
    await expect(page.getByText(/Actividad creada con éxito/)).toBeVisible();
    
    // Verificar que la nueva actividad aparezca en la lista del profesor
    await expect(page.getByText(titulo)).toBeVisible();

    // deleteTestArticle(page)
  }); */

  /* test('SP-P-4.1. (Sad Path) Intentar crear "Artículo en Revista" sin título ni revista', async ({ page }) => {
    await page.goto('/sinai/actividades/crear/articulo_revista');

    // No llenar Título ni Nombre de la Revista
    await page.locator('div.field:has-text("Volumen") >> input').fill('43');
    await page.locator('div.field:has-text("Cantidad de Páginas") >> input').fill('2');
    await page.locator('div.field:has-text("Página Inicial") >> input').fill('4');
    await page.locator('div.field:has-text("Página Final") >> input').fill('6');
    await page.locator('[id="articulo_revista\\.estado-Aceptado_via_publicacion"]').check();

    await page.getByRole('button', { name: 'Crear' }).click();

    await expect(page.getByText('Título del Artículo Requerido')).toBeVisible();
    await expect(page.getByText('Nombre de la Revista Arbitrada Requerido')).toBeVisible();
  }); */

  // test('P-5. Modificar una actividad existente (Título de Artículo en Revista)', async ({ page }) => {
  //   // ASUNCIÓN: Existe una actividad de tipo "Artículo en Revista" creada por el usuario logueado.
  //   // Necesitarías ir a la lista de actividades del profesor, encontrar una y hacer clic en modificar.
  //   // La ruta sería algo como /sinai/actividades/modificar/articulo_revista/[id_de_la_actividad]

  //   // Simulación: Navegar directamente si conocemos el ID o encontrarla en la lista.
  //   // await page.goto('/sinai/actividades/profesor/mi_id_profesor'); // Ir a la lista de actividades
  //   // await page.locator('.activity-row', { hasText: 'Título del Artículo a Modificar' })
  //   //           .getByRole('button', { name: 'Modificar' }).click();
  //   // Por simplicidad, asumimos que ya estamos en la página de modificación:
  //   await page.goto('/sinai/actividades/modificar/articulo_revista/51308');

  //   const titulo = page.locator('div.field:has-text("Título del Artículo") >> input');
  //   const tituloOriginal = await titulo.inputValue();
  //   const nuevoTitulo = `Pruebas - ${tituloOriginal}`;

  //   await titulo.fill(nuevoTitulo);

  //   await page.getByRole('button', { name: 'Modificar' }).click();

  //   // Verificar mensaje de éxito y redirección
  //   await page.waitForURL(`/sinai/actividades/profesor/${testUsers.professor.id}?modificada=true`);
  //   await expect(page.getByText('Actividad modificada con éxito')).toBeVisible();

  //   // Verificar que en la lista el título esté actualizado.
  //   await expect(page.getByText(nuevoTitulo)).toBeVisible();
  // });

  /* test('P-6. Añadir y eliminar dinámicamente autores en formulario de actividad (Artículo en Revista)', async ({ page }) => {

    await page.goto('/sinai/actividades/crear/articulo_revista');

    // Sección Autores USB (de authors.svelte)
    await page.getByRole('button', { name: 'Agregar Profesor' }).first().click();
    await page.getByRole('button', { name: 'Agregar Estudiante' }).first().click();

    // Verificar que hay 2 autores USB (contando los inputs de nombre o los botones de eliminar)
    expect(await page.locator('button[id^="DelUSB-"]').count()).toBe(3);

    // Eliminar el último autor USB (el estudiante)
    await page.locator('#DelUSB-2').click();
    expect(await page.locator('button[id^="DelUSB-"]').count()).toBe(2);

    // Sección Autores Externos
    await page.getByRole('button', { name: 'Agregar Profesor' }).last().click();
    expect(await page.locator('button[id^="DelExterno-"]').count()).toBe(1);
  }); */

  // test('P-7. Subir un archivo en "Solicitar S1 Novel" (proyecto y soportes)', async ({ page }) => {
  //   await page.goto('/sinai/s1_novel/solicitud');
  //   await page.getByRole('button', { name: 'Nueva solicitud' }).click(); // Mostrar formulario

  //   const filesDir = path.join(__dirname, 'files');
  //   const filePathProyecto = path.join(filesDir, 'proyecto_s1_novel.pdf'); // Crear archivo dummy
  //   const filePathSoporte1 = path.join(filesDir, 'soporte1.pdf');

    // Asegurarse de que el directorio de descargas exista
    // if (!fs.existsSync(filesDir)) {
    //   fs.mkdirSync(filesDir, { recursive: true });
    // }

  //   // Crear archivos dummy si no existen para la prueba
  //   fs.writeFileSync(filePathProyecto, 'Contenido del proyecto de prueba');
  //   fs.writeFileSync(filePathSoporte1, 'Contenido del soporte de prueba');

  //   await page.locator('div.field:has-text("Archivo de especificación del Proyecto") >> input').setInputFiles(filePathProyecto);

  //   // La sección de soportes (backup_files.svelte) es dinámica
  //   await page.getByRole('button', { name: 'Agregar' }).click();
  //   await page.locator('input[name="soportes\\[0\\]"]').first().setInputFiles(filePathSoporte1);

  //   // Verificar que no aparezcan errores luego de adjuntar
  //   await expect(page.locator('.field.error')).not.toBeVisible();
  // });

  /* test('P-8. Eliminar una actividad creada por el usuario (con modal)', async ({ page }) => {
    // ASUNCIÓN: El usuario logueado ha creado una actividad que puede eliminar.
    // 1. Crear una actividad (o asegurarse que exista una para eliminar)
    // ... (pasos para crear una actividad simple, ej. "Premio") ...
    // await page.goto('/sinai/actividades/crear/premio');
    // const tituloPremio = `Premio a Eliminar ${Date.now()}`;
    const tituloPremio = /Premio a Eliminar 1747426325701/;
    // await page.locator('div.field:has-text("Título del Premio") >> input').fill(tituloPremio);
    // await page.locator('div.field:has-text("Institución que otorga") >> input').fill('Institución de Pruebas');
    // await page.getByRole('button', { name: 'Crear' }).click();
    // await page.waitForURL(/\/sinai\/actividades\/profesor/); // Esperar redirección a la lista

    // 2. Encontrar la actividad en la lista y hacer clic en Eliminar
    await page.getByRole('button', { name: 'Modificar' }).click();
    await page.locator('div.back-to-top').toBeVisible();
    const actividadRow = page.locator('div.item', { hasText: tituloPremio });
    await actividadRow.getByRole('button', { name: 'Eliminar' }).click();

    // 3. Interactuar con el modal de confirmación de pop_delete en group_activities.svelte
    const modalDelete = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Está seguro\(a\) que quiere ELIMINAR ésta actividad?/ });
    await expect(modalDelete).toBeVisible();
    await expect(modalDelete).toContainText(tituloPremio);
    await modalDelete.getByRole('button', { name: 'Eliminar' }).click();

    // 4. Verificar mensaje de éxito y que la actividad ya no esté en la lista
    const modalExito = page.locator('div.ui.modal.active, div.ui.modal.visible').filter({ hasText: /Actividad Eliminada con Éxito !!!/ });
    await expect(modalExito).toBeVisible();
    await modalExito.getByRole('button', { name: 'Cerrar' }).click();

    await expect(page.locator('div.item.content', { hasText: tituloPremio })).not.toBeVisible();
  }); */

  /* test('P-9. Solicitar PREPRAII y verificar la solicitud en el listado', async ({ page }) => {
  	await page.goto('/sinai/prepraii/solicitud');
  	await expect(page.getByRole('heading', { name: 'Solicitar PREPRAII' })).toBeVisible();
  	if (await page.getByRole('button', { name: 'Nueva solicitud' }).isVisible()) { // Si hay convocatoria activa
  		await page.getByRole('button', { name: 'Nueva solicitud' }).click();
  		// Llenar formulario de solicitud PREPRAII (muy simplificado)
  		// Se necesitarían selectores para el artículo, tipo, y adjuntos de constancias
  		await page.locator('select[name="prepraii_solicitud.actividad"]').selectOption({ index: 0 }); // Seleccionar primer artículo elegible
  		await page.locator('select[name="prepraii_solicitud.tipo"]').selectOption({ value: '1' }); // Tipo 1
  		// ... adjuntar archivos de constancias ...
  		await page.getByRole('button', { name: 'Solicitar' }).click();
  		await expect(page.locator('div.ui.modal.active').getByText('Solicitud exitosa!!!')).toBeVisible();
  		await page.locator('div.ui.modal.active').getByRole('button', { name: 'Ok' }).click();
  	} else {
  		console.warn('No hay convocatoria PREPRAII activa para probar solicitud.');
  	}
  }); */

  /* test('SP-P-9.1. (Sad Path) Intentar solicitar PREPRAII sin seleccionar actividad o tipo', async ({ page }) => {
    await page.goto('/sinai/prepraii/solicitud');
    if (await page.getByRole('button', { name: 'Nueva solicitud' }).isVisible()) {
      await page.getByRole('button', { name: 'Nueva solicitud' }).click();
      // No seleccionar actividad ni tipo
      await page.getByRole('button', { name: 'Solicitar' }).click();
      // ASUNCIÓN: Errores de validación
      await expect(page.locator('.field.error', { hasText: 'Artículo de Revista Científica o Libro' })).toBeVisible(); // Label del select de actividad
      await expect(page.locator('.field.error', { hasText: 'Tipo de Solicitud' })).toBeVisible(); // Label del select de tipo
    } else {
      console.warn('SP-P-9.1: No hay convocatoria PREPRAII activa.');
    }
  }); */

  /* test('P-10. Visualizar información en página BRA del profesor', async ({ page }) => {
    // ASUNCIÓN: Existe un profesor con datos BRA y el usuario logueado puede verlo.
    // La ruta es /sinai/BRA/profesor (index.svelte), que usa components/bra/header.svelte
    await page.goto('/sinai/BRA/profesor'); // Asumiendo que carga el BRA del profesor logueado o uno por defecto

    await expect(page.getByRole('heading', { name: 'Sistema de Información de Actividades de Investigación - SINAI' })).toBeVisible();
    await expect(page.getByText('Vista: Bono BRA')).toBeVisible();

    // Verificar campos del header.svelte de BRA
    await expect(page.locator('div', { hasText: /Profesor:/ })).not.toBeEmpty();
    await expect(page.locator('div', { hasText: /Cédula:/ })).not.toBeEmpty();
    await expect(page.locator('div', { hasText: /Categoría:/ })).not.toBeEmpty();
    await expect(page.locator('div', { hasText: /Departamento:/ })).not.toBeEmpty();
    await expect(page.locator('div', { hasText: /Período:/ })).not.toBeEmpty();

  }); */

  test('P-11. Adición y eliminación dinámica de "Líneas de Investigación" en Perfil', async ({ page }) => {
    await page.goto('/sinai/perfil');
    await expect(page.getByRole('heading', { name: 'Datos Personales' })).toBeVisible();

    const lineasSection = page.locator('#research_lines');
    const addButton = lineasSection.getByRole('button', { name: 'Agregar' });
    const limpiarButton = lineasSection.getByRole('button', { name: 'Limpiar' });

    // Limpiar líneas existentes para un estado conocido (si es necesario para la prueba)
    if (await limpiarButton.isVisible() && (await lineasSection.locator('input[type="text"]').count()) > 0) {
      await limpiarButton.click();
      expect(await lineasSection.locator('input[type="text"]').count()).toBe(0);
    }

    await addButton.click();
    await lineasSection.locator('input[type="text"]').first().fill('Investigación en Pruebas Automatizadas');
    await addButton.click();
    await lineasSection.locator('input[type="text"]').last().fill('Estudios de Calidad de Software');

    expect(await lineasSection.locator('input[type="text"]').count()).toBe(2);
    await expect(lineasSection.locator('input[name="profile\\.lineas_investigacion\\[0\\]"]')).toBeVisible();

    // Eliminar la primera línea
    await lineasSection.getByRole('button', { name: 'Elminar' }).first().click();
    expect(await lineasSection.locator('input[type="text"]').count()).toBe(1);
    await expect(lineasSection.locator('input[value="Investigación en Pruebas Automatizadas"]')).not.toBeVisible();
    await expect(lineasSection.locator('input[value="Estudios de Calidad de Software"]')).toBeVisible();
  });
});
