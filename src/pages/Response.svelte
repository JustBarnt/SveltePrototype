<script lang="ts">
	import License from "@components/License.svelte";
	import Licenses from "@components/Licenses.svelte";
	import { Colors } from "@enums/enums";
	import { ViewLicense } from "@requests/Licenses";
	import { LICENSES, USER_SESSION } from "@stores/stores";
	import { Utilities } from "@utilities/Utilities";

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
		<Licenses on:license={HandleLicense} bind:data={$LICENSES.results}/>
	{:else}
		{#await ViewLicense({ success:false, results: null, params: LicenseId, token: $USER_SESSION })}
			<alert style:display style={`background: ${Colors.BLUE}`}>Gettings selected license information...</alert>
		{:then success}
			<alert style:display style={`background: ${Colors.GREEN}`}>License found! Loading license now.</alert>
			{#await AsyncAwait(250) then success}
				<License on:change={(event) => DispatchResponse.view = event.detail.view} on:loaded={() => alertDisplay = "none"} bind:data={$LICENSES.results}/>
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