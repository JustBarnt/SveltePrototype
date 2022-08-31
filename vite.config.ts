import { defineConfig, loadEnv } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import scss from "svelte-preprocess";

// https://vitejs.dev/config/
/**@type {import("vite").UserConfig} */

const production = (process.env.NODE_ENV === "production");

console.log(`Is production: ${production}`);

export default defineConfig({
	plugins: [
		svelte({
			preprocess: [
				scss({
					prependData: "@import 'src/sass/variables.scss",
				}),
				sveltePreprocess(
					{
						sourceMap: !production,
						postcss: {
							plugins: [ autoprefixer() ],
						}
					}
				)
			]
		}),
		basicSsl(),
	]
});
