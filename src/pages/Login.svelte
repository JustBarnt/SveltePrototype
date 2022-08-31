<script lang="ts">
	let accounts: Login = { username: "justbarnt", password: "admin" };
	let attempt: Login = { username: "", password: "" };

	let isHidden:boolean = true;
	let attempts:number = 5;

	function HandleLogin(): void 
	{
		console.log((attempt.username !== accounts.username && attempt.password !== accounts.password));
		if(attempt.username !== accounts.username && attempt.password !== accounts.password)
			isHidden = false;
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
		<error
			class="{isHidden ? "hidden" : "visible"}">
			<p class="msg">
				Invalid username
				<span class="msg-cont">and/or password.</span>
			</p>
		</error>
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
		border-radius: 1rem;
		background: $gradBg;  
		border-bottom: 0.5rem solid $darkGrey;
		box-shadow: 0 0 0.75rem $darkGrey;
	}

	h1{
		font-size: 2.2rem;
	}

	error{

		&.hidden{
			border-radius: 1rem;
			margin: 1rem 0;
			padding: 1rem;
			font-size: 1.2rem;
			font-weight: bold;
			color: #ffffff;
			background-color: lighten($red, 10%);
			box-shadow: 0 0 0.75rem $darkGrey;
			opacity: 0;
			transition: opacity 0.25s;
		}
	
		&.visible{
			opacity: 1;
			border-radius: 1rem;
			margin: 1rem 0;
			padding: 1rem;
			font-size: 1.2rem;
			font-weight: bold;
			color: #ffffff;
			background-color: lighten($red, 10%);
			box-shadow: 0 0 0.75rem $darkGrey;
			transition: all 0.25s;
		}
	}

	.login-field {
		background-color: #35343d75;
		border: 0.2rem solid transparent;
		border-bottom: 0.2rem solid #ffffff50;
		border-radius: 0.5rem;
		padding: 0.5rem;
		transition: all 0.25s;

		&::placeholder{
			color: white;
		}

		&:hover, &:active, &:focus, &:focus-visible{
			background: $darkGrey;
			border-color: lighten($blue, 50%);
			padding: 0.5rem;
			border-radius: 1rem;
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
