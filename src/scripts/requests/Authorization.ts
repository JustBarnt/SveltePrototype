
/**
* Class controlling the authorization requests
*/
export class Authorization
{
	private options: Options;
	private url: string = "https://localhost:7150/api/Users";
	private request: Request;

	/**
	* @Constructor method that sets the method, header, and body
	* @param {String} method - The HTTP method being used for the request
	* @param {Record<string, string>} headers - The HTTP request headers
	* @param {any} body - The body of the request, gets transformed in to a JSON string.
	*/
	constructor(method: string, headers: Record<string, string>, body?: any,)
	{
		if(typeof body !== undefined)
			this.options = { method: method, headers: headers, body: JSON.stringify(body) };
		else
			this.options = { method: method, headers: headers };
	}

	/**
	* Checks the username and password is valid
	* @return {Promse<Query>} Returns a `Query` type object containing response information
	*/
	async GetAuthorization(): Promise<Query>
	{
		this.request = new Request(`${this.url}/authenticate`, this.options);
		return await UserRequest(this.request);
	}

	/**
	* Registers a new user
	* @return {Promse<boolean>} Returns `true` of `false` upon resolution
	*/
	async RegisterUser(): Promise<boolean>
	{
		this.request = new Request(`${this.url}/register`, this.options);
		let results: Awaited<Query> = await UserRequest(this.request);
		return results.success;
	}
	
	/**
	* Checks the users cookies if they are returning, and validates the cookies
	* @return {Promse<Query>} Returns a `Query` type object containing response information
	*/
	async GetValidation(): Promise<Query>
	{
		this.request = new Request(`${this.url}/validate`, this.options);
		return await UserRequest(this.request);
	}

	/**
	* Registers a new set of cookies if `remember-me` is checked
	* @return {Promse<boolean>} Returns `true` of `false` upon resolution
	*/
	async RegisterValidation(): Promise<boolean>
	{
		this.request = new Request(`${this.url}/rememberme`, this.options);
		let results: Awaited<Query> = await UserRequest(this.request);
	
		return results.success;
	}
	
	/**
	* Deletes the cookies if the user hits the logout button
	* TODO: THIS WILL CHANGE ONCE EXPIRATION FUNCTIONALITY IS CHECKED
	* @return {Promse<boolean>} Returns `true` of `false` upon resolution
	*/
	async DeleteValidation(): Promise<boolean> 
	{
		this.request = new Request(`${this.url}/token`, this.options);
		const results = await UserRequest(this.request); 
		return results.success;
	}
}

//TODO: NOT STARTED: Refactor so that it returns the same "Query" type as licenses so they all work the same
/**
* Asynchronous fetch request
* @param {Request} request - A `Request` object used for the fetch.
* @return {Promise<Query>} Returns a `Query` type repsonse.
*/ 
async function UserRequest(request: Request): Promise<Query>
{
	const response: Awaited<Query> = await fetch(request).then((response): Promise<any> | any =>
		{
			if(response.ok)
				return response.json();
		
			throw new Error(`Reqeust failed. Status: ${response.status}`);
		})
		.then((json) =>
		{
			return { message: "Request Successful", code: 200, success: true, results: json };
		})
		.catch((error) =>
		{
			console.log(error);
			const messageHandler: Query = { message: error, success: false };
			return messageHandler;
		});

	return response;
}