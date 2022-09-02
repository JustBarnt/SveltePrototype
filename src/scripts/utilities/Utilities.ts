interface objectFormat
{
	[ key: string ]: string | number;
}

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
	* @param {Array} data - The array of objects from the json response
	* @param {String} keyName - The name of the key you want to find and replace in
	* @param {String} replacement - The string value to replace
	*/
	static FormatDateTime(data: objectFormat[], keyName: string, replacement: string): void
	{
		data.forEach((item: objectFormat, index: number) => 
		{
			const keys = Object.keys(item);
			let currentKey = Object.keys(item);
			let tIndex = this.#GetTimeIndex(data[ index ][ keyName ]);
			let subStrEnd = data[ index ][ keyName ]?.length;

			if (this.#ArrayHas(keys, currentKey, keyName))
				for (const key in item)
					if (key === keyName)
						data[ index ][ key ] = item[ key ] !== null ?
							item[ key ].replace(item[ key ].substring(tIndex, subStrEnd), replacement) : "Perpetual";
		});
	}

	static #GetTimeIndex(string: string): string | number
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
	static #ArrayHas(arr1: Array<string | number>, arr2: Array<string | number>, value: string): boolean
	{
		return (arr1.includes(value) && arr2.includes(value));
	}

	/**
	* A simple async timeout. Literally used only for Svelte Await blocks.
	* @param {number} delay - Amount of time in ms to wait before resolving the promise
	* @return {Promise} Returns a resolved promise.
	*/
	static async AsyncDelay(delay: number): Promise<void>
	{
		return new Promise((success) =>
		{
			setTimeout(() => 
			{
				success();
			}, delay);
		});
	}

	/**
	* returns an array of guids
	* @param {Results} array - An array of results
	* @return {Array<string>} returns an array of GUID strings.
	*/
	static SaveGUID(array: Results): Array<string>
	{
		const guidArray: Array<string> = [];
		array.forEach((license) => 
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
}