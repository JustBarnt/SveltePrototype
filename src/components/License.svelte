<script lang="ts">
	import { Utilities } from "@utilities/Utilities";
	import { createEventDispatcher, onMount } from "svelte";
	import EditForm from "./EditForm.svelte";
	
	export let data: Results;

	const messageDispatch = createEventDispatcher();
	let isEditing:boolean = false;
	$:editing = isEditing;

	/**
	* Runs on initialization, lets the parent know it can hide the loading alert
	*/
	onMount(() => LicenseLoaded(true));
	
	/**
	* Cancels the edit
	* @param {CustomEvent} event - The event dispatcher
	*/
	const CancelEdit = (event: CustomEvent) => isEditing = event.detail.editing;
	
	/**
	* Display single license once the data is fetched
	* @param {Boolean} isHidden - boolean
	*/
	const LicenseLoaded = (isHidden: boolean) => messageDispatch("loaded", { hide: isHidden });
</script>

<section>
	{#if !editing}
		<table id="License">
			{#each Object.entries(data[0]) as [key, value]}
				<tr>
					<th scope="col" headers={key.toLowerCase()}>{Utilities.FormatColumnHeader(key)}</th>
					<td headers={key} >{value}</td>
				</tr>
			{/each}
		</table>
		<button on:click={() => isEditing = !isEditing}>Edit License</button>
	{:else}
		<EditForm data={data} on:cancel={CancelEdit}/>
	{/if}
</section>
	
<style lang="scss">
	table{
		border-radius: $borderRadius;
		border-collapse: collapse;
		box-shadow: 0 0 0.75rem $darkGrey;
		overflow:hidden;
		color:#fff;

		tr{
			
			th{
				padding: 1.2rem 1.6rem;
				background: $verticleBG;
			}

			td{
				padding: 1.2rem 1.6rem;
				background: $darkGrey;
			}
		}

	}
	button{
		@include button-base;
		
		&:hover{
			@include button-hover;
		}
	}
</style>