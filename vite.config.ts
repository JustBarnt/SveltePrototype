import { defineConfig, loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

// https://vitejs.dev/config/
/**@type {import("vite").UserConfig} */

const production = (process.env.NODE_ENV === "production");
export default defineConfig({
	plugins: [
		svelte({
			preprocess: [
				sveltePreprocess(
					{
						sourceMap: !production,
						scss: {
							prependData: `@import './src/sass/variables.scss';`,
						},
					},
				),
			],
		}),
		basicSsl(),
	],
});
