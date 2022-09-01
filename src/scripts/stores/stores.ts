import { writable } from "svelte/store";

let apiModel: IResponse = { success: false, results: null };
export const API = writable(apiModel);