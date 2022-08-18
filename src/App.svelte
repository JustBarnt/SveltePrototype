<script>
	//Module Imports
	import { HandleQuery } from "./scripts/QueryHandler";
	import { get } from "svelte/store";
	import { apiStore } from "./stores/stores";

	//Component imports
	import QueryRequests from "./components/QueryRequests.svelte";
	import TableView from "./views/TableView.svelte";

	let displayProps = {};

	/**
	* Manages the properties of the table displaying the query results
	*
	* @param {Boolean} show - A boolean value used to show or hide the table/descriptor text
	* @param {String} type - A string value containing the query method; all, single, submit
	* @param {String} message - A string value containing a message used for either: Failure, or slow loading.
	*/
	function DisplayData(show, type, message)
	{
		displayProps = {
			show: show,
			type: type,
			data: get(apiStore),
		};
	}
</script>

<main>
	<h1>Licensing Web Tool</h1>
	
	<div id="FormContainer">
		<QueryRequests on:query = {(event) => HandleQuery(event, DisplayData)}/>
	</div>
	<div id="TableContainer">
		<TableView bind:show={displayProps.show} bind:data={displayProps.data}/>
	</div>
</main>

<style>
	#FormContainer{
		display:flex;
		align-items:flex-start;
		justify-content: center;
	}
</style>
