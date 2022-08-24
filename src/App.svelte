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
		line-height: 1.1;
	}

	nav a{
		color: white;
		font-size: 20px;
		font-weight: bold;
		padding: 15px 15px;
		float: right;
		position: relative;
		text-decoration: none;
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