import { LICENSES, PREV_QUERY, USER_SESSION } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import { get } from "svelte/store";

export class Licenses
{
	private _options: Options;
	private _url: string = "https://localhost:7150/Licenses";
	private _request: Request;
	private _searchParams: string;

	constructor(method: string, searchParams: string)
	{
		this._options = { method: method, headers: { "content-type": "application/json", "authorization": `Bearer: ${get(USER_SESSION).token}` } };
		this._searchParams = searchParams;
	}

	async Search(): Promise<Query>
	{
		this._request = new Request(`${this._url}/search/${this._searchParams}`, this._options);
		let response: Awaited<Response>;
		try 
		{
			response = await LicenseRequest(this._request);

			if (response.ok)
			{
				LICENSES.set({ success: response.ok, results: response });
				PREV_QUERY.set(this._searchParams);
				return { success: response.ok };	
			}

			throw new Error(`An error occured while attempting to query the database. Code: ${response.status}`);
		}
		catch (error)
		{
			const messageHandler:Query = { message: error, code: response.status, success: false };
			console.log(error);
			return messageHandler;
		}
	}

	async View(): Promise<boolean>
	{
		this._request = new Request(`${this._url}/view/${this._searchParams}`, this._options);

		const response = await LicenseRequest(this._request).then((results) => 
		{
			LICENSES.set({ success: true, results: results });
			return Promise.resolve(true);
		}).catch(error => 
		{
			console.log();
			return Promise.reject(false);
		});

		return response;
	}
}

/**
* Creates a new post request to MSSQL Server
* @param {Request} request - The endpoint request.
* @return {Promise<response>} Returns a promise containing the JSON response
*/
async function LicenseRequest(request: Request):Promise<Results>
{
	let response;

	try
	{
		response = await fetch(request);

		if (response.ok)
		{
			let data = response.json()
				.then((json) => 
				{
					Utilities.FormatDateTime(json, "created", "");
					Utilities.FormatDateTime(json, "expires", "");
					return json;
				});
			return data;
		}

		throw new Error(`Failed to retrieve a response. CODE: ${response.status}`);
	}
	catch(error)
	{ 
		return response;
	}
}