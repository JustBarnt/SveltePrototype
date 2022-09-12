<script lang="ts">
	import { Colors, AlertVisibility } from "../enums/enums";
	import { createEventDispatcher } from "svelte";
	import { GetAuthorization } from "../scripts/controllers/AuthorizationController";
	import Alert from "../components/Alert.svelte";

	export let display:string = "flex";

	//Login control
	let attempt: ILogin = { username: "", password: "" };
	let isSuccessful: Awaited<boolean> | null = null;
	const loginDispatch = createEventDispatcher();

	//Reactive Statement Controll
	$: visible = AlertVisibility.Hidden;

	/**
	* Handles login attempts
	* @return {Boolean} Returns true or false
	*/
	async function HandleLogin(): Promise<void>
	{
		isSuccessful = await GetAuthorization(attempt);
		if(isSuccessful) loginDispatch("login", isSuccessful);
		else visible = AlertVisibility.Visible;
	}

	/**
	* Updates login attempt with input.
	* @param {any} event - Input event
	*/
	const HandleInput = ((event: any): void => attempt[event.target.name] = event.target.value);
</script>


<section style:display>
	<form id="LoginForm" on:submit|preventDefault="{HandleLogin}" method="POST" autocomplete="off">
		<h1>Sign In</h1>
		<Alert visible={visible} background={Colors.RED} message="Invalid username and/or password." />
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
