import { writable } from "svelte/store";

export const apiStore = writable([]);
export const queryRes = writable(
{
	show: false,
	data: [],
});