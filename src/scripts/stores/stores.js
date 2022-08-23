import { writable } from "svelte/store";

const apiModel = { success: false, response:[] };
export const API = writable(apiModel);
export const FORMS = writable({ amount: 10, column: "createdby", value: "joshr", startDate:"", endDate:"" });