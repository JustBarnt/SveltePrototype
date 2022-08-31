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


<content>
	<Login/>
</content>


<style lang="scss">
	header{
		display: flex;
		place-content: space-between;
		place-items: center;
		width:100%;
		min-width: 35%;
		color:white;
		position: fixed;
		z-index: 10;
		height: var(--headerHeight);
		background: $primaryColor;
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
		border-radius: 1rem;
		border: 0.15rem solid transparent;
		transition: border-color 0.5s, background-color 0.5s;
	}

	nav a:hover, nav a:focus, nav a:focus-visible, nav a:active{
		border-color: var(--purpleDark);
		background-color: #30303050;
	}

	header h1{
		font-size: 2.5rem;
		margin: 0;
		padding-left: 2rem
	}
</style>