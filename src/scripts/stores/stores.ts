import { writable } from "svelte/store";

//TODO: I believe I can just set the initial store to null. After getting a better understanding with svelte stores and typescript typings.
let api: IResponse = { success: false, results: null };

export const licensesStore = writable<IResponse>(api);
export const sessionStore = writable<User>(null);
export const uriParamsStore = writable<string>("");
export const componentStore = writable<Array<ComponentManagement> | []>([]);