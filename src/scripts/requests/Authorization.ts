import { USER_SESSION } from "@stores/stores";

/**
* An event handler to handle the custom event from the svelte component
* 
* @async
* @param {ILogin} requestBody - Request body matching the ILogin interface
* @param {ICookie} cookie - optional parameter of a cookie to add to the auth table for returning users.
* @return {Promise<boolean>} - Returns true or false whether or not the user authentication was successful.
*/
export async function GetAuthorization(requestBody: ILogin,  cookie?: ICookie): Promise<boolean>
{
	const endpoint = `https://localhost:7150/Users/authenticate`;
	let results: Awaited<string>;
	
	if (typeof cookie === undefined) results = await AuthorizeUser(endpoint, requestBody);
	else 							 results = await AuthorizeUser(endpoint, requestBody, cookie);
	
	console.log(results);
	USER_SESSION.set(results);
	return (typeof results === "string");
}

/**
* Attempts to authorize the user by submitint user name and password to find a match, if successful it returns a promise
* containing the token.
* @param {String} endpoint - Completed string for the endpoint of the API
* @param {ILogin} requestBody - body of the request object.
* @param {ICookie} cookie - optional parameter of a cookie to add to the auth table for returning users.
* @return {Promise<never | T>} Returns a fulfilled or rejected promise
*/
const AuthorizeUser = async(endpoint:string, requestBody: ILogin, cookie?: ICookie): Promise<string> =>
{
	let body: string;

	if (typeof cookie === undefined) body = JSON.stringify({ username: requestBody.username, password: requestBody.password });
	else body = JSON.stringify({ username: requestBody.username, password: requestBody.password, selector: cookie.selector, validator: cookie.validator });

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
		throw new Error(`Response not received. Status: ${response.status}`);
	})
	.then((json) => 
	{
		return json; 
	})
	.catch(err => console.log(err));

	return response;
};