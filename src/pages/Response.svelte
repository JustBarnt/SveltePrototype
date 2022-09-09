<script lang="ts">
	import Licenses from "../components/Licenses.svelte";
	import License from "../components/License.svelte";
	import { LICENSE_STORE, USER_SESSION } from "../scripts/stores/stores";
	import { Utilities } from "../scripts/utilities/Utilities";
	import { ViewLicense } from "../scripts/controllers/LicenseController";
	import { Colors } from "../enums/scss";

	const AsyncAwait = Utilities.AsyncDelay;
	
	const HandleLicense = (event:CustomEvent) => 
	{
		const { id, view } = event.detail;
		DispatchResponse.id = `?selector=${id}`;
		DispatchResponse.view = view;
	};

	let DispatchResponse: { id: string | null, view: string } = { id: null, view: "licenses" };
	let alertDisplay = "inherit";

	//Replace alert tags with the alert component.
	$: CurrentView = DispatchResponse.view;
	$: LicenseId = DispatchResponse.id;
	$: display = alertDisplay;

</script>

{#await AsyncAwait(250) then success}
	<!--Create Table-->
	{#if CurrentView === "licenses"}
		<Licenses on:license={HandleLicense} bind:data={$LICENSE_STORE.results}/>
	{:else}
		{#await ViewLicense({ success:false, results: null, params: LicenseId, token: $USER_SESSION })}
			<alert style:display style={`background: ${Colors.BLUE}`}>Gettings selected license information...</alert>
		{:then success}
			<alert style:display style={`background: ${Colors.GREEN}`}>License found! Loading license now.</alert>
			{#await AsyncAwait(250) then success}
				<License on:loaded={() => alertDisplay = "none"} bind:data={$LICENSE_STORE.results}/>
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