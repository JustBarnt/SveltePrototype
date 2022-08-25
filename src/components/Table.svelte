<script>
import { onMount } from "svelte";
import { CreateInputForm } from "../scripts/CreateInputForm";
import { Utilities } from "../scripts/utilities/Utilities";
	export let data = undefined;

	const tablePKs = [];
	let activeRow = 0;
		
	onMount( () => 
	{
		if(data !== undefined)
		{
			data.forEach((license) => 
			{
				for (const key in license)
				{
					if (Object.hasOwnProperty.call(license, key))
					{
						tablePKs.push(license["id"]);
						break;
					}
				}
			});
		}
	});

	function HandleLicenseSelect(event)
	{
		activeRow = GetRowNum(event.currentTarget);
		let form = CreateInputForm.Form("LicenseForm", "licenseForm", "/license", "GET");
		let input = CreateInputForm.Input("text", "selector", tablePKs[activeRow]);
		form.append(input);
		document.getElementById("TableContainer").append(form);

		// @ts-ignore submit is a valid method on forms. @tslint is dumb.
		document.getElementById("LicenseForm").submit(event);
	}

	function GetRowNum(element)
	{
		return element.closest("tr").rowIndex;
	}
</script>

{#if data !== undefined}
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
{/if}

<style>
	#Licenses{
		background-color: var(--mainBG2);
		border-radius: 0.5rem;
		border-collapse: collapse;
		box-shadow: 0 0 2rem rgba(0,0,0,0.35);
		overflow:hidden;
		color:#fff;
	}

	#Licenses th[headers="id"], #Licenses td[headers="id"]{
		display:none;
	}
	
	#Licenses thead th, #Licenses tbody td{
		border-right: 0.1rem solid var(--mainBG);
	}

	#Licenses thead th:last-of-type, #Licenses tbody td:last-of-type{
		border-right: 0.1rem solid transparent;
	}

	#Licenses thead th, #Licenses tbody td{
		padding: 1.2rem 1.6rem;
	}

	#Licenses tbody tr:nth-of-type(even){
		border: 0.1rem solid transparent;
		transition: background-color 0.25s, border-color 0.25s;
		background-color: #3d3d3d;
	}

	#Licenses tbody tr:nth-of-type(odd){
		border: 0.1rem solid transparent;
		transition: background-color 0.25s, border-color 0.25s;
		background-color: #303030;
	}

	#Licenses tbody tr:hover{
		background-color: var(--mainBG);
		cursor: pointer;
	}
	
	#Licenses tbody tr:focus, #Licenses tbody tr:focus-visible{
		outline: 0.4rem auto -webkit-focus-ring-color;
	}
</style>