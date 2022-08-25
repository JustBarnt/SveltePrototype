<script>
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import LicenseTable from "../components/LicenseTable.svelte";
	import { HandleQuery } from "../scripts/controllers/EventController";
	import { API } from "../scripts/stores/stores";
	import { Utilities } from "../scripts/utilities/Utilities";

	const EventDetails = { success: false, results: null, params: "" };
	const AsyncAwait = Utilities.AsyncDelay;
	let apiContext;

	onMount(() =>
	{
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
	{#await AsyncAwait(500) then success}
		<LicenseTable bind:data={apiContext.response}/>
	{/await}
</div>

<style>
	#TableContainer{
		padding-top: calc(var(--headerHeight) + var(--contentPadding));
	}
</style>