import { USER_SESSION } from "../stores/stores";
import { AuthorizeUser } from "../services/AuthorizationServices";

/**
* An event handler to handle the custom event from the svelte component
* 
* @async
* @param {ILogin} requestBody - Request body matching the ILogin interface
* @return {Promise<boolean>} - Returns true or false whether or not the user authentication was successful.
*/
async function GetAuthorization(requestBody: ILogin): Promise<boolean>
{
	const endpoint = `https://localhost:7150/Users/authenticate`;

	const results: Awaited<string> = await AuthorizeUser(endpoint, requestBody);
	console.log(results);
	USER_SESSION.set(results);

	return (typeof results === "string");
}

export { GetAuthorization };

