import { AUTH_SESSION } from "@stores/stores";
import { GetAuthorization } from "./AuthorizationController";
class Authentication
{
	private static _LoggedIn: boolean | Promise<boolean> | Awaited<boolean> = false;

	constructor(isSuccessful:boolean)
	{
		Authentication._LoggedIn = isSuccessful;
	}

	/**
	* Handles login attempts, if success user info gets saved to localStorage
	* @param {Event<any>} event - Event listener for loggin
	*/
	public static HandleLogin(details: { success: boolean, userInfo: ILogin }): void
	{
		let { success, userInfo } = details;
		this._LoggedIn = success;
		
		//save user session to localStorage
		if(success)
		{
			localStorage.setItem("id", userInfo.username);
			localStorage.setItem("password", userInfo.password);
			AUTH_SESSION.set(localStorage);
			window.location.href = "/#/home";
		}
	}

	/**
	* Handles logging out the user and clearing the localStorage.
	*/
	public static HandleLogout(): void
	{
		localStorage.clear();
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
}

export { Authentication };

