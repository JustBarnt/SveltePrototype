<script lang="ts">
	import NavButton from "@components/NavButton.svelte";
	import { Authentication } from "@controllers/Authentication";
	import { Navigation } from "@controllers/Navigation";
	import { sessionStore } from "@stores/stores";
	import Cookies from "js-cookie";
	import Router from "svelte-spa-router";

	$: if(Cookies.get("selector") !== undefined)
	{
		let login: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator") };
		Authentication.LoggedIn = Authentication.ReturningUser(login);
	}

	$: Authentication.LoggedIn ? Navigation.ChangePage(Navigation.Page.Home) : Navigation.ChangePage(Navigation.Page.Login);
	$: LoggedIn = Authentication.LoggedIn; 
</script>


<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<span>
			<!--Check if logged in, so the user doesn't go to login page. (LATER) Merge Home and Login page and just
			keep track if they need to see a login component.-->
			<NavButton 
				text="Home" 
				gridArea="1 / 1 / 2 / 2"
				on:navigation={() => Navigation.ChangePage("/#/home")} />

			<NavButton 
				text="Logout" 
				gridArea="1 / 2 / 2 / 3" 
				on:navigation={() => Navigation.ChangePage("/#/")} 
				on:click={(Authentication.HandleLogout)} />
				
			{#if LoggedIn}
				<NavButton 
					text={`Hello, ${$sessionStore.username}`}
					gridArea="1 / 3 / 2 / 4" />
			{/if}
		</span>
	</nav>
</header>


<main>
	<Router routes={Navigation.Routes} />
</main>

<style lang="scss">
	header{
		width:clamp(25%, 100%, 100%);
		height: 5%;
		display: flex;
		flex-flow: row nowrap;
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
			display:grid;
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