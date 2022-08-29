<script lang="ts">
	import { page } from "./routes";
	import Home from "./routes/Home.svelte";
	import Login from "./routes/Login.svelte";
</script>

<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<span>
			<a href="/" on:click={ () => location.assign(window.location.origin + "/")}>Home</a>
		</span>
		<span>
			<a href="/">Login</a>
		</span>
	</nav>
</header>

<section>
	<Login/>
	<!-- <svelte:component this={page}/> -->
</section>

<style>
	header{
		width:var(--headerWidth);
		min-width: 35%;
		color:white;
		position: fixed;
		display:flex;
		place-content: space-between;
		place-items: center;
		z-index: 10;
		margin: 0.5% 2.5%;
		height: var(--headerHeight);
		border-radius: 1rem;
		background: var(--bgGrad);
		border-bottom: 0.5rem solid var(--purpleDark);
		box-shadow: 0 0 0.5rem #00000075;
	}

	nav > span{
		padding: 0.75rem;
	}

	nav{
		font-size: 1.2rem;
		padding-right: 2rem;
	}

	nav a{
		color: white;
		text-decoration: none;
		font-weight: 600;
		border-radius: 3rem;
		border: 0.15rem solid transparent;
		padding: 0.5rem;
		transition: border-color 0.5s, background-color 0.5s;
	}

	nav a:hover, nav a:focus, nav a:focus-visible, nav a:active{
		border-color: #5B4687;
		background: linear-gradient(0deg,#6A529E75, #9E525F75);
	}

	header h1{
		font-size: 2.5rem;
		margin: 0;
		padding-left: 2rem
	}
</style>