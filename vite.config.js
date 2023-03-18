import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			$api: path.resolve('./src/routes/api'),
			$assets: path.resolve('./src/assets'),
			$components: path.resolve('./src/components'),
			$types: path.resolve('./src/types'),
			$interfaces: path.resolve('./src/interfaces'),
			$utils: path.resolve('./src/utils'),
			$stores: path.resolve('./src/stores'),
		},
	},
	server: {
		strictPort: true,
		// watch: {
		// 	usePolling: process.env.USE_POLLING,
		// },
		hmr: {
			clientPort: 3000
		},
		host: '0.0.0.0',
		port: 3000,
	}
};

export default config;
