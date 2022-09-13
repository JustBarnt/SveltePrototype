import preprocess from "svelte-preprocess";

const config =
{
	preprocess: preprocess(
		{
			scss:
			{
				prependData: `@import './src/sass/variables.scss';`,
				renderSync: true,
			},
		},
	),
};

export default config;