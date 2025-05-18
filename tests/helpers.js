// Función auxiliar para la autenticación
// import type { Page } from '@playwright/test';

import { expect } from '@playwright/test';

// export type UserRole = 'professor' | 'dean' | 'division_chief' | 'coord_chief' | 'dep_chief' | 'dep_rep';

// Datos de prueba para los usuarios
export const testUsers = {
  professor: {
    email: 'fflaviani',
    id: 1401
  },
  dep_chief: {
    email: 'jstella', // Departamento Ciencias de los Materiales
    dep: 2,
    id: 426
  },
  dep_rep: {
    email: 'vcosta', // Departamento Ciencias de la Tierra
    dep: 2,
    id: 98
  },
  coord_chief: {
    email: 'dcoronado', // Coordinación Ciencias Aplicadas e Ingeniería
    coord: 1,
    id: 1080
  },
  groups_chief: {
    email: 'scarrasquel', // Coordinación Integración e Información (Grupos)
    id: 1079
  },
  division_chief: {
    email: 'jvillota', // División de Ciencias Sociales y Humanidades
    division: 3,
    id: 497
  },
  dean: {
    email: 'dec-id',
    id: 0
  },
};

// Rutas posibles accesibles desde el menú principal, como objeto clave:valor en snake_case
export const routes = {
  actividades_profesor: `/sinai/actividades/profesor/${testUsers.professor.id}`,
  actividades_decano: "/sinai/actividades/decano/0",
  resumen_actividades: "/sinai/actividades",
  actividades_grupos: "/sinai/grupos/actividades",

  consultas_publicas: "/sinai/consultas/actividades",

  bra_profesor: "/sinai/BRA/profesor",

  solicitar_s1_novel: "/sinai/s1_novel/solicitud",
  solicitar_prepraii: "/sinai/prepraii/solicitud",

  evaluar_s1_novel: "/sinai/s1_novel/evaluar",
  evaluar_prepraii: "/sinai/prepraii/evaluar",
  validar_nuevos_profesores: "/sinai/validaciones/nuevos_profesores",

  actividades_grupo: "/sinai/actividades/grupo/2",
  actividades_coordinacion: `/sinai/actividades/coordinacion/${testUsers.coord_chief.coord}`,
  actividades_departamento_chief: `/sinai/actividades/departamento/${testUsers.dep_chief.dep}`,
  actividades_departamento_rep: `/sinai/actividades/departamento/${testUsers.dep_rep.dep}`,
  actividades_division: `/sinai/actividades/division/${testUsers.division_chief.division}`,

  grupos_investigacion: "/sinai/grupos",

  perfil: "/sinai/perfil",

  historico_prepraii: "/sinai/prepraii",
  pagos_prepraii: "/sinai/prepraii/pagos",

  modificar_mesa_tecnica: "/sinai/mesa_tecnica",
  modificar_coordinadores: "/sinai/coordinadores"
};


/**
 * Inicia sesión en la aplicación como un usuario con un rol específico.
 *
 * @param page La instancia de la página de Playwright.
 * @param role El rol del usuario para iniciar sesión.
 */
export async function loginAs(page, role) {
  const user = testUsers[role];
  if (!user) {
    throw new Error(`Rol de usuario desconocido para pruebas: ${role}`);
  }

  const response = await page.request.get(`/api/auth/login_dev/${user.email}`);
  if (!response.ok()) {
    console.error(`Fallo al loguear como ${role} vía API dev: ${await response.text()}`);
    throw new Error(`No se pudo iniciar sesión como ${role} usando la ruta de desarrollo.`);
  }
  // Después de esto, la sesión debería estar establecida.
  // Puedes ir a una página para verificarlo o confiar en que el endpoint funcionó.
  // await page.goto('/sinai'); // Ir a una página post-login
  // await expect(page.locator('nav').getByText(/Menu/i)).toBeVisible();
  console.log(`Helper (Dev Route): Usuario logueado como ${role} (${user.email})`);
};

export async function deleteTestUser(page, email) {
  const response = await page.request.delete(`/api/professor/${email}`);
  if (!response.ok()) {
    console.error(`Fallo al elimiar usuario de prueba ${email} vía API dev: ${await response.text()}`);
    throw new Error(`No se pudo elimiar usuario de prueba ${email} usando la ruta de desarrollo.`);
  }
  console.log(`Helper (Dev Route): Usuario de prueba eliminado (${email})`);
};

/* export async function deleteTestArticle(page, email) {
  const response = await page.request.delete(`/api/professor/${email}`);
  if (!response.ok()) {
    console.error(`Fallo al elimiar usuario de prueba ${email} vía API dev: ${await response.text()}`);
    throw new Error(`No se pudo elimiar usuario de prueba ${email} usando la ruta de desarrollo.`);
  }
  console.log(`Helper (Dev Route): Usuario de prueba eliminado (${user.email})`);
}; */
