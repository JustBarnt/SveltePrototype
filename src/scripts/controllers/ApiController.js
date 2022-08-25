import { Utilities } from "../utilities/Utilities";

export let API_ENDPOINT = "https://localhost:7150";
/**
* Creates a new post request to MSSQL Server
* @param {String} endpoint - API Endpoint for the request
* @param {String} queryString - Parsed query string leading with "?"
* @return {Promise<response>} Returns a promise containing the JSON response
*/
export const SearchRequest = async(endpoint, queryString) =>
{
	const headers = new Headers();
	headers.append("Content-Type", "application/json");

	const options = {
		method: "GET",
		headers: headers,
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