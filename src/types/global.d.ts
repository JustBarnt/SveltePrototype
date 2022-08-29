export { };

declare global
{
	interface ApiModel
	{
		success: boolean;
		results: {}[] | null | {};
	}

	interface Login
	{
		username: string;
		password: string;
	}

	type QueryDetails = { success: boolean, results: {}[] | null | {}, params: string }
}