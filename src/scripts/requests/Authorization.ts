import { USER_SESSION } from "@stores/stores";

export class Authorization
{
	private _options: Options;
	private _url: string = "https://localhost:7150/Users";
	private _request: Request;

	constructor(method: string, body: any, headers: Record<string, string>)
	{
		this._options = { method: method, headers: headers, body: JSON.stringify(body) };
	}

	async GetAuthorization(): Promise<boolean>
	{
		this._request = new Request(`${this._url}/authenticate`, this._options);
		const results: Awaited<User> = await UserRequest(this._request);
		
		USER_SESSION.set(results);
		return (typeof results === "object");
	}

	async RegisterUser(): Promise<boolean>
	{
		const request = this._request = new Request(`${this._url}/register`, this._options);
		let results: Awaited<boolean> = await UserRequest(request);

		return results;
	}
	
	async GetValidation(): Promise<boolean>
	{
		const request = this._request = new Request(`${this._url}/validate`, this._options);
		let results: Awaited<User> = await UserRequest(request);
		
		USER_SESSION.set(results);
		return (typeof results === "object");
	}

	async RegisterValidation(): Promise<boolean>
	{
		const request = this._request = new Request(`${this._url}/rememberme`, this._options);
		let results: Awaited<string> = await UserRequest(request);
	
		return (typeof results === "string");
	}
	
	async DeleteValidation(): Promise<boolean | void>
	{
		const request = this._request = new Request(`${this._url}/token`, this._options);
		let results: Awaited<boolean | void> = await UserRequest(request);
	
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