<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import NavButton from "@components/NavButton.svelte";
	import { Alerts } from "@controllers/Alerts";
	import { Authentication } from "@controllers/Authentication";
	import { Navigation } from "@controllers/Navigation";
	import { Colors } from "@enums/enums";
	import { alerts, session } from "@stores/stores";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
	import Router from "svelte-spa-router";
	
	let AlertHub:IAlert = new Alerts({ active: false, canExpire: false, expiresIn: 1500 }, { message:"Hello World", color: Colors.BLUE });

	onMount(() => alerts.set(AlertHub));
	
	$: if(Cookies.get("selector") !== undefined)
	{
		let login: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator") };
		Authentication.LoggedIn = Authentication.ReturningUser(login);
	}
	
	$: Authentication.LoggedIn ? Navigation.ChangePage(Navigation.Page.Home) : Navigation.ChangePage(Navigation.Page.Login);
	$: LoggedIn = Authentication.LoggedIn; 
	$: alertActive = AlertHub.Directives.active;
	$: doesExpire = AlertHub.Directives.canExpire;
	$: expiration = AlertHub.Directives.expiresIn;

	const HandleDestruct = (event: CustomEvent) => AlertHub.Set("active", false);
</script>


<header>
	<h1>Licensing Web Tool</h1>
	<nav>
		<span>
			<NavButton 
				text="Home" 
				gridArea="1 / 1 / 2 / 2"
				link="/#/home" />

			<NavButton 
				text="Logout" 
				gridArea="1 / 2 / 2 / 3" 
				link="/#/"
				on:click={(Authentication.HandleLogout)} />
				
			{#if LoggedIn}
				<NavButton 
					text={`Hello, ${$session.username}`}
					gridArea="1 / 3 / 2 / 4" />
			{/if}
		</span>
	</nav>
</header>

<alert class="alerts">
	<svelte:component this={alertActive ? Alert : null} {...AlertHub.Props} expiration={doesExpire ? expiration : undefined} on:destroyed={HandleDestruct} />
</alert>

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

	alert{
		position: absolute;
		top: clamp(25px, 3%, 3%);
		width: 100vw;
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