import { svelte } from "@sveltejs/vite-plugin-svelte";
import basicSsl from "@vitejs/plugin-basic-ssl";
import autoPreprocess from "svelte-preprocess";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig( {
	plugins: [
		svelte(
			{
				preprocess: autoPreprocess(),
			} ),
		basicSsl(),
	],
	server: {
		https: true,
		port: 2112,
	},
} );
