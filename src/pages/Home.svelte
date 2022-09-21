<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import Form from "@components/Form.svelte";
	import { Navigation } from "@controllers/Navigation";
	import { AlertVisibility, Colors } from "@enums/enums";
	import { Licenses } from "@requests/Licenses";

	let results: Awaited<Query> = { success: null };
	const alertCss: IStyles = { position: "relative", bottom: "clamp(0px, 3rem, 3.5rem)", background: Colors.RED };

	$: results.success ? Navigation.ChangePage(Navigation.Page.Licenses) : null;
	$: visibity = results.success === null && !results.success ? AlertVisibility.Hidden : AlertVisibility.Visible;
	
	/**
	 * Handles the users request to view data
	 * @param {Event<Any>} event - HtmlEvent passed up containing event.detail property
	 */
	const HandleRequest = async(event: any) => results = await new Licenses("GET", event.detail, "all").Search();
</script>

<Form on:request={HandleRequest}>
	<Alert
		visible={visibity}
		message={results.message}
		styles={alertCss} />
</Form>
