import Home from "@pages/Home.svelte";
import Login from "@pages/Login.svelte";
import Register from "@pages/Register.svelte";
import Response from "@pages/Response.svelte";

/**
* Controlls the navigation with `svelte-spa-router` using this makes it more obvious when changing pages, and removes the
* need to constantly use `window.location.href` in code.
*/
export class Navigation
{
	private static readonly _Routes:any = {
		"/": Login,
		"/home": Home,
		"/licenses": Response,
		"/register": Register
	};

	public static ChangePage(page: Navigation.Page)
	{
		window.location.href = page;
	}

	public static get Routes():any
	{
		return this._Routes;
	}
}

/**
* Enum holding the page routes.
*/
export namespace Navigation
{
	export enum Page
	{
		Login = "/#/",
		Home = "/#/home",
		Licenses = "/#/licenses",
		Register = "/#/register"
	}
}