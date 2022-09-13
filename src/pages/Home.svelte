<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import Form from "@components/Form.svelte";
	import { GetLicenses } from "@controllers/LicenseController";
	import { AlertVisibility, Colors } from "@enums/enums";
	import { USER_SESSION } from "@stores/stores";

	let isSuccessful:Awaited<boolean> | null = null;
	const alertCss: IStyles = { position: "relative", bottom: "clamp(0px, 3rem, 3.5rem)", background: Colors.RED };
	
	$:isSuccessful ? window.location.href = "/#/licenses" : null;
	$:visibity = !isSuccessful && isSuccessful !== null ? AlertVisibility.Visible : AlertVisibility.Hidden;
	
	/**
	* Handles the users request to view data
	* @param {Event<Any>} event - HtmlEvent passed up containing event.detail property
	*/
	async function HandleRequest(event: any)
	{
		const data: QueryDetails = { success: false, results: null, params: event.detail, token: $USER_SESSION };
		isSuccessful = await GetLicenses(data);
	}

</script>

<Form on:request={HandleRequest}> 
	<Alert visible="{visibity}" message="Attempt to query licenses was unsuccessful, please double check your input and try again." styles={alertCss} />
</Form>
