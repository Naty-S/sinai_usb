import { test, expect } from '@playwright/test';

import { loginAs, routes } from './helpers/frontend.js';


// --------------------------------------------------------------------------------------
// PRUEBAS PARA EL ROL: JEFE DE DIVISIÓN
// --------------------------------------------------------------------------------------
test.describe('Rol: Jefe de División', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'division_chief');
  });

  test('JV-1. Visualizar actividades de su división', async ({ page }) => {
    await page.goto(routes.actividades_division);
    await expect(page.getByRole('heading', { name: /Actividades en el sistema de la División de/ })).toBeVisible();
  });

  // Otras pruebas podrían ser similares a las de Jefe de Departamento, pero a nivel de División.

  // Pruebas de error para Jefe de División serían similares a las de Jefe de Depto,
  // pero aplicadas a las vistas y acciones de nivel de división.
});
