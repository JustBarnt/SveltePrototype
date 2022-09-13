import Home from "@pages/Home.svelte";
import Login from "@pages/Login.svelte";
import Response from "@pages/Response.svelte";

export const routes = {
	"/": Login,
	"/home": Home,
	"/licenses": Response
};