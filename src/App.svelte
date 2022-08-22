<script>
	//Routing Imports
	import router from "page";
	import Home from "./routes/Home.svelte";
	import Licenses from "./routes/Licenses.svelte";

	let page;

	router("/", () => page = Home);
	router("/Licenses", () => page = Licenses);
	router.start();
</script>

<h1>Licensing Web Tool</h1>
<svelte:component this={page}/>