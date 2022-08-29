<script>
	const formValues = { amount: "", column: "", value: "", startDate:"", endDate:"" };
</script>

<div id="container">
	<form method="GET" action="/Licenses">
		
		<label for="amount">Top Results:</label>
		<input type="text" id="amount" name="Amount" placeholder="Number of results" bind:value={formValues.amount}/>
	
		<label for="name">With Tag:</label>
		<input type="text" id="name" name="Column" placeholder="Tag to search" bind:value={formValues.column}/>
	
		<label for="value">Tag Value:</label>
		<input type="text" id="value" name="Value" placeholder="Tag value to search by" bind:value={formValues.value}/>
	
		<label for="startDate">Earliest Date:</label>
		<input type="text" id="startDate" name="StartDate" placeholder="Earliest date available" bind:value={formValues.startDate}/>
	
		<label for="endDate">Latest Date:</label>
		<input type="text" id="endDate" name="EndDate" placeholder="Latest date available" bind:value={formValues.endDate}/>

		<input type="submit" value="Search" />
		
	</form>
</div>

<style>
	#container{
		padding-top:calc(var(--headerHeight) + var(--contentPadding));
	}
</style>