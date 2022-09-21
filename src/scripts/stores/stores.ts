import { writable } from "svelte/store";

let api: IResponse = { success: false, results: null };

export const licensesStore = writable<IResponse>(api);
export const sessionStore = writable<User>(null);
export const uriParamsStore = writable<string>("");
//TODO : NOT STARTED: Move componentStore remove management to here under an update function.
export const componentStore = writable<Array<ComponentManagement> | []>([]);