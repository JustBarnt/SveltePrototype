<script>
	import { page } from "./routes";
</script>

<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<a href="/" on:click={ () => location.assign(window.location.origin + "/")}>Home</a>
	</nav>
</header>

<section id="Content">
	<svelte:component this={page}/>
</section>

<style>
	header{
		background-color: var(--headerBG);
		width: 100%;
		height: var(--headerHeight);
		position:fixed;
		top: 0;
		left: 0;
		box-shadow: 0 0 1.5rem rgba(0,0,0,0.50);
		z-index: 10;
	}

	nav{
		width: 100%;
		height: var(--headerHeight);
		position: fixed;
		top: 0;
		right: 0;
		z-index: 11;
	}

	nav a{
		color: white;
		font-size: 2rem;
		font-weight: bold;
		border-radius: 0.8rem;
		border: 0.1rem solid transparent;
		margin: 1.25rem 0.75rem;
		padding: 0.5rem 0.5rem;
		float: right;
		position: relative;
		text-decoration: none;
		transition: border-color 0.25s, background-color 0.25s;
	}

	nav a:hover {
		border-color: var(--buttonBorder);
		background-color: var(--mainBG);
	}

	header h1{
		font-size: 3.2rem;
		width: inherit;
		float: left;
		position: relative;
		padding: var(--headerContentPadding);
	}

	section{
		position: fixed;
		min-width: 100%;
		min-height: auto;
	}
</style>