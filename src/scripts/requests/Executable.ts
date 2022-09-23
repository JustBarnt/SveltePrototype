/**
* Executable class used to run the fetch statement to open an executable.
*/
export class Executable
{
	private options: Options;
	private url: string = "https://localhost:7150/api/Executable";
	private request: Request;

	/**
	* @Constructor method that sets the method, header, and body
	* @param {String} method - The HTTP method being used for the request
	* @param {Record<string, string>} headers - The HTTP request headers
	* @param {any} body - The body of the request, gets transformed in to a JSON string.
	*/
	constructor(method: string, body: any, headers: Record<string, string>)
	{
		this.options = { method: method, headers: headers, body: JSON.stringify(body) };
	}

	/**
	* Send a `Request` to the API to open an application.
	* @return {Promise<any>} returns the response
	*/
	async RequestApplication(): Promise<any>
	{
		const request = this.request = new Request(`${this.url}/open`, this.options);
		let results: Awaited<any> = await ExecutableRequest(request);

		return results;
	}
}

/**
* Asynchronous fetch request
* @param {Request} request - A `Request` object used for the fetch.
* @return {Promise<any>} Returns a `Promise` type resolution.
*/ 
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