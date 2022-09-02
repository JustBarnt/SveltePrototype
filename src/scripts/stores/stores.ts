import { writable } from "svelte/store";

let api: IResponse = { success: false, results: null };
export const API = writable(api);