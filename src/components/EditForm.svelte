<script lang="ts">
	import { Utilities } from "../scripts/utilities/Utilities";
	export let data: Results;

	let downloadable:boolean = false;
	let json: string, jsonArry: Array<string>, jBlob:Blob, link:string;
	
	const DisplayDownload = () => downloadable = !downloadable;

	function PrepareJson(node: HTMLElement)
	{
		json = JSON.stringify(data);
		jsonArry = [json];
		jBlob = new Blob(jsonArry, { type: "text/plain;charset=utf-8" });
		link = window.URL.createObjectURL(jBlob);

		return {
			destroy()
			{
				console.log("Component Destroyed");
			},
		};
	}

	/**
	* Sets the grid-area style of each label/input child of the form
	* @param {Number} index - index number of the loop
	* @param {Boolean} isInput - boolean value to adjust the starting column based on if its an input field or not
	* @return {String} returns a string containing the style property of each child with the grid-area
	*/
	function SetGridArea(index:number, isInput:boolean):string
	{
		let startValue: number = index+1;
		let columnStart: number = isInput ? 4 : 1;
		let columnEnd: number = columnStart + 3;
		let rowStart: number;
		let rowEnd: number;
		
		columnStart = startValue === 15 || startValue <= 7
			? isInput ? 4 : 1  
			: isInput ? 10 : 7;
		
		if(startValue >= 8) startValue = startValue - 7;

		rowStart = startValue;
		rowEnd = startValue+1;
		columnEnd = columnStart + 3;

		return `grid-area: ${rowStart} / ${columnStart} / ${rowEnd} / ${columnEnd} `;
	}
</script>

<form class="edit-license" name="edit-license" id="EditLicense">
	{#each Object.entries(data[0]) as [key, value], index}
		<label for={key} class={`Label-${index+1}`} style={SetGridArea(index, false)} >{Utilities.FormatColumnHeader(key)}:</label>
		<input class={`Input-${index+1} input-field`} style={SetGridArea(index, true)} type="text" id={key} name={key} bind:value={value}/>
	{/each}
	<input type="submit" class="submit" value="Submit Edit" on:click|once|preventDefault={DisplayDownload}/>
	{#if downloadable}
		<button class="download-license" use:PrepareJson>
			<a href={link} download="license.txt">Download Updated License</a>
		</button>
	{/if}
</form>


<style lang="scss">
	form {
		@include grid-base;
		label{
			padding: 2rem 2rem;
		}

		.input-field {
			@include input-base;
			padding: 1rem;
		}

		.submit{
			@include button-base;
			grid-area: 9 / 1 / 10 / 13;
			color: white;
			background-color: $darkGrey;
			box-shadow: 0 0 0.25rem $darkGrey;

			&:hover {
				@include button-hover;
			}
		}

		
	}
</style>