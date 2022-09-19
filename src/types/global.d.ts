import { Colors } from "@enums/enums";
export { };


declare global
{
	type QueryDetails = { success: boolean, results: Results, params: string; };
	type Results = Map<Record<string, any>> | void;
	//type Results = Array<Record<string, any>> | void;
	type Form = { [amount: string]: string, [column: string]: string, [value: string]: string, [startDate: string]: string, [endDate: string]: string; };
	type User = { id: number, firstName: string, lastName: string, username: string, token: string; } | null;
	type Cookie = { selector: string, validator: string, userId?: number, expires?: Date | string | null };
	type Options = { method: string, headers: Record<string, string>, body?: any };
	type Register = { firstName: string, lastName: string, username: string, password: string };

	interface IResponse
	{
		success: boolean;
		results: Results;
	}

	interface ILogin
	{
		[username:string]: string | any;
		[password:string]: string | any;
	}

	interface IStyles
	{
		[position:string ]: string;
		[top:string ]: string | number;
		[bottom: string ]: string | number;
		[margin: string ]: string | number;
		[padding: string ]: string | number;
		[background: string ]: string | Colors;
	}
}