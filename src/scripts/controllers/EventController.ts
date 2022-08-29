import { API } from "../stores/stores";
import { API_ENDPOINT, SearchRequest } from "./ApiController";

let endpoint=API_ENDPOINT;
type details = { success: boolean, results: {} [], params: string };

/**
	* An event handler to handle the custom event from the svelte component
	* 
	* @async
	* @param {details} Details - Object containing parameters to indicate successful requests.
	* @callback Callback - Starts loading the data into the table.
	*/
async function HandleQuery(Details: details, Callback:() => void)
{
	let { success, results, params } = Details;

	if(params.toLowerCase().includes("amount"))
		endpoint = `${API_ENDPOINT}/licenses/search`;
	else
		endpoint = `${API_ENDPOINT}/license/search`;
		
	//TODO: (Brent) update HTTP request to return object including status.
	results = await SearchRequest(endpoint, params);
	success = typeof results !== "object" ? false : true;
	
	if(!success)
		throw new Error("Failed to retrieve response.");

	let apiStoreSchema = { success: success, response: results };
	API.set(apiStoreSchema);
	Callback();
}

export { HandleQuery };

