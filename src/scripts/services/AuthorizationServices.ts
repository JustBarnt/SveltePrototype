import { Utilities } from "../utilities/Utilities";

/**
* Attempts to authorize the user by submitint user name and password to find a match, if successful it returns a promise
* containing the token.
* @param {String} endpoint - Completed string for the endpoint of the API
* @param {Record<unknown, string>} requestBody - body of the request object.
* @return {Promise<never | T>} Returns a fulfilled or rejected promise
*/
export const AuthorizeUser = async(endpoint:string, requestBody: ILogin): Promise<string> =>
{
	const headers = new Headers();

	const options = {
		method: "POST",
		headers: { "Content-type":"application/json" },
		body: JSON.stringify({
			username: requestBody.username,
			password: requestBody.password
		})
	};

	const request = new Request(`${endpoint}`, options);

	const response = await fetch(request).then((response):Promise<any> => 
	{
		if(response.ok)
			return response.json();
		
		//Create better message handler for different response statuses
		throw new Error(`Response not received. Status: ${response.status}`);
	})
	.then((json) => 
	{
		return json.token; 
	})
	.catch(err => console.log(err));

	return response;
};