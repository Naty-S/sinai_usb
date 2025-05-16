import path from 'path'; // Para pruebas de subida de archivos
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker'; // Para generar datos de prueba únicos

import { loginAs } from './helpers.js';
