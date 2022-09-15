import { DeleteValidationToken, GetValidation, RegisterValidation } from "@requests/Authorization";
import { USER_SESSION } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import Cookies from "js-cookie";
import { get } from "svelte/store";

class Authentication
{
	private static _LoggedIn: boolean | Promise<boolean> | Awaited<boolean> = false;
	private static Date: Date | null = null;
	private static Selector: string;
	private static Validator: string;

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
			let cookie: Cookie;
			let user = get(USER_SESSION);

			//In future add check box that controls whether this is ran or not.
			Authentication.RememberUser();
			cookie = { selector: this.Selector, validator: this.Validator, userId: user.id, expires: this.Date };
			RegisterValidation(cookie);

			//add check if here to make sure remember was successful. Or to alert the user is if wasn't

			window.location.href = "/#/home";
		}
	}

	/**
	* Handles logging out the user and clearing the localStorage.
	*/
	public static async HandleLogout(): Promise<void>
	{
		const user: User = get(USER_SESSION);
		const cookie: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator"), userId: user.id };
		const isDeleted: any = await DeleteValidationToken(cookie)
		.then(success => 
		{
			if (success)
			{
				Cookies.remove("selector", { expires: 90 });
				Cookies.remove("validator", { expires: 90 });
				this._LoggedIn = false;
			}
		})
		.catch(err => console.log(err));
	}

	private static RememberUser()
	{
		Authentication.Date = new Date();
		let expires = Authentication.Date.setDate(Authentication.Date.getDate() + 90);
		Cookies.set("selector", Utilities.GenerateRandomToken(12), { expires: expires });
		Cookies.set("validator", Utilities.GenerateRandomToken(32), { expires: expires });
		this.Selector = Cookies.get("selector");
		this.Validator = Cookies.get("validator");
	}

	private static RevokeCookies()
	{
		let expires = Authentication.Date.setDate(Authentication.Date.getDate() + 90);
		Cookies.remove("selector", { expires: expires });
		Cookies.remove("validator", { expires: expires });
	}

	/**
	* Signs user back in with localStorage.
	* @param {ILogin} userInfo - Implementation of the ILogin interface
	*/
	public static async ReturningUser(cookieInfo: Cookie): Promise<boolean> 
	{
		console.log(`Cookies found. Checking if they match.`);
		return this._LoggedIn = await GetValidation(cookieInfo);
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

	public static get Cookie()
	{
		return [this.Selector, this.Validator];
	}

}

export { Authentication };

