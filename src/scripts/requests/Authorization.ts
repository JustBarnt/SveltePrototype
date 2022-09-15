import { USER_SESSION } from "@stores/stores";
import { get } from "svelte/store";

/**
* An event handler to handle the custom event from the svelte component
* @param {ILogin} login - Request body matching the ILogin interface
* @return {Promise<boolean>} - Returns true or false whether or not the user authentication was successful.
*/
export async function GetAuthorization(login: ILogin): Promise<boolean>
{
	const endpoint = `https://localhost:7150/Users/authenticate`;
	let results:User = await AuthorizeUser(endpoint, login);
	
	USER_SESSION.set(results);
	console.log(get(USER_SESSION));
	return (typeof results === "object");
}

export async function GetValidation(cookie: Cookie): Promise<boolean>
{
	const endpoint = `https://localhost:7150/Users/validate`;
	let results: User = await ValidateToken(endpoint, cookie);
	
	USER_SESSION.set(results);
	console.log(get(USER_SESSION));
	return (typeof results === "object");
}

export async function RegisterValidation(cookie: Cookie): Promise<boolean>
{
	const endpoint = `https://localhost:7150/Users/register/new-token`;
	let results: Awaited<string> = await RegisterToken(endpoint, cookie);

	return (typeof results === "string");
}

export async function DeleteValidationToken(cookie: Cookie)
{
	const endpoint = `https://localhost:7150/Users/token`;
	let results: Awaited<boolean | void> = await DeleteToken(endpoint, cookie);

	return results;
}

/**
* Attempts to authorize the user by submitint user name and password to find a match, if successful it returns a promise
* containing the token.
* @param {String} endpoint - Completed string for the endpoint of the API
* @param {ILogin} requestBody - body of the request object.
* @return {Promise<User | null>} Returns a fulfilled or rejected promise
*/
async function AuthorizeUser(endpoint:string, requestBody: ILogin): Promise<User>
{
	let body: string = JSON.stringify({ username: requestBody.username, password: requestBody.password });

	const options = {
		method: "POST",
		headers: { "Content-type":"application/json" },
		body: body
	};

	const request = new Request(`${endpoint}`, options);

	const response = await fetch(request).then((response):Promise<any> => 
	{
		if(response.ok)
			return response.json();
		
		//Create better message handler for different response statuses
		throw new Error(`Authentication failed. Status: ${response.status}`);
	})
	.then((json) => 
	{
		return json; 
	})
	.catch(err => console.log(err));

	return response;
}

async function RegisterToken(endpoint: string, cookie: Cookie, ): Promise<any>
{
	let body: string = JSON.stringify(cookie);
	
	const options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: body
	};

	const request = new Request(`${endpoint}`, options);
	const response = await fetch(request).then((response): Promise<any> =>
	{
		if (response.ok)
			return response.json();
		
		throw new Error(`Registration failed. Status: ${response.status}`);
	})
	.then(json => { return json; })
	.catch(err => console.log(err));
	
	return response;
}

async function ValidateToken(endpoint: string, cookie: Cookie):Promise<User>
{
	let body: string = JSON.stringify(cookie);
	const options = {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: body
	};

	const request = new Request(`${endpoint}`, options);
	const response = await fetch(request).then((response): Promise<any> => 
	{
		if (response.ok)
			return response.json();
		
		throw new Error(`Validation failed. Status: ${response.status}`);
	})
	.then(json => { return json; })
	.catch(err => console.log(err));
	
	return response;
}

async function DeleteToken(endpoint: string, cookie: Cookie): Promise<boolean | void>
{
	let body: string = JSON.stringify(cookie);

	console.log(body);

	const options = {
		method: "DELETE",
		headers: { "content-type": "application/json", "authorization": `Bearer ${get(USER_SESSION).token}` },
		body: body
	};

	let r: Response;

	const request = new Request(`${endpoint}`, options);
	const response = await fetch(request).then((response):boolean => 
	{
		if (response.ok)
			return response.ok;
		
		throw new Error(`Couldn't find token to delete. Status: ${response.status}`);
	})
	.catch(err => console.log(err));
	
	return response;
}