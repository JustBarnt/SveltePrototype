<script lang="ts">
	import { onMount } from "svelte";
	import Home from "./pages/Home.svelte";
	import Login from "./pages/Login.svelte";
	import { Authentication } from "./scripts/controllers/AuthenticationController";

	/* TODO: Brent
	* Edit routing so that display values aren't being changed. Doesn't appear to be the natural flow of
	* svelte components.
	*/

	let isSuccessful:boolean = false;
	$: userAuth = isSuccessful;
	$: loginDisplay = isSuccessful ? "none" : "flex";

	//Checking if localStorage exists, if it does log in that existing user automatically.
	onMount(() => 
	{
		if(localStorage.getItem("id") !== undefined)
		{
			let login: ILogin = { username: localStorage.id, password: localStorage.password };
			Authentication.ReturningUser(login);
		}
	});
</script>


<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<span>
			<!--Check if logged in, so the user doesn't go to login page. (LATER) Merge Home and Login page and just
			keep track if they need to see a login component.-->
			<a href="#home">Home</a>
			<a href="#signin" on:click="{Authentication.HandleLogout}">Logout</a>
		</span>
	</nav>
</header>


<main>
	{#if !userAuth}
		<Login on:login="{Authentication.HandleLogin}" display="{loginDisplay}"/>
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