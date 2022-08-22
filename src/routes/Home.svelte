<script>
	//Module Imports
	import { HandleQuery } from "../scripts/QueryHandler";
	import { get } from "svelte/store";
	import { apiStore, eventStore } from "../scripts/stores/stores";

	//Component imports
	import QueryRequests from "../components/QueryRequests.svelte";

	/**
	* Manages the properties of the table displaying the query results
	*
	* @param {Boolean} show - A boolean value used to show or hide the table/descriptor text
	* @param {String} type - A string value containing the query method; all, single, submit
	*/
	function DisplayData(show, type)
	{
		const obj = 
		{
			show:show,
			type:type,
			data:get(apiStore),
		};
		eventStore.set(obj);
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
