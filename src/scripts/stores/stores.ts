import { writable } from "svelte/store";

let api: IResponse = { success: false, results: null };
let token: string | null = null;
let authSession: typeof localStorage;
// let userLocation: ILocation

export const LICENSES = writable<IResponse>(api);
export const USER_SESSION = writable<typeof token>(token);
export const PREV_QUERY = writable<string>("");