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

	async Search(): Promise<boolean>
	{
		this._request = new Request(`${this._url}/search/${this._searchParams}`, this._options);
		
		const response = await LicenseRequest(this._request).then((results) => 
		{
			LICENSES.set({ success: true, results: results });
			PREV_QUERY.set(this._searchParams);
			return true;
		});

		return response;
	}

	async View(): Promise<boolean>
	{
		this._request = new Request(`${this._url}/view/${this._searchParams}`, this._options);

		const response = await LicenseRequest(this._request).then((results) => 
		{
			LICENSES.set({ success: true, results: results });
			return true;
		});

		return response;
	}
}

/**
* Creates a new post request to MSSQL Server
* @param {Request} request - The endpoint request.
* @return {Promise<response>} Returns a promise containing the JSON response
*/
const LicenseRequest = async(request: Request):Promise<Results> =>
{
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