import { get } from "svelte/store";
import { Utilities } from "../utilities/Utilities";
import { USER_SESSION } from "../stores/stores";

const token = get(USER_SESSION);

/**
* Creates a new post request to MSSQL Server
* @param {String} endpoint - API Endpoint for the request
* @param {String} queryString - Parsed query string leading with "?"
* @return {Promise<response>} Returns a promise containing the JSON response
*/
export const SearchRequest = async(endpoint: string, queryString:string) =>
{
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	/* TODO: Brent
	* Test to make sure it accepts the token and authenticates, once authentication is successful switch to paseto
	* tokens
	*/
	const options = {
		method: "GET",
		headers: headers,
		Authorization: $token
	};

	const request = new Request(`${endpoint}/${queryString}`, options);

	const response = await fetch(request).then((response) => 
	{
		if(response.ok)
			return response.json();
		
		throw new Error(`Response not received. Status: ${response.status}`);
	})
	.then((json) => 
	{ 
		Utilities.FormatDateTime(json, "created", "");
		Utilities.FormatDateTime(json, "expires", "");
		return json; 
	})
	.catch(err => console.log(err));

	return response;
};