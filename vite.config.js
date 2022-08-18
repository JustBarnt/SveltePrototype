import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	plugins: [
		svelte({
			dev: true,
		}),
		basicSsl(),
	],
	server: {
		https: true,
		port: 2112, 
	},
});
