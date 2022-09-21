import { PREV_QUERY, USER_SESSION } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import { get } from "svelte/store";

export class Licenses
{
	private options: Options;
	private url: string = "https://localhost:7150/api/Licenses/";
	private request: Request;
	private searchParams: string;
	private type: string;

	constructor(method: string, searchParams: string, type:string)
	{
		this.options = { method: method, headers: { "content-type": "application/json", "authorization": `Bearer: ${get(USER_SESSION).token}` } };
		this.searchParams = searchParams;
		this.url += type;
		this.type = type;
	}

	async Search(): Promise<Query>
	{
		const request = this.request = new Request(`${this.url}/${this.searchParams}`, this.options);
		let response: Awaited<Query>;

		response = await fetch(request).then(response => 
		{
			return response.ok ? response.json() : { error: new Error(`An error occured while attempting to query the database. CODE: ${response.status}`) };
		}).then((json) => 
		{
			json = Utilities.HandleJsonResponse(json);
			this.type === "all" ? PREV_QUERY.set(this.searchParams) : null;
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