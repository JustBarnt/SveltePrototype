import { API } from "../stores/stores";
import { API_ENDPOINT, SearchRequest } from "./ApiController";

let endpoint = API_ENDPOINT;

/**
	* An event handler to handle the custom event from the svelte component
	* 
	* @async
	* @param {QueryDetails} Details - Object containing parameters to indicate successful requests.
	*/
async function GetLicenses(Details: QueryDetails)
{
	let { success, results, params } = Details;

	endpoint = `${API_ENDPOINT}/licenses/search`;

	console.log(params);

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchRequest(endpoint, params);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	API.set(apiStoreSchema);

	return success;
}

async function GetLicense(Details: QueryDetails)
{
	let { success, results, params } = Details;

	endpoint = `${API_ENDPOINT}/license/search`;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchRequest(endpoint, params);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	API.set(apiStoreSchema);

	return success;
}

export { GetLicenses, GetLicense };

