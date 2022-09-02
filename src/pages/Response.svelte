<script lang="ts">
	import { onMount, afterUpdate } from "svelte";
	import { get } from "svelte/store";
	import Licenses from "../components/Licenses.svelte";
	import License from "../components/License.svelte";
	import { API } from "../scripts/stores/stores";
	import { Utilities } from "../scripts/utilities/Utilities";
	import { GetLicense } from "../scripts/controllers/EventController";
	import { Colors } from "../sass/scss";

	const AsyncAwait = Utilities.AsyncDelay;
	
	const HandleLicense = (event) => 
	{
		const { id, view } = event.detail;
		DispatchResponse.id = `?selector=${id}`;
		console.log(DispatchResponse.id);
		DispatchResponse.view = view;
	};

	let DispatchResponse: {id: string | null, view: string} = { id: null, view: "licenses" };
	let alertDisplay = "inherit";

	//TODO (Brent): Look into reactive statements for updating page show. Compared to svelte:component
	//TODO (Brent): Look at possible using a derived version of the API store for singular licenes- That way in the
	//				future in an actual build, they user can go back without losing data of the licenses they queried.
	$: CurrentView = DispatchResponse.view;
	$: LicenseId = DispatchResponse.id;
	$: display = alertDisplay;

</script>

{#await AsyncAwait(250) then success}
	<!--Create Table-->
	{#if CurrentView === "licenses"}
		<Licenses on:license={HandleLicense} bind:data={$API.results}/>
	{:else}
		{#await GetLicense({ success:false, results: null, params: LicenseId })}
			<alert style:display style={`background: ${Colors.BLUE}`}>Gettings selected license information...</alert>
		{:then success}
			<alert style:display style={`background: ${Colors.GREEN}`}>License found! Loading license now.</alert>
			{#await AsyncAwait(250) then success}
				<License on:loaded={() => alertDisplay = "none"} bind:data={$API.results}/>
			{/await}
		{:catch error}
			<alert style:display style={`background: ${Colors.RED}`}>{error}</alert>
		{/await}
	{/if}
{/await}

<style lang="scss">
	alert{
		@include alert-base;
		font-size: 1.6rem;
		padding: 1rem 2rem;
		text-align: center;
		transition: all 0.25s;
	}
</style>