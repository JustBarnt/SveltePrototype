<script lang="ts">
	//import { page } from "./routes";
	import Home from "./pages/Home.svelte";
	import Login from "./pages/Login.svelte";

	//Add anchors to url with each compontent to see if browser history support will work

	let loginSuccess:boolean = false;
	$: userAuth = loginSuccess;
	$: loginDisplay = loginSuccess ? "none" : "flex";

	function HandleLogin(event)
	{
		loginSuccess = event.detail;
	}
</script>


<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<span>
			<!--Check if logged in, so the user doesn't go to login page. (LATER) Merge Home and Login page and just
			keep track if they need to see a login component.-->
			<a href="/">Home</a>
		</span>
	</nav>
</header>


<main>
	{#if !userAuth}
		<Login on:login="{HandleLogin}" display="{loginDisplay}"/>
	{:else}
		<Home/>
	{/if}
</main>

<style lang="scss">
	header{
		width:100%;
		height: 5%;
		display: flex;
		justify-content: space-between;
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
			border-radius: $borderRadius;
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

	main{
		display:flex;
		place-content: center center;
		flex-flow: column wrap;
		height: 95vh;
		margin-top: 5vh;
	}

</style>