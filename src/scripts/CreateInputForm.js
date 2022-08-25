/**
* Creates a very simple HTML form and input. Used for hidden forms where the user wouldn't input information.
* @Class CreateInputForm
*/
export class CreateInputForm
{
	/**
	* Creates form element
	* @param {String} id - Form id
	* @param {String} name - Form name
	* @param {String} action - Form action
	* @param {String} method - Form METHOD
	* @return {HTMLFormElement} Returns an html form element
	*/
	static Form(id, name, action, method)
	{
		let form = document.createElement("form");
		form.setAttribute("id", id);
		form.setAttribute("name", name);
		form.setAttribute("action", action);
		form.setAttribute("method", method);
		return form;
	}

	/**
	* Creates input element
	* @param {String} type - Input type
	* @param {String} name - Input name
	* @param {String} value - Input value
	* @return {HTMLInputElement} Returns an html input element
	*/
	static Input(type, name, value)
	{
		let input = document.createElement("input");
		
		input.setAttribute("type", type);
		input.setAttribute("name", name);
		input.setAttribute("value", value);

		return input;
	}
}
