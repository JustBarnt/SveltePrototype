import { sessionStore, uriParamsStore } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import { get } from "svelte/store";

/**
* Class controlling the licenses requests
*/
export class LicensesController
{
	private options: Options;
	private url: string = "https://localhost:7150/api/Licenses/";
	private request: Request;
	private searchParams: string;
	private type: string;

	/**
	* @Constructor method that sets the method, header, and body
	* @param {String} method - The HTTP method being used for the request
	* @param {String} searchParams - The body of the request, gets transformed in to a JSON string.
	* @param {String} type - The type of query. `all` for the initial search of licenses, `single` for a single licenses onces a row is clicked on in the license table
	*/
	constructor(method: string, searchParams: string, type:string)
	{
		this.options = { method: method, headers: { "content-type": "application/json", "authorization": `Bearer: ${get(sessionStore).token}` } };
		this.searchParams = searchParams;
		this.url += type;
		this.type = type;
	}


	/**
	* Asynchronous fetch request
	* @return {Promise<Query>} Returns a `Query` type repsonse.
	*/ 
	async Search(): Promise<Query>
	{
		const request = this.request = new Request(`${this.url}/${this.searchParams}`, this.options);
		let response: Awaited<Query>;

		response = await fetch(request).then(response => 
		{

			if (response.ok)
				return response.json();
			
			throw new Error(`An error occured while attempting to query the database. CODE: ${response.status}`);
		}).then((json) => 
		{
			json = Utilities.HandleJsonResponse(json);
			this.type === "all" ? uriParamsStore.set(this.searchParams) : null;
			return { message: "Query Successful.", code: 200, success: true, results: json };
		}).catch(error =>
		{
			console.log(error);
		
			const messageHandler: Query = { message: error, success: false };
			return messageHandler;
		});
		return response;
	}
}