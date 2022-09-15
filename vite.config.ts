import { svelte } from "@sveltejs/vite-plugin-svelte";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { resolve } from "path";
import sveltePreprocess from "svelte-preprocess";
import { defineConfig } from "vite";


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
							renderSync: true,
						},
					},
				),
			],
		}),
		basicSsl(),
	],
	resolve: {
		alias: {
			"@components": resolve("./src/components"),
			"@controllers": resolve("./src/scripts/controllers"),
			"@requests": resolve("./src/scripts/requests"),
			"@services": resolve("./src/scripts/services"),
			"@stores": resolve("./src/scripts/stores"),
			"@utilities": resolve("./src/scripts/utilities"),
			"@pages": resolve("./src/pages/"),
			"@enums": resolve("./src/enums"),
			"@sass": resolve("./src/sass")
		}
	},
});
