import { writable } from "svelte/store";

let api: IResponse = { success: false, results: null };
let token: string | null = null;
let authSession: typeof localStorage;
// let userLocation: ILocation

export const LICENSE_STORE = writable(api);
export const USER_SESSION = writable(token);
export const AUTH_SESSION = writable(authSession);
export const USER_LOCATION = writable();