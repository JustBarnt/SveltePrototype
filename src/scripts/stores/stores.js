import { writable } from "svelte/store";

const apiModel = { success: false, response:[] };
export const API = writable(apiModel);