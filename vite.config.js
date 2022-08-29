import typescript from "@rollup/plugin-typescript";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import basicSsl from "@vitejs/plugin-basic-ssl";
import autoPreprocess from "svelte-preprocess";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		svelte({
			preprocess: autoPreprocess(),
		}),
		basicSsl(),
		typescript({ sourceMap: !production }),
	],
	server: {
		https: true,
		port: 2112, 
	},
	build: {
		rollupOptions:{
			output:{
				assetFileNames: (assetInfo) => 
				{
					let extType = assetInfo.name.split(".").at(1);
					if(/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType))
					{
						extType = "img";
						return `assets/${extType}/[name]-[hash][extname]`;
					}
					return `assets/${extType}/[name][extname]`;	

				},
				entryFileNames: "assets/js/bundle.js",
			},
		},
	},
});
