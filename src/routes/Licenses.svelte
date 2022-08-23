<script>
	import { getContext, onMount } from "svelte";
	import { HandleQuery } from "../scripts/controllers/EventController";
	import { Keys } from "../scripts/MapKeys";
	import { Utilities } from "../scripts/utilities/Utilities";

	const EventDetails = { success: false, results: null, params: "" };
	let apiContext;

	onMount(() =>
	{
		const formData = getContext(Keys.Form);
		EventDetails.params = Utilities.BuildQueryString(formData);
		HandleQuery(EventDetails, StartLoading);
	});

	function StartLoading()
	{
		apiContext = getContext(Keys.License);
	}
</script>

<div id="TableContainer">
	<h1>Table View</h1>
	<!-- <TableView bind:show={displayProps.show} bind:data={displayProps.data}/> -->
</div>