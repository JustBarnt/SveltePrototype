import { licenses } from "@stores/stores";

type objectFormat = Record<string, any>;

/**
* Contains useful utilitie/helper functions.
*/
export class Utilities
{
	/**
	* Creates a Beautified string
	* @param {String} header - an unformatted string to be prettified
	* @return {String} Returns a formated string
	*/
	static FormatColumnHeader(header: string): string
	{
		let parsedStr = header.replace(/([a-z])([A-Z])/g, "$1 $2");
		return parsedStr.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");

	}

	/**
	* Creates a query string
	* @param {Object} object - An object containing the values of the query
	* @param {String} id - A string containing the id for a single license.
	* @return {String} returns a query string.
	*/
	static BuildQueryString(object: Form): string
	{

		let query = new URLSearchParams();
		for (const key in object)
			query.append(key, object[ key ]);

		return `?${query.toString()}`;
	}

	/**
	* Edits any value in an array of objects that matches keyName's value with the replacement
	* values.
	*
	* @param {objectFormat} data - The array of objects from the json response
	* @param {Array<string>} keyNames - An array strings you want to replace.
	* @param {String} replacement - The string value to replace
	*/
	static FormatDateTime(data: objectFormat[], keyNames: Array<string>, replacement: string): void
	{
		keyNames.forEach((keyName:string) => 
		{
			data.forEach((item: objectFormat, index: number) => 
			{
				const keys = Object.keys(item);
				let currentKey = Object.keys(item);
				let tIndex = Utilities.GetTimeIndex(data[ index ][ keyName ]);
				let subStrEnd = data[ index ][ keyName ]?.length;

				if (Utilities.ArrayHas(keys, currentKey, keyName))
					for (const key in item)
						if (key === keyName)
							data[ index ][ key ] = item[ key ] !== null ?
								item[ key ].replace(item[ key ].substring(tIndex, subStrEnd), replacement) : "Perpetual";
			});
		});
	}

	/**
	* Used in `FormatDateTime()` to get the index position of the "T" in `Date()` format and remove it
	* @param {String} string - The string to check for the "T"
	* @return {String | Number} Returns a number if it exists, or it just returns the string back 
	*/
	private static GetTimeIndex(string: string): string | number
	{
		if (string !== null)
			return string.indexOf("T");
		else
			return string;
	}

	/**
	* Takes two arrays a value to see if they share it
	* @param {Array} arr1 - An array to check if value is included in it
	* @param {Array} arr2 - An array to check if value is included in it
	* @param {String} value - The value the two arrays may share
	* @return {Boolean}
	*/
	private static ArrayHas(arr1: Array<string | number>, arr2: Array<string | number>, value: string): boolean
	{
		return (arr1.includes(value) && arr2.includes(value));
	}

	/**
	* A simple async timeout. Literally used only for Svelte Await blocks.
	* @param {number} delay - Amount of time in ms to wait before resolving the promise
	* @return {Promise<boolean>} Returns a resolved promise.
	*/
	static async AsyncDelay(delay: number): Promise<boolean>
	{
		return new Promise((success) =>
		{
			setTimeout(() => 
			{
				success(true);
			}, delay);
		});
	}

	/**
	* Used to await an awaited request inside a svelte `#await` block
	* @param {any} awaited - A function/method that is async and can be awaited
	* @return {Promise<any>} Returns the awaited response type.
	*/
	static async AwaitFetch(awaited: any): Promise<any>
	{
		return await awaited;
	}

	/**
	* returns an array of guids
	* @param {Results} array - An array of results
	* @return {Array<string>} returns an array of GUID strings.
	*/
	static SaveGUID(array: Results): Array<string>
	{
		const guidArray: Array<string> = [];
		array.forEach((license: any) => 
		{
			for (const key in license)
			{
				if (Object.hasOwnProperty.call(license, key))
				{
					guidArray.push(license[ "id" ]);
					break;
				}
			}
		});

		return guidArray;
	}

	/**
	* Creates a randomly generated string of characters based of request length
	* @param {Number} length - the length of the requested string
	* @return {String} A randomly generated string
	*/

	static GenerateRandomToken(length: number)
	{
		let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		let str = "";
		for (let i = 0; i < length; i++)
			str += chars.charAt(Math.floor(Math.random() * chars.length));
		
		return str;
	}

	/**
	* Does form validation for the register users
	* @param {Record<string, any>} data - FormData object to validate
	* @return {Boolean} returns true or false if the form has any invalid areas.
	*/
	static FormValidation(data: { [fieldName: string]: any }): boolean
	{
		if (!Utilities.IsRequiredFieldValid(data.firstName))
			return false;
		if (!Utilities.IsRequiredFieldValid(data.lastname))
			return false;
		if (!Utilities.IsRequiredFieldValid(data.username))
			return false;
		if (!Utilities.IsRequiredFieldValid(data.password))
			return false;
		
		return true;
	}

	/**
	* Checks if field is valid
	* @param {any} value - value of the field to check
	* @return {Boolean} returns true or false
	*/
	static IsRequiredFieldValid(value: any):boolean
	{
		return value !== null && value !== "";
	}

	/**
	* Formats the json response for a liceses query and formats the `created` and `expires` section for the table
	* @param {objectForamt[]} json - The `response.json()`
	* @return {Results} Returns a `Results` typed object.
	*/
	static HandleJsonResponse(json: objectFormat[]): Results
	{
		Utilities.FormatDateTime(json, ["created", "expires"], "");
		licenses.set({ success: true, results: json });
		return json;
	}
}