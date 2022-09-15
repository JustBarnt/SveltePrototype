<script lang="ts">
	import { Authentication } from "@controllers/Authentication";
	import { routes } from "@services/Route";
	import Cookies from "js-cookie";
	import Router from "svelte-spa-router";

	$: if(Cookies.get("selector") !== undefined)
	{
		let login: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator") };
		Authentication.LoggedIn = Authentication.ReturningUser(login);
	}

	$:Authentication.LoggedIn ? window.location.href = "/#/home" : window.location.href = "/#/";
</script>


<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<span>
			<!--Check if logged in, so the user doesn't go to login page. (LATER) Merge Home and Login page and just
			keep track if they need to see a login component.-->
			<a href="/#/home">Home</a>
			<a href="/#/" on:click="{Authentication.HandleLogout}">Logout</a>
		</span>
	</nav>
</header>


<main>
	<Router {routes}/>
</main>

<style lang="scss">
	header{
		width:clamp(25%, 100%, 100%);
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