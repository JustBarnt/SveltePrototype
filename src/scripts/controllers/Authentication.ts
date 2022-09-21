import { Authorization } from "@requests/Authorization";
import { sessionStore } from "@stores/stores";
import { Utilities } from "@utilities/Utilities";
import Cookies from "js-cookie";
import { get } from "svelte/store";

class Authentication
{
	private static _LoggedIn: boolean | Promise<boolean> | Awaited<boolean> = false;
	private static Date: Date | null = null;
	private static Selector: string;
	private static Validator: string;
	static RememberMe: boolean = false;

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
			let user = get(sessionStore);

			//In future add check box that controls whether this is ran or not.
			if (Authentication.RememberMe)
			{
				Authentication.RememberUser();
				cookie = { selector: this.Selector, validator: this.Validator, userId: user.id, expires: this.Date };
				new Authorization("POST", { "content-type": "application/json" }, cookie).RegisterValidation();
			}
			//add check if here to make sure remember was successful. Or to alert the user is if wasn't

			window.location.href = "/#/home";
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
		
		const user: User = get(sessionStore);
		const cookie: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator"), userId: user.id };
		await new Authorization("DELETE", { "content-type": "application/json", "authorization": `Bearer: ${get(sessionStore).token}` }, cookie).DeleteValidation()
		.then(success => 
		{
			Cookies.remove("selector", { expires: 90 });
			Cookies.remove("validator", { expires: 90 });
			this._LoggedIn = false;
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

	public static async ReturningUser(cookie: Cookie): Promise<boolean> 
	{
		return this._LoggedIn = await new Authorization("POST", { "content-type": "application/json" }, cookie).GetValidation();
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

