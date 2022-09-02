<script>
	import { Utilities } from "../scripts/utilities/Utilities";
	export let data = undefined;
	
	let license = {};
	let downloadable = false;
	let json, jsonArry, jBlob, url, link;
	
	const ShowDownloads = () => downloadable = true;
	
	function PrepareJson(node)
	{
		json = JSON.stringify(data);
		jsonArry = [json];
		jBlob = new Blob(jsonArry, { type: "text/plain;charset=utf-8" });
		url = window.URL;
		link = url.createObjectURL(jBlob);

		return {
			destroy()
			{
				console.log("Component Destroyed");
			},
		};
	}
</script>



<form class="edit-license" name="edit-license" id="EditLicense">
	{#each Object.entries(data[0]) as [key, value], index}
		<label for={key} style={`grid-area:${index+1}; grid-column: 1/3;`}>{Utilities.FormatColumnHeader(key)}</label>
		<input class="input-field" style={`grid-area:${index+1}; grid-column: 4/15;`} type="text" id={key} name={key} bind:value={value}/>
	{/each}
	<input type="submit" class="submit" value="Submit Edit" on:click|once|preventDefault={ShowDownloads}/>
	{#if downloadable}
		<button class="download-license" use:PrepareJson>
			<a href={link} download="license.txt">Download Updated License</a>
		</button>
	{/if}
</form>


<style lang="scss">
	form {
		@include grid-base;
		//@include form-base;
		
		color: white;
		border-radius: 1rem;
		background: linear-gradient(to right bottom, #4967ec, #6167f2, #7767f7, #8b66fb, #9f64ff);
		border-bottom: 0.5rem solid #35343d;
		box-shadow: 0 0 0.75rem #35343d;
		transition: all 0.25s;

		label{
			justify-self: start;
			padding: 0 2rem;
		}

		.input-field {
			@include input-base;
			justify-self: center;
    		padding: 1rem 1rem;

		}

		.submit{
			@include button-base;
			grid-area: 16;
			grid-column: span 16;
			color: white;
			background-color: $darkGrey;
			box-shadow: 0 0 0.25rem $darkGrey;

			&:hover {
				@include button-hover;
			}
		}

		
	}
</style>