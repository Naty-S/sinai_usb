import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$api: path.resolve('./src/routes/api'),
			$assets: path.resolve('./src/assets'),
			$types: path.resolve('./src/types'),
			$interfaces: path.resolve('./src/interfaces'),
			$utils: path.resolve('./src/utils'),
		},
	}
};

export default config;
