import { Navigation } from "@controllers/Navigation";
import { Authorization } from "@requests/Authorization";
import { session } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import Cookies from "js-cookie";
import { get } from "svelte/store";

class Authentication
{
	private static _LoggedIn: boolean | Promise<boolean> | Awaited<boolean> = false;
	private static Date: Date | null = new Date();
	private static Selector: string;
	private static Validator: string;
	static RememberMe: boolean = false;

	/**
	* Handles login attempts, if success user info gets saved to localStorage
	* @param {Event<any>} event - Event listener for loggin
	*/
	public static async HandleLogin(details: { success: boolean }): Promise<void>
	{
		let { success } = details;
		this._LoggedIn = success;
		
		if(success)
		{
			//In future add check box that controls whether this is ran or not.
			if (Authentication.RememberMe)
			{
				let cookie: Cookie;
				let user = get(session);
				const expires = this.Date.setDate(this.Date.getDate() + 90);

				console.log(`Cookie expires in ${expires} days`);
				
				Authentication.RememberUser();
				cookie = { selector: this.Selector, validator: this.Validator, userId: user.id, expires: expires };
				await new Authorization("POST", { "content-type": "application/json" }, cookie).RegisterValidation();
			}
			Navigation.ChangePage(Navigation.Page.Home);
		}
	}

	/**
	* Handles logging out the user and clearing the cookies if they are present.
	*/
	public static async HandleLogout(): Promise<void>
	{
		if (Cookies.get("selector") === undefined)
		{
			this._LoggedIn = false;
			return;
		}
		
		const user: User = get(session);
		const cookie: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator"), userId: user.id };
		await new Authorization("DELETE", { "content-type": "application/json", "authorization": `Bearer: ${get(session).token}` }, cookie).DeleteValidation()
		.then(success => 
		{
			Cookies.remove("selector", { expires: 90 });
			Cookies.remove("validator", { expires: 90 });
			this._LoggedIn = false;
		})
		.catch(err => console.log(err));
	}

	/**
	* Sets up cookies in the users browser to remember them.
	*/
	private static RememberUser()
	{
		Authentication.Date = new Date();
		let expires = Authentication.Date.setDate(Authentication.Date.getDate() + 90);

		Cookies.set("selector", Utilities.GenerateRandomToken(12), { expires: expires });
		Cookies.set("validator", Utilities.GenerateRandomToken(32), { expires: expires });

		this.Selector = Cookies.get("selector");
		this.Validator = Cookies.get("validator");
	}

	/**
	* Removes the cookies after expiration.
    * TODO: Needs tested still.
	*/
	private static RevokeCookies()
	{
		let expires = Authentication.Date.setDate(Authentication.Date.getDate() + 90);
		Cookies.remove("selector", { expires: expires });
		Cookies.remove("validator", { expires: expires });
	}

	/**
	* Runs when the page finds a `selector` cookie, logs in the user.
	* @param {Cookie} cookie - The set of `selector` and `validator` cookies.
	* @return {Boolean} returns true of false if the login is successful. 
	*/
	public static async ReturningUser(cookie: Cookie): Promise<boolean> 
	{
		const results = await new Authorization("POST", { "content-type": "application/json" }, cookie).GetValidation();
		this._LoggedIn = results.success;
		return this._LoggedIn; 
	}

	/**
	* Returns the login status
	* @return {Boolean} returns true or false
	*/
	public static get LoggedIn()
	{
		return this._LoggedIn;
	}

	/**
	* Sets the login status
	* @param {Boolean | Promise<boolean>} success - Takes a boolean to update the login status
	*/
	public static set LoggedIn(success: boolean | Promise<boolean>)
	{
		this._LoggedIn = success;
	}

	/**
	* Returns the expiration date of the cookies
	* @return {Date} Returns a `Date()` signifying the expiration date.
	*/
	public static get CookieExpiration():Date
	{
		return this.Date;
	}

	/**
	* Returns the `selector` and `validator` cookies
	* @return {Array<string>} An array containing the two cookies.
	*/
	public static get Cookie()
	{
		return [this.Selector, this.Validator];
	}

}

export { Authentication };

