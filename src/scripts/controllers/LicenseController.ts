import { LICENSE_STORE } from "../stores/stores";
import { SearchRequest } from "../services/LicenseServices";

/**
	* An event handler to handle the custom event from the svelte component
	* 
	* @async
	* @param {QueryDetails} Details - Object containing parameters to indicate successful requests.
	*/
async function GetLicenses(Details: QueryDetails)
{
	const endpoint = `https://localhost:7150/licenses/search`;
	let { success, results, params } = Details;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchRequest(endpoint, params);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	LICENSE_STORE.set(apiStoreSchema);

	return success;
}

async function ViewLicense(Details: QueryDetails)
{
	let { success, results, params } = Details;

	endpoint = `${licenseEndpoint}/license/search`;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchRequest(endpoint, params);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	LICENSE_STORE.set(apiStoreSchema);

	return success;
}

export { GetLicenses, ViewLicense };

