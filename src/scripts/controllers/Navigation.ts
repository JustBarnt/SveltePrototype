import { routes } from "@services/Route";

/**
* Controlls the navigation with `svelte-spa-router` using this makes it more obvious when changing pages, and removes the
* need to constantly use `window.location.href` in code.
*/
export class Navigation
{
	private readonly _routes = routes;
}

export namespace Navigation
{
	export enum Page
	{
		Login = "/#/",
		Home = "/#/home",
		Licenses = "/#/licenses",
	}
}