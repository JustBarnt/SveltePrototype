<script>
	import TableView from "../components/TableView.svelte";
	import { onMount } from "svelte";

	let displayProps = {};

</script>

<div id="TableContainer">
	<TableView bind:show={displayProps.show} bind:data={displayProps.data}/>
</div>