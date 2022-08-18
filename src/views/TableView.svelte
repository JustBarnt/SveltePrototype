<script>
	import { Utilities } from "../scripts/utils/Utilities";

	export let show = false;
	export let data = undefined;
</script>

{#if show}
	{#if data !== undefined}
		<table id="Licenses">
			<thead>	
				<tr>
					{#each Object.keys(data[0]) as Header}
						<th>{Utilities.FormatColumnHeader(Header)}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as query}
					<tr>
						{#each Object.values(query) as Values}
								<td>{Values === null ? "N \\ A" : Values}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
	<p>Svelte has not been able to obtain records from the store 'licenses'.</p>
	{/if}
{/if}

<style>
	#Licenses{
		border-collapse: collapse;
		margin: 25px 0px;
		box-shadow: 0 0 20px rgba(0,0,0,0.15);
	}

	#Licenses thead tr {
		background-color: #504e4e;
		color:#fff;
		text-align: center;
	}

	#Licenses th, #Licenses td{
		padding: 12px 15px;
	}

	#Licenses tbody tr{
		border-bottom: thin solid #dddddd;
		text-align: left;
	}

	#Licenses tbody tr:nth-of-type(even){
		background-color: #817b7b;
	}

	#Licenses tbody tr:last-of-type{
		border-bottom: 2px solid #504e4e;
	}
</style>