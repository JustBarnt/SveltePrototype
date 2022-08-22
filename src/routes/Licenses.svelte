<script>
	import TableView from "../components/TableView.svelte";
	import { get } from "svelte/store";
	import { queryRes } from "../scripts/stores/stores";
	import { onMount } from "svelte";

	let displayProps = { show: false, data: [] };

	onMount(() =>
	{
		//TODO: (Brent) Refactor store so that one store controls the event details and the database response
		let queryCxt = get(queryRes);
		displayProps.show = queryCxt.show;
		displayProps.data = queryCxt.data;
	});

</script>

<div id="TableContainer">
	<TableView bind:show={displayProps.show} bind:data={displayProps.data}/>
</div>