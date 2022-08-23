import { setContext } from "svelte";
import { Keys } from "../MapKeys";
import { API, FORMS } from "../stores/stores";
import { API_ROUTE, SearchRequest } from "./ApiController";

/**
	* An event handler to handle the custom event from the svelte component
	* 
	* @async
	* @param {Object} Details - Object containing parameters to indicate successful requests.
	* @callback StartLoading - Starts loading the data into the table.
	*/
async function HandleQuery(Details, StartLoading)
{
	let { success, results, params } = Details;

	//TODO: (Brent) update HTTP request to return object including status, which will allow me to create a 100% perfect
	//TODO: success boolean.
	results = await SearchRequest(API_ROUTE, params);
	success = results !== typeof "object" ? false : true;
	
	
	if(!success)
		throw new Error("Failed to aquire response from the server.");

	let apiStoreSchema = { success: success, response: results };

	console.groupCollapsed("API Store Schema");
	console.log(apiStoreSchema);
	console.groupEnd();

	API.set(apiStoreSchema);
	setContext(Keys.License, API);
	StartLoading();
}

/**
* Handle Form Submission update store and context
* @param {Object} formInformation - The submitted object from the form
*/
function HandleFormSubmission(formInformation)
{
	FORMS.set(formInformation);
	setContext(Keys.Form, FORMS);
}

export { HandleQuery, HandleFormSubmission };

