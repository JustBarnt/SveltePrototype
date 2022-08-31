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

<Login/>

<style lang="scss">
	header{
		width:100%;
		height: 5%;
		display: flex;
		place-content: center space-between;
		align-items: center;
		z-index: 10;
		position: fixed;
		color:white;
		background: $gradBg;
		border-bottom: 0.5rem solid $darkGrey;
		box-shadow: 0 0 0.5rem $darkGrey;

		h1{
			font-size: 2.5rem;
			padding-left: 2rem
		}
	}
	
	nav{
		font-size: 1.2rem;
		padding-right: 2rem;

		span{
			padding: 0.75rem;
		}
		
		a{
			color: white;
			text-decoration: none;
			font-weight: 600;
			border-radius: 1rem;
			border: 0.15rem solid transparent;
			transition: all 0.25s;
			padding: 0.5rem;

			&:hover, &:focus, &:focus-visible &:active{
				padding: 0.5rem;
				border-color: $darkGrey;
				background-color: #30303050;
			}
		}
	}

</style>