<script lang="ts">
	//TODO: NOT STARTED: Brent create index.ts files to house all exports.
	import Alert from "@components/Alert.svelte";
	import License from "@components/License.svelte";
	import Licenses from "@components/Licenses.svelte";
	import { Colors } from "@enums/enums";
	import { LicensesController } from "@requests/Licenses";
	import { licenses, uriParams } from "@stores/stores";
	import { Utilities } from "@utilities/Utilities";

	let DispatchResponse: { id: string | null; view: string } = { id: null, view: "all" };
	let response: Promise<Query>;

	const AsyncAwait = Utilities.AsyncDelay;
	const AlertProps: any = { visible:"visible", message: "", styles: { background: Colors.RED } };
	
	const HandleLicense = (event: CustomEvent) => 
	{
		const { id, view } = event.detail;
		DispatchResponse.id = `?selector=${id}`;
		DispatchResponse.view = view;
	};

	const UpdateProps = (vis: string, msg:string, style: Colors | IStyles): any =>
	{
		AlertProps.visible = vis;
		AlertProps.message = msg;
		AlertProps.styles = style;
		return AlertProps;
	};

	//Reactive variables.
	$: currentView = DispatchResponse.view;
	$: licenseId = DispatchResponse.id;
	$: props = AlertProps;
</script>

<!-- TODO: STARTED: Move alter to main page. -->
<section>
	{#await Utilities.AwaitFetch(new LicensesController("GET", $uriParams, "all").Search())}
		<Alert {...UpdateProps("visible", "Contacting service for the request...", { background: Colors.BLUE })} expiration={3000} />
	
	{:then response}
		{#if response.success && currentView === "all"}
			<Licenses on:license={HandleLicense} data={response.results} />
	
		{:else}
			{#await Utilities.AwaitFetch(new LicensesController("GET", licenseId, "single").Search())}
				<Alert {...UpdateProps("visible", "Contacting service for the licene request...", { background: Colors.BLUE }) } expiration={1500} />
	
			{:then response}
				{#if response.success}
					<Alert {...UpdateProps("visible", "License found!", { background: Colors.GREEN })} expiration={1500} />
					<License on:change={ event => DispatchResponse.view = event.detail.view } bind:data={$licenses.results} />

				{/if}
			{:catch error}
				<Alert {...UpdateProps("visible", error, { background: Colors.RED }) } />
	
			{/await}
		{/if}
	{:catch error}
		<Alert {...UpdateProps("visible", error, { background: Colors.RED }) } />
	
	{/await}
</section>

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