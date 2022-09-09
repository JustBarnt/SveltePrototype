import { Utilities } from "../utilities/Utilities";

/**
* Creates a new post request to MSSQL Server
* @param {String} endpoint - API Endpoint for the request
* @param {String} params - Parsed query string leading with "?"
* @param {String} token - Authentication Token
* @return {Promise<response>} Returns a promise containing the JSON response
*/
export const SearchLicenses = async(endpoint: string, params:string, token: string):Promise<Results> =>
{
	const request = new Request(`${endpoint}/${params}`, { method: "GET", headers: { "content-type":"application/json", "authorization": `Bearer ${token}` } });

	const response = await fetch(request).then((response):Promise<any> => 
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