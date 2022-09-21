export class Executable
{
	private options: Options;
	private url: string = "https://localhost:7150/api/Executable";
	private request: Request;

	constructor(method: string, body: any, headers: Record<string, string>)
	{
		this.options = { method: method, headers: headers, body: JSON.stringify(body) };
	}


	async RequestApplication(): Promise<any>
	{
		const request = this.request = new Request(`${this.url}/open`, this.options);
		let results: Awaited<any> = await ExecutableRequest(request);

		return results;
	}
}


async function ExecutableRequest(request: Request): Promise<any>
{
	const response = await fetch(request).then((response): Promise<any> => 
	{
		if (response.ok)
			return response.json();
		
		throw new Error(`Request failed. Status: ${response.status}`);
	})
	.then((json) => 
	{
		return json;
	})
	.catch(err =>
	{
		console.log(err);
	});

	return response;
}