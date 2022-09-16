import { USER_SESSION } from "@stores/stores";
import { get } from "svelte/store";

export class Authorization
{
	private static _options: Options;
	private static _url: string = "https://localhost:7150/Users";
	private static _request: Request;

	static async GetAuthorization(method: string, body: any): Promise<boolean>
	{
		this._options = { method: method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
		this._request = new Request(`${this._url}/authenticate`, this._options);
		const results: Awaited<User> = await UserRequest(this._request);
		
		USER_SESSION.set(results);
		return (typeof results === "object");
	}
	
	static async GetValidation(method: string, body: any): Promise<boolean>
	{
		this._options = { method: method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
		this._request = new Request(`${this._url}/validate`, this._options);
		let results: Awaited<User> = await UserRequest(this._request);
		
		USER_SESSION.set(results);
		return (typeof results === "object");
	}

	static async RegisterValidation(method: string, body: any): Promise<boolean>
	{
		this._options = { method: method, headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
		this._request = new Request(`${this._url}/rememberme`, this._options);
		let results: Awaited<string> = await UserRequest(this._request);
	
		return (typeof results === "string");
	}
	
	static async DeleteValidation(method: string, body: any): Promise<boolean | void>
	{
		this._options =
		{
			method: method,
			headers: { "content-type": "application/json", "authorization": `Bearer: ${get(USER_SESSION).token}` },
			body: JSON.stringify(body)
		};
		
		this._request = new Request(`${this._url}/token`, this._options);
		let results: Awaited<boolean | void> = await UserRequest(this._request);
	
		return results;
	}


}


async function UserRequest(request: Request): Promise<User | any>
{
	const response = await fetch(request).then((response):Promise<any> => 
	{
		if(response.ok)
			return response.json();
		
		throw new Error(`Request failed. Status: ${response.status}`);
	})
	.then((json) => 
	{
		return json; 
	})
	.catch(err => console.log(err));

	return response;
}