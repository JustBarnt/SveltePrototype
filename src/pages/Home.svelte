<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import Form from "@components/Form.svelte";
	import { Navigation } from "@controllers/Navigation";
	import { AlertVisibility, Colors } from "@enums/enums";
	import { Licenses } from "@requests/Licenses";
	import Cookies from "js-cookie";

	let ResultDetails: Awaited<Query> | null = null;
	const alertCss: IStyles = { position: "relative", bottom: "clamp(0px, 3rem, 3.5rem)", background: Colors.RED };

	/*
	 * Reactive function calling
	 * function foo(var)
	 *{
	 *	code
	 *}
	 *$: foo(myVar) // will run function whenever `myVar` changes
	 */
	$: ResultDetails.success ? Navigation.ChangePage(Navigation.Page.Licenses) : null;
	$: visibity = ResultDetails === null && !ResultDetails ? AlertVisibility.Hidden : AlertVisibility.Visible;

	/**
	 * Handles the users request to view data
	 * @param {Event<Any>} event - HtmlEvent passed up containing event.detail property
	 */
	const HandleRequest = async(event: any) => ResultDetails = await new Licenses("GET", event.detail).Search();
</script>

{#if Cookies.get("id") !== null}
	<Form on:request={HandleRequest}>
		<Alert
			visible={visibity}
			message={ResultDetails.message}
			styles={alertCss} />
	</Form>
{/if}
