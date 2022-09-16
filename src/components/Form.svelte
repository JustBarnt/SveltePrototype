<script lang="ts">
	import { Utilities } from "@utilities/Utilities";
	import { createEventDispatcher } from "svelte";

	export let display:string = "flex";

	const requestDispatch = createEventDispatcher();

	let form: Form = { amount: "", column:"", value: "", startDate: "", endDate:"" };

	function HandleSubmit(): void 
	{
		const searchParams:string = Utilities.BuildQueryString(form);
		requestDispatch("request", searchParams);
	}
</script>

<section style:display>
	<form
		method="GET"
		on:submit|preventDefault={HandleSubmit} autocomplete="off">
		<slot></slot>
		<label for="amount">Top Results:</label>
		<input type="text" name="Amount" placeholder="Number of results" bind:value={form.amount} />
		
		<label for="name">With Tag:</label> 
		<input type="text" name="Column" placeholder="Tag to search" bind:value={form.column} /> 
		
		<label for="value">Tag Value:</label>
		<input type="text" name="Value" placeholder="Tag value to search by" bind:value={form.value} />

		<label for="startDate">Earliest Date:</label>
		<input type="text" name="StartDate" placeholder="Earliest date available" bind:value={form.startDate} />

		<label for="endDate">Latest Date:</label>
		<input type="text" name="EndDate" placeholder="Latest date available" bind:value={form.endDate} /> 

		<input type="submit" value="Search" />
	</form>
</section>

<style lang="scss">
	section{
		align-content: center;
		width: clamp(300px, 45%, 45%);
	}
	form {
		@include flex-base;
		align-items:stretch;
		align-content:center;
		
		input {
			@include input-base;
		}

		input[type="submit"] {
			color: white;
			background-color: $darkGrey;
			box-shadow: 0 0 0.25rem $darkGrey;

			&:hover {
				border-color: lighten($blue, 50%);
				background: linear-gradient(
					to right bottom,
					$blue,
					lighten($red, 15%)
				);
				box-shadow: 0 0 0.75rem $darkGrey;
			}
		}
	}
</style>
