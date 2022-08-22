<script>
	//Module Imports
	import { HandleQuery } from "../scripts/QueryHandler";
	import { get } from "svelte/store";
	import { apiStore, queryRes } from "../scripts/stores/stores";

	//Component imports
	import QueryRequests from "../components/QueryRequests.svelte";

	/**
	* Manages updating the event store.
	*
	* @param {Boolean} show - A boolean value used to show or hide the table/descriptor text
	*/
	function DisplayData(show)
	{
		const eventResponse = 
		{
			show:show,
			data:get(apiStore),
		};
		queryRes.set(eventResponse);
	}
</script>


<main>
	<div id="FormContainer">
		<QueryRequests on:query={(event) => HandleQuery(event, DisplayData)}/>
	</div>
</main>

<style>
	#FormContainer{
		display:flex;
		align-items:flex-start;
		justify-content: center;
	}
</style>
