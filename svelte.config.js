import preprocess from "svelte-preprocess";

const config =
{
	preprocess: preprocess(
		{
			scss:
			{
				prependData: `@import './src/sass/variables.scss';`
			}
		}
	)
};

export default config;