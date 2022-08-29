<script lang="ts">
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import EditForm from "../components/EditForm.svelte";
	import LicenseTable from "../components/LicenseTable.svelte";
	import { HandleQuery } from "../scripts/controllers/EventController";
	import { API } from "../scripts/stores/stores";
	import { Utilities } from "../scripts/utilities/Utilities";

	const EventDetails = { success: false, results: null, params: "" };
	const AsyncAwait = Utilities.AsyncDelay;

	let apiContext: ApiModel;
	let editActive = false;

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

	const HandleLicenseEdit = (event:Event) => { editActive = !editActive;};
</script>

<div class="container">
	{#await AsyncAwait(500) then resolution}
		{#if !editActive}
			<LicenseTable data={apiContext.results} on:edit={HandleLicenseEdit}/>
		{:else}	
			<EditForm data={apiContext.results}/>
		{/if}
	{/await}
</div>