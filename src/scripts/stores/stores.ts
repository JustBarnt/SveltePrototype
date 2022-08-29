import {writable} from "svelte/store";

let apiModel: ApiModel = {success: false, results: null};
export const API = writable(apiModel);