<script>
	//Module Imports
	import { HandleQuery } from "../scripts/controllers/EventController";
	//Component imports
	import QueryRequests from "../components/QueryRequests.svelte";

</script>

<div id="FormContainer">
	<QueryRequests on:query={(event) => HandleQuery(event)}/>
</div>


<style>
	#FormContainer{
		display:flex;
		align-items:flex-start;
		justify-content: center;
	}
</style>
