<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import NavButton from "@components/NavButton.svelte";
	import { Authentication } from "@controllers/Authentication";
	import { Navigation } from "@controllers/Navigation";
	import { Colors } from "@enums/enums";
	import { sessionStore } from "@stores/stores";
	import Cookies from "js-cookie";
	import Router from "svelte-spa-router";

	//TODO: NOT STARED: GO BACK AND COMMENT ALL CODE TODAY 9/23/2022 AFTER MEETING

	//Change to = new Alerts(params).GetDirectives();
	let AlertDirectives:Record<string, any> = { active: true, expires: false, expiresIn: undefined };

	const alertProps:any = { visible: "visible", message: "Invalid username and/or password.", styles: Colors.RED };
	
	$: if(Cookies.get("selector") !== undefined)
	{
		let login: Cookie = { selector: Cookies.get("selector"), validator: Cookies.get("validator") };
		Authentication.LoggedIn = Authentication.ReturningUser(login);
	}
	
	$: Authentication.LoggedIn ? Navigation.ChangePage(Navigation.Page.Home) : Navigation.ChangePage(Navigation.Page.Login);
	$: LoggedIn = Authentication.LoggedIn; 
	$: alertActive = AlertDirectives.active;
	$: doesExpire = AlertDirectives.expires;
	$: expiration = AlertDirectives.expiresIn;

	const HandleDestruct = (event: CustomEvent) => AlertDirectives.active = false;
	const NewAlert = ():Record<string, boolean> => 
	{
		
		return { expires: true, active:true };
	};
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
					text={`Hello, ${$sessionStore.username}`}
					gridArea="1 / 3 / 2 / 4" />
			{/if}
		</span>
	</nav>
</header>

<alerts class="alerts">
	<svelte:component this={alertActive ? Alert : null} {...alertProps} expiration={doesExpire ? expiration : undefined} on:destroyed={HandleDestruct} />
</alerts>

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

	alerts{
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