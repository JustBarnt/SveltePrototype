<script lang="ts">
	import { onMount, afterUpdate } from "svelte";
	import { get } from "svelte/store";
	import Licenses from "../components/Licenses.svelte";
	import License from "../components/License.svelte";
	import { API } from "../scripts/stores/stores";
	import { Utilities } from "../scripts/utilities/Utilities";

	const AsyncAwait = Utilities.AsyncDelay;

	let view = "licenses";
	let responseBody: IResponse;

	//Look into reactive responses for updating page show. Compared to svelte:component
	$: CurrentView = view;

	onMount(() => responseBody = get(API));
	afterUpdate(() => responseBody = get(API));
</script>

{#await AsyncAwait(250) then resolution}
	<!--Create Table-->
	{#if CurrentView === "licenses"}
		<Licenses bind:data={responseBody.results}/>
	{:else}
		<License bind:data={responseBody.results}/>
	{/if}
{/await}