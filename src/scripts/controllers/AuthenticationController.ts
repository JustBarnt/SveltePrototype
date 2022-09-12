import { AUTH_SESSION } from "../stores/stores";
import { GetAuthorization } from "./AuthorizationController";
class Authentication
{
	private static _isSuccessful: boolean = false;

	constructor(isSuccessful:boolean)
	{
		Authentication._isSuccessful = isSuccessful;
	}

	/**
	* Handles login attempts, if success user info gets saved to localStorage
	* @param {Event<any>} event - Event listener for loggin
	*/
	static HandleLogin(event:any): void
	{
		let { success, userInfo } = event.detail;
		this._isSuccessful = success;
		
		//save user session to localStorage
		if(success)
		{
			localStorage.setItem("id", userInfo.username);
			localStorage.setItem("password", userInfo.password);
			AUTH_SESSION.set(localStorage);
		}
	}

	/**
	* Handles logging out the user and clearing the localStorage.
	*/
	static HandleLogout(): void
	{
		localStorage.clear();
		this._isSuccessful = false;
	}

	/**
	* Signs user back in with localStorage.
	* @param {ILogin} userInfo - Implementation of the ILogin interface
	*/
	static async ReturningUser(userInfo: ILogin): Promise<void> 
	{
		this._isSuccessful = await GetAuthorization(userInfo);
	}

	static get isSuccessful()
	{
		return this._isSuccessful;
	}

	static set isSuccessful(success: boolean)
	{
		this._isSuccessful = success;
	}
}

export { Authentication };