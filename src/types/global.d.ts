import type { SvelteComponentDev } from "svelte";
export { };


declare global
{
	type QueryDetails = { success: boolean, results: Record<string, unknown>[] | null | Record<string, unknown>, params: string };
	type Results = Record<string, unknown>[] | null | Record<string, unknown>;
	type Form = { amount: string, column: string, value: string, startDate: string, endDate: string }
	type Page = { name: string, component: SvelteComponentDev }[];

	interface IResponse
	{
		success: boolean;
		results: Results;
	}

	interface ILogin
	{
		username: string;
		password: string;
	}
}