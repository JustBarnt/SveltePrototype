export class Utilities
{
	/**
	* Creates a Beautified string
	* @param {String} string - an unformatted string to be prettified
	* @return {String} Returns a formated string
	*/
	static FormatColumnHeader(string)
	{
		let parsedStr = string.replace(/([a-z])([A-Z])/g, "$1 $2");
		return parsedStr.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
		
	}

	/**
	* Edits any value in an array of objects that matches keyName's value with the replacement
	* values.
	*
	* @param {Array} data - The array of objects from the json response
	* @param {String} keyName - The name of the key you want to find and replace in
	* @param {String} toReplace - The string data to be replaced
	* @param {String} replacement - The string value to replace
	*/
	static FormatDateTime(data, keyName, toReplace, replacement)
	{
		data.forEach((item, index) => 
		{
			const keys = Object.keys(item);
			let currentKey = Object.keys(item);

			if (this.#ArrayHas(keys, currentKey, keyName))
				for (const key in item)
					if (Object.hasOwnProperty.call(item, key))
						if (key === keyName)
							data[index][key] = item[key] !== null ? 
								item[key].replace(toReplace, replacement) : "N \\ A";
		});
	}

	/**
	* Takes two arrays a value to see if they share it
	* @param {Array} arr1 - An array to check if value is included in it
	* @param {Array} arr2 - An array to check if value is included in it
	* @param value - The value the two arrays may share
	* @return {Boolean}
	*/
	static #ArrayHas(arr1, arr2, value)
	{
		return (arr1.includes(value) && arr2.includes(value) );
	}
}