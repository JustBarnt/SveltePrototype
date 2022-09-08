import { USER_SESSION } from "../stores/stores";
import { AuthorizeUser } from "../services/AuthorizationServices";

/**
* An event handler to handle the custom event from the svelte component
* 
* @async
* @param {QueryDetails} Details - Object containing parameters to indicate successful requests.
* @return {Promise<boolean>} - Returns true or false whether or not the user authentication was successful.
*/
async function GetAuthorization(requestBody: ILogin): Promise<boolean>
{
	const endpoint = `https://localhost:7150/Users/authenticate`;

	const results: Awaited<T> = await AuthorizeUser(endpoint, requestBody);
	USER_SESSION.set(results);

	return (typeof results === "string");
}

export { GetAuthorization };

