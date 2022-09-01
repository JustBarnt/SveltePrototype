<script lang="ts">
	import { onMount } from "svelte";
	import { CreateInputForm } from "../scripts/CreateInputForm";
	import { Utilities } from "../scripts/utilities/Utilities";
	export let data = undefined;

	let guids:Array<string> = [];
	let activeRow = 0;
		
	onMount(() => 
	{
		if(data !== undefined)
			guids = Utilities.SaveGUID(data);
	});

	function HandleLicenseSelect(event)
	{
		//These all needs refactored. 
		activeRow = GetRowNum(event.currentTarget);
		let form = CreateInputForm.Form("LicenseForm", "licenseForm", "/license", "GET");
		let input = CreateInputForm.Input("text", "selector", guids[activeRow]);
		form.append(input);
		document.getElementById("TableContainer").append(form);
		document.getElementById("LicenseForm").onsubmit(event);
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
				<tr on:click={(event) => HandleLicenseSelect(event)}>
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
		@include section;
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