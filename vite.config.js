import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';

// import * as passport from "passport";


/** @type {import('vite').Plugin} */
const myPlugin = {
	name: 'log-request-middleware',
	configureServer(server) {
		server.middlewares.use((req, res, next) => {

			// initialize passport
			// passport.initialize();
			// passport.session();

			console.log(`Got request ${req.url}`);
			next();
		});
	}
};

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), myPlugin],
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
	}
};

export default config;
