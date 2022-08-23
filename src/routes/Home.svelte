<script>
	const formValues = { amount: "10", column: "createdby", value: "joshr", startDate:"", endDate:"" };
</script>

<div id="container">
	<form method="GET" class="get-form" action="/Licenses">
		<span>
			Number of Results:<br>
			<input type="text" id="amount" name="Amount" bind:value={formValues.amount}>
		</span>
		<br>
		<span>
			Column to filter by<br>
			<input type="text" id="name" name="Column" bind:value={formValues.column}>
		</span>
		<br>
		<span>
			Value of the tag<br>
			<input type="text" id="value" name="Value" bind:value={formValues.value}>
		</span>
		<br>
		<span>
			Created between<br>
			<input type="text" id="startDate" name="StartDate" bind:value={formValues.startDate}>
			<input type="text" id="endDate" name="EndDate" bind:value={formValues.endDate}>
		</span>
		<br>
		<button type="submit" >Search for Licenses</button>
	</form>
</div>


<style>
	#container{
		display:flex;
		align-items:flex-start;
		justify-content: center;
	}
</style>
