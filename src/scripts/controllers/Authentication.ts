import { GetAuthorization } from "@requests/Authorization";
import { Utilities } from "@utilities/Utilities";
import Cookies from "js-cookie";
class Authentication
{
	private static _LoggedIn: boolean | Promise<boolean> | Awaited<boolean> = false;
	private static readonly Date:Date = new Date();

	constructor(isSuccessful:boolean)
	{
		Authentication._LoggedIn = isSuccessful;
	}

	/**
	* Handles login attempts, if success user info gets saved to localStorage
	* @param {Event<any>} event - Event listener for loggin
	*/
	public static HandleLogin(details: { success: boolean }): void
	{
		let { success } = details;
		this._LoggedIn = success;
		
		//save user session to localStorage
		if(success)
		{
			/* 
			* Set up Selector/Validator. Select is a 12 byte long randomized string of characters. Selector is used to
			* look up in the database to find the validator.
			* Make sure to set an expiration date for the cookie, that is passed into the table, check to make sure
			* cookie isn't expired, and also get users id to add to the auth table as well
			* The validator is a 32 byte string of random characters that gets saved as plain text in cookies, and then
			* hashed and stored on the DB
			*/
			let expires = Authentication.Date.setDate(Authentication.Date.getDate() + 90);
			Cookies.set("selector", Utilities.GenerateRandomToken(12), { expires: expires });
			Cookies.set("validator", Utilities.GenerateRandomToken(32), { expires: expires });
			
			window.location.href = "/#/home";
		}
	}

	/**
	* Handles logging out the user and clearing the localStorage.
	*/
	public static HandleLogout(): void
	{
		Cookies.remove("selector", { expires: 90 });
		Cookies.remove("validator", { expires: 90 });
		this._LoggedIn = false;
	}

	/**
	* Signs user back in with localStorage.
	* @param {ILogin} userInfo - Implementation of the ILogin interface
	*/
	public static async ReturningUser(userInfo: ILogin): Promise<boolean> 
	{
		return this._LoggedIn = await GetAuthorization(userInfo);
	}

	public static get LoggedIn()
	{
		return this._LoggedIn;
	}

	public static set LoggedIn(success: boolean | Promise<boolean>)
	{
		this._LoggedIn = success;
	}
	public static get CookieExpiration()
	{
		return this.Date;
	}

}

export { Authentication };

