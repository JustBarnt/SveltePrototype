<script lang="ts">
	import { Authentication } from "@controllers/Authentication";
	import { Navigation } from "@controllers/Navigation";
	import { Authorization } from "@requests/Authorization";
	import { alerts, session } from "@stores/stores";
	import Cookies from "js-cookie";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	//Login control
	let attempt: ILogin = { username: "", password: "" };
	let loginResults: Awaited<Query> | null = null;

	//Checking if cookies contains an item called id
	onMount(() => 
	{
		Cookies.get("selector") !== undefined ? Authentication.ReturningUser({ selector: Cookies.get("selector"), validator: Cookies.get("validator"), }) : null;
	});

	/**
	 * Attempts to log the user in, if successul updates the localStorage and svelte store.
	 * @return {Boolean} Returns true or false
	 */
	async function Login(): Promise<void> 
	{
		loginResults = await new Authorization("POST", { "content-type": "application/json" }, attempt).GetAuthorization();
		
		if (loginResults.success)
		{
			session.set(loginResults.results);
			Authentication.HandleLogin({ success: loginResults.success });
		}
		else
		{
			$alerts.Set("active", true);
		}
	}

	/**
	 * Updates login attempt with input.
	 * @param {any} event - Input event
	 */
	const HandleInput = (event: any): void =>
		(attempt[event.target.name] = event.target.value);

	/**
	 *  Routes the user to the create user page.
	 */
	const HandleCreateAccount = (): void =>
		Navigation.ChangePage(Navigation.Page.Register);

</script>

<section in:fade|local={{ duration:250, delay: 50 }} out:fade|local={{ duration: 1 }}>

	<!-- <svelte:component this={Alert} message="Hello there" visible="visible" styles={alertCss} expiration={1000} on:destroyed={HandleDestruct} /> -->

	<form
		id="LoginForm"
		on:submit|preventDefault={Login}
		method="POST"
		autocomplete="off">
		<h1>Sign In</h1>
		<input
			type="text"
			name="username"
			class="login-field"
			placeholder="Username"
			on:input={HandleInput} />
		<input
			type="password"
			name="password"
			class="login-field"
			placeholder="Password"
			on:input={HandleInput} />
		<input type="submit" value="Login" class="submit-login" />
		<span class="additionals">
			<span class="remember-me">
				<input
					type="checkbox"
					on:click={() =>
						(Authentication.RememberMe =
							!Authentication.RememberMe)} />
				Remember Me
			</span>
			<p class="create-account" on:click={HandleCreateAccount}>
				Create Account
			</p>
		</span>
	</form>
</section>

<style lang="scss">
	form {
		@include flex-base;
		transition: all 0.4s;
		align-items: stretch;
	}

	h1 {
		font-size: 2.2rem;
	}

	.login-field {
		@include input-base;
	}

	.submit-login {
		@include button-base;

		&:hover {
			@include button-hover;
		}
	}

	.additionals {
		display: flex;
		justify-content: space-between;
		position: relative;
		top: clamp(15px, 10%, 10%);

		.remember-me {
			padding-right: 1rem;
			display: flex;
			input {
				width: 16px;
				height: 16px;
				border: 0.2rem solid $grey50;
				background: $grey50;
				border-radius: 0.3rem;
				transition: all 0.25s;
				margin-right: 1rem;

				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;

				&:checked {
					background: $green;
					border-color: $green;
					text-align: center;
					line-height: 1.5rem;
				}

				&:hover {
					border-color: $green;
				}
			}
		}

		.create-account {
			transition: all 0.25s;
			border-bottom: 0.1rem solid transparent;
			cursor: pointer;

			&:hover {
				border-color: white;
			}
		}
	}
</style>
