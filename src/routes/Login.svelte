<script lang="ts">
	let accounts: Login = { username: "justbarnt", password: "admin" };
	let attempt: Login = { username: "", password: "" };

	let isHidden:boolean = true;
	let attempts:number = 5;

	function HandleLogin(): void 
	{
		console.log((attempt.username !== accounts.username && attempt.password !== accounts.password));
		if(attempt.username !== accounts.username && attempt.password !== accounts.password)
		{
			isHidden = false;
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

<main class="login-main">
	<form id="login-form" on:submit|preventDefault="{HandleLogin}" >
		<h1>Sign In</h1>
		<error
			class="login-error-container"
			style="display: {isHidden ? "none" : "inherit"}">
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
</main>

<style>
	main{
		height: 75vh;
	}

	main form {
		display: grid;
		place-self: center;
		color: white;
		padding: 5rem 5rem;
		border-radius: 1rem;
		background: var(--bgGrad);
		border-bottom: 0.5rem solid var(--purpleDark);
		box-shadow: 0 0 0.75rem #00000075;
	}

	error {
		display: inherit;
		border-radius: 1rem;
		text-align: center;
		margin: 1.5rem 0 0.5rem 0;
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: bold;
		color: #ffffff;
		background-color: var(--purpleDark);
	}

	.login-field::placeholder {
		color: white;
	}

	.login-field {
		border: none;
		border-bottom: 0.25rem solid var(--purpleDark);
		margin-bottom: 0.5rem;
		border-radius: 0.5rem;
		outline: none;
		padding: 0.5rem 0.5rem;
	}

	.submit-login {
		border: 0.2rem solid var(--purpleDark);
		padding: 0.5rem 0.5rem;
		border-radius: 0.5rem;
		font-weight: bold;
		cursor: pointer;
		outline: none;
		transition: border-color 0.25s;
	}

	.submit-login:hover{
		border-color: var(--purpleLight)
	}
</style>
