<script lang="ts">
	//TODO: NOT STARTED: Brent create index.ts files to house all exports.
	import Alert from "@components/Alert.svelte";
	import License from "@components/License.svelte";
	import Licenses from "@components/Licenses.svelte";
	import { Colors } from "@enums/enums";
	import { LicensesController } from "@requests/Licenses";
	import { licensesStore, uriParamsStore } from "@stores/stores";
	import { Utilities } from "@utilities/Utilities";

	let DispatchResponse: { id: string | null; view: string } = { id: null, view: "all" };

	const AsyncAwait = Utilities.AsyncDelay;
	const AlertProps: any = { visible:"visible", message: "", styles: { background: Colors.RED } };
	
	const HandleLicense = (event: CustomEvent) => 
		({ id: event.detail.id, view: event.detail.view } = DispatchResponse);

	const UpdateProps = (vis: string, msg:string, style: Colors | IStyles): any =>
		({ visible: vis, message: msg, styles: style } = AlertProps);


	//Reactive variables.
	$: currentView = DispatchResponse.view;
	$: licenseId = DispatchResponse.id;
	$: props = AlertProps;
</script>

<!-- TODO: IN PROGRESS: Brent move licenses fetch request here. That way users can easily know its searching, and if it fails. -->
<!-- TODO: NOT STARTED: Brent refactor alerts to use new alert components -->

{#await Utilities.AwaitFetch( new LicensesController("GET", $uriParamsStore, "all").Search() )}
	{ UpdateProps("visible", "Contacting service for the request...", Colors.BLUE) }
	<Alert {...props} expiration={3000} />

{:then response}
	{#if response.success && currentView === "all"}
		<Licenses on:license={HandleLicense} data={response.results} />

	{:else}
		{#await Utilities.AwaitFetch(new LicensesController("GET", licenseId, "single").Search())}
			{ UpdateProps("visible", "Contacting service for the licene request...", Colors.BLUE) }
			<Alert {...props} expiration={1500} />

		{:then response}
			{#if response.success}
			{ UpdateProps("visible", "License found!", Colors.GREEN) }
				<Alert {...props} expiration={1500} />

				{#await AsyncAwait(250) then success}
					
					<License on:change={ event => DispatchResponse.view = event.detail.view } bind:data={$licensesStore.results} />
				
				{/await}
			{/if}
		{:catch error}
			{ UpdateProps("visible", error, Colors.RED) }
			<Alert {...props} />

		{/await}
	{/if}
{:catch error}
	{ UpdateProps("visible", error, Colors.RED) }					
	<Alert {...props} />
	
{/await}

<!-- {#await AsyncAwait(250) then success}
	{#if currentView === "all"}
		<Licenses
			on:license={HandleLicense}
			bind:data={$licensesStore.results} />
	{:else}
		{#await new LicensesController("GET", licenseId, "single").Search()}
			<alert style:display style={`background: ${Colors.BLUE}`}
				>Gettings selstoreLicensescense information...</alert>
		{:then success}
			<alert style:display style={`background: ${Colors.GREEN}`}
				>License found! Loading license now.</alert>
			{#await AsyncAwait(250) then success}
				<License
					on:change={(event) =>
						(DispatchResponse.view = event.detail.view)}
					on:loaded={() => (alertDisplay = "none")}
					bind:data={$licensesStore.results} />
			{/await}
		{:catch error}
			<alert style:display style={`background: ${Colors.RED}`}
				>{error}</alert>
		{/await}
	{/if}
{/await} -->