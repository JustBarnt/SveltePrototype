<script lang="ts">
	import { GetLicenses } from "../scripts/controllers/LicenseController";
	import Form from "../components/Form.svelte";
	import Response from "./Response.svelte";
	import { onMount } from "svelte";

	let isSuccessful = false;

	onMount(() => 
	{
		window.location.href = window.location.href + "#home";
	});

	//Look into reactive responses for updating page show. Compared to svelte:component
	$:LoadData = isSuccessful;
	
	async function HandleRequest(event)
	{
		const data: QueryDetails = { success: false, results: null, params: event.detail };
		isSuccessful = await GetLicenses(data);
	}

</script>

<Form on:request={HandleRequest} display="{LoadData === true ? "none" : "flex"}"/>

{#if LoadData}
	<Response/>
{/if}