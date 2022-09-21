import { LICENSES, PREV_QUERY, USER_SESSION } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import { get } from "svelte/store";

export class Licenses
{
	private _options: Options;
	private _url: string = "https://localhost:7150/api/Licenses/";
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
		let response: Awaited<Query>;

		response = await fetch(this._request).then(response => 
		{
			if (response.ok) return response.json();
			
			throw new Error(`An error occured while attempting to query the database. CODE: ${response.status}`);
		})
			.then((json) => 
			{
				Utilities.FormatDateTime(json, "created", "");
				Utilities.FormatDateTime(json, "expires", "");

				LICENSES.set({ success: true, results: json });
				PREV_QUERY.set(this._searchParams);
				return { message: "Query Successful.", code: 200, success: true, results: json };
			})
			.catch(error =>
			{
				console.log(error);
			
				const messageHandler: Query = { message: error, success: false };
				return messageHandler;
			});

		return response;
	}

	async View(): Promise<Query>
	{
		this._request = new Request(`${this._url}/view/${this._searchParams}`, this._options);
		let response: Awaited<Query>;

		response = await fetch(this._request).then(response => 
		{
			if (response.ok) return response.json();
			
			throw new Error(`An error occured while attempting to query the database. CODE: ${response.status}`);
		})
		.then((json) => 
		{
			Utilities.FormatDateTime(json, "created", "");
			Utilities.FormatDateTime(json, "expires", "");

			LICENSES.set({ success: true, results: json });
			return { message: "Query Successful.", code: 200, success: true, results: json };
		})
		.catch(error =>
		{
			console.log(error);

			const messageHandler: Query = { message: error, success: false };
			return messageHandler;
			});

		return response;
	}
}