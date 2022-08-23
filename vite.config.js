import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	plugins: [
		svelte({
		}),
		basicSsl(),
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
