import { writable } from "svelte/store";

const apiModel = { success: false, response:[] };
export const apiStore = writable(apiModel);