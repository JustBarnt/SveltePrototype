import { LICENSES, PREV_QUERY } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";

/**
* Retrieves a group of licenses on the passed details.
* @param {QueryDetails} Details - details from the event.
* @return {Return} Returns a resolved promise
*/
export async function GetLicenses(Details: QueryDetails): Promise<boolean>
{
	const endpoint = `https://localhost:7150/licenses/search`;
	let { success, results, params, token } = Details;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchLicenses(endpoint, params, token);
	success = typeof results !== "object" ? false : true;

	if (!success)
	{
		new Error("Failed to retrieve response.");
		return success;
	}
	else
	{
		let apiStoreSchema: IResponse = { success: success, results: results };
		LICENSES.set(apiStoreSchema);
		PREV_QUERY.set(params);
		return success;	
	}
}

/**
* Retrieves a single license using the passed GUID
* @param {QueryDetails} Details - details from the event.
* @return {Return} Returns a resolved promise
*/
export async function ViewLicense(Details: QueryDetails): Promise<boolean>
{
	let { success, results, params, token } = Details;

	const endpoint = `https://localhost:7150/licenses/view`;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchLicenses(endpoint, params, token);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	LICENSES.set(apiStoreSchema);

	return success;
}

/**
* Creates a new post request to MSSQL Server
* @param {String} endpoint - API Endpoint for the request
* @param {String} params - Parsed query string leading with "?"
* @param {String} token - Authentication Token
* @return {Promise<response>} Returns a promise containing the JSON response
*/
const SearchLicenses = async(endpoint: string, params:string, token: string):Promise<Results> =>
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