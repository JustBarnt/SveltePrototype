import { writable } from "svelte/store";

export const apiStore = writable([]);
export const eventStore = writable(
{
	show: false,
	type: "",
	data: [],
});