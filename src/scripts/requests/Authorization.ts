import { sessionStore } from "@stores/stores";

export class Authorization
{
	private options: Options;
	private url: string = "https://localhost:7150/api/Users";
	private request: Request;

	constructor(method: string, headers: Record<string, string>, body?: any,)
	{
		if(typeof body !== undefined)
			this.options = { method: method, headers: headers, body: JSON.stringify(body) };
		else
			this.options = { method: method, headers: headers };
	}

	async GetAuthorization(): Promise<boolean>
	{
		const request = this.request = new Request(`${this.url}/authenticate`, this.options);
		const results: Awaited<User> = await UserRequest(request);
		
		sessionStore.set(results);
		return (typeof results === "object");
	}

	async RegisterUser(): Promise<boolean>
	{
		const request = this.request = new Request(`${this.url}/register`, this.options);
		let results: Awaited<boolean> = await UserRequest(request);
		return results;
	}
	
	async GetValidation(): Promise<boolean>
	{
		const request = this.request = new Request(`${this.url}/validate`, this.options);
		let results: Awaited<User> = await UserRequest(request);
		
		sessionStore.set(results);
		return (typeof results === "object");
	}

	async RegisterValidation(): Promise<boolean>
	{
		const request = this.request = new Request(`${this.url}/rememberme`, this.options);
		let results: Awaited<string> = await UserRequest(request);
	
		return (typeof results === "string");
	}
	
	async DeleteValidation(): Promise<boolean | void>
	{
		const request = this.request = new Request(`${this.url}/token`, this.options);
		let results: Awaited<boolean | void> = await UserRequest(request);
	
		return results;
	}
}


async function UserRequest(request: Request): Promise<User | any>
{
	const response = await fetch(request)
		  .then((response): Promise<any> | any => response.ok ? response.json() : { error: new Error(`Request failed. Status: ${response.status}`) })
		  .then((json) => json)
		  .catch((error) => console.log(error));

	return response;
}