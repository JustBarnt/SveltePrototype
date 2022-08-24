<script>
	import { Utilities } from "../scripts/utilities/Utilities";
	export let data = undefined;
</script>

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
							<td>{Values}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	#Licenses{
		border-collapse: collapse;
		box-shadow: 0 0 2rem rgba(0,0,0,0.35);
	}

	#Licenses thead tr {
		background-color: #504e4e;
		color:#fff;
		text-align: center;
	}

	#Licenses th, #Licenses td{
		padding: 1.2rem 1.6rem;
	}

	#Licenses tbody tr{
		border-bottom: thin solid #dddddd;
		text-align: left;
	}

	#Licenses tbody tr:nth-of-type(even){
		background-color: #817b7b;
	}

	#Licenses tbody tr:last-of-type{
		border-bottom: 0.1rem solid #504e4e;
	}
</style>