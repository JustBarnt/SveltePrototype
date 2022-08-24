<script>
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import Table from "../components/Table.svelte";
	import { HandleQuery } from "../scripts/controllers/EventController";
	import { API } from "../scripts/stores/stores";
	import { Utilities } from "../scripts/utilities/Utilities";

	const EventDetails = { success: false, results: null, params: "" };
	const AsyncAwait = Utilities.AsyncDelay;
	let apiContext;

	onMount(() =>
	{
		/*
		NOTE: CANNOT UTILIZE Lifecycle functions with PAGE.js or any other form of Routing. Unsure if this is true
		SvelteKit or not, I imagine they will have a way to use lifecycle functions between pages or else it would
		ruin one of the biggest aspects of the framework.
		*/
		
		const urlQuery = window.location.search;
		EventDetails.params = urlQuery;
		HandleQuery(EventDetails, BuildTable);
	});

	function BuildTable()
	{
		apiContext = get(API);
	}
</script>

<div id="TableContainer">
	{#await AsyncAwait(1000) then success}
		<Table bind:data={apiContext.response}/>
	{/await}
</div>

<style>
	#TableContainer{
		padding-top: calc(var(--headerHeight) + 15px);
	}
</style>