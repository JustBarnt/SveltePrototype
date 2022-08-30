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

<main class="login-main">
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
</main>

<style>
	.login-main{
		display: flex;
		place-content: space-around space-around;
	}
	main form{
		display: inherit;
		flex-flow: column wrap;
		color: white;
		padding: 5rem 5rem;
		border-radius: 1rem;
		background: var(--secondaryGrad);  
		border-bottom: 0.5rem solid var(--purpleDark);
		box-shadow: 0 0 0.75rem #00000075;
	}

	main form>*{
		flex: 1 1;
	}

	.hidden{
		border-radius: 1rem;
		align-self: center;
		margin: 0 0;
		padding: 0;
		font-size: 1.2rem;
		font-weight: bold;
		color: #ffffff;
		background-color: var(--magenta);
		box-shadow: 0 0 0.75rem #00000075;
		opacity: 0;
		transition: opacity 0.25s;
	}

	.visible{
		opacity: 1;
		align-self: center;
		border-radius: 1rem;
		margin: 1rem 0;
		padding: 1rem;
		font-size: 1.2rem;
		font-weight: bold;
		color: #ffffff;
		background-color: var(--magenta);
		box-shadow: 0 0 0.75rem #00000075;
		transition: all 0.25s;
	}

	.login-field::placeholder {
		color: white;
	}

	.login-field {
		background-color: #30303075;
		border: 0.2rem solid transparent;
		border-bottom: 0.2rem solid #ffffff50;
		border-radius: 0.5rem;
		padding: 0.5rem 0.15rem;
		transition: all 0.25s;
	}

	.login-field:hover, .login-field:active, .login-field:focus{
		background: #303030;
		border-color: var(--magenta);
		padding: 0.5rem;
		border-radius: 1rem;
	}

	.submit-login {
		border: 0.2rem solid transparent;
		background-color: #30303075;
		padding: 0.5rem 0.5rem;
		border-radius: 0.5rem;
		font-weight: bold;
		cursor: pointer;
		transition: all 0.25s;
	}

	.submit-login:hover{
		border-color: var(--magenta);
		background-color: #303030;
		border-radius: 1rem;
	}
</style>
