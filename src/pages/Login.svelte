<script lang="ts">
	import { USER_SESSION, AUTH_SESSION } from "../scripts/stores/stores";
	import { Colors } from "../sass/scss";
	import { createEventDispatcher } from "svelte";
	import { GetAuthorization } from "../scripts/controllers/AuthorizationController";

	export let display = "flex";

	let attempt: ILogin = { username: "", password: "" };
	let success: Awaited<boolean> | null = null;
	let message: IMessage = { success:"Success! Signing in now.", error: "Invalid username and/or password" };

	//Reactive Svelte Varialbes.
	$: hidden = success === null ? "hidden" : "";
	$: visible = success !== null ? "visible" : "";
	$: background = success ? Colors.GREEN : Colors.RED;

	const loginDispatch = createEventDispatcher();

	async function HandleLogin(): Promise<void>
	{
		success = await GetAuthorization(attempt);

		if(success)
		{
			/* TODO: Brent
			* Finish setting up the rest of local session / history
			*/
			localStorage.setItem("user", $USER_SESSION);
			AUTH_SESSION.set({ key: "auth", default: localStorage.getItem("user") });
			loginDispatch("login", success);
		}
	}

	function HandleInput(event): void 
	{
		let value:string = event.currentTarget.value;
		let name:string = event.currentTarget.name;

		name === "username" ? 
			attempt.username = value : 
			attempt.password = value;
	}
</script>


<section style:display>
	<form id="LoginForm" on:submit|preventDefault="{HandleLogin}" method="POST" autocomplete="off">
		<h1>Sign In</h1>
		<!--Fix error messages not overlapping. Probably by just changing one message object instead of swapping two out.-->
		<alert class:hidden class:visible style:background>
			<p>
				{success ? message.success : message.error}
			</p>
		</alert>
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

	section{
		@include flex-base;
	}

	form{
		//Svelte Components don't seem to be able to "inherit" styles like html elements can
		//I assume its because they a dynamically load?
		//So defining flex display in each component appears to be needed.
		display: inherit;
		flex-flow: column wrap;
		place-content: center center;
		color: white;
		padding: 5rem;
		border-radius: $borderRadius;
		background: $gradBg;  
		border-bottom: 0.5rem solid $darkGrey;
		box-shadow: 0 0 0.75rem $darkGrey;
	}

	h1{
		font-size: 2.2rem;
	}

	alert{
		cursor:default;
		&.hidden{
			@include alert-base;
			@include alert-hidden;
		}
	
		&.visible{
			@include alert-base;
			@include alert-visible;
		}
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
