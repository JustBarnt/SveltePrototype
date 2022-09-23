<script lang="ts">
	import { Navigation } from "@controllers/Navigation";
	import { LicensesController } from "@requests/Licenses";
	import { uriParamsStore } from "@stores/stores";
	import { Utilities } from "@utilities/Utilities";
	import { createEventDispatcher, onMount } from "svelte";
	import { fade } from "svelte/transition";
	import EditForm from "./EditForm.svelte";

	export let data: Results;

	const messageDispatch = createEventDispatcher();
	const returnDispatch = createEventDispatcher();
	let isEditing: boolean = false;
	$: editing = isEditing;

	/**
	 * Runs on initialization, lets the parent know it can hide the loading alert
	 */
	onMount(() => LicenseLoaded(true));

	/**
	 * Cancels the edit
	 * @param {CustomEvent} event - The event dispatcher
	 */
	const CancelEdit = (event: CustomEvent) =>
		(isEditing = event.detail.editing);

	/**
	 * Display single license once the data is fetched
	 * @param {Boolean} isHidden - boolean
	 */
	const LicenseLoaded = (isHidden: boolean) =>
		messageDispatch("loaded", { hide: isHidden });

	/**
	 * Tells the parent to change the view to the licenses table
	 */
	const ChangeDisplay = () => returnDispatch("change", { view: "all" });

	/**
	 * Returns to the licenses table with the last query ran
	 * @param {String} query - a URI containing the query string.
	 */
	const ReturnToLicenses = async (query: string) => 
	{
		const data: QueryDetails = {
			success: false,
			results: null,
			params: $uriParamsStore,
		};

		const success: Awaited<Query> = await new LicensesController("GET", $uriParamsStore, "all").Search();

		if (success) 
		{
			ChangeDisplay();
			Navigation.ChangePage(Navigation.Page.Licenses);
		}
	};
</script>

<section in:fade|local={{ duration:250, delay: 50 }} out:fade|local={{ duration: 1 }}>
	{#if !editing}
		<table id="License">
			{#each Object.entries(data[0]) as [key, value]}
				<tr>
					<th scope="col" headers={key.toLowerCase()}
						>{Utilities.FormatColumnHeader(key)}</th>
					<td headers={key}>{value}</td>
				</tr>
			{/each}
		</table>
		<div class="buttonContainer">
			<button class="edit" on:click={() => (isEditing = !isEditing)}
				>Edit License</button>
			<button class="return" on:click={() => ReturnToLicenses("")}
				>Return to Licenses</button>
		</div>
	{:else}
		<EditForm data={data} on:cancel={CancelEdit} />
	{/if}
</section>

<style lang="scss">
	table {
		border-radius: $borderRadius;
		border-collapse: collapse;
		box-shadow: 0 0 0.75rem $darkGrey;
		overflow: hidden;
		color: #fff;

		tr {
			th {
				padding: 1.2rem 1.6rem;
				background: $verticleBG;
			}

			td {
				padding: 1.2rem 1.6rem;
				background: $darkGrey;
			}
		}
	}
	button {
		@include button-base;
		width: 45%;

		&:hover {
			@include button-hover;
		}
	}

	.buttonContainer {
		@include flex-base;
		flex-flow: row wrap;
		width: 100%;
		justify-content: space-between;
	}
</style>
