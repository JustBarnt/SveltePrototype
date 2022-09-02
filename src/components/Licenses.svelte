<script lang="ts">
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { Utilities } from "../scripts/utilities/Utilities";

	export let data = undefined;

	const licenseDispatch = createEventDispatcher();

	let guids:Array<string> = [];
	let activeRow = 0;
		
	onMount(() => 
	{
		if(data !== undefined)
			guids = Utilities.SaveGUID(data);
	});

	function HandleLicenseSelect(event)
	{
		activeRow = GetRowNum(event.currentTarget);
		licenseDispatch("license", { id: guids[activeRow], view:"license" });
	}

	function GetRowNum(element)
	{
		return element.closest("tr").rowIndex;
	}
</script>


<section>
	<table id="Licenses">
		<thead>
			{#each Object.keys(data[0]) as Header}
				<th scope="col" headers={Header.toLowerCase()}>{Utilities.FormatColumnHeader(Header)}</th>
			{/each}
		</thead>
		<tbody>
			{#each data as query}
				<tr on:click={HandleLicenseSelect}>
					{#each Object.values(query) as Values, index}
						<td headers={Object.keys(data[0])[index]} >{Values}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<style lang="scss">
	section{
		display:flex;
		@include flex-base;
		*{
			transition: all 0.25s;
		}
	}

	table{
		background: $gradBg;
		border-radius: $borderRadius;
		border-collapse: collapse;
		box-shadow: 0 0 0.75rem $darkGrey;
		overflow:hidden;
		color:#fff;

		th[headers="id"], td[headers="id"]{
			display:none;
		}

		thead th, tbody td{
			padding: 1.2rem 1.6rem;
		}

		tbody{
			tr{
				&:nth-of-type(even){
					background: lighten($darkGrey,5%);
				}

				&:nth-of-type(odd){
					background: $darkGrey;
				}

				&:hover{
					box-shadow: inset 0 0 1rem $darkGrey;
					background: $gradBg;
					cursor: pointer;
				}
			}
		}
	}
</style>