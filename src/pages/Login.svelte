<script lang="ts">
import { afterUpdate } from "svelte";


	let accounts: Login = { username: "justbarnt", password: "admin" };
	let attempt: Login = { username: "", password: "" };

	let success:boolean | null = null;
	let message: {error: string, success: string} = { error: "Invalid username and/or password", success:"Success! Signing in now." };

	//change success color.
	$: hidden = success === null ? "hidden" : "";
	$: visible = success !== null ? "visible" : "";

	function HandleLogin(): void 
	{
		success = ((attempt.username === accounts.username) && (attempt.password === accounts.password));
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


<section>
	<form id="LoginForm" on:submit|preventDefault="{HandleLogin}" autocomplete="off">
		<h1>Sign In</h1>
		<!--Fix error messages not overlapping. Probably by just changing one message object instead of swapping two out.-->
		<alert class:hidden class:visible>
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
		display: flex;
		justify-content: center;
		align-items: center;
		height:95%;
	}

	form{
		//Svelte Components don't seem to be able to "inherit" display like html elements can
		//So defining flex display in each component appears to be needed.
		display: inherit;
		flex-flow: column wrap;
		place-content: center center;
		color: white;
		padding: 5rem 5rem;
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
			@include alert-hidden;
			background-color: lighten($red, 10%);
		}
	
		&.visible{
			@include alert-visible;
			background-color: lighten($red, 10%);
		}
	}

	.login-field {
		@include input-base;
		color:white;
		background-color: #35343d75;
		border: 0.2rem solid transparent;
		transition: all 0.25s;

		&::placeholder{
			color: white;
		}

		&:focus, &:focus-visible{
			background: $darkGrey;
			border-color: lighten($blue, 50%);
		}
	}

	.submit-login {
		color: white;
		background-color: $darkGrey;
		box-shadow:0 0 0.25rem $darkGrey;

		&:hover{
			border-color: lighten($blue, 50%);
			background: linear-gradient(to right bottom, $blue, lighten($red, 15%));
			box-shadow: 0 0 0.75rem $darkGrey;
		}
	}
</style>
