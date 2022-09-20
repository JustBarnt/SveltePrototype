<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import { Navigation } from "@controllers/Navigation";
	import { AlertVisibility, Colors } from "@enums/enums";
	import { Authorization } from "@requests/Authorization";
	import { Utilities } from "@utilities/Utilities";

	let isSuccessful: boolean | Promise<boolean> | null = null;

	const alertCss: IStyles = {
		position: "relative",
		bottom: "clamp(0px, 2.5rem, 3.5rem)",
		background: Utilities.AwaitFetch(isSuccessful) ? Colors.GREEN : Colors.RED,
	};
	const emptyFields: Array<boolean | null> = [null, null, null, null];

	$: alertMessage = Utilities.AwaitFetch(isSuccessful) ? "User registration successful." : "User registration was unsuccessful, please check to make sure the fields are filled out correctly.";

/**
 * Attempts to register the users.\
 * @return {Promise<boolean>} returns a boolean if it was successful or not.
 */
function Register(event: any): boolean | Promise<boolean> 
{
	const formData = new FormData(event.target);
	const data: any = {};

	for (let field of formData) 
	{
		const [key, value] = field;
		data[key] = value;
	}

	Object.values(data).forEach((field: any, index: number): void => 
	{
		if (field.length === 0 || field === null)
			emptyFields[index] = false;
		else emptyFields[index] = true;
	});

	const isValid = Utilities.FormValidation(data);

	if (!isValid) return (isSuccessful = false);

	const results = new Authorization("POST", data, { "content-type": "application/json", }).RegisterUser();
	return (isSuccessful = results);
}
</script>

<section>
	<form method="POST" on:submit|preventDefault={Register} autocomplete="off">
		<h2>Create New Account</h2>

		{#await Utilities.AwaitFetch(isSuccessful) then PromiseResults}
			<Alert
				visible={PromiseResults === null ? AlertVisibility.Hidden : AlertVisibility.Visible}
				message={alertMessage}
				styles={alertCss} />
		{/await}

		<label for="firstName">First Name: *</label>
		<p
			class="required-field"
			style={`display: ${emptyFields[0] === false ? "inherit" : "none"}`}>
			Please fill out the required field
		</p>
		<input type="text" name="firstName" value="" />

		<label for="lastName">Last Name: *</label>
		<p
			class="required-field"
			style={`display: ${emptyFields[1] === false ? "inherit" : "none"}`}>
			Please fill out the required field
		</p>
		<input type="text" name="lastName" value="" />

		<label for="username">Username: *</label>
		<p
			class="required-field"
			style={`display: ${emptyFields[2] === false ? "inherit" : "none"}`}>
			Please fill out the required field
		</p>
		<input type="text" name="username" value="" />

		<label for="password">Password: *</label>
		<p
			class="required-field"
			style={`display: ${emptyFields[3] === false ? "inherit" : "none"}`}>
			Please fill out the required field
		</p>
		<input type="password" name="password" value="" />

		<input type="submit" value="Submit" />
		<p
			class="login"
			on:click={() => Navigation.ChangePage(Navigation.Page.Login)}>
			Login
		</p>
	</form>
</section>

<style lang="scss">
	section {
		align-content: center;
		width: clamp(300px, 45%, 45%);
	}
	form {
		@include flex-base;
		align-items: stretch;
		align-content: center;

		h2 {
			font-size: 2.8rem;
			font-weight: bold;
			align-self: center;
			position: relative;
			bottom: 6%;
		}

		input {
			@include input-base;
			padding: 1rem 1rem;
		}

		input[type="submit"] {
			color: white;
			background-color: $darkGrey;
			box-shadow: 0 0 0.25rem $darkGrey;

			&:hover {
				border-color: lighten($blue, 50%);
				background: linear-gradient(
					to right bottom,
					$blue,
					lighten($red, 15%)
				);
				box-shadow: 0 0 0.75rem $darkGrey;
			}
		}

		.login {
			align-self: center;
			position: relative;
			top: 2.5%;
			transition: all 0.25s;
			border-bottom: 0.1rem solid transparent;
			cursor: pointer;

			&:hover {
				border-color: white;
			}
		}

		.required-field {
			font-size: 1.2rem;
			color: lighten($red, 25%);
			font-style: italic;
			font-weight: bold;
			text-decoration: underline;
			text-underline-offset: 0.2rem;
		}
	}
</style>
