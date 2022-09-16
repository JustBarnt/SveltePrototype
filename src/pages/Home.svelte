<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import Form from "@components/Form.svelte";
	import { AlertVisibility, Colors } from "@enums/enums";
	import { ViewLicense } from "@requests/Licenses";
	import { Utilities } from "@utilities/Utilities";
	import Cookies from "js-cookie";

	let isSuccessful:Awaited<boolean> | null = null;
	const alertCss: IStyles = { position: "relative", bottom: "clamp(0px, 3rem, 3.5rem)", background: Colors.RED };
	
	/*
	* Reactive function calling
	* function foo(var)
	*{
	*	code
	*}
	*$: foo(myVar) // will run function whenever `myVar` changes
	*/
	$:isSuccessful ? window.location.href = "/#/licenses" : null;
	$:visibity = !isSuccessful && isSuccessful !== null ? AlertVisibility.Visible : AlertVisibility.Hidden;
	
	/**
	* Handles the users request to view data
	* @param {Event<Any>} event - HtmlEvent passed up containing event.detail property
	*/
	async function HandleRequest(event: any)
	{
		const data: QueryDetails = { success: false, results: null, params: event.detail };
		isSuccessful = await ViewLicense(data);
	}

</script>

{#if Cookies.get("id") !== null}
	<Form on:request={HandleRequest}> 
		<Alert visible="{visibity}" message="Attempt to query licenses was unsuccessful, please double check your input and try again." styles={alertCss} />
	</Form>
{:else}
	<Alert visible="visible" message="Unauthorized access. Redirecting to login page" styles={alertCss} />
	{#await Utilities.AsyncDelay(2000) then success}
		{ window.location.href = "/#/" }
	{/await}
{/if}
