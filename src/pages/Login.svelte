<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import { Authentication } from "@controllers/Authentication";
	import { AlertVisibility, Colors } from "@enums/enums";
	import { Authorization } from "@requests/Authorization";
	import { USER_SESSION } from "@stores/stores";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";

	//Login control
	let attempt: ILogin = { username: "", password: "" };
	let isSuccessful: Awaited<boolean> | null = null;
	const alertCss: IStyles = { position: "relative", bottom: "clamp(0px, 0.5rem, 3.5rem)", background: Colors.RED };
	
	//Reactive Statement Controll
	$: visible = AlertVisibility.Hidden;

	//Checking if cookies contains an item called id
	onMount(() => 
	{
		Cookies.get("selector") !== undefined ? Authentication.ReturningUser({ selector: Cookies.get("selector"), validator: Cookies.get("validator") }) : null;
	});

	/**
	* Attempts to log the user in, if successul updates the localStorage and svelte store.
	* @return {Boolean} Returns true or false
	*/
	async function Login(): Promise<void>
	{
		isSuccessful = await new Authorization(
			"POST", 
			attempt, 
			{ 
				"content-type": "application/json", 
				"authorization": `Bearer: ${$USER_SESSION.token}` 
			}).GetAuthorization();

		if(isSuccessful) Authentication.HandleLogin({ success: isSuccessful });
		else visible = AlertVisibility.Visible;
	}

	/**
	* Updates login attempt with input.
	* @param {any} event - Input event
	*/
	const HandleInput = ((event: any): void => attempt[event.target.name] = event.target.value);
</script>


<section>
	<form id="LoginForm" on:submit|preventDefault="{Login}" method="POST" autocomplete="off">
		<h1>Sign In</h1>
		<Alert visible={visible} styles={alertCss} message="Invalid username and/or password." />
		<input
			type="text"
			name="username"
			class="login-field"
			placeholder="Username"
			on:input="{HandleInput}" />
		<input
			type="password"
			name="password"
			class="login-field"
			placeholder="Password"
			on:input="{HandleInput}" />
		<input
			type="submit"
			value="Login"
			class="submit-login"/>
	</form>
</section>

<style lang="scss">
	form{
		@include flex-base;
		align-items:stretch;
	}

	h1{
		font-size: 2.2rem;
	}

	.login-field {
		@include input-base;
	}

	.submit-login {
		@include button-base;
		
		&:hover{
			@include button-hover;
		}
	}
</style>
