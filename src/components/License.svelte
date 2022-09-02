<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { Utilities } from "../scripts/utilities/Utilities";
	import EditForm from "./EditForm.svelte";
	export let data = undefined;

	const messageDispatch = createEventDispatcher();
	let isEditing:boolean = false;

	function LicenseLoaded(isHidden: boolean)
	{
		messageDispatch("loaded", { hide: isHidden });
	}
	onMount(() => LicenseLoaded(true));
</script>

<section>
	{#if !isEditing}
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
		<EditForm data={data}/>
	{/if}
</section>
	
<style lang="scss">

section{
		@include flex-base;
		*{
			transition: all 0.25s;
		}
	}

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