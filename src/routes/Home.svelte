<script>
	const formValues = { amount: "10", column: "createdby", value: "joshr", startDate:"", endDate:"" };
</script>

<div id="container">
	<form method="GET" class="get-form" action="/Licenses">
			<span>
				<p>Number of Results</p>
				<input type="text" id="amount" name="Amount" bind:value={formValues.amount}>
			</span>

			<span>
				<p>Column to filter by</p>
				<input type="text" id="name" name="Column" bind:value={formValues.column}>
			</span>

			<span>
				<p>Value of the tag</p>
				<input type="text" id="value" name="Value" bind:value={formValues.value}>
			</span>

			<span>
				<p>Created between</p>
				<input type="text" id="startDate" name="StartDate" bind:value={formValues.startDate}>
				<input type="text" id="endDate" name="EndDate" bind:value={formValues.endDate}>
			</span>
		<button type="submit" >Search for Licenses</button>
	</form>
</div>

<style>
	#container{
		padding-top:calc(var(--headerHeight) + 10px);
	}
	form{
		position: relative;
		width:fit-content;
		display: grid;
	}

	form span{
		display: flexbox;
	}

	form span p{
		text-align: center;
	}
	
</style>