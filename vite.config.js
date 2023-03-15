import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$api: path.resolve('./src/routes/api'),
			$assets: path.resolve('./src/assets'),
			$utils: path.resolve('./src/utils'),
		},
	}
};

export default config;
