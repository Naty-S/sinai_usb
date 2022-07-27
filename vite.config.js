import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$assets: path.resolve('./src/assets'),
			$components: path.resolve('./src/components'),
			$types: path.resolve('./src/types'),
			$utils: path.resolve('./src/utils'),
			$stores: path.resolve('./src/stores'),
		},
	}
};

export default config;
