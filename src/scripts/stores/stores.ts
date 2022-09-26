import { writable } from "svelte/store";

//TODO: I believe I can just set the initial store to null. After getting a better understanding with svelte stores and typescript typings.
let api: IResponse = { success: false, results: null };

export const licenses = writable<IResponse>(api);
export const session = writable<User>(null);
export const uriParams = writable<string>("");
export const components = writable<Array<ComponentManagement> | []>([]);
export const alerts = writable<IAlert>();