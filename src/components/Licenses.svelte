<script lang="ts">
	import { onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import { Utilities } from "../scripts/utilities/Utilities";

	export let data: Results;

	const licenseDispatch = createEventDispatcher();

	let guids:Array<string> = [];

	/**
	*  Runs when component initializes, and saves all GUID data to the the GUID<Array<String>>
	*/
	onMount(() => { if(data !== undefined) guids = Utilities.SaveGUID(data); });

	/**
	* Custom event dispatcher that fires off when user clicks a row in the table, it passes a GUID and a VIEW property
	* in the {detail} property of the event to the parent component.
	* @param {<T>} event - Any event handler, in this case an on click.
	*/
	const HandleLicenseSelect = (event: MouseEvent) => licenseDispatch("license", { id: guids[GetRowNum(event.target)], view:"license" });
	
	/**
	* Returns the row number from the clicked license
	* @param {<T>} element - the html element that was clicked
	* @return {Number} Returns the index number of the row.
	*/
	const GetRowNum = ((element: any):number => element.clostest("tr").rowIndex); 
	
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