<script lang="ts">
	import Alert from "@components/Alert.svelte";
	import { Colors } from "@enums/enums";
	import { Executable } from "@requests/Executable";
	import { sessionStore } from "@stores/stores";
	import { Utilities } from "@utilities/Utilities";
	import { createEventDispatcher } from "svelte";
	import { get } from "svelte/store";
	export let data: Results;

	let downloadable: boolean = false;
	let isWaiting: boolean = false;
	let json: string, jsonArry: Array<string>, jBlob: Blob, link: string;
	let filename: string;

	const cancelDispatch = createEventDispatcher();
	const HandleCancel = () => cancelDispatch("cancel", { editing: false });
	const DownloadLicense = async () => await PrepareJson();
	
	const DisplayDownload = async () => 
	{ 
		downloadable = !downloadable; 
		isWaiting = true; 
	};

	/**
	 * Creates a downloadable txt file containing the new license information
	 */
	async function PrepareJson() 
	{
		try
		{
			json = JSON.stringify(data);
			jsonArry = [json];
			jBlob = new Blob(jsonArry, { type: "text/plain;charset=utf-8" });
			link = window.URL.createObjectURL(jBlob);
			filename = data[0].customerName;
			return Promise.resolve(true);
		}
		catch(error)
		{ 
			console.log(error);
			return Promise.reject(error);
		}
	}

	/**
	 * Sets the grid-area style of each label/input child of the form
	 * @param {Number} index - index number of the loop
	 * @param {Boolean} isInput - boolean value to adjust the starting column based on if its an input field or not
	 * @return {String} returns a string containing the style property of each child with the grid-area
	 */
	function SetGridArea(index: number, isInput: boolean): string 
	{
		let startValue: number = index + 1;
		let columnStart: number = isInput ? 4 : 1;
		let columnEnd: number = columnStart + 3;
		let rowStart: number;
		let rowEnd: number;

		columnStart =
			startValue === 15 || startValue <= 7
				? isInput
					? 4
					: 1
				: isInput
				? 10
				: 7;

		if (startValue >= 8) startValue = startValue - 7;

		rowStart = startValue;
		rowEnd = startValue + 1;
		columnEnd = columnStart + 3;

		return `grid-area: ${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd} `;
	}

	async function HandleDownloadProcess(): Promise<any>
	{
		const headers = { "content-type":"application/json", "authorization": `Bearer: ${get(sessionStore).token}` };
		const response = await new Executable("POST", { App: "Notepad.exe", Filename: `${filename}.txt` }, headers).RequestApplication();
		return await Utilities.AsyncDelay(250);
	}
</script>

{#if !isWaiting}
	<form class="edit-license" name="edit-license" id="EditLicense">
		{#each Object.entries(data[0]) as [key, value], index}
			<label
				for={key}
				class={`Label-${index + 1}`}
				style={SetGridArea(index, false)}
				>{Utilities.FormatColumnHeader(key)}:</label>
			<input
				class={`Input-${index + 1} input-field`}
				style={SetGridArea(index, true)}
				type="text"
				id={key}
				name={key}
				bind:value />
		{/each}
		<input
			type="submit"
			class="submit button"
			value="Submit Edit"
			on:click|once|preventDefault={DisplayDownload} />
		<button class="cancel button" on:click={HandleCancel}>Cancel</button>
	</form>
{:else if isWaiting}
	{#await DownloadLicense()}
		<Alert 
			visible="visible" 
			message="Preparing Licenses now." 
			styles={ { background: Colors.BLUE } } />
	{:then value}
		<Alert
			visible="visible" 
			message="License is ready for downloading. Please click download to save it, and open it in Notepade." 
			styles={{ background: Colors.GREEN }} />
			<button class="button" on:click={HandleDownloadProcess}>
				<a 
					href={link} 
					download={`${filename}.txt`}>
					Download Licenses
				</a>
			</button>
	{:catch error}
		<Alert visible="visible" message={error} styles={ { background: Colors.RED } } />
	{/await}
{/if}

<style lang="scss">
	form {
		@include grid-base;
		label {
			padding: 2rem 2rem;
		}

		.input-field {
			@include input-base;
			padding: 1rem;
		}

		.submit {
			grid-area: 9 / 1 / 9 / 9;
		}

		.cancel {
			grid-area: 9 / 10 / 9 / 13;
			font-weight: bold;
			background-color: $red;

			&:hover {
				background: darken($red, 10%);
			}
		}
	}

	.button{
		@include button-base;
		color: white;
		background-color: $darkGrey;
		box-shadow: 0 0 0.25rem $darkGrey;

		&:hover{
			@include button-hover;
		}
	}
</style>
