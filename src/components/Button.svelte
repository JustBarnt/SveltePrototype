<script>
	export let href = "";
	let baseUrl = window.location.origin;
</script>

<button on:click={() => window.location.assign(`${baseUrl}${href}`) }>Home</button>

<style>
	button{
		margin: 5px 5px;
		float: right;
		position: relative;
	}
</style>
