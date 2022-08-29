export { };

declare global
{
	interface ApiModel
	{
		success: boolean;
		results: {}[] | null | {};
	}

	type QueryDetails = { success: boolean, results: {}[] | null | {}, params: string}
}