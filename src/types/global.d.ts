import type { SvelteComponentDev } from "svelte";
export { };


declare global
{
	type QueryDetails = { success: boolean, results: Results, params: string; token: string };
	type Results = Array<Record<string, any>>| null | Array<Record<string, any>>;
	type Form = { [amount: string]: string, [column: string]: string, [value: string]: string, [startDate: string]: string, [endDate: string]: string; };
	type Page = { name: string, component: SvelteComponentDev; }[];
	type Message = { success: string, error: string, info: string; };

	interface IResponse
	{
		success: boolean;
		results: Results;
	}

	interface ILogin
	{
		[username: string]: string | any;
		[password: string]: string | any;
	}

	interface IAlert
	{
		visible: string;
		background: string;
		message: string;
	}
}