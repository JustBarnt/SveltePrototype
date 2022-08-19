<script>
	import { createEventDispatcher } from "svelte";
	import { Utilities } from "../scripts/utils/Utilities";

	const query = { amount: 10, name: "createdby", value: "joshr", startDate:"", endDate:"" };
	const queryDispatch = createEventDispatcher();

	let defaultQueryType = "search";

	/**
	* Starts a specifed query request
	* @param {String} type - A string specifing the type of query requested
	*/
	function QueryRequest(type)
	{
		const queryString = Utilities.BuildQueryString(query);

		queryDispatch("query",
		{
			success: false, 
			results: null,
			type: type,
			message: "Starting up query retrieval.",
			params: queryString,
		});
	}
</script>

<div id="container">
	<form method="GET" class="get-form" on:submit|preventDefault={() => QueryRequest(defaultQueryType)}>
		<span>
			Number of Results<br>
			<input type="text" id="amount" name="Amount" bind:value={query.amount}>
		</span>
		<br>
		<span>
			Column to filter by<br>
			<input type="text" id="name" name="Column" bind:value={query.name}>
		</span>
		<br>
		<span>
			Value of the tag<br>
			<input type="text" id="value" name="Value" bind:value={query.value}>
		</span>
		<br>
		<span>
			Created between<br>
			<input type="text" id="startDate" name="StartDate" bind:value={query.startDate}>
			<input type="text" id="endDate" name="EndDate" bind:value={query.endDate}>
		</span>
		<br>
		<button type='submit'>Search for Licenses</button>
	</form>
</div>