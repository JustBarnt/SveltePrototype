<script>
	import { FORMS } from "../scripts/stores/stores";
	import { HandleFormSubmission } from "../scripts/controllers/EventController";
</script>

<div id="container">
	<form method="GET" class="get-form" action="/Licenses">
		<span>
			Number of Results<br>
			<input type="text" id="amount" name="Amount" bind:value={$FORMS.amount}>
		</span>
		<br>
		<span>
			Column to filter by<br>
			<input type="text" id="name" name="Column" bind:value={$FORMS.column}>
		</span>
		<br>
		<span>
			Value of the tag<br>
			<input type="text" id="value" name="Value" bind:value={$FORMS.value}>
		</span>
		<br>
		<span>
			Created between<br>
			<input type="text" id="startDate" name="StartDate" bind:value={$FORMS.startDate}>
			<input type="text" id="endDate" name="EndDate" bind:value={$FORMS.endDate}>
		</span>
		<br>
		<button type="submit" on:submit={() =>  HandleFormSubmission($FORMS) }>Search for Licenses</button>
	</form>
</div>