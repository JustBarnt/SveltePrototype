<script lang="ts">
	import Form from "../components/Form.svelte";
	import Response from "./Response.svelte";
	import { GetLicenses } from "../scripts/controllers/LicenseController";
	import { USER_SESSION } from "../scripts/stores/stores";

	let isSuccessful:boolean = false;

	//Yes using ANCHORS to control history works.

	//Look into reactive responses for updating page show. Compared to svelte:component
	$:LoadData = isSuccessful;
	
	async function HandleRequest(event: any)
	{
		const data: QueryDetails = { success: false, results: null, params: event.detail, token: $USER_SESSION };
		isSuccessful = await GetLicenses(data);
	}

</script>

<Form on:request={HandleRequest} display="{LoadData === true ? "none" : "flex"}"/>

{#if LoadData}
	<Response/>
{/if}