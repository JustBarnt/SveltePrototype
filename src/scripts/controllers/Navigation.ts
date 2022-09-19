import Home from "@pages/Home.svelte";
import Login from "@pages/Login.svelte";
import RegisterUser from "@pages/Register.svelte";
import Response from "@pages/Response.svelte";
import { SvelteComponent } from "svelte";

/**
* Controlls the navigation with `svelte-spa-router` using this makes it more obvious when changing pages, and removes the
* need to constantly use `window.location.href` in code.
*/
export class Navigation
{
	private static readonly _Routes: Record<string, typeof SvelteComponent> = {
		"/": Login,
		"/home": Home,
		"/licenses": Response,
		"/register": RegisterUser
	};

	public static ChangePage(page: Navigation.Page | string)
	{
		window.location.href = page;
	}

	public static get Routes(): Record<string, typeof SvelteComponent>
	{
		return this._Routes;
	}
}

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