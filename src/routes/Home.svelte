<script lang="ts">
	const formValues = { amount: "", column: "", value: "", startDate:"", endDate:"" };
</script>

<main id="container">
	<form method="GET" id="SearchLicense" action="/Licenses">
		
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
</main>

<style lang="scss">
	main form{
		display: grid;
		border: 0.25rem solid #24242450;
		border-radius: 1rem;
		background-color: var(--headerBG);
		box-shadow: 0 0 0.5rem 0.5rem var(--primaryDarkened);
		padding: 1rem 1rem;
		transition: border-color 0.25s, box-shadow 0.25s;
	}

	label{
		width: 100%;
	}
</style>