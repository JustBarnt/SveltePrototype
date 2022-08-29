import {writable} from "svelte/store";

type ApiModel = {success: boolean, response: {}[]};

const apiModel: ApiModel={ success: false, response: [{}] };
export const API = writable(apiModel);