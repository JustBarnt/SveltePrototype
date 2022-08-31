<script>
	import { createEventDispatcher } from "svelte";
	import { Utilities } from "../scripts/utilities/Utilities";
	export let data = undefined;

	const EditLicense = createEventDispatcher();

	function Edit(event)
	{
		EditLicense("edit", event.detail);
	}
</script>

{#if data !== undefined}
	<div class="license-table">
		<table id="License">
			{#each Object.entries(data[0]) as [key, value]}
				<tr>
					<th scope="col" headers={key.toLowerCase()}>{Utilities.FormatColumnHeader(key)}</th>
					<td headers={key} >{value}</td>
				</tr>
			{/each}
		</table>
		<button class="form-edit" on:click={Edit}>Edit License</button>
	</div>
{/if}
	
<style lang="scss">
	.form-edit{
		display: inherit;
		padding: 0.75rem 1rem;
		margin: 1rem auto;
		position: relative;
	}

	#License{
		background-color: var(--mainBG2);
		border: 0.125rem solid transparent;
		border-radius: $borderRadius;
		border-collapse: collapse;
		box-shadow: 0 0 2rem rgba(0,0,0,0.35);
		overflow:hidden;
		color:#fff;
	}

	#License tr th{
		border-bottom: 0.1rem solid var(--mainBG);
		white-space: nowrap;
	}

	#License tr:last-of-type th{
		border-bottom: 0.1rem solid transparent;
	}

	#License tr td{
		border: 0.1rem solid transparent;
		border-top: 0.1 solid transparent;
	}

	#License tr th, #License tr td{
		padding: 1.2rem 1.6rem;
	}

	#License tr td:nth-of-type(even){
		transition: background-color 0.25s, border-color 0.25s;
		background-color: #3d3d3d;
	}

	#License tr td:nth-of-type(odd){
		transition: background-color 0.25s, border-color 0.25s;
		background-color: #303030;
	}
</style>