import { PREV_QUERY, USER_SESSION } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import { get } from "svelte/store";

export class Licenses
{
	private _options: Options;
	private _url: string = "https://localhost:7150/api/Licenses/";
	private _request: Request;
	private _searchParams: string;
	private _type: string;

	constructor(method: string, searchParams: string, type:string)
	{
		this._options = { method: method, headers: { "content-type": "application/json", "authorization": `Bearer: ${get(USER_SESSION).token}` } };
		this._searchParams = searchParams;
		this._url += type;
		this._type = type;
	}

	async Search(): Promise<Query>
	{
		this._request = new Request(`${this._url}/${this._searchParams}`, this._options);
		let response: Awaited<Query>;

		response = await fetch(this._request).then(response => 
		{
			return response.ok ? response.json() : { error: new Error(`An error occured while attempting to query the database. CODE: ${response.status}`) };
		}).then((json) => 
		{
			json = Utilities.HandleJsonResponse(json);
			this._type === "all" ? PREV_QUERY.set(this._searchParams) : null;
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