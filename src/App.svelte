<script>
	import HomeButton from "./components/Button.svelte";
	import { page } from "./routes";
</script>

<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<HomeButton href="/"/>
	</nav>
</header>
<section id="Content">
	<svelte:component this={page}/>
</section>

<style>
	header{
		background-color: #303030;
		width: 100vw;
		height: var(--headerHeight);
		position:fixed;
		top: 0;
		left: 0;
		box-shadow: 0 0 10px rgba(0,0,0,0.50);
		z-index: 10;
	}

	nav{
		width: 100vw;
		height: 50px;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 11;
	}

	header h1{
		width: 33%;
		float: left;
		position: relative;
		padding: 15px 15px;
	}

	section{
		position: relative;
		min-width: 100vw;
		min-height: 100vh;
	}
</style>