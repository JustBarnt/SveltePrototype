import { LICENSES, PREV_QUERY, USER_SESSION } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import { get } from "svelte/store";

/**
* Retrieves a group of licenses on the passed details.
* @param {QueryDetails} Details - details from the event.
* @return {Return} Returns a resolved promise
*/
export async function ViewLicense(Details: QueryDetails, endpoint: string = "search"): Promise<boolean>
{
	const url = `https://localhost:7150/licenses/${endpoint}`;
	let { success, results, params } = Details;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchLicenses(url, params).then((results) => 
	{
		success = true;
		let apiStoreSchema: IResponse = { success: success, results: results };
		LICENSES.set(apiStoreSchema);
		endpoint === "search" ? PREV_QUERY.set(params) : null;
	})
	.catch((err) => 
	{
		success = false;
		console.log("Failed to retrieve response.");
	});

	return success; 
}

/**
* Creates a new post request to MSSQL Server
* @param {String} endpoint - API Endpoint for the request
* @param {String} params - Parsed query string leading with "?"
* @param {String} token - Authentication Token
* @return {Promise<response>} Returns a promise containing the JSON response
*/
const SearchLicenses = async(endpoint: string, params:string):Promise<Results> =>
{
	const request = new Request(`${endpoint}/${params}`,
		{
			method: "GET",
			headers: { "content-type": "application/json", "authorization": `Bearer ${get(USER_SESSION).token}` }
		});

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