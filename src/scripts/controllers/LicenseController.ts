import { LICENSE_STORE } from "../stores/stores";
import { SearchLicenses } from "../services/LicenseServices";

/**
* Retrieves a group of licenses on the passed details.
* @param {QueryDetails} Details - details from the event.
* @return {Return} Returns a resolved promise
*/
async function GetLicenses(Details: QueryDetails): Promise<boolean>
{
	const endpoint = `https://localhost:7150/licenses/search`;
	let { success, results, params, token } = Details;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchLicenses(endpoint, params, token);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	LICENSE_STORE.set(apiStoreSchema);

	return success;
}

/**
* Retrieves a single license using the passed GUID
* @param {QueryDetails} Details - details from the event.
* @return {Return} Returns a resolved promise
*/
async function ViewLicense(Details: QueryDetails): Promise<boolean>
{
	let { success, results, params, token } = Details;

	const endpoint = `https://localhost:7150/licenses/view`;

	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchLicenses(endpoint, params, token);
	success = typeof results !== "object" ? false : true;

	if (!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema: IResponse = { success: success, results: results };
	LICENSE_STORE.set(apiStoreSchema);

	return success;
}

export { GetLicenses, ViewLicense };

