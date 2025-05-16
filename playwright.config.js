import { devices } from "@playwright/test";


/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	testDir: './tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	baseURL: 'http://localhost', // ¡IMPORTANTE!
	timeout: 5 * 1000, // 5 segundos
	// fullyParallel: true, // Ejecutar pruebas en paralelo
	use: {
		headless: true,
		viewport: { width: 1280, height: 720 },
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		// { // libdbus-glib-1.so.2
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },
	],
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3000,
		reuseExistingServer: true
	}
};

export default config;
